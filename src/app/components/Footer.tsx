import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Shield, Lock, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0A1929] border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link to="/" className="text-xl font-bold text-white mb-6 block">
              Hedo <span className="font-light">Consulting</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs">
              {t('footer_desc')}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <Lock size={14} className="text-[#D4AF37]" />
                <span>{t('footer_secure')}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <Shield size={14} className="text-[#D4AF37]" />
                <span>{t('footer_data')}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <CheckCircle size={14} className="text-[#D4AF37]" />
                <span>✓ ISO 27001</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-8">{t('footer_nav_title')}</h4>
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">{t('nav_home')}</Link>
              <Link to="/#chi-siamo" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">{t('nav_about')}</Link>
              <Link to="/#servizi" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">{t('nav_services')}</Link>
              <Link to="/trust" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">{t('nav_trust')}</Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-8">{t('footer_contact_title')}</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4 text-sm text-gray-400">
                <MapPin size={18} className="text-[#D4AF37] shrink-0" />
                <span>128 City Road, London EC1V 2NX</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <Phone size={18} className="text-[#D4AF37] shrink-0" />
                <span>+39 376 2811814</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <Mail size={18} className="text-[#D4AF37] shrink-0" />
                <span>Info@hedogroup.co.uk</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-xs text-gray-600">
            {t('footer_copy')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
