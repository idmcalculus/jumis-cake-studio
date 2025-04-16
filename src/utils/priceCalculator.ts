
import { CartItem } from './types';

/**
 * Calculate the price of a cake based on shape, size and layers
 * @param basePrice Base price of the cake
 * @param cakeType Shape of the cake (round, square, heart, custom)
 * @param sizeInches Size of the cake in inches
 * @param layers Number of layers
 * @returns Total price of the cake
 */
export const calculateCakePrice = (
  basePrice: number,
  cakeType: 'round' | 'square' | 'heart' | 'custom',
  sizeInches: number,
  layers: number
): number => {
  // Start with base price for 6-inch
  let price = basePrice;
  
  // Add extra for each inch above 6
  if (sizeInches > 6) {
    price += (sizeInches - 6) * 5;
  }
  
  // Multiply by number of layers
  price *= layers;
  
  // Square/heart/custom cakes have a different base price (£20 instead of £15)
  if (cakeType !== 'round' && price < 20 * layers) {
    price = 20 * layers; // minimum price for non-round cakes
  }
  
  return price;
};

/**
 * Calculate the price of pastry based on size and quantity
 * @param product Pastry product with price info
 * @param size Size of the pastry (small, midi, large)
 * @param quantity Quantity of pastries
 * @returns Total price of the pastry order
 */
export const calculatePastryPrice = (
  basePrice: number,
  size: 'small' | 'midi' | 'large',
  quantity: number,
  sizes?: { [key: string]: { available: boolean; price: number } }
): number => {
  // Use the specific size price if available
  let price = basePrice;
  if (sizes && sizes[size]) {
    price = sizes[size].price;
  }
  
  return price * quantity;
};

/**
 * Calculate the discount for pastry packs
 * @param totalPacks Total number of pastry packs
 * @returns Discount percentage (0-20)
 */
export const calculatePastryDiscount = (totalPacks: number): number => {
  if (totalPacks < 20) {
    return 0; // No discount for less than 20 packs
  }
  
  // 10% base discount for 20 packs, +2.5% for each additional 20 packs
  const baseDiscount = 10;
  const additionalDiscount = Math.floor((totalPacks - 20) / 20) * 2.5;
  
  // Cap the maximum discount at 20%
  return Math.min(baseDiscount + additionalDiscount, 20);
};

/**
 * Calculate order summary with subtotal, discount, and total
 * @param items Cart items
 * @returns Order summary object
 */
export const calculateOrderSummary = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  
  // Count pastry packs for discount calculation
  const pastryPacks = items.reduce((count, item) => {
    // Only count items that have packSize or are from pastry categories
    if (item.customizations.packSize || 
        ['meat-pies', 'puff-puffs', 'sausage-rolls'].includes(item.productId.split('-')[0])) {
      return count + item.quantity;
    }
    return count;
  }, 0);
  
  const discountPercentage = calculatePastryDiscount(pastryPacks);
  const discount = (subtotal * discountPercentage) / 100;
  const total = subtotal - discount;
  
  return {
    subtotal,
    discount,
    discountPercentage,
    total
  };
};
