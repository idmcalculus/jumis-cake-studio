import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CartItem, OrderSummary } from "@/utils/types";
import { calculateOrderSummary } from "@/utils/priceCalculator";
import { Trash2, ShoppingBag } from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [summary, setSummary] = useState<OrderSummary>({
    subtotal: 0,
    discount: 0,
    discountPercentage: 0,
    total: 0
  });
  
  const navigate = useNavigate();
  
  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart: CartItem[] = JSON.parse(savedCart);
      setCartItems(parsedCart);
      // Calculate summary
      setSummary(calculateOrderSummary(parsedCart));
    }
  }, []);
  
  // Remove item from cart
  const removeItem = (index: number) => {
    const newCart = [...cartItems];
    const removedItem = newCart[index];
    newCart.splice(index, 1);
    setCartItems(newCart);
    
    // Show toast for removed item
    toast.success(`${removedItem.name} removed from cart`);
    
    // Dispatch custom event for cart update
    window.dispatchEvent(new Event('cartUpdated'));
  };
  
  // Update item quantity
  const updateQuantity = (index: number, quantity: number) => {
    if (quantity < 1) return;
    
    const newCart = [...cartItems];
    const item = newCart[index];
    newCart[index].quantity = quantity;
    // Recalculate total price
    const baseItemPrice = newCart[index].totalPrice / newCart[index].quantity;
    newCart[index].totalPrice = baseItemPrice * quantity;
    
    setCartItems(newCart);
    
    // Show toast for quantity update
    toast.success(`${item.name} quantity updated to ${quantity}`);
    
    // Dispatch custom event for cart update
    window.dispatchEvent(new Event('cartUpdated'));
  };
  
  // Proceed to checkout
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  return (
    <Layout>
      <div className="bg-brand-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-brand-gray-700 mb-8">Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <ShoppingBag className="mx-auto h-16 w-16 text-brand-gray-400 mb-4" />
              <h2 className="text-2xl font-bold text-brand-gray-700 mb-2">Your cart is empty</h2>
              <p className="text-brand-gray-500 mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button asChild className="bg-brand-orange hover:bg-brand-orange/90">
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-6 border-b border-brand-gray-200">
                    <h2 className="text-xl font-semibold text-brand-gray-700">
                      {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                    </h2>
                  </div>
                  
                  <ul className="divide-y divide-brand-gray-200">
                    {cartItems.map((item, index) => (
                      <li key={index} className="p-6">
                        <div className="flex flex-col sm:flex-row">
                          {/* Item image */}
                          <div className="w-full sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          
                          {/* Item details */}
                          <div className="sm:ml-6 flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-lg font-medium text-brand-gray-700">{item.name}</h3>
                                
                                {/* Customizations */}
                                <div className="mt-1 text-sm text-brand-gray-500">
                                  {item.customizations.size && (
                                    <p>Size: {item.customizations.size}</p>
                                  )}
                                  {item.customizations.layers && (
                                    <p>Layers: {item.customizations.layers}</p>
                                  )}
                                  {item.customizations.flavor && (
                                    <p>Flavor: {item.customizations.flavor}</p>
                                  )}
                                  {item.customizations.frosting && (
                                    <p>Frosting: {item.customizations.frosting}</p>
                                  )}
                                  {item.customizations.packSize && (
                                    <p>Size: {item.customizations.packSize}</p>
                                  )}
                                </div>
                              </div>
                              
                              <p className="text-lg font-medium text-brand-orange">
                                £{item.totalPrice.toFixed(2)}
                              </p>
                            </div>
                            
                            <div className="mt-4 flex justify-between items-center">
                              {/* Quantity control */}
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  className="p-1 rounded-full border border-brand-gray-300 hover:bg-brand-gray-100"
                                  onClick={() => updateQuantity(index, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <span className="sr-only">Decrease quantity</span>
                                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                  </svg>
                                </button>
                                <span className="mx-2 text-brand-gray-600 w-8 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  className="p-1 rounded-full border border-brand-gray-300 hover:bg-brand-gray-100"
                                  onClick={() => updateQuantity(index, item.quantity + 1)}
                                >
                                  <span className="sr-only">Increase quantity</span>
                                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                </button>
                              </div>
                              
                              {/* Remove button */}
                              <button
                                type="button"
                                className="text-brand-gray-400 hover:text-brand-gray-600"
                                onClick={() => removeItem(index)}
                              >
                                <Trash2 className="h-5 w-5" />
                                <span className="sr-only">Remove item</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow p-6 sticky top-20">
                  <h2 className="text-xl font-semibold text-brand-gray-700 mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 text-brand-gray-600">
                    <div className="flex justify-between">
                      <p>Subtotal</p>
                      <p>£{summary.subtotal.toFixed(2)}</p>
                    </div>
                    
                    {summary.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <p>Discount ({summary.discountPercentage}%)</p>
                        <p>-£{summary.discount.toFixed(2)}</p>
                      </div>
                    )}
                    
                    <div className="border-t border-brand-gray-200 pt-3 flex justify-between font-bold text-brand-gray-700">
                      <p>Total</p>
                      <p>£{summary.total.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  {summary.discount > 0 && (
                    <div className="mt-4 p-3 bg-green-50 text-green-700 text-sm rounded-md">
                      <p>You're saving £{summary.discount.toFixed(2)} with our bulk discount!</p>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <Button
                      className="w-full bg-brand-orange hover:bg-brand-orange/90"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                    
                    <Button
                      asChild
                      variant="outline"
                      className="w-full mt-3"
                    >
                      <Link to="/products">Continue Shopping</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
