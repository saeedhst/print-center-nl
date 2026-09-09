'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useAppStore } from '@/lib/store';
import { MATERIALS } from '@/lib/pricing';
import { PRESET_MODELS, calculateGeometryVolumeCm3, getBoundingBoxDimensions } from '@/lib/meshUtils';
import {
  RotateCcw,
  Maximize2,
  Box,
  Eye,
  Grid,
  Sparkles,
  Layers,
  Scale,
} from 'lucide-react';

export default function ModelViewer3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    activeGeometry,
    fileName,
    dimensions,
    volumeCm3,
    material,
    setModelGeometry,
    selectedPresetId,
  } = useAppStore();

  const [isWireframe, setIsWireframe] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [showBuildGrid, setShowBuildGrid] = useState(true);

  // Three.js internal refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const wireframeMeshRef = useRef<THREE.LineSegments | null>(null);
  const bboxBoxRef = useRef<THREE.BoxHelper | null>(null);
  const controlsRef = useRef<any>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const reqIdRef = useRef<number | null>(null);

  // Initialize preset model if no geometry yet loaded
  useEffect(() => {
    if (!activeGeometry) {
      const preset = PRESET_MODELS[0];
      const geom = preset.generateGeometry();
      const dims = getBoundingBoxDimensions(geom);
      const vol = calculateGeometryVolumeCm3(geom);
      setModelGeometry(preset.fileName, geom, dims, vol, preset.id);
    }
  }, [activeGeometry, setModelGeometry]);

  // Three.js Scene Setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0b1120');
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      1,
      2000
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

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(100, 200, 100);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xff9955, 0.4);
    dirLight2.position.set(-100, -50, -100);
    scene.add(dirLight2);

    // Build Plate (Bambu 256x256 mm bed simulation)
    const gridHelper = new THREE.GridHelper(256, 32, 0xff5500, 0x1e293b);
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
      controlsInstance.maxDistance = 600;
      controlsInstance.minDistance = 20;
      controlsInstance.target.set(0, 20, 0);
      controlsRef.current = controlsInstance;
    });

    // Animation Loop
    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);

      if (controlsRef.current) {
        controlsRef.current.autoRotate = isAutoRotate;
        controlsRef.current.autoRotateSpeed = 1.8;
        controlsRef.current.update();
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Observer
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

  // Toggle Grid visibility
  useEffect(() => {
    if (!sceneRef.current) return;
    const grid = sceneRef.current.getObjectByName('buildGrid');
    if (grid) {
      grid.visible = showBuildGrid;
    }
  }, [showBuildGrid]);

  // Update Geometry and Material when store changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || !activeGeometry) return;

    // Remove old mesh
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

    // Material color & finish mapping
    const matConfig = MATERIALS[material] || MATERIALS.PLA;
    let colorHex = 0xf97316; // orange
    let roughness = 0.4;
    let metalness = 0.1;
    let opacity = 1.0;
    let transparent = false;

    if (material === 'PLA') {
      colorHex = 0xf8fafc; // Clean white/ivory PLA
      roughness = 0.5;
    } else if (material === 'PETG') {
      colorHex = 0xff6600; // Translucent Dutch safety orange
      roughness = 0.25;
      metalness = 0.2;
    } else if (material === 'ABS') {
      colorHex = 0x2563eb; // Industrial technical blue
      roughness = 0.6;
    } else if (material === 'TPU') {
      colorHex = 0x8b5cf6; // Vibrant flexible violet
      roughness = 0.7;
    } else if (material === 'RESIN') {
      colorHex = 0x94a3b8; // Satin slate gray ultra-detail
      roughness = 0.15;
      metalness = 0.4;
    }

    const threeMaterial = new THREE.MeshStandardMaterial({
      color: colorHex,
      roughness,
      metalness,
      wireframe: isWireframe,
      transparent,
      opacity,
      side: THREE.DoubleSide,
    });

    // Center geometry on the build plate (bottom sits at y=0)
    activeGeometry.computeBoundingBox();
    const bbox = activeGeometry.boundingBox;
    if (bbox) {
      const center = new THREE.Vector3();
      bbox.getCenter(center);
      activeGeometry.center(); // centers at (0,0,0)

      // Recompute bbox to place on build bed
      activeGeometry.computeBoundingBox();
      const updatedBox = activeGeometry.boundingBox;
      if (updatedBox) {
        const height = updatedBox.max.y - updatedBox.min.y;
        activeGeometry.translate(0, height / 2, 0);
      }
    }

    const mesh = new THREE.Mesh(activeGeometry, threeMaterial);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    meshRef.current = mesh;

    // Add bounding box helper
    const bboxHelper = new THREE.BoxHelper(mesh, 0xff7700);
    scene.add(bboxHelper);
    bboxBoxRef.current = bboxHelper;

    // Reset camera target
    if (controlsRef.current) {
      controlsRef.current.target.set(0, dimensions.z / 2, 0);
    }
  }, [activeGeometry, material, isWireframe, dimensions.z]);

  const handleResetCamera = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.set(130, 110, 160);
    controlsRef.current.target.set(0, dimensions.z / 2, 0);
    controlsRef.current.update();
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden relative shadow-2xl flex flex-col">
      {/* Top Status Bar */}
      <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-white tracking-wide truncate max-w-[200px] sm:max-w-xs">
            {fileName || '3D_Model.stl'}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-orange-400 font-mono border border-slate-700">
            {material}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsWireframe(!isWireframe)}
            title="Toggle Wireframe"
            className={`p-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isWireframe
                ? 'bg-orange-500/20 text-orange-400 border-orange-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            title="Toggle Auto Rotation"
            className={`p-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isAutoRotate
                ? 'bg-orange-500/20 text-orange-400 border-orange-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setShowBuildGrid(!showBuildGrid)}
            title="Toggle 256mm Build Plate Grid"
            className={`p-1.5 rounded-lg text-xs font-medium border transition-colors ${
              showBuildGrid
                ? 'bg-orange-500/20 text-orange-400 border-orange-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleResetCamera}
            title="Reset Camera Angle"
            className="p-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700 hover:text-white transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={containerRef}
        className="w-full h-[380px] sm:h-[440px] cursor-grab active:cursor-grabbing relative"
      />

      {/* Real-time Dimensions & Volume HUD Overlay */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800 text-xs shadow-lg">
          <Box className="w-4 h-4 text-orange-400 shrink-0" />
          <div className="text-[11px] space-x-1.5 text-slate-300">
            <span>Dimensions:</span>
            <strong className="text-white font-mono">
              X: {dimensions.x} × Y: {dimensions.y} × Z: {dimensions.z} mm
            </strong>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800 text-xs shadow-lg">
          <Scale className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="text-[11px] space-x-1.5 text-slate-300">
            <span>Net Volume:</span>
            <strong className="text-emerald-400 font-mono">{volumeCm3} cm³</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
