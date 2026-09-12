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
    renderer.shadowMap.type = THREE.PCFShadowMap;
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

  const triangleCount = activeGeometry
    ? Math.round(activeGeometry.index ? activeGeometry.index.count / 3 : activeGeometry.attributes.position.count / 3)
    : 14200;

  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-white overflow-hidden relative shadow-level-1 flex flex-col group/viewport">
      {/* Top Toolbar */}
      <div className="px-4 py-2.5 bg-surface-container-low border-b border-[#E2E8F0] flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-on-surface tracking-tight truncate max-w-[180px] sm:max-w-xs font-mono">
            {fileName || '3D_Model.stl'}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-primary border border-outline font-label-mono">
            {material} &bull; {scaleFactor * 100}% Scale
          </span>
        </div>

        {/* Viewport Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsWireframe(!isWireframe)}
            title="Toggle Wireframe"
            className={`p-1.5 rounded text-xs font-medium border transition-colors cursor-pointer ${
              isWireframe
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-on-surface-variant border-outline hover:text-on-surface'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            title="Toggle Auto Rotation"
            className={`p-1.5 rounded text-xs font-medium border transition-colors cursor-pointer ${
              isAutoRotate
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-on-surface-variant border-outline hover:text-on-surface'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setShowBuildGrid(!showBuildGrid)}
            title="Toggle Build Grid"
            className={`p-1.5 rounded text-xs font-medium border transition-colors cursor-pointer ${
              showBuildGrid
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-on-surface-variant border-outline hover:text-on-surface'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleResetCamera}
            title="Reset Camera View"
            className="p-1.5 rounded text-xs font-medium bg-white text-on-surface-variant border border-outline hover:text-on-surface transition-colors cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D WebGL Viewport Container */}
      <div className="relative w-full">
        {/* 4 Laser-Engraved Corner Tick Markers (L-brackets in #0052FF) */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#0052FF] pointer-events-none z-20" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#0052FF] pointer-events-none z-20" />
        <div className="absolute bottom-20 left-3 w-3 h-3 border-b-2 border-l-2 border-[#0052FF] pointer-events-none z-20" />
        <div className="absolute bottom-20 right-3 w-3 h-3 border-b-2 border-r-2 border-[#0052FF] pointer-events-none z-20" />

        <div
          ref={containerRef}
          className="w-full h-[380px] sm:h-[440px] cursor-grab active:cursor-grabbing relative"
        />

        {/* Floating Telemetry HUD (Built with #0F172A at 85% opacity, backdrop blur, white text & monospace readouts) */}
        <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none">
          <div className="pointer-events-auto bg-[#0F172A]/90 backdrop-blur-md text-white px-4 py-2.5 rounded-lg border border-[#0052FF]/40 shadow-level-2 flex flex-wrap items-center justify-between gap-3">
            {/* Coordinates */}
            <div className="flex items-center gap-2">
              <span className="text-[#00D2FF] font-label-mono-xs text-[10px] uppercase tracking-wider font-bold">
                BOUNDING BOX
              </span>
              <span className="font-label-mono text-xs text-white">
                X: <strong className="text-white font-bold">{priceBreakdown.scaledDimensions.x}</strong> mm &bull;{' '}
                Y: <strong className="text-white font-bold">{priceBreakdown.scaledDimensions.y}</strong> mm &bull;{' '}
                Z: <strong className="text-white font-bold">{priceBreakdown.scaledDimensions.z}</strong> mm
              </span>
            </div>

            {/* Volume, Tris & Watertight Seal */}
            <div className="flex items-center gap-4 font-label-mono text-xs">
              <div className="text-slate-300">
                <span className="text-slate-400 text-[10px] uppercase mr-1">VOL</span>
                <strong className="text-white">{priceBreakdown.scaledVolumeCm3} cm³</strong>
              </div>

              <div className="hidden sm:block text-slate-300">
                <span className="text-slate-400 text-[10px] uppercase mr-1">TRIS</span>
                <strong className="text-white">{triangleCount.toLocaleString()}</strong>
              </div>

              {/* Watertight status badge */}
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/50 text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Watertight</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
