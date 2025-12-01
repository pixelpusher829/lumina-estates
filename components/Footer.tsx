import React from 'react';
import { Building2, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../constants';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="container mx-auto px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-white">
                <Logo />
              <span className="text-2xl font-bold tracking-tight">{APP_NAME}</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">
              Redefining luxury real estate. We curate exclusive properties that match your lifestyle, making the search for your dream home effortless.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary-600 text-slate-400 hover:text-white transition-all"><Facebook size={18} /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary-600 text-slate-400 hover:text-white transition-all"><Twitter size={18} /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary-600 text-slate-400 hover:text-white transition-all"><Instagram size={18} /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary-600 text-slate-400 hover:text-white transition-all"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/featured" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block">Properties</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block">About Us</Link></li>
              <li><Link to="/agents" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block">Our Agents</Link></li>
              <li><Link to="/services" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block">Services</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/help" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block">Help Center</Link></li>
              <li><Link to="/faq" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block">FAQ</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block">Contact Us</Link></li>
              <li><Link to="/legal" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block">Terms & Legal</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4">Subscribe to get the latest property news and updates.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-primary-600 hover:bg-primary-500 text-white px-3 rounded-lg transition-colors flex items-center justify-center">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/legal" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/legal" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/featured" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;