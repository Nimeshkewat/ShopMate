import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/60 bg-card pt-12 pb-8 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand & Contact Information */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-bold text-primary">ShopMate</h2>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Your trusted partner for online shopping. Discover amazing products
            with exceptional quality and service.
          </p>
          <div className="space-y-2.5 pt-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
              <a
                href="mailto:support@shopmate.com"
                className="hover:text-primary transition-colors"
              >
                support@shopmate.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
              <a
                href="tel:+910000000000"
                className="hover:text-primary transition-colors"
              >
                +91 (0000000000)
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>India</span>
            </div>
          </div>
        </div>

        {/* Company Column */}
        <div>
          <h3 className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-4">
            Company
          </h3>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link
                to="/about"
                className="hover:text-primary transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Press
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Service Column */}
        <div>
          <h3 className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-4">
            Customer Service
          </h3>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link
                to="/contact"
                className="hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/FAQ" className="hover:text-primary transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Shipping Info
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Returns
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h3 className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-4">
            Legal
          </h3>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms-and-conditions"
                className="hover:text-primary transition-colors"
              >
                Terms and Conditions
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Security
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          © 2026 ShopMate. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Built with care in India 🇮🇳
        </p>
      </div>
    </footer>
  );
};

export default Footer;
