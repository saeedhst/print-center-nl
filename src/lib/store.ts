import { create } from 'zustand';
import * as THREE from 'three';
import {
  CustomerDetails,
  CustomerOrder,
  DeliverySpeedOption,
  DesignRequestQuote,
  Dimensions,
  DirectPrintQuote,
  MaterialType,
  OrderStatus,
  OrderType,
  SimpleColorOption,
} from '@/types';
import { calculatePrintPrice, PriceBreakdownResult } from './pricing';
import { INITIAL_ORDERS } from './sampleData';

export type AppView =
  | 'landing'
  | 'branch'
  | 'order-a'
  | 'order-b'
  | 'have-3d-file'
  | 'have-idea-or-photo'
  | 'checkout'
  | 'confirmation'
  | 'portfolio'
  | 'reviews'
  | 'admin'
  | 'auth';

export interface UserSession {
  email: string;
  name: string;
  role: 'admin' | 'customer';
}

interface AppState {
  // Authentication
  currentUser: UserSession | null;
  login: (email: string, role: 'admin' | 'customer', name?: string) => void;
  logout: () => void;

  // Navigation & View State
  activeView: AppView;
  setActiveView: (view: AppView) => void;

  orderType: OrderType;
  setOrderType: (orderType: OrderType) => void;

  // Option A (Direct 3D Print) State
  selectedPresetId: string | null;
  fileName: string;
  activeGeometry: THREE.BufferGeometry | null;
  baseDimensions: Dimensions;
  baseVolumeCm3: number;
  scaleFactor: number; // e.g. 0.5, 1.0, 1.5
  material: MaterialType;
  colorOption: SimpleColorOption;
  deliverySpeed: DeliverySpeedOption;
  specialInstructions: string;
  priceBreakdown: PriceBreakdownResult;

  // Sourced Model Metadata (from Link, Thingiverse, Catalog)
  sourcedModelMetadata: import('@/types/modelSources').ModelMetadata | null;
  setSourcedModelMetadata: (metadata: import('@/types/modelSources').ModelMetadata | null) => void;

  // Option A Actions
  setModelGeometry: (
    fileName: string,
    geometry: THREE.BufferGeometry,
    dimensions: Dimensions,
    volumeCm3: number,
    presetId?: string | null
  ) => void;
  setScaleFactor: (scale: number) => void;
  setMaterial: (material: MaterialType) => void;
  setColorOption: (colorOption: SimpleColorOption) => void;
  setDeliverySpeed: (deliverySpeed: DeliverySpeedOption) => void;
  setSpecialInstructions: (notes: string) => void;

  // Option B (CAD Design Intake) State
  cadDescription: string;
  cadTargetDimensions: Dimensions;
  cadCustomerNotes: string;
  cadReferenceLinks: string;
  cadReferenceImages: string[];
  selectedBenchmarkCardId: string | null;
  cadContactName: string;
  cadContactEmail: string;
  setCadDetails: (details: Partial<{
    cadDescription: string;
    cadTargetDimensions: Dimensions;
    cadCustomerNotes: string;
    cadReferenceLinks: string;
    cadReferenceImages: string[];
    selectedBenchmarkCardId: string | null;
    cadContactName: string;
    cadContactEmail: string;
  }>) => void;

  // Checkout State
  customer: CustomerDetails;
  setCustomer: (customer: Partial<CustomerDetails>) => void;
  selectedPaymentMethod: 'ideal' | 'card';
  setSelectedPaymentMethod: (method: 'ideal' | 'card') => void;

  // Order Confirmation
  lastSubmittedOrder: CustomerOrder | null;
  setLastSubmittedOrder: (order: CustomerOrder | null) => void;

  // Admin & Orders list
  orders: CustomerOrder[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  updateCadQuotePrice: (id: string, priceEur: number, engineerNotes?: string) => void;

  // Order submission
  submitDirectOrder: () => CustomerOrder;
  submitDesignRequest: () => CustomerOrder;
}

const DEFAULT_BASE_DIMS: Dimensions = { x: 60, y: 53, z: 28 };
const DEFAULT_BASE_VOLUME = 47.0;

const initialBreakdown = calculatePrintPrice({
  baseVolumeCm3: DEFAULT_BASE_VOLUME,
  baseDimensions: DEFAULT_BASE_DIMS,
  scaleFactor: 1.0,
  material: 'STANDARD',
  colorOption: 'SINGLE',
  deliverySpeed: 'COURIER_RANDSTAD',
});

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: null,
  login: (email, role, name) => {
    const defaultName = role === 'admin' ? 'Studio Operations Admin' : (name || email.split('@')[0]);
    set({
      currentUser: { email, role, name: defaultName },
      activeView: role === 'admin' ? 'admin' : 'landing',
    });
  },
  logout: () => {
    set({ currentUser: null, activeView: 'landing' });
  },

  activeView: 'landing',
  setActiveView: (view) => set({ activeView: view }),

  orderType: 'DIRECT_PRINT',
  setOrderType: (orderType) => set({ orderType }),

  // Option A defaults
  selectedPresetId: 'mechanical-bracket',
  fileName: 't_joint_mount_bracket_60mm.stl',
  activeGeometry: null,
  baseDimensions: DEFAULT_BASE_DIMS,
  baseVolumeCm3: DEFAULT_BASE_VOLUME,
  scaleFactor: 1.0,
  material: 'STANDARD',
  colorOption: 'SINGLE',
  deliverySpeed: 'COURIER_RANDSTAD',
  specialInstructions: '',
  priceBreakdown: initialBreakdown,

  sourcedModelMetadata: null,
  setSourcedModelMetadata: (metadata) => set({ sourcedModelMetadata: metadata }),

  setModelGeometry: (fileName, geometry, dimensions, volumeCm3, presetId = null) => {
    set((state) => {
      const breakdown = calculatePrintPrice({
        baseVolumeCm3: volumeCm3,
        baseDimensions: dimensions,
        scaleFactor: state.scaleFactor,
        material: state.material,
        colorOption: state.colorOption,
        deliverySpeed: state.deliverySpeed,
      });
      return {
        fileName,
        activeGeometry: geometry,
        baseDimensions: dimensions,
        baseVolumeCm3: volumeCm3,
        selectedPresetId: presetId,
        priceBreakdown: breakdown,
      };
    });
  },

  setScaleFactor: (scaleFactor) => {
    set((state) => ({
      scaleFactor,
      priceBreakdown: calculatePrintPrice({
        baseVolumeCm3: state.baseVolumeCm3,
        baseDimensions: state.baseDimensions,
        scaleFactor,
        material: state.material,
        colorOption: state.colorOption,
        deliverySpeed: state.deliverySpeed,
      }),
    }));
  },

  setMaterial: (material) => {
    set((state) => ({
      material,
      priceBreakdown: calculatePrintPrice({
        baseVolumeCm3: state.baseVolumeCm3,
        baseDimensions: state.baseDimensions,
        scaleFactor: state.scaleFactor,
        material,
        colorOption: state.colorOption,
        deliverySpeed: state.deliverySpeed,
      }),
    }));
  },

  setColorOption: (colorOption) => {
    set((state) => ({
      colorOption,
      priceBreakdown: calculatePrintPrice({
        baseVolumeCm3: state.baseVolumeCm3,
        baseDimensions: state.baseDimensions,
        scaleFactor: state.scaleFactor,
        material: state.material,
        colorOption,
        deliverySpeed: state.deliverySpeed,
      }),
    }));
  },

  setDeliverySpeed: (deliverySpeed) => {
    set((state) => ({
      deliverySpeed,
      priceBreakdown: calculatePrintPrice({
        baseVolumeCm3: state.baseVolumeCm3,
        baseDimensions: state.baseDimensions,
        scaleFactor: state.scaleFactor,
        material: state.material,
        colorOption: state.colorOption,
        deliverySpeed,
      }),
    }));
  },

  setSpecialInstructions: (specialInstructions) => set({ specialInstructions }),

  // Option B defaults
  cadDescription: '',
  cadTargetDimensions: { x: 80, y: 50, z: 25 },
  cadCustomerNotes: '',
  cadReferenceLinks: '',
  cadReferenceImages: [],
  selectedBenchmarkCardId: 'bench-2',
  cadContactName: '',
  cadContactEmail: '',
  setCadDetails: (details) => set((state) => ({ ...state, ...details })),

  // Checkout defaults
  customer: {
    fullName: '',
    email: '',
    phone: '',
    city: 'Haarlem',
    address: '',
    postalCode: '',
    notes: '',
  },
  setCustomer: (customer) =>
    set((state) => ({ customer: { ...state.customer, ...customer } })),

  selectedPaymentMethod: 'ideal',
  setSelectedPaymentMethod: (selectedPaymentMethod) => set({ selectedPaymentMethod }),

  lastSubmittedOrder: null,
  setLastSubmittedOrder: (lastSubmittedOrder) => set({ lastSubmittedOrder }),

  // Orders
  orders: INITIAL_ORDERS,
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

  submitDirectOrder: () => {
    const s = get();
    const orderId = `ORD-NL-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: CustomerOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      type: 'DIRECT_PRINT',
      status: 'QUOTE_SUBMITTED',
      customer: s.customer,
      paymentMethod: s.selectedPaymentMethod,
      details: {
        fileUrl: '',
        fileName: s.fileName,
        baseDimensions: s.baseDimensions,
        dimensions: s.priceBreakdown.scaledDimensions,
        scaleFactor: s.scaleFactor,
        baseVolumeCm3: s.baseVolumeCm3,
        volumeCm3: s.priceBreakdown.scaledVolumeCm3,
        material: s.material,
        colorOption: s.colorOption,
        colorCount: s.colorOption === 'MULTI' ? 2 : 1,
        deliverySpeed: s.deliverySpeed,
        estimatedWeightGrams: s.priceBreakdown.weightGrams,
        estimatedPrintTimeMinutes: s.priceBreakdown.estimatedPrintTimeMinutes,
        estimatedDeliveryDate: s.priceBreakdown.estimatedDeliveryDate,
        baseSetupFeeEur: s.priceBreakdown.baseSetupFeeEur,
        materialCostEur: s.priceBreakdown.materialCostEur,
        machineCostEur: s.priceBreakdown.machineCostEur,
        colorMultiplier: s.priceBreakdown.colorMultiplier,
        shippingCostEur: s.priceBreakdown.shippingCostEur,
        calculatedPriceEur: s.priceBreakdown.totalPriceEur,
        specialInstructions: s.specialInstructions,
      },
    };

    set((state) => ({
      orders: [newOrder, ...state.orders],
      lastSubmittedOrder: newOrder,
      activeView: 'confirmation',
    }));

    return newOrder;
  },

  submitDesignRequest: () => {
    const s = get();
    const orderId = `REQ-CAD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: CustomerOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      type: 'DESIGN_AND_PRINT',
      status: 'QUOTE_SUBMITTED',
      customer: {
        fullName: s.cadContactName || 'Customer',
        email: s.cadContactEmail || 'customer@example.nl',
        city: 'Haarlem',
        address: 'Haarlem / Amsterdam / Utrecht Area',
      },
      details: {
        referenceImages: s.cadReferenceImages.length > 0 ? s.cadReferenceImages : ['concept_sketch.png'],
        referenceLinks: s.cadReferenceLinks,
        description: s.cadDescription || 'Custom 3D model design from ideas/photos',
        targetDimensions: s.cadTargetDimensions,
        customerNotes: s.cadCustomerNotes,
        estimatedComplexity: 'MEDIUM',
        benchmarkCardId: s.selectedBenchmarkCardId || 'bench-2',
        status: 'PENDING_REVIEW',
        quotedPriceEur: 45.0,
        estimatedTurnaroundDays: 1,
      },
    };

    set((state) => ({
      orders: [newOrder, ...state.orders],
      lastSubmittedOrder: newOrder,
      activeView: 'confirmation',
    }));

    return newOrder;
  },
}));
