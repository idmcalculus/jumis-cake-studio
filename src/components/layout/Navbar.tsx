import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import "aos/dist/aos.css";
import AOS from "aos";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const isMobile = useIsMobile();

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out'
    });
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        setCartCount(cartItems.length);
      } else {
        setCartCount(0);
      }
    };

    // Initial count
    updateCartCount();

    // Listen for storage changes
    window.addEventListener('storage', updateCartCount);
    
    // Custom event for cart updates
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const mobileMenuItems = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center" data-aos="fade-right">
            <Link to="/" className="flex items-center">
              <span className="text-brand-orange font-bold text-2xl">Jumis</span>
              <span className="text-foreground font-medium text-xl ml-1">Cake Studio</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6" data-aos="fade-left">
            <Link to="/" className="text-foreground hover:text-brand-orange font-medium text-sm uppercase tracking-wide">
              Home
            </Link>
            <Link to="/products" className="text-foreground hover:text-brand-orange font-medium text-sm uppercase tracking-wide">
              Products
            </Link>
            <Link to="/about" className="text-foreground hover:text-brand-orange font-medium text-sm uppercase tracking-wide">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-brand-orange font-medium text-sm uppercase tracking-wide">
              Contact
            </Link>
            <div className="flex items-center space-x-4 ml-2">
              <ThemeToggle />
              <Button asChild variant="ghost" size="icon" className="relative hover:bg-transparent" data-aos="zoom-in" data-aos-delay="200">
                <Link to="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-brand-orange"
                    >
                      {cartCount}
                    </Badge>
                  )}
                  <span className="sr-only">Cart ({cartCount} items)</span>
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  aria-label="Toggle menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[50%] sm:max-w-[50%]">
                <div className="py-4">
                  <div className="flex flex-col space-y-4">
                    {mobileMenuItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="text-foreground hover:text-brand-orange font-medium py-2"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      to="/cart"
                      className="text-foreground hover:text-brand-orange font-medium py-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <ShoppingCart className="h-5 w-5 mr-2" />
                          Cart
                        </div>
                        {cartCount > 0 && (
                          <Badge variant="destructive">{cartCount}</Badge>
                        )}
                      </div>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
