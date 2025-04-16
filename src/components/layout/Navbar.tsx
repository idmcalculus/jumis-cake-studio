
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-brand-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-brand-orange font-bold text-xl mr-2">Jumis</span>
              <span className="text-brand-gray-600 font-medium text-lg">Cake Studio</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-brand-gray-500 hover:text-brand-orange font-medium">
              Home
            </Link>
            <Link to="/products" className="text-brand-gray-500 hover:text-brand-orange font-medium">
              Products
            </Link>
            <Link to="/about" className="text-brand-gray-500 hover:text-brand-orange font-medium">
              About
            </Link>
            <Link to="/contact" className="text-brand-gray-500 hover:text-brand-orange font-medium">
              Contact
            </Link>
            <Button asChild variant="ghost" className="relative">
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Link>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-gray-500 hover:text-brand-orange"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-gray-500 hover:text-brand-orange"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-gray-500 hover:text-brand-orange"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-gray-500 hover:text-brand-orange"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-gray-500 hover:text-brand-orange"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
