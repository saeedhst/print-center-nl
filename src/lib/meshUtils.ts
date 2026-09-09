import * as THREE from 'three';
import { Dimensions } from '@/types';

/**
 * Calculate the exact mathematical volume in cm^3 of a 3D BufferGeometry
 * using the Divergence Theorem / signed volume of tetrahedra.
 */
export function calculateGeometryVolumeCm3(geometry: THREE.BufferGeometry): number {
  const position = geometry.attributes.position;
  if (!position) return 0;

  let totalVolumeMm3 = 0;
  const p1 = new THREE.Vector3();
  const p2 = new THREE.Vector3();
  const p3 = new THREE.Vector3();

  if (geometry.index) {
    const indices = geometry.index.array;
    for (let i = 0; i < indices.length; i += 3) {
      const i1 = indices[i];
      const i2 = indices[i + 1];
      const i3 = indices[i + 2];

      p1.fromBufferAttribute(position, i1);
      p2.fromBufferAttribute(position, i2);
      p3.fromBufferAttribute(position, i3);

      totalVolumeMm3 += signedVolumeOfTriangle(p1, p2, p3);
    }
  } else {
    for (let i = 0; i < position.count; i += 3) {
      p1.fromBufferAttribute(position, i);
      p2.fromBufferAttribute(position, i + 1);
      p3.fromBufferAttribute(position, i + 2);

      totalVolumeMm3 += signedVolumeOfTriangle(p1, p2, p3);
    }
  }

  // 1 cm^3 = 1000 mm^3
  const volumeCm3 = Math.abs(totalVolumeMm3) / 1000.0;
  return Math.max(0.1, Math.round(volumeCm3 * 100) / 100);
}

function signedVolumeOfTriangle(p1: THREE.Vector3, p2: THREE.Vector3, p3: THREE.Vector3): number {
  return (
    p1.x * (p2.y * p3.z - p3.y * p2.z) -
    p2.x * (p1.y * p3.z - p3.y * p1.z) +
    p3.x * (p1.y * p2.z - p2.y * p1.z)
  ) / 6.0;
}

/**
 * Calculate X, Y, Z bounding box dimensions in millimeters
 */
export function getBoundingBoxDimensions(geometry: THREE.BufferGeometry): Dimensions {
  geometry.computeBoundingBox();
  const bbox = geometry.boundingBox;
  if (!bbox) {
    return { x: 50, y: 50, z: 50 };
  }

  const x = Math.max(1, Math.round((bbox.max.x - bbox.min.x) * 10) / 10);
  const y = Math.max(1, Math.round((bbox.max.y - bbox.min.y) * 10) / 10);
  const z = Math.max(1, Math.round((bbox.max.z - bbox.min.z) * 10) / 10);

  return { x, y, z };
}

/**
 * Parse an STL ArrayBuffer into a Three.js BufferGeometry
 */
export async function parseStlBuffer(buffer: ArrayBuffer): Promise<THREE.BufferGeometry> {
  const { STLLoader } = await import('three/examples/jsm/loaders/STLLoader.js');
  const loader = new STLLoader();
  const geometry = loader.parse(buffer);
  geometry.computeVertexNormals();
  return geometry;
}

export interface PresetModel {
  id: string;
  name: string;
  category: string;
  fileName: string;
  tag: string;
  generateGeometry: () => THREE.BufferGeometry;
}

/**
 * Generates rich, realistic geometries representing standard real-world 3D prints
 * so users can test immediately without uploading their own file.
 */
export const PRESET_MODELS: PresetModel[] = [
  {
    id: 'mechanical-bracket',
    name: 'T-Joint Structural Bracket (60mm)',
    category: 'Engineering / Robotics',
    fileName: 't_joint_mount_bracket_60mm.stl',
    tag: 'Functional Part',
    generateGeometry: () => {
      // Create an engineered L/T composite bracket
      const groupGeom = new THREE.BoxGeometry(60, 16, 28);
      const verticalArm = new THREE.BoxGeometry(16, 45, 28);
      verticalArm.translate(0, 22.5, 0);

      const cylinderHole = new THREE.CylinderGeometry(4, 4, 32, 16);
      cylinderHole.rotateX(Math.PI / 2);
      cylinderHole.translate(-18, 0, 0);

      // Merge into a single BufferGeometry
      const g1 = groupGeom.toNonIndexed();
      const g2 = verticalArm.toNonIndexed();

      const pos1 = g1.attributes.position.array;
      const pos2 = g2.attributes.position.array;
      const merged = new Float32Array(pos1.length + pos2.length);
      merged.set(pos1, 0);
      merged.set(pos2, pos1.length);

      const mergedGeom = new THREE.BufferGeometry();
      mergedGeom.setAttribute('position', new THREE.BufferAttribute(merged, 3));
      mergedGeom.computeVertexNormals();
      return mergedGeom;
    },
  },
  {
    id: 'architectural-canal-house',
    name: 'Amsterdam Grachtenpand Facade (1:100 Scale)',
    category: 'Architecture',
    fileName: 'amsterdam_canal_facade_100scale.stl',
    tag: 'Architectural Model',
    generateGeometry: () => {
      // Stepped Dutch gable facade
      const baseBody = new THREE.BoxGeometry(42, 68, 30);
      const gableStep1 = new THREE.BoxGeometry(32, 14, 28);
      gableStep1.translate(0, 41, 0);
      const gableStep2 = new THREE.BoxGeometry(20, 12, 28);
      gableStep2.translate(0, 52, 0);
      const gableCrest = new THREE.CylinderGeometry(5, 5, 26, 12);
      gableCrest.rotateX(Math.PI / 2);
      gableCrest.translate(0, 60, 0);

      const parts = [
        baseBody.toNonIndexed(),
        gableStep1.toNonIndexed(),
        gableStep2.toNonIndexed(),
        gableCrest.toNonIndexed(),
      ];

      let totalLen = 0;
      for (const p of parts) totalLen += p.attributes.position.array.length;
      const merged = new Float32Array(totalLen);
      let offset = 0;
      for (const p of parts) {
        merged.set(p.attributes.position.array, offset);
        offset += p.attributes.position.array.length;
      }

      const mergedGeom = new THREE.BufferGeometry();
      mergedGeom.setAttribute('position', new THREE.BufferAttribute(merged, 3));
      mergedGeom.computeVertexNormals();
      return mergedGeom;
    },
  },
  {
    id: 'drone-rotor-guard',
    name: 'TU Delft Drone Rotor Guard & Arm',
    category: 'Aerospace & Drones',
    fileName: 'tudelft_propeller_bumper_guard.stl',
    tag: 'Lightweight Aero',
    generateGeometry: () => {
      const ring = new THREE.TorusGeometry(38, 3.5, 16, 48);
      ring.rotateX(Math.PI / 2);
      const arm1 = new THREE.CylinderGeometry(2.5, 2.5, 48, 12);
      arm1.rotateZ(Math.PI / 2);
      const centerHub = new THREE.CylinderGeometry(9, 9, 10, 24);

      const parts = [
        ring.toNonIndexed(),
        arm1.toNonIndexed(),
        centerHub.toNonIndexed(),
      ];

      let totalLen = 0;
      for (const p of parts) totalLen += p.attributes.position.array.length;
      const merged = new Float32Array(totalLen);
      let offset = 0;
      for (const p of parts) {
        merged.set(p.attributes.position.array, offset);
        offset += p.attributes.position.array.length;
      }

      const mergedGeom = new THREE.BufferGeometry();
      mergedGeom.setAttribute('position', new THREE.BufferAttribute(merged, 3));
      mergedGeom.computeVertexNormals();
      return mergedGeom;
    },
  },
  {
    id: 'ergonomic-knob',
    name: 'Precision Knurled Dial & Knob',
    category: 'Consumer & Audio',
    fileName: 'precision_knurled_audio_dial_32mm.stl',
    tag: 'Tactile Interface',
    generateGeometry: () => {
      const cylinder = new THREE.CylinderGeometry(18, 18, 14, 32);
      const dialTop = new THREE.CylinderGeometry(14, 18, 6, 32);
      dialTop.translate(0, 10, 0);

      const parts = [cylinder.toNonIndexed(), dialTop.toNonIndexed()];
      let totalLen = 0;
      for (const p of parts) totalLen += p.attributes.position.array.length;
      const merged = new Float32Array(totalLen);
      let offset = 0;
      for (const p of parts) {
        merged.set(p.attributes.position.array, offset);
        offset += p.attributes.position.array.length;
      }

      const mergedGeom = new THREE.BufferGeometry();
      mergedGeom.setAttribute('position', new THREE.BufferAttribute(merged, 3));
      mergedGeom.computeVertexNormals();
      return mergedGeom;
    },
  },
];
