
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brand-gray-600 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-brand-orange">Jumis Cake Studio</h3>
            <p className="mb-4">
              Premium quality, beautifully crafted baked goods tailored to our clients' unique needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-brand-orange">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-brand-orange">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="hover:text-brand-orange">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-brand-orange">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-brand-orange">Products</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-orange">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-orange">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="mb-2">123 Bakery Street</p>
            <p className="mb-2">London, UK</p>
            <p className="mb-2">Phone: +44 123 456 7890</p>
            <p>Email: info@jumiscakestudio.com</p>
          </div>
        </div>

        <div className="border-t border-brand-gray-500 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Jumis Cake Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
