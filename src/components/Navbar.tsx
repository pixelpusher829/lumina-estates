import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Heart, Menu, X, Phone } from 'lucide-react';
import { APP_NAME } from '../data/constants';
import Logo from './Logo';

interface NavbarProps {
  favoritesCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ favoritesCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Featured', path: '/featured' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
            <Logo />
          <span className={`text-xl font-bold tracking-tight ${isScrolled || location.pathname !== '/' ? 'text-slate-900' : 'text-slate-900 lg:text-white'}`}>
            {APP_NAME}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              className={`text-sm font-medium transition-colors ${
                 isScrolled || location.pathname !== '/' 
                  ? 'text-slate-600 hover:text-primary-700' 
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 text-primary-700 font-semibold px-4 py-2 bg-primary-50 rounded-full text-sm">
            <Phone size={16} />
            <span>+1 (800) 123-4567</span>
          </div>
          <button className={`relative p-2 transition-colors ${
              isScrolled || location.pathname !== '/' 
              ? 'text-slate-600 hover:text-rose-500' 
              : 'text-white/80 hover:text-rose-500'
          }`}>
             <Heart size={24} />
             {favoritesCount > 0 && (
               <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white text-[10px] flex items-center justify-center rounded-full">
                 {favoritesCount}
               </span>
             )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`lg:hidden p-2 ${
            isScrolled || location.pathname !== '/' ? 'text-slate-800' : 'text-slate-800 lg:text-white'
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 shadow-xl flex flex-col gap-4 lg:hidden">
          {navLinks.map((link) => (
             <Link key={link.name} to={link.path} className="text-lg font-medium text-slate-800">{link.name}</Link>
          ))}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
             <span className="text-sm text-slate-500">Favorites ({favoritesCount})</span>
             <Link to="/contact" className="text-primary-700 font-bold">Contact Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;