import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Heart,
  BookOpen,
} from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="bg-gray-800 text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="/dailylove_footer.png"
                alt="Daily Love Logo"
                className="h-auto w-4/5 sm:w-4/5 max-w-2xl"
              />
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Experience tranquility and rejuvenation through our proven IV
              therapy and essential oil wellness services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1 md:ml-16">
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
          {/* <div className="md:col-span-1 md:justify-self-center">
            <h3 className="font-serif font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-primary-foreground/80 text-sm">
                IV Drip Therapy
              </li>
            </ul>
          </div> */}

          {/* Products */}
          <div className="md:col-span-1 md:ml-10">
            <h3 className="font-serif font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    navigate("/products");
                    setTimeout(() => {
                      const element = document.getElementById("essential-oils");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }, 100);
                  }}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm text-left w-full"
                >
                  Essential Oils
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/products");
                    setTimeout(() => {
                      const element = document.getElementById("cas-skincare");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }, 100);
                  }}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm text-left w-full"
                >
                  CAS Water Booster
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="font-serif font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-primary-foreground/60 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm leading-relaxed">
                  12, Jalan SS 21/39, Damansara Utama, 47400 Petaling Jaya,
                  Selangor
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary-foreground/60 mr-2" />
                <span className="text-primary-foreground/80 text-sm">
                  +6013-959 9476
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-foreground/60 mr-2" />
                <span className="text-primary-foreground/80 text-sm">
                  dailylovewellness@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Social Links */}
        <div className="flex items-center justify-center sm:justify-start space-x-8 sm:space-x-4 mt-10 sm:mt-0">
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
          <a
            href="https://www.xiaohongshu.com/user/profile/6698dff7000000000f03628d?xsec_token=ABnGnnkLNnys7DQOI7SK4Nc5ENH4mUv-J3La-7gkGDeq8%3D&xsec_source=pc_search"
            className="text-primary-foreground/60 hover:text-primary-foreground transition-smooth"
            aria-label="Xiao Hong Shu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/xiaohongshu.svg"
              alt="Xiao Hong Shu"
              className="h-12 w-12 filter brightness-0 invert opacity-60 hover:opacity-100 transition-opacity"
            />
          </a>
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
