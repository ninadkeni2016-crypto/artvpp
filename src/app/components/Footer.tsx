import React from 'react';
import logo from '../../assets/logo.png';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src={logo}
                alt="KALAVPP"
                className="h-12 w-auto object-contain bg-white/90 rounded-md px-2 py-1"
              />
            </div>
            <p className="text-sm mb-4">
              Digital Trade of Creative Products & Services. Your marketplace for art, creativity, and learning.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('artists')} className="hover:text-white transition-colors">
                  Artists
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('vendor-onboarding')} className="hover:text-white transition-colors">
                  Become an Artist
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('marketplace-physical')} className="hover:text-white transition-colors">
                  Physical Art
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('marketplace-digital')} className="hover:text-white transition-colors">
                  Digital Art
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services-custom')} className="hover:text-white transition-colors">
                  Custom Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learn-workshops')} className="hover:text-white transition-colors">
                  Workshops
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Connected</h3>
            <ul className="space-y-3 text-sm mb-4">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@kalavpp.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 7249764799</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
            <div>
              <p className="text-sm mb-2">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
                <Button className="bg-purple-600 hover:bg-purple-700">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; 2026 KALAVPP. All rights reserved.</p>
          <div className="flex gap-6">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Terms of Service</button>
            <button className="hover:text-white transition-colors">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
