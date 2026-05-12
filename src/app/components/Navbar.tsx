import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: t('nav_home'), path: '/', id: 'home' },
    { name: t('nav_about'), path: '/#chi-siamo', id: 'chi-siamo' },
    { name: t('nav_services'), path: '/#servizi', id: 'servizi' },
    { name: t('nav_trust'), path: '/trust', id: 'trust' },
    { name: t('nav_contact'), path: '/#contatti', id: 'contatti' },
  ];

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        scrolled ? 'py-3 bg-[#0A1929]/80 backdrop-blur-md shadow-lg' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white tracking-tight">
          Hedo <span className="font-light">Consulting</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              onClick={() => link.path.startsWith('/#') && scrollToSection(link.id)}
              className={`text-sm font-medium transition-colors hover:text-[#D4AF37] ${
                location.pathname === link.path ? 'text-[#D4AF37]' : 'text-white/80'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-4 ml-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-xs font-bold border border-white/20 px-2 py-1 rounded hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
            >
              <Globe size={14} />
              {language.toUpperCase()}
            </button>
            <Link 
              to="/#contatti" 
              onClick={() => scrollToSection('contatti')}
              className="bg-[#D4AF37] text-[#0A1929] px-6 py-2 rounded font-bold text-sm hover:bg-[#B8962E] transition-all animate-pulse"
            >
              {t('cta_contact')}
            </Link>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0A1929] border-t border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              onClick={() => {
                setMobileOpen(false);
                if (link.path.startsWith('/#')) scrollToSection(link.id);
              }}
              className="text-lg font-medium text-white/90 hover:text-[#D4AF37]"
            >
              {link.name}
            </Link>
          ))}
          <button 
            onClick={() => { toggleLanguage(); setMobileOpen(false); }}
            className="flex items-center gap-2 text-sm font-bold text-[#D4AF37] mt-2"
          >
            <Globe size={18} />
            {language === 'it' ? 'Switch to English' : 'Passa all\'Italiano'}
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
