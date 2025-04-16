
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 pt-8 pb-8 sm:pt-16 sm:pb-16 md:pt-20 md:pb-20 lg:pt-28 lg:pb-28 xl:pt-32 xl:pb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-brand-gray-700 sm:text-5xl md:text-6xl">
                <span className="block">Delicious</span>{" "}
                <span className="block text-brand-orange">Handcrafted Cakes</span>
              </h1>
              <p className="mt-3 text-base text-brand-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Premium quality, beautifully crafted cakes and pastries for all occasions. From celebration cakes to wedding masterpieces, we create unforgettable sweet experiences.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button asChild className="bg-brand-orange hover:bg-brand-orange/90 w-full">
                    <Link to="/products">
                      Browse Products
                    </Link>
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/contact">
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-12 relative lg:mt-0">
              <div className="mx-auto max-w-md px-4 sm:max-w-xl sm:px-6 lg:px-0 lg:max-w-none">
                <img
                  className="w-full rounded-lg shadow-xl ring-1 ring-brand-gray-100 lg:h-full lg:w-auto lg:max-w-none"
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="A delicious cake from Jumis Cake Studio"
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
