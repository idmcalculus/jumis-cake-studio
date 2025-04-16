
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="bg-brand-orange py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to Order Your Perfect Cake?</h2>
        <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
          Whether it's a custom cake for a special event or delicious pastries for your next gathering,
          we're here to create something memorable.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-brand-orange hover:bg-brand-gray-100">
            <Link to="/products">Browse Products</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
