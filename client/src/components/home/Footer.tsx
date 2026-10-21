import { Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#EBF4FA] dark:bg-[#16171d] text-[#2C3E50] dark:text-foreground pt-12 pb-16 px-6 md:px-12 lg:px-24 border-t border-transparent dark:border-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand & Contact Information */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-[#0066CC] dark:text-[#c084fc]">
            ShopMate
          </h2>
          <p className="text-sm text-[#5A6A85] dark:text-muted-foreground max-w-sm leading-relaxed">
            Your trusted partner for online shopping. Discover amazing products
            with exceptional quality and service.
          </p>
          <div className="space-y-3 pt-2 text-sm text-[#5A6A85] dark:text-muted-foreground">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#0066CC] dark:text-[#c084fc]" />
              <a
                href="mailto:support@shopmate.com"
                className="hover:underline hover:text-[#0066CC] dark:hover:text-[#c084fc]"
              >
                support@shopmate.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#0066CC] dark:text-[#c084fc]" />
              <a
                href="tel:+15551234567"
                className="hover:underline hover:text-[#0066CC] dark:hover:text-[#c084fc]"
              >
                +1 (555) 123-4567
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#0066CC] dark:text-[#c084fc]" />
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Company Column */}
        <div>
          <h3 className="font-semibold text-sm mb-4 text-[#1A2530] dark:text-gray-200">
            Company
          </h3>
          <ul className="space-y-2 text-sm text-[#5A6A85] dark:text-muted-foreground">
            <li>
              <a
                href="#"
                className="hover:text-[#0066CC] dark:hover:text-[#c084fc] transition-colors"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#0066CC] dark:hover:text-[#c084fc] transition-colors"
              >
                Careers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#0066CC] dark:hover:text-[#c084fc] transition-colors"
              >
                Press
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#0066CC] dark:hover:text-[#c084fc] transition-colors"
              >
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Service Column */}
        <div>
          <h3 className="font-semibold text-sm mb-4 text-[#1A2530] dark:text-gray-200">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm text-[#5A6A85] dark:text-muted-foreground">
            <li>
              <a
                href="#"
                className="hover:text-[#0066CC] dark:hover:text-[#c084fc] transition-colors"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#0066CC] dark:hover:text-[#c084fc] transition-colors"
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#0066CC] dark:hover:text-[#c084fc] transition-colors"
              >
                Shipping Info
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#0066CC] dark:hover:text-[#c084fc] transition-colors"
              >
                Returns
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h3 className="font-semibold text-sm mb-4 text-[#1A2530] dark:text-gray-200">
            Legal
          </h3>
          <ul className="space-y-2 text-sm text-[#5A6A85] dark:text-muted-foreground">
            <li>
              <a
                href="#"
                className="hover:text-[#0066CC] dark:hover:text-[#c084fc] transition-colors"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#0066CC] dark:hover:text-[#c084fc] transition-colors"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#0066CC] dark:hover:text-[#c084fc] transition-colors"
              >
                Cookie Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#0066CC] dark:hover:text-[#c084fc] transition-colors"
              >
                Security
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
