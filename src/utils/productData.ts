
import { CakeProduct, PastryProduct } from './types';

export const CAKE_PRODUCTS: CakeProduct[] = [
  {
    id: 'cake-1',
    name: 'Classic Vanilla Celebration Cake',
    description: 'A delicious vanilla cake perfect for birthdays and celebrations. Customize the size, layers, and decorations to suit your event.',
    category: 'cakes',
    imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 15, // Base price for 6-inch round
    available: true,
    featured: true,
    cakeType: 'round',
    baseSizeInches: 6,
    maxLayers: 4,
    flavors: ['Vanilla', 'Chocolate', 'Red Velvet', 'Lemon', 'Strawberry'],
    frostings: ['Buttercream', 'Cream Cheese', 'Chocolate Ganache', 'Fondant'],
    decorOptions: ['Sprinkles', 'Fresh Fruit', 'Chocolate Shavings', 'Custom Message']
  },
  {
    id: 'cake-2',
    name: 'Chocolate Fudge Cake',
    description: 'Rich chocolate cake with fudge filling, perfect for chocolate lovers. Available in round or square shape.',
    category: 'cakes',
    imageUrl: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 15, // Base price for 6-inch round
    available: true,
    cakeType: 'round',
    baseSizeInches: 6,
    maxLayers: 4,
    flavors: ['Chocolate', 'Dark Chocolate', 'Chocolate Mint'],
    frostings: ['Chocolate Ganache', 'Chocolate Buttercream', 'Fondant'],
    decorOptions: ['Chocolate Shavings', 'Chocolate Curls', 'Custom Message']
  },
  {
    id: 'cake-3',
    name: 'Wedding Cake',
    description: 'Elegant multi-tiered cake for your special day. Available in different flavors and custom decorations.',
    category: 'cakes',
    imageUrl: 'https://images.unsplash.com/photo-1622896784083-cc051313dbab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 100, // Base price for wedding cake
    available: true,
    featured: true,
    cakeType: 'round',
    baseSizeInches: 8,
    maxLayers: 4,
    flavors: ['Vanilla', 'Chocolate', 'Red Velvet', 'Lemon', 'Champagne', 'Almond'],
    frostings: ['Buttercream', 'Fondant', 'Cream Cheese'],
    decorOptions: ['Fresh Flowers', 'Edible Pearls', 'Gold Leaf', 'Custom Message']
  },
  {
    id: 'cake-4',
    name: 'Heart-Shaped Red Velvet Cake',
    description: 'Beautiful heart-shaped red velvet cake, perfect for anniversaries and Valentine\'s Day.',
    category: 'cakes',
    imageUrl: 'https://images.unsplash.com/photo-1605807646983-377bc5a76493?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 20, // Base price for 6-inch heart
    available: true,
    cakeType: 'heart',
    baseSizeInches: 6,
    maxLayers: 3,
    flavors: ['Red Velvet'],
    frostings: ['Cream Cheese', 'Buttercream', 'Fondant'],
    decorOptions: ['Hearts', 'Roses', 'Custom Message']
  },
  {
    id: 'cake-5',
    name: 'Square Corporate Cake',
    description: 'Professional square cake perfect for corporate events. Can be customized with company logo.',
    category: 'cakes',
    imageUrl: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 20, // Base price for 6-inch square
    available: true,
    cakeType: 'square',
    baseSizeInches: 6,
    maxLayers: 3,
    flavors: ['Vanilla', 'Chocolate', 'Red Velvet', 'Lemon'],
    frostings: ['Buttercream', 'Fondant'],
    decorOptions: ['Company Logo', 'Corporate Colors', 'Custom Message']
  }
];

export const PASTRY_PRODUCTS: PastryProduct[] = [
  {
    id: 'pastry-1',
    name: 'Meat Pie',
    description: 'Savory pie filled with seasoned minced meat and vegetables. Available in small, midi, and large sizes.',
    category: 'meat-pies',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 1, // Base price for small
    available: true,
    featured: true,
    sizes: {
      small: { available: true, price: 1 },
      midi: { available: true, price: 1.5 },
      large: { available: true, price: 2 }
    }
  },
  {
    id: 'pastry-2',
    name: 'Puff-Puff',
    description: 'Sweet, deep-fried dough balls. Sold in packs of 5.',
    category: 'puff-puffs',
    imageUrl: 'https://images.unsplash.com/photo-1506459225024-1428097a7e18?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 1, // Price per pack
    available: true,
    packQuantity: 5
  },
  {
    id: 'pastry-3',
    name: 'Sausage Roll',
    description: 'Delicious pastry with savory sausage filling. Available in midi and large sizes.',
    category: 'sausage-rolls',
    imageUrl: 'https://images.unsplash.com/photo-1626078541669-54e16a0200fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 1, // Base price for midi
    available: true,
    featured: true,
    sizes: {
      midi: { available: true, price: 1 },
      large: { available: true, price: 1.5 }
    }
  }
];

export const ALL_PRODUCTS = [...CAKE_PRODUCTS, ...PASTRY_PRODUCTS];

// Helper functions
export function getProductById(id: string) {
  return ALL_PRODUCTS.find(product => product.id === id);
}

export function getProductsByCategory(category: string) {
  return ALL_PRODUCTS.filter(product => product.category === category || category === 'all');
}

export function getFeaturedProducts() {
  return ALL_PRODUCTS.filter(product => product.featured);
}
