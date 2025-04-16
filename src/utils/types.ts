
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  price: number; // Base price
  available: boolean;
  featured?: boolean;
}

export interface CakeProduct extends Product {
  cakeType: 'round' | 'square' | 'heart' | 'custom';
  baseSizeInches: number;
  maxLayers: number;
  flavors: string[];
  frostings?: string[];
  decorOptions?: string[];
}

export interface PastryProduct extends Product {
  sizes?: {
    small?: { available: boolean; price: number };
    midi?: { available: boolean; price: number };
    large?: { available: boolean; price: number };
  };
  packQuantity?: number;
}

export interface CartItem {
  productId: string;
  name: string;
  imageUrl: string;
  quantity: number;
  basePrice: number;
  totalPrice: number;
  customizations: {
    shape?: 'round' | 'square' | 'heart' | 'custom';
    size?: number | string;
    layers?: number;
    flavor?: string;
    frosting?: string;
    decorations?: string;
    packSize?: string;
  };
}

export interface OrderSummary {
  subtotal: number;
  discount: number;
  discountPercentage: number;
  total: number;
}
