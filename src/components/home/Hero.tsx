import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                <span className="block text-foreground">Delicious</span>
                <span className="block text-brand-orange">Handcrafted Cakes</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Premium quality, beautifully crafted cakes and pastries for all occasions. From celebration cakes to wedding masterpieces, we create unforgettable sweet experiences.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild className="bg-brand-orange hover:bg-brand-orange/90">
                  <Link to="/products">
                    Browse Products
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <img
                  className="w-full rounded-xl shadow-2xl aspect-[4/3] object-cover"
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="A delicious chocolate cake with drip decoration"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
