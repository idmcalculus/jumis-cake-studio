import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout'; 
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CartItem, OrderSummary } from '@/utils/types'; 
import { calculateOrderSummary } from '@/utils/priceCalculator'; 
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import 'aos/dist/aos.css';
import AOS from 'aos';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [summary, setSummary] = useState<OrderSummary>({
    subtotal: 0,
    discount: 0,
    discountPercentage: 0,
    total: 0,
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    });

    const savedItems = localStorage.getItem('cartItems');
    if (savedItems) {
      try {
        const items: CartItem[] = JSON.parse(savedItems);
        if (
          Array.isArray(items) &&
          items.every((item) => typeof item === 'object' && item !== null && 'productId' in item)
        ) {
          setCartItems(items);
          setSummary(calculateOrderSummary(items));
        } else {
          console.error('Invalid cart items found in localStorage');
          localStorage.removeItem('cartItems'); 
        }
      } catch (error) {
        console.error('Error parsing cart items from localStorage:', error);
        localStorage.removeItem('cartItems'); 
      }
    }
  }, []);

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedItems = [...cartItems];
    const itemToUpdate = updatedItems[index];

    const newTotalPrice = itemToUpdate.basePrice * newQuantity;

    updatedItems[index] = {
      ...itemToUpdate,
      quantity: newQuantity,
      totalPrice: newTotalPrice, 
    };

    setCartItems(updatedItems);
    setSummary(calculateOrderSummary(updatedItems));
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const removeItem = (index: number) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    setSummary(calculateOrderSummary(updatedItems));
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    toast.success('Item removed from cart');
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  return (
    <Layout>
      <div className="bg-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-3xl font-bold text-foreground mb-8" data-aos="fade-up">
            Shopping Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2" data-aos="fade-right">
              <Card>
                <CardContent className="p-6">
                  {cartItems.length > 0 ? (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-foreground mb-4">
                        {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                      </h2>

                      {cartItems.map((item, index) => (
                        <div
                          key={`${item.productId}-${index}`}
                          className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 border-b pb-4 last:border-b-0"
                        >
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border">
                            <img
                              src={item.imageUrl || '/placeholder-image.png'} 
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null; 
                                target.src = '/placeholder-image.png';
                              }}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-medium text-foreground truncate">
                              {item.name}
                            </h3>
                            <div className="mt-1 text-sm text-muted-foreground space-y-1">
                              {Object.entries(item.customizations).map(([key, value]) => (
                                <div key={key} className="capitalize truncate">
                                  <span className="font-medium">{key}:</span> {value}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4 sm:space-x-6 flex-wrap">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(index, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="h-8 w-8"
                                aria-label={`Decrease quantity of ${item.name}`}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span
                                className="w-8 text-center text-sm font-medium"
                                aria-live="polite"
                                aria-atomic="true"
                              >
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(index, item.quantity + 1)}
                                className="h-8 w-8"
                                aria-label={`Increase quantity of ${item.name}`}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="text-right min-w-[80px]">
                              <p className="text-base font-medium text-foreground">
                                £{item.totalPrice.toFixed(2)}
                              </p>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(index)}
                              className="text-destructive hover:text-destructive/90 h-8 w-8"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium text-foreground">
                        Your cart is empty
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Add some delicious treats to get started!
                      </p>
                      <Button
                        onClick={() => navigate('/products')}
                        className="mt-6 bg-brand-orange hover:bg-brand-orange/90 text-white"
                      >
                        Browse Products
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1" data-aos="fade-left">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground font-medium">
                        £{summary.subtotal.toFixed(2)}
                      </span>
                    </div>

                    {summary.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Discount ({summary.discountPercentage}%)
                        </span>
                        <span className="text-green-600 font-medium">
                          -£{summary.discount.toFixed(2)}
                        </span>
                      </div>
                    )}

                    <Separator />

                    <div className="flex justify-between text-base font-semibold">
                      <span className="text-foreground">Total</span>
                      <span className="text-brand-orange">
                        £{summary.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 flex flex-col items-stretch">
                  <Button
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                    className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-medium"
                  >
                    Proceed to Checkout
                  </Button>

                  <Link
                    to="/products"
                    className="block text-center mt-4 text-sm text-primary hover:underline"
                  >
                    Continue Shopping
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart; 
