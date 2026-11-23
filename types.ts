export type Language = 'de' | 'en';

export type AppTheme = 'dark' | 'bright';

export type ProductCategory = 
  | 'all' 
  | 'deals' 
  | 'balls' 
  | 'kurzehose' 
  | 'torwarthose' 
  | 'handschoe' 
  | 'trainingsanzug' 
  | 'hoodies' 
  | 'pullovers' 
  | 'schinbeinschoe' 
  | 'socks'
  | 'shirts' 
  | 'teamwear' 
  | 'accessories';

export type BootSurface = 'FG' | 'SG' | 'TF' | 'IN' | 'MG';

export type BrandName = 
  | 'Nike' 
  | 'adidas' 
  | 'Puma' 
  | 'Jako' 
  | 'Erima' 
  | 'Craft'
  | 'Joma'
  | 'Derbystar' 
  | 'Uhlsport' 
  | 'Sportwelt'
  | 'Precision'
  | 'Torspieler'
  | 'Gripmode'
  | 'Attono';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  germanName: string;
  brand?: BrandName;
  category: 
    | 'balls' 
    | 'kurzehose' 
    | 'torwarthose' 
    | 'handschoe' 
    | 'trainingsanzug' 
    | 'hoodies' 
    | 'pullovers' 
    | 'schinbeinschoe' 
    | 'socks'
    | 'shirts' 
    | 'teamwear' 
    | 'accessories';
  subcategory?: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  galleryImages: string[];
  description: string;
  germanDescription: string;
  sizes: string[];
  colors: ProductColor[];
  inStock: boolean;
  surface?: BootSurface;
  surfaceLabel?: string;
  material?: string;
  minQuantity?: number;
  features: string[];
  germanFeatures: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isDealOfDay?: boolean;
  discountPercentage?: number;
  clubBulkDiscountEligible?: boolean;
}

export type JerseyPattern = 
  | 'stripes-vertical'
  | 'stripes-horizontal'
  | 'geometric-mesh'
  | 'dynamic-sash'
  | 'half-half'
  | 'solid-clean'
  | 'modern-hex'
  | 'gradient-fade';

export type CollarType = 'round' | 'vneck' | 'polo';

export interface JerseyCustomization {
  id: string;
  templateName: string;
  pattern: JerseyPattern;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  collarColor: string;
  collarType: CollarType;
  sleeveTrimColor: string;
  clubName: string;
  clubCrestUrl: string | null;
  clubCrestPreset: string;
  sponsorText: string;
  sponsorLogoUrl: string | null;
  sponsorColor: string;
  playerName: string;
  playerNumber: string;
  numberColor: string;
  numberFont: 'modern' | 'classic' | 'block' | 'athletic';
  sleeveBadge: 'none' | 'dfb-kreisliga' | 'verband' | 'fairplay' | 'sportwelt-pro';
  fabricType: 'pro-breathe' | 'eco-recycled' | 'match-elite';
  quantities: {
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
    gk_m: number;
    gk_l: number;
  };
  unitPrice: number;
  notes?: string;
}

export type DtfTransferFinish = 
  | 'standard-dtf' 
  | 'metallic-gold' 
  | 'metallic-silver' 
  | 'reflective-3m' 
  | 'silicone-3d' 
  | 'neon-glow';

export type DtfTransferMode = 'single' | 'gang-sheet';

export interface DtfTransferItem {
  id: string;
  mode: DtfTransferMode;
  title: string;
  logoUrl: string;
  logoName: string;
  widthCm: number;
  heightCm: number;
  sheetLengthMeters?: number;
  sheetWidthCm?: number;
  finish: DtfTransferFinish;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  itemsOnSheet?: number;
  placementType?: string;
  notes?: string;
}

export interface CartItem {
  id: string;
  productId?: string;
  isCustomKit?: boolean;
  isDtfTransfer?: boolean;
  product?: Product;
  customJersey?: JerseyCustomization;
  dtfTransfer?: DtfTransferItem;
  size?: string;
  color?: string;
  quantity: number;
  totalPrice: number;
}

export interface ClubInquiry {
  clubName: string;
  contactPerson: string;
  email: string;
  phone: string;
  league: string;
  city: string;
  estimatedQuantity: number;
  requestedItemTypes: string[];
  message: string;
  needSampleBox: boolean;
}
