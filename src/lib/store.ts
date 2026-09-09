import { create } from 'zustand';
import * as THREE from 'three';
import {
  CustomerDetails,
  CustomerOrder,
  DesignComplexity,
  DesignRequestQuote,
  Dimensions,
  MaterialType,
  OrderStatus,
  OrderType,
} from '@/types';
import { calculatePrintPrice, DetailedPriceBreakdown } from './pricing';
import { INITIAL_ORDERS } from './sampleData';

interface AppState {
  // Navigation & Wizard mode
  activeTab: 'quote' | 'portfolio' | 'materials' | 'admin';
  setActiveTab: (tab: 'quote' | 'portfolio' | 'materials' | 'admin') => void;

  orderType: OrderType;
  setOrderType: (type: OrderType) => void;

  // Direct Print State (Path A)
  selectedPresetId: string | null;
  fileName: string;
  fileBuffer: ArrayBuffer | null;
  activeGeometry: THREE.BufferGeometry | null;
  dimensions: Dimensions;
  volumeCm3: number;
  material: MaterialType;
  infillPercentage: number;
  colorCount: number;
  deliverySpeed: 'STANDARD' | 'EXPRESS' | 'COURIER_RANDSTAD' | 'PICKUP';
  isStudent: boolean;
  studentInstitution: string;
  specialInstructions: string;
  priceBreakdown: DetailedPriceBreakdown;

  // Direct Print Actions
  setModelGeometry: (
    fileName: string,
    geometry: THREE.BufferGeometry,
    dimensions: Dimensions,
    volumeCm3: number,
    presetId?: string | null
  ) => void;
  setMaterial: (material: MaterialType) => void;
  setInfillPercentage: (infill: number) => void;
  setColorCount: (colors: number) => void;
  setDeliverySpeed: (speed: 'STANDARD' | 'EXPRESS' | 'COURIER_RANDSTAD' | 'PICKUP') => void;
  setIsStudent: (isStudent: boolean, institution?: string) => void;
  setSpecialInstructions: (notes: string) => void;

  // CAD Design Request State (Path B)
  cadComplexity: DesignComplexity;
  cadDescription: string;
  cadTargetDimensions: Dimensions;
  cadFunctionalRequirements: string;
  cadIntendedUse: 'functional' | 'decorative' | 'heat-resistant' | 'flexible';
  cadReferenceImages: string[];
  setCadDetails: (details: Partial<{
    cadComplexity: DesignComplexity;
    cadDescription: string;
    cadTargetDimensions: Dimensions;
    cadFunctionalRequirements: string;
    cadIntendedUse: 'functional' | 'decorative' | 'heat-resistant' | 'flexible';
    cadReferenceImages: string[];
  }>) => void;

  // Checkout modal
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;

  // Confirmed order popup
  lastSubmittedOrder: CustomerOrder | null;
  setLastSubmittedOrder: (order: CustomerOrder | null) => void;

  // Admin & Orders list
  orders: CustomerOrder[];
  addOrder: (order: CustomerOrder) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  updateCadQuotePrice: (id: string, priceEur: number, engineerNotes?: string) => void;

  // Place Order Action
  submitOrder: (customer: CustomerDetails) => CustomerOrder;
}

const DEFAULT_DIMENSIONS: Dimensions = { x: 60, y: 45, z: 28 };
const DEFAULT_VOLUME = 24.5; // cm3

const initialBreakdown = calculatePrintPrice({
  volumeCm3: DEFAULT_VOLUME,
  dimensions: DEFAULT_DIMENSIONS,
  material: 'PLA',
  infillPercentage: 15,
  colorCount: 1,
  deliverySpeed: 'STANDARD',
  isStudent: false,
});

export const useAppStore = create<AppState>((set, get) => ({
  activeTab: 'quote',
  setActiveTab: (tab) => set({ activeTab: tab }),

  orderType: 'DIRECT_PRINT',
  setOrderType: (orderType) => set({ orderType }),

  // Direct Print State
  selectedPresetId: 'mechanical-bracket',
  fileName: 't_joint_mount_bracket_60mm.stl',
  fileBuffer: null,
  activeGeometry: null,
  dimensions: DEFAULT_DIMENSIONS,
  volumeCm3: DEFAULT_VOLUME,
  material: 'PLA',
  infillPercentage: 15,
  colorCount: 1,
  deliverySpeed: 'STANDARD',
  isStudent: false,
  studentInstitution: '',
  specialInstructions: '',
  priceBreakdown: initialBreakdown,

  setModelGeometry: (fileName, geometry, dimensions, volumeCm3, presetId = null) => {
    set((state) => {
      const priceBreakdown = calculatePrintPrice({
        volumeCm3,
        dimensions,
        material: state.material,
        infillPercentage: state.infillPercentage,
        colorCount: state.colorCount,
        deliverySpeed: state.deliverySpeed,
        isStudent: state.isStudent,
      });
      return {
        fileName,
        activeGeometry: geometry,
        dimensions,
        volumeCm3,
        selectedPresetId: presetId,
        priceBreakdown,
      };
    });
  },

  setMaterial: (material) => {
    set((state) => ({
      material,
      priceBreakdown: calculatePrintPrice({
        volumeCm3: state.volumeCm3,
        dimensions: state.dimensions,
        material,
        infillPercentage: state.infillPercentage,
        colorCount: state.colorCount,
        deliverySpeed: state.deliverySpeed,
        isStudent: state.isStudent,
      }),
    }));
  },

  setInfillPercentage: (infillPercentage) => {
    set((state) => ({
      infillPercentage,
      priceBreakdown: calculatePrintPrice({
        volumeCm3: state.volumeCm3,
        dimensions: state.dimensions,
        material: state.material,
        infillPercentage,
        colorCount: state.colorCount,
        deliverySpeed: state.deliverySpeed,
        isStudent: state.isStudent,
      }),
    }));
  },

  setColorCount: (colorCount) => {
    set((state) => ({
      colorCount,
      priceBreakdown: calculatePrintPrice({
        volumeCm3: state.volumeCm3,
        dimensions: state.dimensions,
        material: state.material,
        infillPercentage: state.infillPercentage,
        colorCount,
        deliverySpeed: state.deliverySpeed,
        isStudent: state.isStudent,
      }),
    }));
  },

  setDeliverySpeed: (deliverySpeed) => {
    set((state) => ({
      deliverySpeed,
      priceBreakdown: calculatePrintPrice({
        volumeCm3: state.volumeCm3,
        dimensions: state.dimensions,
        material: state.material,
        infillPercentage: state.infillPercentage,
        colorCount: state.colorCount,
        deliverySpeed,
        isStudent: state.isStudent,
      }),
    }));
  },

  setIsStudent: (isStudent, institution = '') => {
    set((state) => ({
      isStudent,
      studentInstitution: institution || state.studentInstitution,
      priceBreakdown: calculatePrintPrice({
        volumeCm3: state.volumeCm3,
        dimensions: state.dimensions,
        material: state.material,
        infillPercentage: state.infillPercentage,
        colorCount: state.colorCount,
        deliverySpeed: state.deliverySpeed,
        isStudent,
      }),
    }));
  },

  setSpecialInstructions: (specialInstructions) => set({ specialInstructions }),

  // CAD Intake State
  cadComplexity: 'MEDIUM',
  cadDescription: '',
  cadTargetDimensions: { x: 100, y: 100, z: 50 },
  cadFunctionalRequirements: '',
  cadIntendedUse: 'functional',
  cadReferenceImages: [],
  setCadDetails: (details) => set((state) => ({ ...state, ...details })),

  // Checkout modal
  isCheckoutModalOpen: false,
  setIsCheckoutModalOpen: (isCheckoutModalOpen) => set({ isCheckoutModalOpen }),

  lastSubmittedOrder: null,
  setLastSubmittedOrder: (lastSubmittedOrder) => set({ lastSubmittedOrder }),

  // Admin & Orders list
  orders: INITIAL_ORDERS,
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
  updateOrderStatus: (id, status) => {
    set((state) => ({
      orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    }));
  },
  updateCadQuotePrice: (id, priceEur, engineerNotes) => {
    set((state) => ({
      orders: state.orders.map((o) => {
        if (o.id === id && o.type === 'DESIGN_AND_PRINT') {
          const details = o.details as DesignRequestQuote;
          return {
            ...o,
            status: 'APPROVED',
            details: {
              ...details,
              status: 'QUOTED',
              quotedPriceEur: priceEur,
              engineerNotes: engineerNotes || details.engineerNotes,
            },
          };
        }
        return o;
      }),
    }));
  },

  submitOrder: (customer) => {
    const state = get();
    const orderId = `ORD-NL-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    let newOrder: CustomerOrder;

    if (state.orderType === 'DIRECT_PRINT') {
      newOrder = {
        id: orderId,
        createdAt: now,
        type: 'DIRECT_PRINT',
        status: 'QUOTE_SUBMITTED',
        customer,
        details: {
          fileUrl: '',
          fileName: state.fileName,
          volumeCm3: state.volumeCm3,
          dimensions: state.dimensions,
          material: state.material,
          infillPercentage: state.infillPercentage,
          colorCount: state.colorCount,
          deliverySpeed: state.deliverySpeed,
          estimatedWeightGrams: state.priceBreakdown.weightGrams,
          estimatedPrintTimeMinutes: state.priceBreakdown.estimatedPrintTimeMinutes,
          baseSetupFeeEur: state.priceBreakdown.baseSetupFeeEur,
          materialCostEur: state.priceBreakdown.materialCostEur,
          machineCostEur: state.priceBreakdown.machineCostEur,
          colorMultiplier: state.priceBreakdown.colorMultiplier,
          shippingCostEur: state.priceBreakdown.shippingCostEur,
          studentDiscountEur: state.priceBreakdown.studentDiscountEur,
          calculatedPriceEur: state.priceBreakdown.totalPriceEur,
          specialInstructions: state.specialInstructions,
        },
      };
    } else {
      newOrder = {
        id: orderId,
        createdAt: now,
        type: 'DESIGN_AND_PRINT',
        status: 'QUOTE_SUBMITTED',
        customer,
        details: {
          referenceImages: state.cadReferenceImages.length > 0 ? state.cadReferenceImages : ['concept_reference_sketch.png'],
          description: state.cadDescription || 'Custom mechanical component model request',
          targetDimensions: state.cadTargetDimensions,
          functionalRequirements: state.cadFunctionalRequirements,
          intendedUse: state.cadIntendedUse,
          estimatedComplexity: state.cadComplexity,
          status: 'PENDING_REVIEW',
          quotedPriceEur: state.cadComplexity === 'SIMPLE' ? 45.0 : state.cadComplexity === 'MEDIUM' ? 95.0 : 210.0,
          estimatedTurnaroundDays: state.cadComplexity === 'SIMPLE' ? 1 : state.cadComplexity === 'MEDIUM' ? 2 : 3,
        },
      };
    }

    set((s) => ({
      orders: [newOrder, ...s.orders],
      lastSubmittedOrder: newOrder,
      isCheckoutModalOpen: false,
    }));

    return newOrder;
  },
}));
