import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="bg-gray-800 text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full warm-gradient"></div>
              <span className="text-xl font-serif font-semibold">
                Daily Love Wellness
              </span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Experience tranquility and rejuvenation through our premium IV
              therapy and essential oil wellness services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1 md:justify-self-center">
            <h3 className="font-serif font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                >
                  Services
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/reviews"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                >
                  Reviews
                </Link>
              </li> */}
              <li>
                <Link
                  to="/contact"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-1 md:justify-self-center">
            <h3 className="font-serif font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-primary-foreground/80 text-sm">
                IV Drip Therapy
              </li>
              <li className="text-primary-foreground/80 text-sm">
                Essential Oils
              </li>
              <li className="text-primary-foreground/80 text-sm">
                Wellness Consultation
              </li>
              <li className="text-primary-foreground/80 text-sm">
                Relaxation Sessions
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1 md:justify-self-center">
            <h3 className="font-serif font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary-foreground/60" />
                <span className="text-primary-foreground/80 text-sm">
                  12, Jalan SS 21/39, Damansara Utama, 47400 Petaling Jaya,
                  Selangor
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary-foreground/60" />
                <span className="text-primary-foreground/80 text-sm">
                  +6013-959 9476
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-foreground/60" />
                <span className="text-primary-foreground/80 text-sm">
                  dailylovewellness@gmail.com
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3 mt-4">
              <a
                href="https://www.instagram.com/dailylovewellness/"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-smooth"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61562437705616"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-smooth"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {year} Daily Love Wellness. All rights reserved. | Crafted with
            care by Bitnovate Labs Solutions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
