import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from '@paypal/paypal-js';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/components/ui/use-toast';
import { CartItem } from '@/utils/types';

interface PaymentIntentPayload {
  amount: number;
  currency: string;
  receipt_email: string;
  shipping: {
    name: string;
    address: {
      line1: string;
      city: string;
      postal_code: string;
      country: string;
    };
  };
  metadata?: { [key: string]: string };
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');
const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || '';

const checkoutSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters.' }),
  postalCode: z.string().min(4, { message: 'Postal code must be at least 4 characters.' }),
  country: z.string().min(2, { message: 'Country must be at least 2 characters.' }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const createPaymentIntent = async (payload: PaymentIntentPayload): Promise<{ clientSecret: string }> => {
  console.log('Calling backend to create Stripe Payment Intent with payload:', payload);
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
      throw new Error('Stripe Publishable Key not found. Cannot simulate payment intent.');
  }
  return { clientSecret: 'pi_test_secret_dummy12345_' + Date.now() };
};

const createPaypalOrder = async (amount: number, currency: string): Promise<string> => {
    console.log('Calling backend to create PayPal order:', { amount, currency });
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 'test_paypal_order_id_' + Date.now();
};

const capturePaypalOrder = async (orderId: string): Promise<any> => {
    console.log('Calling backend to capture PayPal order:', { orderId });
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Order captured (simulated)');
    return { status: 'COMPLETED' };
};

const finalizeOrder = async (paymentDetails: any, formData: CheckoutFormValues, cart: CartItem[]): Promise<{ orderId: string }> => {
    console.log('Calling backend to finalize order:', { paymentDetails, formData, cart });
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { orderId: `order_${Date.now()}` };
}

interface StripeFormProps {
  totalAmount: number;
  currency: string;
  formData: CheckoutFormValues | null;
  cart: CartItem[];
  onPaymentSuccess: (details: any) => void;
  onError: (message: string) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
}

const StripeCheckoutForm: React.FC<StripeFormProps> = ({ totalAmount, currency, formData, cart, onPaymentSuccess, onError, isProcessing, setIsProcessing }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleStripeSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements || !formData || isProcessing) {
      if (!formData) {
        onError('Please fill in shipping details first.');
      }
      return;
    }

    setIsProcessing(true);
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      onError('Card details element not found.');
      setIsProcessing(false);
      return;
    }

    try {
      // 1. Create Payment Intent on the backend
      const { clientSecret } = await createPaymentIntent({
        amount: Math.round(totalAmount * 100), // Stripe expects amount in cents
        currency: currency.toLowerCase(),
        receipt_email: formData.email,
        shipping: {
            name: formData.name,
            address: {
                line1: formData.address,
                city: formData.city,
                postal_code: formData.postalCode,
                country: formData.country
            }
        },
        metadata: { cartItems: JSON.stringify(cart.map(item => `${item.productId}x${item.quantity}`)) }
      });

      // 2. Confirm Card Payment on the frontend
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: formData.name,
            email: formData.email,
            address: {
              line1: formData.address,
              city: formData.city,
              postal_code: formData.postalCode,
              country: formData.country,
            },
          },
        },
      });

      if (paymentResult.error) {
        onError(paymentResult.error.message || 'An unexpected error occurred with Stripe.');
        setIsProcessing(false);
      } else {
        if (paymentResult.paymentIntent.status === 'succeeded') {
          console.log('Stripe Payment Succeeded:', paymentResult.paymentIntent);
          // Let the main component handle finalization and navigation
          onPaymentSuccess({ type: 'stripe', details: paymentResult.paymentIntent });
        } else {
          onError(`Payment status: ${paymentResult.paymentIntent.status}`);
          setIsProcessing(false);
        }
      }
    } catch (error: any) {
      console.error('Stripe processing error:', error);
      onError(error.message || 'Failed to process Stripe payment.');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleStripeSubmit}>
      <Label htmlFor="card-element">Card Details</Label>
      <div id="card-element" className="p-3 border rounded-md mt-1 mb-4 bg-background">
          {/* Add appearance API options here if needed */}
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      </div>
      <Button type="submit" disabled={!stripe || isProcessing || !formData} className="w-full">
        {isProcessing ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
      </Button>
       {!formData && <p className="text-red-500 text-sm mt-1">Please fill in shipping details above.</p>}
    </form>
  );
};

const Checkout: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentFormData, setCurrentFormData] = useState<CheckoutFormValues | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, watch } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });
  const formErrors: FieldErrors<CheckoutFormValues> = errors;

  const watchedValues = watch();
  useEffect(() => {
    if (watchedValues && Object.keys(watchedValues).length > 0) {
       setCurrentFormData(watchedValues);
    }
  }, [watchedValues]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      const parsedCart: CartItem[] = JSON.parse(storedCart);
      if (parsedCart.length === 0) {
        toast({ title: 'Your cart is empty.', description: 'Redirecting to products...', variant: 'default' });
        navigate('/products');
        return;
      }
      setCart(parsedCart);
      const total = parsedCart.reduce((sum, item) => sum + item.totalPrice, 0);
      setTotalAmount(total);
    } else {
      toast({ title: 'Your cart is empty.', description: 'Redirecting to products...', variant: 'default' });
      navigate('/products');
    }
    setIsLoading(false);
  }, [navigate, toast]);

  const calculateTotal = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
    return total;
  };

  const handlePaymentSuccess = async (paymentDetails: any) => {
    console.log('Payment successful, finalizing order...');
    if (!currentFormData) {
        toast({ title: 'Error', description: 'Form data is missing.', variant: 'destructive' });
        setIsProcessing(false);
        return;
    }
    try {
        const { orderId } = await finalizeOrder(paymentDetails, currentFormData, cart);

        toast({ title: 'Payment Successful!', description: `Order ${orderId} confirmed.` });
        localStorage.removeItem('cartItems');
        window.dispatchEvent(new Event('cartUpdated'));
        navigate(`/success?orderId=${orderId}`);
    } catch (error: any) {
        console.error('Order finalization failed:', error);
        toast({ title: 'Order Finalization Failed', description: error.message || 'Could not finalize your order. Please contact support.', variant: 'destructive' });
        setIsProcessing(false);
    }
  };

  const handlePaymentError = (message: string) => {
    toast({ title: 'Payment Failed', description: message, variant: 'destructive' });
    setIsProcessing(false);
  };

  const onSubmit: SubmitHandler<CheckoutFormValues> = (data) => {
    console.log('Form submitted:', data);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (cart.length === 0 && !isLoading) {
    return <div>Cart is empty.</div>;
  }

  if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
    return <div>Stripe Publishable Key not found.</div>;
  }
  if (!paypalClientId) {
    return <div>PayPal Client ID not found.</div>;
  }

  const paypalOptions = {
      clientId: paypalClientId,
      currency: 'USD',
      intent: 'capture',
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Enter your delivery details.</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit(onSubmit)} id="shipping-form">
                <CardContent className="space-y-4">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" {...register('name')} />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" {...register('email')} />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" {...register('address')} />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" {...register('city')} />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input id="postalCode" {...register('postalCode')} />
                      {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" {...register('country')} />
                      {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                    </div>
                  </div>
                </CardContent>
              </form>
            </Card>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>Select your payment method.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="stripe" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="stripe">Credit Card (Stripe)</TabsTrigger>
                            <TabsTrigger value="paypal">PayPal</TabsTrigger>
                        </TabsList>

                        {/* Stripe Tab Content */}
                        <TabsContent value="stripe" className="mt-4">
                            <Elements stripe={stripePromise} options={{ /* appearance API options can go here */ }}>
                                <StripeCheckoutForm
                                    totalAmount={totalAmount}
                                    currency={paypalOptions.currency} // Use consistent currency
                                    formData={currentFormData} // Pass validated form data
                                    cart={cart}
                                    onPaymentSuccess={handlePaymentSuccess}
                                    onError={handlePaymentError}
                                    isProcessing={isProcessing}
                                    setIsProcessing={setIsProcessing}
                                />
                            </Elements>
                        </TabsContent>

                        {/* PayPal Tab Content */}
                        <TabsContent value="paypal" className="mt-4">
                            {/* We need currentFormData to exist before showing PayPal buttons */}
                            {!currentFormData && <p className="text-center text-muted-foreground text-sm py-4">Please fill in shipping details above to enable PayPal checkout.</p>}
                            {currentFormData && !isProcessing && (
                                <PayPalButtons
                                    style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay' }}
                                    disabled={isProcessing} // Disable only when processing payment
                                    createOrder={async (data: CreateOrderData, actions: CreateOrderActions) => {
                                        console.log('Creating PayPal order frontend...', { totalAmount });
                                        setIsProcessing(true); // Set processing early

                                        // Ensure form data is still valid (it should be watched)
                                        if (!currentFormData) {
                                             handlePaymentError('Shipping details missing.');
                                             setIsProcessing(false);
                                             throw new Error('Shipping details missing');
                                        }

                                        try {
                                            // Call backend to create the order and get Order ID
                                            const orderId = await createPaypalOrder(totalAmount, paypalOptions.currency);
                                            console.log('PayPal Order ID from backend:', orderId);
                                            if (!orderId) throw new Error('Backend did not return PayPal Order ID.');
                                            return orderId;
                                        } catch (error: any) {
                                            console.error('PayPal createOrder error:', error);
                                            handlePaymentError(error.message || 'Could not initiate PayPal payment.');
                                            setIsProcessing(false); // Reset on error
                                            throw error; // Re-throw to signal PayPal SDK about the failure
                                        }
                                    }}
                                    onApprove={async (data: OnApproveData, actions: OnApproveActions) => {
                                        console.log('PayPal onApprove data:', data);
                                        if (!actions.order) {
                                            handlePaymentError('PayPal order actions not available.');
                                            setIsProcessing(false);
                                            return;
                                        }
                                        // Ensure processing state is true before capture
                                        if (!isProcessing) setIsProcessing(true);
                                        try {
                                            // Server-side capture (preferred):
                                            const captureDetails = await capturePaypalOrder(data.orderID);

                                            console.log('PayPal Capture Details:', captureDetails);
                                            if (captureDetails && captureDetails.status === 'COMPLETED') {
                                                 // Let the main component handle finalization and navigation
                                                 handlePaymentSuccess({ type: 'paypal', details: captureDetails });
                                            } else {
                                                handlePaymentError('PayPal payment capture failed or is pending. Status: ' + (captureDetails?.status || 'Unknown'));
                                                setIsProcessing(false); // Reset on capture failure
                                            }
                                        } catch (error: any) {
                                            console.error('PayPal capture error:', error);
                                            handlePaymentError(error.message || 'Failed to capture PayPal payment.');
                                            setIsProcessing(false); // Reset on capture error
                                        }
                                    }}
                                    onError={(err: any) => { // Added type annotation for err
                                        console.error('PayPal Button error:', err);
                                        const message = typeof err === 'object' && err !== null && 'message' in err ? err.message : 'An error occurred with the PayPal payment.';
                                        handlePaymentError(message);
                                        setIsProcessing(false); // Ensure processing state is reset
                                    }}
                                    onCancel={() => {
                                        console.log('PayPal payment cancelled.');
                                        toast({ title: 'Payment Cancelled', description: 'You cancelled the PayPal payment.', variant: 'default' });
                                        setIsProcessing(false); // Reset processing state on cancel
                                    }}
                                />
                            )}
                            {isProcessing && <p className='text-center mt-4 text-muted-foreground'>Processing Payment...</p>}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                 {cart.map((item) => (
                  <div key={item.productId} className="flex justify-between items-center mb-2 border-b pb-2">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p>${item.totalPrice.toFixed(2)}</p>
                  </div>
                ))}
                <div className="flex justify-between font-semibold text-lg mt-4">
                  <p>Total</p>
                  <p>${totalAmount.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default Checkout;
