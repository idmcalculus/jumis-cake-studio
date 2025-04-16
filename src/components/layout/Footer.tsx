import { Link } from "react-router-dom";
import { SocialIcons } from '@/components/common/SocialIcons'; // Import the new component

const Footer = () => {
  return (
    <footer className="bg-background text-foreground pt-12 pb-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Jumis Cake Studio</h3>
            <p className="text-muted-foreground mb-4">
              Premium quality, beautifully crafted baked goods tailored to our clients' unique needs.
            </p>
            <div className="flex space-x-4">
              {/* Use the SocialIcons component */}
              <SocialIcons />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-[color:var(--brand-orange)]">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[color:var(--brand-orange)]">Products</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[color:var(--brand-orange)]">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[color:var(--brand-orange)]">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Contact Us</h3>
            <p className="text-muted-foreground mb-2">123 Bakery Street</p>
            <p className="text-muted-foreground mb-2">London, UK</p>
            <p className="text-muted-foreground mb-2">Phone: +44 123 456 7890</p>
            <p className="text-muted-foreground">Email: info@jumiscakestudio.com</p>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Jumis Cake Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
