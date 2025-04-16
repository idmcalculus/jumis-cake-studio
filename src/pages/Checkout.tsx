
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CartItem, OrderSummary } from "@/utils/types";
import { calculateOrderSummary } from "@/utils/priceCalculator";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx'); // Replace with your Stripe publishable key

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [summary, setSummary] = useState<OrderSummary>({
    subtotal: 0,
    discount: 0,
    discountPercentage: 0,
    total: 0
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    sameAsShipping: true,
    paymentMethod: "card",
    deliveryMethod: "standard",
    deliveryDate: "",
    specialInstructions: ""
  });
  
  // Load cart items from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart: CartItem[] = JSON.parse(savedCart);
      if (parsedCart.length === 0) {
        // Redirect to cart if empty
        navigate('/cart');
        return;
      }
      setCartItems(parsedCart);
      setSummary(calculateOrderSummary(parsedCart));
    } else {
      navigate('/cart');
    }
  }, [navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      sameAsShipping: checked
    });
  };
  
  const handlePaymentMethodChange = (value: string) => {
    setFormData({
      ...formData,
      paymentMethod: value
    });
  };
  
  const handleDeliveryMethodChange = (value: string) => {
    setFormData({
      ...formData,
      deliveryMethod: value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // In a real app, you'd validate the form and process payment
    // Here we'll simulate payment processing
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear the cart
      localStorage.removeItem('cart');
      
      // Redirect to success page
      navigate('/success');
    } catch (error) {
      console.error("Payment processing error:", error);
      setIsProcessing(false);
      // In a real app, you'd show an error message
    }
  };
  
  // Calculate total items
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <Layout>
      <div className="bg-brand-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              asChild
            >
              <Link to="/cart">
                <ArrowLeft className="h-4 w-4" />
                Back to Cart
              </Link>
            </Button>
          </div>
          
          <h1 className="text-3xl font-bold text-brand-gray-700 mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main checkout form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {/* Shipping Information */}
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-brand-gray-700 mb-4">Shipping Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="postcode">Postcode</Label>
                        <Input
                          id="postcode"
                          name="postcode"
                          value={formData.postcode}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center space-x-2">
                      <Checkbox
                        id="sameAsShipping"
                        checked={formData.sameAsShipping}
                        onCheckedChange={handleCheckboxChange}
                      />
                      <Label htmlFor="sameAsShipping">Billing address is the same as shipping address</Label>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Delivery Options */}
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-brand-gray-700 mb-4">Delivery Options</h2>
                    
                    <RadioGroup
                      value={formData.deliveryMethod}
                      onValueChange={handleDeliveryMethodChange}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between border p-4 rounded-md">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="cursor-pointer">
                            <div>
                              <p className="font-medium">Standard Delivery</p>
                              <p className="text-sm text-brand-gray-500">3-5 business days</p>
                            </div>
                          </Label>
                        </div>
                        <p className="text-brand-orange font-medium">Free</p>
                      </div>
                      
                      <div className="flex items-center justify-between border p-4 rounded-md">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="cursor-pointer">
                            <div>
                              <p className="font-medium">Express Delivery</p>
                              <p className="text-sm text-brand-gray-500">1-2 business days</p>
                            </div>
                          </Label>
                        </div>
                        <p className="text-brand-orange font-medium">£5.99</p>
                      </div>
                      
                      <div className="flex items-center justify-between border p-4 rounded-md">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pickup" id="pickup" />
                          <Label htmlFor="pickup" className="cursor-pointer">
                            <div>
                              <p className="font-medium">Store Pickup</p>
                              <p className="text-sm text-brand-gray-500">Ready in 24 hours</p>
                            </div>
                          </Label>
                        </div>
                        <p className="text-brand-orange font-medium">Free</p>
                      </div>
                    </RadioGroup>
                    
                    <div className="mt-4 space-y-2">
                      <Label htmlFor="deliveryDate">Preferred Delivery/Pickup Date</Label>
                      <Input
                        id="deliveryDate"
                        name="deliveryDate"
                        type="date"
                        value={formData.deliveryDate}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
                      <textarea
                        id="specialInstructions"
                        name="specialInstructions"
                        value={formData.specialInstructions}
                        onChange={handleChange}
                        className="w-full min-h-[100px] p-2 border border-brand-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      ></textarea>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Payment Method */}
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-brand-gray-700 mb-4">Payment Method</h2>
                    
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={handlePaymentMethodChange}
                      className="space-y-3"
                    >
                      <div className="flex items-center border p-4 rounded-md">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="cursor-pointer">
                            <div>
                              <p className="font-medium">Credit / Debit Card</p>
                              <p className="text-sm text-brand-gray-500">Visa, Mastercard, American Express</p>
                            </div>
                          </Label>
                        </div>
                      </div>
                      
                      <div className="flex items-center border p-4 rounded-md">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="cursor-pointer">
                            <div>
                              <p className="font-medium">PayPal</p>
                              <p className="text-sm text-brand-gray-500">Pay with your PayPal account</p>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                    
                    {/* For this demo, we'll simulate payment processing */}
                    {/* In a real app, you would integrate with Stripe Elements or use PayPal SDK */}
                    {formData.paymentMethod === 'card' && (
                      <div className="mt-4 p-4 border border-brand-gray-200 rounded-md bg-brand-gray-50">
                        <p className="text-brand-gray-500 text-sm">
                          In a production environment, this would be replaced with a secure credit card form.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Button
                  type="submit"
                  className="w-full bg-brand-orange hover:bg-brand-orange/90 text-lg py-6"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : `Complete Order: £${summary.total.toFixed(2)}`}
                </Button>
              </form>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-brand-gray-700 mb-4">Order Summary</h2>
                  
                  {/* Order details */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-brand-gray-600">
                      <p>Items ({totalItems})</p>
                      <p>£{summary.subtotal.toFixed(2)}</p>
                    </div>
                    
                    {summary.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <p>Discount ({summary.discountPercentage}%)</p>
                        <p>-£{summary.discount.toFixed(2)}</p>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-brand-gray-600">
                      <p>Shipping</p>
                      <p>{formData.deliveryMethod === 'express' ? '£5.99' : 'Free'}</p>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-semibold text-lg text-brand-gray-700">
                      <p>Total</p>
                      <p>£{(summary.total + (formData.deliveryMethod === 'express' ? 5.99 : 0)).toFixed(2)}</p>
                    </div>
                  </div>
                  
                  {/* Order items */}
                  <div className="mt-6">
                    <h3 className="font-medium text-brand-gray-700 mb-2">Items in your order</h3>
                    <ul className="space-y-3">
                      {cartItems.map((item, index) => (
                        <li key={index} className="flex py-3 border-b border-brand-gray-200 last:border-b-0">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-brand-gray-700">{item.name}</p>
                            <p className="text-xs text-brand-gray-500 mt-1">
                              Qty: {item.quantity}
                            </p>
                            <p className="text-sm text-brand-orange mt-1">£{item.totalPrice.toFixed(2)}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
