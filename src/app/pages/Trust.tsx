import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Plus, X, Shield, CheckCircle2, Star, Globe, BarChart3, Clock, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Trust: React.FC = () => {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const phrases = [
    t('indicator_phrase1'),
    t('indicator_phrase2'),
    t('indicator_phrase3'),
    t('indicator_phrase4'),
    t('indicator_phrase5')
  ];

  // Real-time indicator rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [phases.length]);

  // GSAP Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Section Reveal
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

      // Testimonial Cards Stagger
      gsap.from('.testimonial-card', {
        scrollTrigger: {
          trigger: '.testimonials-grid',
          start: "top 80%"
        },
        opacity: 0,
        scale: 0.95,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Infinite Carousel Animation
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let xPos = 0;
    const speed = 0.5;
    let animationId: number;

    const animate = () => {
      xPos -= speed;
      if (Math.abs(xPos) >= carousel.scrollWidth / 2) {
        xPos = 0;
      }
      carousel.style.transform = `translateX(${xPos}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const faqs = [
    { q: t('faq1_q'), a: t('faq1_a') },
    { q: t('faq2_q'), a: t('faq2_a') },
    { q: t('faq3_q'), a: t('faq3_a') },
    { q: t('faq4_q'), a: t('faq4_a') },
    { q: t('faq5_q'), a: t('faq5_a') },
    { q: t('faq6_q'), a: t('faq6_a') },
  ];

  const badges = [
    { name: "ISO 27001", desc: t('badge1_desc') },
    { name: "SOC2 Type II", desc: t('badge2_desc') },
    { name: "Partner AWS", desc: t('badge3_desc') },
    { name: "Member of ICC", desc: t('badge4_desc') },
    { name: "GDPR Compliant", desc: t('badge5_desc') },
    { name: "UN Global Compact", desc: t('badge6_desc') },
  ];

  return (
    <div ref={containerRef} className="bg-[#0A1929] text-white pt-24 min-h-screen font-inter">
      
      {/* Real-Time Indicator */}
      <div className="fixed top-24 right-4 z-50 group">
        <div className="bg-[#0A1929]/80 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="animate-pulse text-green-400">●</span>
            <span className="transition-opacity duration-500">{phases[phraseIndex]}</span>
          </div>
          <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-300 mt-0 group-hover:mt-2 text-xs text-[#D4AF37]">
            {t('indicator_detail')}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">{t('trust_hero_title')}</h1>
          <p className="text-xl text-gray-400">{t('trust_hero_subtitle')}</p>
        </div>
      </section>

      {/* 1. Testimonianze Video */}
      <section className="py-20 px-6 section-reveal">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-[#D4AF37] uppercase tracking-widest text-sm font-bold block mb-2">{t('testimonials_label')}</span>
            <h2 className="text-4xl font-playfair font-bold">{t('testimonials_title')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 testimonials-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="testimonial-card bg-[#132F4C] rounded-xl overflow-hidden border border-white/5 group">
                <div className="aspect-video bg-gray-800 flex items-center justify-center relative cursor-pointer">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-[#0A1929] transition-all duration-300">
                    <Play fill="currentColor" size={24} />
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold">{t(`test${i}_name` as any)}</h4>
                  <p className="text-sm text-gray-400 mb-3">{t(`test${i}_role` as any)}</p>
                  <div className="flex text-[#D4AF37]">
                    {[...Array(5)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. FAQ Accordion */}
      <section className="py-20 px-6 bg-[#132F4C]/30 section-reveal">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#D4AF37] uppercase tracking-widest text-sm font-bold block mb-2">{t('faq_label')}</span>
            <h2 className="text-4xl font-playfair font-bold">{t('faq_title')}</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-white/10">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full py-6 flex justify-between items-center text-left hover:text-[#D4AF37] transition-colors"
                >
                  <span className="text-lg font-semibold">{faq.q}</span>
                  <span className={`transform transition-transform duration-300 ${openFaq === idx ? 'rotate-45 text-[#D4AF37]' : ''}`}>
                    <Plus size={24} />
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openFaq === idx ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                  <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Carosello Certificazioni */}
      <section className="py-20 px-6 section-reveal overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#D4AF37] uppercase tracking-widest text-sm font-bold block mb-2">{t('badges_label')}</span>
            <h2 className="text-4xl font-playfair font-bold">{t('badges_title')}</h2>
          </div>
          
          <div className="relative">
            <div ref={carouselRef} className="flex gap-8 whitespace-nowrap">
              {[...badges, ...badges].map((badge, idx) => (
                <div key={idx} className="inline-block bg-white/5 border border-white/10 px-8 py-10 rounded-lg min-w-[220px] text-center relative group cursor-help">
                  <span className="text-xl font-black text-[#D4AF37]">{badge.name}</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 p-3 bg-white text-[#0A1929] text-xs rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                    {badge.desc}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Trust;
