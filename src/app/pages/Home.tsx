import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Landmark, Monitor, Shield, ChevronRight, ArrowRight, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.section-reveal').forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out"
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: <Briefcase size={24} className="text-[#D4AF37]" />,
      title: t('service1_title'),
      desc: t('service1_desc'),
      items: [t('service1_item1'), t('service1_item2'), t('service1_item3'), t('service1_item4')]
    },
    {
      icon: <Landmark size={24} className="text-[#D4AF37]" />,
      title: t('service2_title'),
      desc: t('service2_desc'),
      items: [t('service2_item1'), t('service2_item2'), t('service2_item3'), t('service2_item4')]
    },
    {
      icon: <Monitor size={24} className="text-[#D4AF37]" />,
      title: t('service3_title'),
      desc: t('service3_desc'),
      items: [t('service3_item1'), t('service3_item2'), t('service3_item3'), t('service3_item4')]
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#0A1929] text-white font-inter">
      {/* Hero */}
      <section id="home" className="relative h-screen flex items-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover opacity-30"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1929]/50 to-[#0A1929]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-sm font-bold mb-4 block animate-fade-in">
            {t('hero_label')}
          </span>
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-8 max-w-4xl leading-tight">
            {t('hero_title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-wrap gap-6">
            <a href="#servizi" className="bg-[#D4AF37] text-[#0A1929] px-8 py-4 rounded font-bold hover:bg-[#B8962E] transition-all transform hover:-translate-y-1">
              {t('hero_cta_primary')}
            </a>
            <a href="#chi-siamo" className="border-2 border-white px-8 py-4 rounded font-bold hover:bg-white hover:text-[#0A1929] transition-all transform hover:-translate-y-1">
              {t('hero_cta_secondary')}
            </a>
          </div>
        </div>
      </section>

      {/* Chi Siamo */}
      <section id="chi-siamo" className="py-32 px-6 section-reveal">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-[#D4AF37] uppercase tracking-widest text-sm font-bold mb-4 block">{t('about_label')}</span>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-8">{t('about_title')}</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">{t('about_p1')}</p>
            <p className="text-gray-400 mb-10 leading-relaxed">{t('about_p2')}</p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2">
                <span>🌍</span> {t('stat_projects')}
              </div>
              <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2">
                <Shield size={16} className="text-[#D4AF37]" /> {t('stat_partner')}
              </div>
            </div>
          </div>
          
          <div className="bg-[#132F4C] p-10 rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37]">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold">{t('disclaimer_title')}</h3>
            </div>
            <p className="text-gray-400 italic leading-relaxed mb-8">
              {t('disclaimer_text')}
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <CheckCircle size={14} className="text-[#D4AF37]" />
              <span>{t('disclaimer_reg')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Servizi */}
      <section id="servizi" className="py-32 px-6 bg-[#132F4C]/20 section-reveal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[#D4AF37] uppercase tracking-widest text-sm font-bold mb-4 block">{t('services_label')}</span>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">{t('services_title')}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{t('services_subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((svc, idx) => (
              <div key={idx} className="bg-[#0A1929] p-10 rounded-xl border border-white/5 hover:border-[#D4AF37]/50 transition-all group">
                <div className="mb-8 transform group-hover:scale-110 transition-transform duration-300">
                  {svc.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{svc.title}</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">{svc.desc}</p>
                <ul className="space-y-3">
                  {svc.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <ChevronRight size={14} className="text-[#D4AF37]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contatti */}
      <section id="contatti" className="py-32 px-6 section-reveal">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="text-[#D4AF37] uppercase tracking-widest text-sm font-bold mb-4 block">{t('contact_label')}</span>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-8">{t('contact_title')}</h2>
            <p className="text-gray-400 mb-12">{t('contact_desc')}</p>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-[#D4AF37] shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37] mb-2">{t('contact_address_label')}</h4>
                  <p className="text-gray-300">128 City Road, London, EC1V 2NX UK</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37] mb-2">{t('contact_phone_label')}</h4>
                  <p className="text-gray-300">+39 376 2811814</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37] mb-2">{t('contact_email_label')}</h4>
                  <p className="text-gray-300">Info@hedogroup.co.uk</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-10 rounded-2xl shadow-2xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{t('form_name')}</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[#0A1929] focus:outline-none focus:border-[#D4AF37]" placeholder="Mario Rossi" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{t('form_email')}</label>
                  <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[#0A1929] focus:outline-none focus:border-[#D4AF37]" placeholder="mario@esempio.it" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{t('form_message')}</label>
                <textarea rows={5} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[#0A1929] focus:outline-none focus:border-[#D4AF37]" placeholder="Come possiamo aiutarti?"></textarea>
              </div>
              <button className="w-full bg-[#0A1929] text-white py-4 rounded-lg font-bold hover:bg-[#132F4C] transition-all flex items-center justify-center gap-2">
                {t('form_submit')} <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
