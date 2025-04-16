import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { CartItem } from '@/utils/types'; // Import CartItem type

interface LocationState {
  orderId?: string;
  total?: number;
  items?: CartItem[];
}

const Success: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState | null; // Type assertion for state

  // Validate state
  const isValidState = state && state.orderId && state.total !== undefined && Array.isArray(state.items);

  return (
    <Layout>
      <div className="bg-brand-gray-100 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card text-card-foreground rounded-lg shadow-lg p-8 text-center">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mt-4">Order Confirmed!</h1>
            {isValidState ? (
              <p className="text-xl text-muted-foreground mt-2">Your order ID is <strong>{state.orderId}</strong>. A confirmation email will be sent shortly.</p>
            ) : (
              <p className="text-xl text-muted-foreground mt-2">Thank you for your purchase! If you have any questions, please contact support.</p>
            )}
            
            <div className="mt-8 bg-brand-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-foreground mb-2">Order Summary:</h2>
              {isValidState && state.items && state.items.map((item) => (
                <div key={item.productId} className="flex justify-between items-center text-sm mb-1">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>${item.totalPrice.toFixed(2)}</span>
                </div>
              ))}
              {isValidState && (
                <div className="flex justify-between font-semibold mt-3 border-t pt-2">
                  <span>Total:</span>
                  <span>${state.total?.toFixed(2)}</span>
                </div>
              )}
            </div>
            
            <div className="mt-8 p-6 rounded-lg border border-brand-orange/30 bg-brand-orange/5">
              <h2 className="text-lg font-semibold text-foreground mb-2">What's Next?</h2>
              <p className="text-muted-foreground">
                We're preparing your order with care and attention. You'll receive an email update when your order is ready for delivery or pickup.
              </p>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-brand-orange hover:bg-brand-orange/90">
                <Link to="/">Return to Home</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Success;
