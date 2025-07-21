import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Whatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 md:px-16 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">BeginYatra</h2>
          <p className="text-sm">
            Discover amazing destinations and plan your perfect trip with
            BeginYatra. Your adventure starts here.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms & Conditons
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                {" "}
                Privancy Policy{" "}
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <a
              href="mailto:info@beginyatra.com"
              className="flex items-center gap-2"
            >
              <Mail className="w-4 h-4" /> info@beginyatra.com
            </a>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Delhi, India
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/Beginyatra?mibextid=ZbWKwL">
              <Facebook className="w-5 h-5 hover:text-white" />
            </a>
            <a href="https://www.instagram.com/beginyatra?igsh=YnlnOXExYWluY25h">
              <Instagram className="w-5 h-5 hover:text-white" />
            </a>
            {/* <a href="#">
              <Twitter className="w-5 h-5 hover:text-white" />
            </a>
            <a href="#">
              <Youtube className="w-5 h-5 hover:text-white" />
            </a> */}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BeginYatra. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
