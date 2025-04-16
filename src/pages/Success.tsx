
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const Success = () => {
  // In a real app, you might want to fetch order details or verify payment status
  useEffect(() => {
    // You could make API calls here to verify order status
    // This is where you might also track a conversion or send confirmation emails
  }, []);
  
  return (
    <Layout>
      <div className="bg-brand-gray-100 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-brand-gray-700 mt-4">Thank You for Your Order!</h1>
            <p className="text-xl text-brand-gray-600 mt-2">Your order has been placed successfully.</p>
            
            <div className="mt-8 bg-brand-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-brand-gray-700 mb-2">Order Details</h2>
              <div className="space-y-2 text-brand-gray-600">
                <p>Order ID: <span className="font-medium">#ORD-{Math.floor(100000 + Math.random() * 900000)}</span></p>
                <p>Date: <span className="font-medium">{new Date().toLocaleDateString()}</span></p>
                <p>A confirmation email has been sent to your email address.</p>
              </div>
            </div>
            
            <div className="mt-8 p-6 rounded-lg border border-brand-orange/30 bg-brand-orange/5">
              <h2 className="text-lg font-semibold text-brand-gray-700 mb-2">What's Next?</h2>
              <p className="text-brand-gray-600">
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
