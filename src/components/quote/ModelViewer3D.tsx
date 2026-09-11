'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useAppStore } from '@/lib/store';
import { SIMPLE_MATERIALS } from '@/lib/pricing';
import { PRESET_MODELS, calculateGeometryVolumeCm3, getBoundingBoxDimensions } from '@/lib/meshUtils';
import {
  RotateCcw,
  Maximize2,
  Box,
  Layers,
  Grid,
  Scale,
} from 'lucide-react';

export default function ModelViewer3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    activeGeometry,
    fileName,
    baseDimensions,
    scaleFactor,
    material,
    colorOption,
    priceBreakdown,
    setModelGeometry,
  } = useAppStore();

  const [isWireframe, setIsWireframe] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [showBuildGrid, setShowBuildGrid] = useState(true);

  // Three.js internal refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const bboxBoxRef = useRef<THREE.BoxHelper | null>(null);
  const controlsRef = useRef<any>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const reqIdRef = useRef<number | null>(null);

  // Initialize default geometry if none loaded
  useEffect(() => {
    if (!activeGeometry) {
      const preset = PRESET_MODELS[0];
      const geom = preset.generateGeometry();
      const dims = getBoundingBoxDimensions(geom);
      const vol = calculateGeometryVolumeCm3(geom);
      setModelGeometry(preset.fileName, geom, dims, vol, preset.id);
    }
  }, [activeGeometry, setModelGeometry]);

  // Three.js Scene Setup (Strict Light Mode)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene with soft studio light background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f8fafc'); // Soft neutral light slate
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      1,
      2500
    );
    camera.position.set(130, 110, 160);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Studio Lights for clean light mode
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(120, 220, 140);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf1f5f9, 0.6);
    fillLight.position.set(-120, 80, -100);
    scene.add(fillLight);

    // Build Plate Grid (Light mode friendly 256x256mm plate)
    const gridHelper = new THREE.GridHelper(256, 32, 0xe2e8f0, 0xf1f5f9);
    gridHelper.position.y = 0;
    gridHelper.name = 'buildGrid';
    scene.add(gridHelper);

    // Dynamic import for OrbitControls
    let controlsInstance: any = null;
    let isDisposed = false;

    import('three/examples/jsm/controls/OrbitControls.js').then(({ OrbitControls }) => {
      if (isDisposed) return;
      controlsInstance = new OrbitControls(camera, renderer.domElement);
      controlsInstance.enableDamping = true;
      controlsInstance.dampingFactor = 0.05;
      controlsInstance.maxDistance = 650;
      controlsInstance.minDistance = 20;
      controlsInstance.target.set(0, 20, 0);
      controlsRef.current = controlsInstance;
    });

    // Animation Loop
    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);

      if (controlsRef.current) {
        controlsRef.current.autoRotate = isAutoRotate;
        controlsRef.current.autoRotateSpeed = 1.5;
        controlsRef.current.update();
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      isDisposed = true;
      window.removeEventListener('resize', handleResize);
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      if (controlsInstance) controlsInstance.dispose();
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [isAutoRotate]);

  // Toggle Grid
  useEffect(() => {
    if (!sceneRef.current) return;
    const grid = sceneRef.current.getObjectByName('buildGrid');
    if (grid) {
      grid.visible = showBuildGrid;
    }
  }, [showBuildGrid]);

  // Update Mesh & Apply Live Scaling
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || !activeGeometry) return;

    // Clean up old mesh
    if (meshRef.current) {
      scene.remove(meshRef.current);
      meshRef.current.geometry.dispose();
      if (Array.isArray(meshRef.current.material)) {
        meshRef.current.material.forEach((m) => m.dispose());
      } else {
        meshRef.current.material.dispose();
      }
      meshRef.current = null;
    }

    if (bboxBoxRef.current) {
      scene.remove(bboxBoxRef.current);
      bboxBoxRef.current.dispose();
      bboxBoxRef.current = null;
    }

    // Material Color & Finish in Light Mode
    let colorHex = 0x0f172a; // clean slate
    let roughness = 0.4;
    let metalness = 0.1;

    if (material === 'STANDARD') {
      colorHex = colorOption === 'MULTI' ? 0xea580c : 0x334155; // Slate dark or orange
      roughness = 0.45;
    } else if (material === 'TOUGH') {
      colorHex = 0xea580c; // Vibrant Dutch orange
      roughness = 0.3;
      metalness = 0.15;
    } else if (material === 'RESIN') {
      colorHex = 0x0284c7; // Technical cobalt blue
      roughness = 0.15;
      metalness = 0.3;
    }

    const matObj = new THREE.MeshStandardMaterial({
      color: colorHex,
      roughness,
      metalness,
      wireframe: isWireframe,
      side: THREE.DoubleSide,
    });

    // Center geometry at origin and place bottom on y=0
    activeGeometry.computeBoundingBox();
    const bbox = activeGeometry.boundingBox;
    if (bbox) {
      activeGeometry.center();
      activeGeometry.computeBoundingBox();
      const updatedBox = activeGeometry.boundingBox;
      if (updatedBox) {
        const height = updatedBox.max.y - updatedBox.min.y;
        activeGeometry.translate(0, height / 2, 0);
      }
    }

    const mesh = new THREE.Mesh(activeGeometry, matObj);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // Apply Live Scale Factor
    const validScale = Math.max(0.1, Math.min(3.0, scaleFactor || 1.0));
    mesh.scale.set(validScale, validScale, validScale);

    scene.add(mesh);
    meshRef.current = mesh;

    // Bounding Box Helper
    const bboxHelper = new THREE.BoxHelper(mesh, 0xea580c);
    scene.add(bboxHelper);
    bboxBoxRef.current = bboxHelper;

    if (controlsRef.current) {
      controlsRef.current.target.set(0, (priceBreakdown.scaledDimensions.z || 30) / 2, 0);
    }
  }, [activeGeometry, material, colorOption, isWireframe, scaleFactor, priceBreakdown.scaledDimensions.z]);

  const handleResetCamera = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.set(130, 110, 160);
    controlsRef.current.target.set(0, 20, 0);
    controlsRef.current.update();
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden relative shadow-soft flex flex-col">
      {/* Top Toolbar */}
      <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-800 tracking-tight truncate max-w-[200px] sm:max-w-xs">
            {fileName || '3D_Model.stl'}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-orange-700 border border-slate-200 font-mono">
            {material} &bull; {scaleFactor * 100}% Scale
          </span>
        </div>

        {/* Viewport Toggles */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsWireframe(!isWireframe)}
            title="Toggle Wireframe"
            className={`p-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isWireframe
                ? 'bg-orange-50 text-orange-700 border-orange-300'
                : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            title="Toggle Auto Rotation"
            className={`p-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isAutoRotate
                ? 'bg-orange-50 text-orange-700 border-orange-300'
                : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setShowBuildGrid(!showBuildGrid)}
            title="Toggle Build Grid"
            className={`p-1.5 rounded-lg text-xs font-medium border transition-colors ${
              showBuildGrid
                ? 'bg-orange-50 text-orange-700 border-orange-300'
                : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleResetCamera}
            title="Reset Camera View"
            className="p-1.5 rounded-lg text-xs font-medium bg-white text-slate-600 border border-slate-200 hover:text-slate-900 transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D WebGL Viewport */}
      <div
        ref={containerRef}
        className="w-full h-[360px] sm:h-[420px] cursor-grab active:cursor-grabbing relative"
      />

      {/* HUD Overlay with Live Scaled Dimensions */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200 text-xs shadow-sm">
          <Box className="w-4 h-4 text-orange-600 shrink-0" />
          <div className="text-[11px] text-slate-600">
            <span>Size: </span>
            <strong className="text-slate-900 font-mono font-bold">
              {priceBreakdown.scaledDimensions.x} &times; {priceBreakdown.scaledDimensions.y} &times; {priceBreakdown.scaledDimensions.z} mm
            </strong>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200 text-xs shadow-sm">
          <Scale className="w-4 h-4 text-emerald-600 shrink-0" />
          <div className="text-[11px] text-slate-600">
            <span>Volume: </span>
            <strong className="text-emerald-700 font-mono font-bold">
              {priceBreakdown.scaledVolumeCm3} cm&sup3;
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
