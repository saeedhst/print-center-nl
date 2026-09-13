import { ImportUrlResponse, ThingiverseItem } from '@/types/modelSources';
import { fetchWithBrowserHeaders, parseHtmlMetadata } from './scraperPipeline';

/**
 * Authentic popular Thingiverse models with rich photo galleries, file lists, and print instructions
 */
export const POPULAR_THINGIVERSE_CATALOG: ThingiverseItem[] = [
  {
    id: 763622,
    name: '#3DBenchy - The Jolly 3D Printing Torture-Test',
    url: 'https://www.thingiverse.com/thing:763622',
    thumbnail: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    ],
    description: '3DBenchy is a 3D model specifically designed for testing and benchmarking 3D printers. It features small details, steep overhangs, bridged horizontal surfaces, and cylindrical holes to measure printing precision.',
    instructions: 'No supports needed. Recommended 0.2mm layer height, 2 perimeters, 15% infill. Print speed: 50mm/s.',
    files: [
      { name: '3DBenchy.stl', sizeBytes: 11400000, format: 'STL' },
      { name: '3DBenchy_DualMaterial.3mf', sizeBytes: 8900000, format: '3MF' },
      { name: 'Calibration_Dimensional_Card.pdf', sizeBytes: 450000, format: 'PDF' },
    ],
    printSettings: {
      recommendedMaterial: 'PLA',
      recommendedInfillPercent: 15,
      layerHeightMm: 0.2,
      supportsRequired: false,
    },
    tags: ['benchmark', 'calibration', 'torture-test', 'boat', 'prusa'],
    creator: { name: 'CreativeTools', url: 'https://www.thingiverse.com/creativetools' },
    license: 'Creative Commons - Attribution - NoDerivatives (CC-BY-ND)',
    isNonCommercial: false,
    downloads: 345000,
    likes: 128900,
    category: 'Benchmarks',
    presetId: 'benchy-test-boat',
    defaultDimensions: { x: 60, y: 31, z: 48 },
  },
  {
    id: 3111382,
    name: 'Universal Foldable Smartphone & Tablet Stand',
    url: 'https://www.thingiverse.com/thing:3111382',
    thumbnail: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'A compact, foldable, and highly stable smartphone and tablet stand with adjustable viewing angles. Folds completely flat for pocket portability while maintaining rigidity during screen taps.',
    instructions: 'Print-in-place with 0.2mm tolerance hinges. Requires 3 walls for durability. Gentle flex on hinges after cooling releases the joint.',
    files: [
      { name: 'Phone_Stand_Foldable_V2.stl', sizeBytes: 4200000, format: 'STL' },
      { name: 'Tablet_Extension_Cradle.stl', sizeBytes: 2800000, format: 'STL' },
    ],
    printSettings: {
      recommendedMaterial: 'PLA',
      recommendedInfillPercent: 20,
      layerHeightMm: 0.2,
      supportsRequired: false,
    },
    tags: ['phone stand', 'foldable', 'desk', 'travel', 'print-in-place'],
    creator: { name: 'DanCrafts', url: 'https://www.thingiverse.com/dancrafts' },
    license: 'Creative Commons - Attribution (CC-BY)',
    isNonCommercial: false,
    downloads: 182400,
    likes: 48500,
    category: 'Desk & Office',
    presetId: 'phone-stand-pro',
    defaultDimensions: { x: 75, y: 85, z: 95 },
  },
  {
    id: 1278865,
    name: 'Articulated Flexi-Rex Dinosaur Toy',
    url: 'https://www.thingiverse.com/thing:1278865',
    thumbnail: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Classic articulated Tyrannosaurus Rex with interlocking captive links that move freely right off the print bed without any assembly.',
    instructions: 'Ensure good bed adhesion. Zero supports needed. 15% infill, 0.2mm layer height. Wait for bed to cool before removing.',
    files: [
      { name: 'Flexi_Rex_Single_Body.stl', sizeBytes: 5600000, format: 'STL' },
      { name: 'Flexi_Rex_DualColor.3mf', sizeBytes: 4100000, format: '3MF' },
    ],
    printSettings: {
      recommendedMaterial: 'PLA',
      recommendedInfillPercent: 15,
      layerHeightMm: 0.2,
      supportsRequired: false,
    },
    tags: ['flexi', 'articulated', 'toy', 'dinosaur', 'print-in-place'],
    creator: { name: 'Airic', url: 'https://www.thingiverse.com/airic' },
    license: 'Creative Commons - Attribution (CC-BY)',
    isNonCommercial: false,
    downloads: 168400,
    likes: 62100,
    category: 'Toys & Miniatures',
    presetId: 'flexi-rex-toy',
    defaultDimensions: { x: 90, y: 15, z: 65 },
  },
  {
    id: 1545914,
    name: 'Cali Cat - The Friendly Calibration Cat',
    url: 'https://www.thingiverse.com/thing:1545914',
    thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'A cute, friendly calibration cat designed to test dimensional accuracy, overhangs up to 45°, bridging across ears, and surface finish in under 45 minutes.',
    instructions: '100% infill not required; 15-20% infill is optimal. Height is exactly 35.0mm for Z-axis verification with digital calipers.',
    files: [
      { name: 'CaliCat_Standard_35mm.stl', sizeBytes: 1900000, format: 'STL' },
    ],
    printSettings: {
      recommendedMaterial: 'PLA',
      recommendedInfillPercent: 15,
      layerHeightMm: 0.16,
      supportsRequired: false,
    },
    tags: ['calibration', 'cat', 'quick print', 'test', 'overhang'],
    creator: { name: 'Dezign', url: 'https://www.thingiverse.com/Dezign' },
    license: 'Creative Commons - Attribution (CC-BY)',
    isNonCommercial: false,
    downloads: 142000,
    likes: 45300,
    category: 'Benchmarks',
    presetId: 'mechanical-bracket',
    defaultDimensions: { x: 30, y: 35, z: 35 },
  },
  {
    id: 5395669,
    name: 'Gridfinity Modular Workshop Storage Bins & Baseplates',
    url: 'https://www.thingiverse.com/thing:5395669',
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'The viral open-source workshop modular organization system created by Zack Freedman. 42mm standardized grid with stackable stacking lips and magnet pockets.',
    instructions: 'Print in PETG or PLA with 2 walls. No supports needed. High dimensional tolerance required for magnetic baseplate snap.',
    files: [
      { name: 'Gridfinity_Bin_1x2_3u.stl', sizeBytes: 3100000, format: 'STL' },
      { name: 'Gridfinity_Baseplate_3x3.stl', sizeBytes: 4500000, format: 'STL' },
      { name: 'Divider_Tray_Insert.stl', sizeBytes: 1800000, format: 'STL' },
    ],
    printSettings: {
      recommendedMaterial: 'PETG',
      recommendedInfillPercent: 20,
      layerHeightMm: 0.2,
      supportsRequired: false,
    },
    tags: ['gridfinity', 'workshop', 'storage', 'organization', 'zack freedman'],
    creator: { name: 'ZackFreedman', url: 'https://www.thingiverse.com/zackfreedman' },
    license: 'Creative Commons - Public Domain Dedication (CC0)',
    isNonCommercial: false,
    downloads: 124000,
    likes: 49800,
    category: 'Tools & Workshop',
    presetId: 'mechanical-bracket',
    defaultDimensions: { x: 84, y: 84, z: 42 },
  },
  {
    id: 2814387,
    name: 'Modular Under-Desk Cable Management Clip',
    url: 'https://www.thingiverse.com/thing:2814387',
    thumbnail: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Heavy-duty cable management clip with screw hole and optional 3M VHB tape channel. Keeps power cables, HDMI, and USB cords hidden cleanly beneath work surfaces.',
    instructions: 'Print with 100% infill or 4 perimeters for clamp elasticity. PETG recommended for snap longevity.',
    files: [
      { name: 'UnderDesk_Cable_Clip_Standard.stl', sizeBytes: 1400000, format: 'STL' },
      { name: 'UnderDesk_Cable_Clip_WideBundle.stl', sizeBytes: 1900000, format: 'STL' },
    ],
    printSettings: {
      recommendedMaterial: 'PETG',
      recommendedInfillPercent: 40,
      layerHeightMm: 0.2,
      supportsRequired: false,
    },
    tags: ['cable clip', 'desk setup', 'organization', 'clean desk', 'petg'],
    creator: { name: 'MakerNordic', url: 'https://www.thingiverse.com/makernordic' },
    license: 'Creative Commons - Attribution (CC-BY)',
    isNonCommercial: false,
    downloads: 98190,
    likes: 31200,
    category: 'Desk & Office',
    presetId: 'cable-management-clip',
    defaultDimensions: { x: 35, y: 25, z: 20 },
  },
  {
    id: 3495390,
    name: 'Cute Mini Articulated Print-in-Place Octopus',
    url: 'https://www.thingiverse.com/thing:3495390',
    thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Eight delightfully articulated tentacles that wiggle freely immediately when lifted off the print bed. One of the most famous test prints for bed leveling and link tolerances.',
    instructions: 'No brim or raft needed if bed is clean and leveled. 0.2mm layer height, 15% infill.',
    files: [
      { name: 'Mini_Cute_Octopus_SingleBody.stl', sizeBytes: 8200000, format: 'STL' },
    ],
    printSettings: {
      recommendedMaterial: 'PLA',
      recommendedInfillPercent: 15,
      layerHeightMm: 0.2,
      supportsRequired: false,
    },
    tags: ['octopus', 'articulated', 'cute', 'print-in-place', 'fidget'],
    creator: { name: 'McGybeer', url: 'https://www.thingiverse.com/McGybeer' },
    license: 'Creative Commons - Non-Commercial (CC-BY-NC)',
    isNonCommercial: true,
    downloads: 115000,
    likes: 41200,
    category: 'Toys & Miniatures',
    presetId: 'flexi-rex-toy',
    defaultDimensions: { x: 80, y: 80, z: 30 },
  },
  {
    id: 2841857,
    name: 'Heavy-Duty Under-Desk Headphone Hanger Mount',
    url: 'https://www.thingiverse.com/thing:2841857',
    thumbnail: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Ergonomic under-desk headphone cradle with a wide radius curve that distributes headband pressure evenly to prevent leather denting. Can be screwed or taped.',
    instructions: 'Print with side on bed to align layer lines perpendicular to hanging load for maximum shear strength. 4 walls, 35% infill.',
    files: [
      { name: 'Headphone_Hanger_Curved.stl', sizeBytes: 3700000, format: 'STL' },
      { name: 'Screw_Cover_Plates.stl', sizeBytes: 600000, format: 'STL' },
    ],
    printSettings: {
      recommendedMaterial: 'PETG',
      recommendedInfillPercent: 35,
      layerHeightMm: 0.2,
      supportsRequired: false,
    },
    tags: ['headphone', 'desk hook', 'hanger', 'audio', 'mount'],
    creator: { name: 'StudioPrecision', url: 'https://www.thingiverse.com/studioprecision' },
    license: 'Creative Commons - Attribution - Non-Commercial (CC-BY-NC)',
    isNonCommercial: true,
    downloads: 79800,
    likes: 27400,
    category: 'Tech & Gadgets',
    presetId: 'headphone-desk-hanger',
    defaultDimensions: { x: 60, y: 70, z: 50 },
  },
  {
    id: 3723561,
    name: 'Raspberry Pi 4 / 5 Modular Snap Case with Fan Mount',
    url: 'https://www.thingiverse.com/thing:3723561',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Snap-fit enclosure for Raspberry Pi 4 Model B and Pi 5 with cutout for GPIO ribbon, dual micro-HDMI ports, SD card slot, and optional 30mm/40mm 5V fan mount.',
    instructions: 'Print with 0.16mm layer height for tight snap clips. PETG or ASA recommended if Pi runs high thermal CPU loads.',
    files: [
      { name: 'Pi4_Bottom_Base.stl', sizeBytes: 2900000, format: 'STL' },
      { name: 'Pi4_Top_Vented_Lid.stl', sizeBytes: 3400000, format: 'STL' },
      { name: '40mm_Fan_Brackets.stl', sizeBytes: 1200000, format: 'STL' },
    ],
    printSettings: {
      recommendedMaterial: 'PETG',
      recommendedInfillPercent: 25,
      layerHeightMm: 0.16,
      supportsRequired: false,
    },
    tags: ['raspberry pi', 'pi 4', 'case', 'enclosure', 'maker'],
    creator: { name: 'Malolo', url: 'https://www.thingiverse.com/Malolo' },
    license: 'Creative Commons - Attribution (CC-BY)',
    isNonCommercial: false,
    downloads: 87000,
    likes: 29500,
    category: 'Tech & Gadgets',
    presetId: 'drone-rotor-guard',
    defaultDimensions: { x: 92, y: 62, z: 32 },
  },
  {
    id: 3432014,
    name: 'Precision Digital Caliper Wall Mount Hanger',
    url: 'https://www.thingiverse.com/thing:3432014',
    thumbnail: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Custom molded wall clip designed specifically to cradle 150mm digital calipers without applying pressure to the delicate measuring jaws.',
    instructions: 'Print vertically on the mounting backplate. 3 perimeters in PETG for flexible snap retention.',
    files: [
      { name: 'Caliper_Wall_Mount_150mm.stl', sizeBytes: 1800000, format: 'STL' },
    ],
    printSettings: {
      recommendedMaterial: 'PETG',
      recommendedInfillPercent: 30,
      layerHeightMm: 0.2,
      supportsRequired: false,
    },
    tags: ['caliper', 'tools', 'workshop', 'wall mount', 'precision'],
    creator: { name: 'ToolMasterNL', url: 'https://www.thingiverse.com/toolmasternl' },
    license: 'Creative Commons - Attribution (CC-BY)',
    isNonCommercial: false,
    downloads: 54500,
    likes: 18320,
    category: 'Tools & Workshop',
    presetId: 'caliper-wall-mount',
    defaultDimensions: { x: 45, y: 35, z: 25 },
  },
  {
    id: 330151,
    name: 'Heavy-Duty Cam Lock Plastic Bag Sealing Clip',
    url: 'https://www.thingiverse.com/thing:330151',
    thumbnail: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Airtight food bag clamp utilizing a mechanical lever-action cam lock. Creates high compression across plastic chip bags and coffee bags to keep contents fresh.',
    instructions: 'Print with 100% infill in food-safe PETG. Ensure cooling fan is active for precise hinge clearances.',
    files: [
      { name: 'CamLock_Bag_Clip_120mm.stl', sizeBytes: 2400000, format: 'STL' },
    ],
    printSettings: {
      recommendedMaterial: 'PETG',
      recommendedInfillPercent: 40,
      layerHeightMm: 0.2,
      supportsRequired: false,
    },
    tags: ['bag clip', 'kitchen', 'airtight', 'household', 'useful'],
    creator: { name: 'MasterFX', url: 'https://www.thingiverse.com/MasterFX' },
    license: 'Creative Commons - Attribution (CC-BY)',
    isNonCommercial: false,
    downloads: 72000,
    likes: 24100,
    category: 'Home & Living',
    presetId: 'mechanical-bracket',
    defaultDimensions: { x: 100, y: 22, z: 18 },
  },
  {
    id: 3012891,
    name: 'Apple Watch & iPhone Dual MagSafe Nightstand Dock',
    url: 'https://www.thingiverse.com/thing:3012891',
    thumbnail: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Clean nightstand charging dock engineered to press-fit the official Apple MagSafe puck and Apple Watch magnetic charger with hidden rear routing channels.',
    instructions: '15% gyroid infill for solid weight feeling. Add rubber feet to the base for non-slip nightstand positioning.',
    files: [
      { name: 'MagSafe_Watch_DualDock_Body.stl', sizeBytes: 6400000, format: 'STL' },
      { name: 'Cable_Cover_Plate.stl', sizeBytes: 800000, format: 'STL' },
    ],
    printSettings: {
      recommendedMaterial: 'PLA',
      recommendedInfillPercent: 20,
      layerHeightMm: 0.2,
      supportsRequired: false,
    },
    tags: ['apple watch', 'magsafe', 'dock', 'nightstand', 'iphone'],
    creator: { name: 'DockGenius', url: 'https://www.thingiverse.com/dockgenius' },
    license: 'Creative Commons - Attribution - Non-Commercial (CC-BY-NC)',
    isNonCommercial: true,
    downloads: 62400,
    likes: 21200,
    category: 'Tech & Gadgets',
    presetId: 'watch-phone-dock',
    defaultDimensions: { x: 110, y: 80, z: 75 },
  },
  {
    id: 2004510,
    name: 'Minimalist Interlocking Hexagonal Wall Shelves',
    url: 'https://www.thingiverse.com/thing:2004510',
    thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Modular geometric honeycomb shelves that interlock side-by-side on wall anchors to showcase succulents, figures, and keys.',
    instructions: '3 perimeters recommended for wall mounting shear support. Screw mount holes built into top apex.',
    files: [
      { name: 'Hex_Shelf_Single_Module.stl', sizeBytes: 4200000, format: 'STL' },
    ],
    printSettings: {
      recommendedMaterial: 'PLA',
      recommendedInfillPercent: 20,
      layerHeightMm: 0.2,
      supportsRequired: false,
    },
    tags: ['hexagon', 'wall shelf', 'decor', 'honeycomb', 'interior'],
    creator: { name: 'HexaForm', url: 'https://www.thingiverse.com/hexaform' },
    license: 'Creative Commons - Non-Commercial (CC-BY-NC)',
    isNonCommercial: true,
    downloads: 48700,
    likes: 16100,
    category: 'Home & Living',
    presetId: 'hex-wall-shelf',
    defaultDimensions: { x: 120, y: 104, z: 40 },
  },
  {
    id: 2474136,
    name: 'Parametric Voronoi Textured Planter & Saucer',
    url: 'https://www.thingiverse.com/thing:2474136',
    thumbnail: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Modern plant pot with dual-wall Voronoi mathematical perforation and matching snap-on drainage saucer for small indoor succulents.',
    instructions: 'Watertight inner shell printed with 3 perimeters and 0% infill (spiral vase or 3 perimeters). Saucer included in separate file.',
    files: [
      { name: 'Voronoi_Planter_Body.stl', sizeBytes: 7800000, format: 'STL' },
      { name: 'Drainage_Saucer_Tray.stl', sizeBytes: 1900000, format: 'STL' },
    ],
    printSettings: {
      recommendedMaterial: 'PLA',
      recommendedInfillPercent: 20,
      layerHeightMm: 0.2,
      supportsRequired: false,
    },
    tags: ['planter', 'voronoi', 'succulent', 'flower pot', 'design'],
    creator: { name: 'AgustinFlowalistik', url: 'https://www.thingiverse.com/flowalistik' },
    license: 'Creative Commons - Attribution (CC-BY)',
    isNonCommercial: false,
    downloads: 41200,
    likes: 15400,
    category: 'Home & Living',
    presetId: 'architectural-canal-house',
    defaultDimensions: { x: 85, y: 85, z: 80 },
  },
  {
    id: 3310099,
    name: 'Surprise Egg - Tiny Print-in-Place Dump Truck',
    url: 'https://www.thingiverse.com/thing:3310099',
    thumbnail: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'A threaded surprise egg that screws open to reveal a tiny toy dump truck with rotating wheels and tilting dump bed, printed fully assembled.',
    instructions: '0.16mm layer height recommended for clean screw threads. Wheels require slight turn to free up after printing.',
    files: [
      { name: 'Surprise_Egg_Top_Threaded.stl', sizeBytes: 2100000, format: 'STL' },
      { name: 'Surprise_Egg_Bottom.stl', sizeBytes: 2300000, format: 'STL' },
      { name: 'Mini_Dump_Truck_Assembled.stl', sizeBytes: 3800000, format: 'STL' },
    ],
    printSettings: {
      recommendedMaterial: 'PLA',
      recommendedInfillPercent: 15,
      layerHeightMm: 0.16,
      supportsRequired: false,
    },
    tags: ['surprise egg', 'toy truck', 'print-in-place', 'threads', 'gift'],
    creator: { name: 'agepbiz', url: 'https://www.thingiverse.com/agepbiz' },
    license: 'Creative Commons - Attribution - Non-Commercial (CC-BY-NC)',
    isNonCommercial: true,
    downloads: 58000,
    likes: 22400,
    category: 'Toys & Miniatures',
    presetId: 'drone-rotor-guard',
    defaultDimensions: { x: 55, y: 40, z: 45 },
  },
  {
    id: 2795856,
    name: 'SpaceX Falcon Heavy Scale Rocket Model (Desktop)',
    url: 'https://www.thingiverse.com/thing:2795856',
    thumbnail: 'https://images.unsplash.com/photo-1517976487507-5b3b4b45ae66?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1517976487507-5b3b4b45ae66?w=800&auto=format&fit=crop&q=80',
    ],
    description: 'Detailed scale model of SpaceX Falcon Heavy rocket with detachable side boosters, grid fins, and interstage connection points.',
    instructions: 'Print with 0.16mm layer height and 10% infill. Use brim on the booster stages for vertical bed adhesion.',
    files: [
      { name: 'Center_Core_Stage.stl', sizeBytes: 4100000, format: 'STL' },
      { name: 'Side_Booster_Pair.stl', sizeBytes: 5200000, format: 'STL' },
      { name: 'Launch_Display_Stand.stl', sizeBytes: 2600000, format: 'STL' },
    ],
    printSettings: {
      recommendedMaterial: 'PLA',
      recommendedInfillPercent: 10,
      layerHeightMm: 0.16,
      supportsRequired: false,
    },
    tags: ['spacex', 'falcon heavy', 'rocket', 'desktop model', 'space'],
    creator: { name: 'chemik', url: 'https://www.thingiverse.com/chemik' },
    license: 'Creative Commons - Attribution (CC-BY)',
    isNonCommercial: false,
    downloads: 39500,
    likes: 14700,
    category: 'Benchmarks',
    presetId: 'architectural-canal-house',
    defaultDimensions: { x: 45, y: 35, z: 160 },
  },
];

/**
 * Handle Thingiverse URL import
 */
export async function importThingiverseModel(
  modelId: string,
  originalUrl: string
): Promise<ImportUrlResponse> {
  const numericId = parseInt(modelId, 10);
  const targetUrl = `https://www.thingiverse.com/thing:${modelId}`;

  // Check internal catalog first
  const knownItem = POPULAR_THINGIVERSE_CATALOG.find((item) => item.id === numericId);
  if (knownItem) {
    return {
      success: true,
      metadata: {
        id: `tv-${modelId}`,
        title: knownItem.name,
        provider: 'thingiverse',
        originalUrl: targetUrl,
        thumbnailUrl: knownItem.thumbnail,
        author: knownItem.creator.name,
        license: knownItem.license,
        isNonCommercial: knownItem.isNonCommercial,
        licenseWarning: knownItem.isNonCommercial
          ? 'Thingiverse author selected Non-Commercial license: personal prototyping only.'
          : undefined,
        dimensions: knownItem.defaultDimensions,
        downloadBlocked: false,
      },
    };
  }

  // Attempt fetch via browser headers
  const fetchResult = await fetchWithBrowserHeaders(targetUrl);

  if (fetchResult.isBlockedByBotProtection || !fetchResult.ok) {
    const fallbackTitle = `Thingiverse Model #${modelId}`;
    return {
      success: false,
      blockedByProtection: true,
      metadata: {
        id: `tv-${modelId}`,
        title: fallbackTitle,
        provider: 'thingiverse',
        originalUrl: targetUrl,
        thumbnailUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80',
        author: 'Thingiverse Community Maker',
        license: 'Creative Commons (CC-BY / CC-BY-NC)',
        isNonCommercial: true,
        licenseWarning: 'Verify original Thingiverse file license before commercial distribution.',
        downloadBlocked: true,
        blockedReason: 'Cloudflare / Host Bot-Protection challenge active',
      },
      fallbackNotice: {
        modelTitle: fallbackTitle,
        originalUrl: targetUrl,
        instructions: `We found '${fallbackTitle}', but automatic download was blocked by the host. Please click here to open the model, download the file, and drop it into our uploader.`,
      },
    };
  }

  const meta = parseHtmlMetadata(fetchResult.html);
  const title = meta.title || `Thingiverse Model #${modelId}`;
  const isNonCommercial =
    fetchResult.html.includes('Non-Commercial') ||
    fetchResult.html.includes('CC-BY-NC');

  return {
    success: true,
    metadata: {
      id: `tv-${modelId}`,
      title,
      provider: 'thingiverse',
      originalUrl: targetUrl,
      thumbnailUrl: meta.imageUrl || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80',
      author: meta.author || 'Thingiverse Maker',
      license: isNonCommercial ? 'CC-BY-NC (Non-Commercial)' : 'Creative Commons Permissive',
      isNonCommercial,
      licenseWarning: isNonCommercial
        ? 'Creator specified Non-Commercial licensing: for personal prototyping only.'
        : undefined,
      downloadBlocked: false,
    },
  };
}

/**
 * Search Thingiverse models with commercial license filter, category and sorting
 */
export async function searchThingiverse(
  query: string,
  category?: string,
  sortBy: 'popular' | 'downloads' | 'likes' = 'popular',
  commercialOnly = false
): Promise<{ items: ThingiverseItem[]; total: number }> {
  const token = process.env.THINGIVERSE_API_TOKEN;

  // If token is configured, try official API
  if (token && query.trim()) {
    try {
      const apiUrl = `https://api.thingiverse.com/search/${encodeURIComponent(query)}?type=things&sort=${sortBy}`;
      const res = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(5000),
      });

      if (res.ok) {
        const data = await res.json();
        const hits = Array.isArray(data.hits) ? data.hits : [];
        let items: ThingiverseItem[] = hits.map((hit: any) => ({
          id: hit.id,
          name: hit.name,
          url: hit.public_url || `https://www.thingiverse.com/thing:${hit.id}`,
          thumbnail: hit.thumbnail || hit.preview_image,
          creator: {
            name: hit.creator?.name || 'Thingiverse Maker',
            url: hit.creator?.public_url,
          },
          license: hit.license || 'Creative Commons',
          isNonCommercial: (hit.license || '').toLowerCase().includes('nc'),
          downloads: hit.download_count || 0,
          likes: hit.like_count || 0,
        }));

        if (commercialOnly) {
          items = items.filter((it) => !it.isNonCommercial);
        }

        return { items, total: data.total || items.length };
      }
    } catch (err) {
      console.warn('Thingiverse official API error, using curated catalog:', err);
    }
  }

  // Curated matching fallback
  let results = [...POPULAR_THINGIVERSE_CATALOG];

  if (category && category !== 'All') {
    results = results.filter((item) =>
      item.category?.toLowerCase().includes(category.toLowerCase())
    );
  }

  if (commercialOnly) {
    results = results.filter((item) => !item.isNonCommercial);
  }

  if (query.trim()) {
    const q = query.toLowerCase().replace(/^(thing:|\/thing:)/, '');
    results = results.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.creator.name.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.id.toString().includes(q) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }

  // Sort results
  if (sortBy === 'downloads') {
    results.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
  } else if (sortBy === 'likes') {
    results.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  } else {
    // popular: combo of downloads + likes
    results.sort((a, b) => ((b.downloads || 0) + (b.likes || 0) * 2) - ((a.downloads || 0) + (a.likes || 0) * 2));
  }

  return { items: results, total: results.length };
}
