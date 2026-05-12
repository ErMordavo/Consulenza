import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Briefcase,
  Landmark,
  Monitor,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Shield,
  ChevronRight,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   SCROLL REVEAL HOOK + COMPONENT
───────────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const navLinks = [
  { name: 'Home', id: 'home' },
  { name: 'Chi Siamo', id: 'chi-siamo' },
  { name: 'Servizi', id: 'servizi' },
  { name: 'Contatti', id: 'contatti' },
];

const services = [
  {
    icon: <Briefcase size={22} strokeWidth={1.5} />,
    title: 'Consulting',
    subtitle: 'Supporto strategico per operazioni complesse e mercati internazionali.',
    items: [
      'Strategic Advisory',
      'International Operations',
      'Risk & Compliance Management',
      'Project Structuring',
      'Governance & Accountability',
    ],
  },
  {
    icon: <Landmark size={22} strokeWidth={1.5} />,
    title: 'Financial',
    subtitle: 'Consulenza finanziaria indipendente per transazioni e pagamenti internazionali.',
    items: [
      'Transaction Structuring',
      'Financial Transaction Advisory',
      'Risk & Compliance Advisory',
      'Advisory on International Payment',
      'Assistance in documentation and readiness',
    ],
  },
  {
    icon: <Monitor size={22} strokeWidth={1.5} />,
    title: 'IT Industry',
    subtitle: 'Gestione e ottimizzazione di progetti tecnologici su scala globale.',
    items: [
      'Project Structuring & Management',
      'Operations Optimization',
      'Risk & Compliance Oversight',
      'International Partnerships',
      'Strategic Advisory',
    ],
  },
];

/* ─────────────────────────────────────────────
   APP
───────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('success');
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setFormStatus('idle'), 6000);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="text-[#1A2B45] antialiased">
      {/* GLOBAL STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');
        html { scroll-behavior: smooth; }

        *:focus-visible {
          outline: 2px solid #2B6B9F;
          outline-offset: 3px;
          border-radius: 4px;
        }

        .nav-link {
          position: relative;
          padding-bottom: 2px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1.5px;
          background: #2B6B9F;
          transition: width 0.22s ease;
        }
        .nav-link:hover::after { width: 100%; }

        .btn-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0B1F3B;
          color: #fff;
          padding: 14px 32px;
          border-radius: 4px;
          font-weight: 500;
          font-size: 0.95rem;
          letter-spacing: 0.01em;
          transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          border: none;
        }
        .btn-cta:hover {
          background: #2B6B9F;
          transform: scale(1.025);
          box-shadow: 0 8px 24px rgba(43,107,159,0.25);
        }

        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #0B1F3B;
          padding: 13px 32px;
          border-radius: 4px;
          font-weight: 500;
          font-size: 0.95rem;
          border: 1.5px solid #0B1F3B;
          transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
          cursor: pointer;
        }
        .btn-outline:hover {
          background: #0B1F3B;
          color: #fff;
          transform: scale(1.025);
        }

        .service-card {
          background: #fff;
          border: 1px solid #E2EAF4;
          border-radius: 8px;
          padding: 40px 36px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(11,31,59,0.10);
        }

        .input-field {
          width: 100%;
          padding: 13px 16px;
          border: 1.5px solid #D1DCE8;
          border-radius: 4px;
          background: #F9FAFB;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: #1A2B45;
          transition: border-color 0.25s ease, background 0.25s ease;
          outline: none;
        }
        .input-field:focus {
          border-color: #2B6B9F;
          background: #fff;
        }
        .input-field::placeholder { color: #9BADC0; }

        .whatsapp-btn:hover { transform: scale(1.1); }
        .whatsapp-btn { transition: transform 0.3s ease; }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu-anim { animation: fadeInDown 0.22s ease; }

        .stat-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #EEF4FB;
          border-radius: 100px;
          padding: 8px 18px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #2B6B9F;
          letter-spacing: 0.01em;
        }

        .section-label {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #2B6B9F;
          margin-bottom: 16px;
        }
      `}</style>

      {/* ── HEADER ── */}
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          transition: 'background 0.35s ease, box-shadow 0.35s ease, padding 0.35s ease',
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
          boxShadow: scrolled ? '0 1px 24px rgba(11,31,59,0.08)' : 'none',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          padding: scrolled ? '0' : '0',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: scrolled ? 68 : 80, transition: 'height 0.35s ease' }}>
            {/* Logo */}
            <button
              onClick={() => scrollTo('home')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              aria-label="Torna in cima"
            >
              <span style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: scrolled ? '#0B1F3B' : '#fff',
                letterSpacing: '-0.01em',
                transition: 'color 0.3s ease',
              }}>
                Hedo <span style={{ fontWeight: 300 }}>Consulting</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden-mobile">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="nav-link"
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '0.875rem', fontWeight: 500,
                    color: scrolled ? '#1A2B45' : 'rgba(255,255,255,0.88)',
                    transition: 'color 0.2s ease',
                    fontFamily: "'Inter', sans-serif",
                    padding: '4px 0',
                  }}
                >
                  {link.name}
                </button>
              ))}
              <button className="btn-cta" onClick={() => scrollTo('contatti')} style={{ padding: '10px 24px', fontSize: '0.85rem' }}>
                Contattaci
              </button>
            </nav>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: scrolled ? '#0B1F3B' : '#fff',
                display: 'none',
                padding: 4,
              }}
              className="show-mobile"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="mobile-menu-anim show-mobile"
            style={{
              background: '#fff',
              borderTop: '1px solid #E8EDF5',
              padding: '8px 0 20px',
              boxShadow: '0 12px 32px rgba(11,31,59,0.10)',
            }}
          >
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '14px 32px', background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '0.9rem', fontWeight: 500, color: '#1A2B45',
                  fontFamily: "'Inter', sans-serif",
                  borderBottom: '1px solid #F0F4F9',
                }}
              >
                {link.name}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Responsive nav style */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .hero-title { font-size: 2.4rem !important; }
          .hero-sub { font-size: 1rem !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; text-align: center; }
          .footer-links { justify-content: center !important; }
          .section-pad { padding: 72px 24px !important; }
          .hero-section { min-height: 85vh !important; padding: 100px 24px 60px !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section
        id="home"
        className="hero-section"
        style={{
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'center',
          padding: '120px 32px 80px',
          background: 'linear-gradient(135deg, #0B1F3B 0%, #1A3A6B 50%, #2B6B9F 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle geometric decoration */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: 600, height: 600,
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '10%', right: '8%',
          width: 380, height: 380,
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-15%', left: '-8%',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(43,107,159,0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.14)',
              color: 'rgba(255,255,255,0.75)',
              fontSize: '0.72rem', fontWeight: 600,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              padding: '7px 16px', borderRadius: 100,
              marginBottom: 32,
            }}>
              Consulenza Indipendente · Londra, UK
            </div>

            <h1
              className="hero-title"
              style={{
                fontSize: '3.6rem', fontWeight: 700,
                color: '#fff', lineHeight: 1.15,
                letterSpacing: '-0.025em', marginBottom: 24,
              }}
            >
              Trasformiamo le sfide in{' '}
              <span style={{ color: '#93C5FD', fontWeight: 300 }}>opportunità</span>
            </h1>

            <p
              className="hero-sub"
              style={{
                fontSize: '1.1rem', fontWeight: 300,
                color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.75, marginBottom: 44,
                maxWidth: 520,
              }}
            >
              Consulenza indipendente per operazioni internazionali e progetti complessi. Guidiamo la tua azienda con integrità, visione e precisione.
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button className="btn-cta" onClick={() => scrollTo('contatti')}
                style={{ background: '#fff', color: '#0B1F3B' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#93C5FD';
                  (e.currentTarget as HTMLButtonElement).style.color = '#0B1F3B';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#fff';
                  (e.currentTarget as HTMLButtonElement).style.color = '#0B1F3B';
                }}
              >
                Parla con un consulente <ArrowRight size={16} />
              </button>
              <button className="btn-outline"
                onClick={() => scrollTo('servizi')}
                style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.85)', background: 'transparent' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.5)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.3)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.85)';
                }}
              >
                Scopri i servizi
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', letterSpacing: '0.1em',
        }}>
          <div style={{
            width: 1, height: 48,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
          }} />
        </div>
      </section>

      {/* ── CHI SIAMO ── */}
      <section id="chi-siamo" className="section-pad" style={{ padding: '108px 32px', background: '#F5F7FA' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>

            {/* Left column */}
            <Reveal>
              <span className="section-label">Chi Siamo</span>
              <h2 style={{ fontSize: '2.1rem', fontWeight: 700, color: '#0B1F3B', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 24 }}>
                Un partner indipendente al tuo fianco
              </h2>
              <p style={{ fontSize: '1rem', fontWeight: 300, color: '#4B5D72', lineHeight: 1.85, marginBottom: 20 }}>
                <strong style={{ fontWeight: 600, color: '#0B1F3B' }}>Hedo Consulting Ltd</strong> supporta progetti complessi e operazioni internazionali con integrità, precisione ed esperienza. Come advisor indipendenti, trasformiamo le sfide in opportunità strutturate, enfatizzando trasparenza, compliance e partnership di lungo termine.
              </p>
              <p style={{ fontSize: '1rem', fontWeight: 300, color: '#4B5D72', lineHeight: 1.85, marginBottom: 36 }}>
                Ogni mandato è affrontato con rigore analitico e profonda conoscenza dei mercati internazionali, garantendo soluzioni concrete e misurabili per le esigenze di ogni cliente.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <span className="stat-badge">
                  <span style={{ fontSize: '1rem' }}>🌍</span> 10+ Progetti Internazionali
                </span>
                <span className="stat-badge">
                  <Shield size={14} /> Partner Indipendente
                </span>
              </div>
            </Reveal>

            {/* Right column — disclaimer */}
            <Reveal delay={150}>
              <div style={{
                background: '#fff',
                borderRadius: 8,
                padding: '36px 40px',
                border: '1px solid #E2EAF4',
                boxShadow: '0 4px 24px rgba(11,31,59,0.05)',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  marginBottom: 20, paddingBottom: 20,
                  borderBottom: '1px solid #EEF2F8',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: '#EEF4FB', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#2B6B9F', flexShrink: 0,
                  }}>
                    <Shield size={16} />
                  </div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0B1F3B', margin: 0 }}>
                    Informativa Importante
                  </h3>
                </div>
                <p style={{
                  fontSize: '0.875rem', fontWeight: 300, fontStyle: 'italic',
                  color: '#5A6E84', lineHeight: 1.85, margin: 0,
                }}>
                  Hedo Consulting Ltd fornisce <em style={{ fontStyle: 'normal', fontWeight: 500, color: '#0B1F3B' }}>esclusivamente servizi di consulenza e supporto</em>. Non svolge attività finanziarie regolamentate né detiene, gestisce o processa fondi dei clienti. I servizi sono forniti in qualità di advisor indipendente, nel rispetto delle normative vigenti in materia di consulenza professionale nel Regno Unito e nelle giurisdizioni in cui opera.
                </p>
                <div style={{
                  marginTop: 24, paddingTop: 20,
                  borderTop: '1px solid #EEF2F8',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <CheckCircle2 size={14} style={{ color: '#2B6B9F', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.78rem', color: '#8A9BB0', letterSpacing: '0.01em' }}>
                    Registrata in England and Wales · 128 City Road, London
                  </span>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── SERVIZI ── */}
      <section id="servizi" className="section-pad" style={{ padding: '108px 32px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ marginBottom: 64 }}>
              <span className="section-label">Aree di Competenza</span>
              <h2 style={{ fontSize: '2.1rem', fontWeight: 700, color: '#0B1F3B', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 16, maxWidth: 480 }}>
                I Nostri Servizi
              </h2>
              <p style={{ fontSize: '1rem', fontWeight: 300, color: '#4B5D72', lineHeight: 1.75, maxWidth: 520 }}>
                Soluzioni su misura per affrontare le sfide del mercato globale attraverso un approccio analitico, strutturato e orientato ai risultati.
              </p>
            </div>
          </Reveal>

          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {services.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 120}>
                <div className="service-card" style={{ height: '100%' }}>
                  {/* Icon */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 8,
                    background: '#EEF4FB', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#2B6B9F', marginBottom: 24,
                  }}>
                    {svc.icon}
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0B1F3B', marginBottom: 10, letterSpacing: '-0.01em' }}>
                    {svc.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', fontWeight: 300, color: '#4B5D72', lineHeight: 1.7, marginBottom: 24 }}>
                    {svc.subtitle}
                  </p>

                  <div style={{ width: 32, height: 1, background: '#D0DCE8', marginBottom: 24 }} />

                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {svc.items.map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <ChevronRight size={14} style={{ color: '#2B6B9F', flexShrink: 0, marginTop: 3 }} />
                        <span style={{ fontSize: '0.875rem', fontWeight: 400, color: '#4B5D72', lineHeight: 1.55 }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTATTI ── */}
      <section id="contatti" className="section-pad" style={{ padding: '108px 32px', background: '#F5F7FA' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <span className="section-label" style={{ marginBottom: 8 }}>Contatti</span>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 700, color: '#0B1F3B', letterSpacing: '-0.02em', marginBottom: 56 }}>
              Parliamo del tuo progetto
            </h2>
          </Reveal>

          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 40, alignItems: 'start' }}>

            {/* Info */}
            <Reveal>
              <div style={{
                background: '#0B1F3B', borderRadius: 8,
                padding: '44px 40px',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: -60, right: -60,
                  width: 200, height: 200,
                  background: 'radial-gradient(circle, rgba(43,107,159,0.4) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>
                  Hedo Consulting Ltd
                </h3>
                <p style={{ fontSize: '0.85rem', fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 36 }}>
                  Siamo a disposizione per discutere le tue esigenze e trovare le migliori soluzioni per il tuo business.
                </p>

                {[
                  {
                    icon: <MapPin size={16} />,
                    label: 'Sede Legale',
                    value: '128 City Road\nLondon, EC1V 2NX UK',
                  },
                  {
                    icon: <Phone size={16} />,
                    label: 'Telefono',
                    value: '+39 376 2811814',
                  },
                  {
                    icon: <Mail size={16} />,
                    label: 'Email',
                    value: 'Info@hedogroup.co.uk',
                  },
                  {
                    icon: <Clock size={16} />,
                    label: 'Orari di apertura',
                    value: 'Monday to Friday\n09:00 – 18:00 (GMT)\nClosed during UK Public Holidays',
                  },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 6,
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#93C5FD', flexShrink: 0, marginTop: 2,
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: '0.72rem', fontWeight: 600, color: '#93C5FD', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>
                        {item.label}
                      </p>
                      {item.value.split('\n').map((line, li) => (
                        <p key={li} style={{ fontSize: '0.875rem', fontWeight: 300, color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.7 }}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={120}>
              <div style={{
                background: '#fff', borderRadius: 8,
                padding: '44px 44px',
                border: '1px solid #E2EAF4',
                boxShadow: '0 4px 24px rgba(11,31,59,0.05)',
              }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0B1F3B', marginBottom: 28 }}>
                  Inviaci un messaggio
                </h3>

                {formStatus === 'success' && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    background: '#F0FDF4', border: '1px solid #BBF7D0',
                    borderRadius: 6, padding: '14px 18px', marginBottom: 28,
                  }}>
                    <CheckCircle2 size={18} style={{ color: '#16A34A', flexShrink: 0 }} />
                    <p style={{ fontSize: '0.875rem', color: '#166534', margin: 0, fontWeight: 400 }}>
                      Richiesta ricevuta — ti contatteremo entro 24h lavorative.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label htmlFor="name" style={{ display: 'block', fontSize: '0.78rem', fontWeight: 500, color: '#4B5D72', marginBottom: 8, letterSpacing: '0.02em' }}>
                        Nome Completo *
                      </label>
                      <input type="text" id="name" required className="input-field" placeholder="Mario Rossi" />
                    </div>
                    <div>
                      <label htmlFor="email" style={{ display: 'block', fontSize: '0.78rem', fontWeight: 500, color: '#4B5D72', marginBottom: 8, letterSpacing: '0.02em' }}>
                        Indirizzo Email *
                      </label>
                      <input type="email" id="email" required className="input-field" placeholder="mario@esempio.it" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" style={{ display: 'block', fontSize: '0.78rem', fontWeight: 500, color: '#4B5D72', marginBottom: 8, letterSpacing: '0.02em' }}>
                      Azienda
                    </label>
                    <input type="text" id="company" className="input-field" placeholder="Nome dell'azienda (opzionale)" />
                  </div>

                  <div>
                    <label htmlFor="message" style={{ display: 'block', fontSize: '0.78rem', fontWeight: 500, color: '#4B5D72', marginBottom: 8, letterSpacing: '0.02em' }}>
                      Messaggio *
                    </label>
                    <textarea
                      id="message" required rows={5} className="input-field"
                      placeholder="Descrivi brevemente la tua esigenza o il progetto su cui cerchi supporto..."
                      style={{ resize: 'none', fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-cta"
                    style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
                  >
                    Invia messaggio <ArrowRight size={16} />
                  </button>

                  <p style={{ fontSize: '0.75rem', color: '#9BADC0', textAlign: 'center', marginTop: 4 }}>
                    I dati inviati saranno trattati nel rispetto del GDPR. Non condividiamo le tue informazioni con terzi.
                  </p>
                </form>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0B1F3B', padding: '56px 32px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 40, paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            {/* Brand */}
            <div>
              <div style={{ marginBottom: 16 }}>
                <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
                  Hedo <span style={{ fontWeight: 300 }}>Consulting</span>
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, maxWidth: 280 }}>
                Consulenza indipendente per operazioni internazionali e progetti complessi. Basati a Londra, attivi a livello globale.
              </p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 100, padding: '7px 16px', marginTop: 20,
                fontSize: '0.72rem', fontWeight: 500, color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.04em',
              }}>
                ✦ Member of UK Consulting Association
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 style={{ fontSize: '0.72rem', fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
                Navigazione
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {navLinks.map(link => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      textAlign: 'left', padding: 0,
                      fontSize: '0.875rem', fontWeight: 300, color: 'rgba(255,255,255,0.55)',
                      fontFamily: "'Inter', sans-serif",
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div>
              <h4 style={{ fontSize: '0.72rem', fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
                Contatti
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: <MapPin size={13} />, text: '128 City Road, London EC1V 2NX' },
                  { icon: <Phone size={13} />, text: '+39 376 2811814' },
                  { icon: <Mail size={13} />, text: 'Info@hedogroup.co.uk' },
                ].map(item => (
                  <div key={item.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ color: '#2B6B9F', flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                    <span style={{ fontSize: '0.825rem', fontWeight: 300, color: 'rgba(255,255,255,0.50)', lineHeight: 1.5 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingTop: 28, flexWrap: 'wrap', gap: 12,
          }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 300, color: 'rgba(255,255,255,0.28)', margin: 0 }}>
              © 2025 Hedo Consulting Ltd — Tutti i diritti riservati
            </p>
            <p style={{ fontSize: '0.78rem', fontWeight: 300, color: 'rgba(255,255,255,0.28)', margin: 0 }}>
              Company registered in England and Wales
            </p>
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP BUTTON ── */}
      <a
        href="https://wa.me/393762811814?text=Salve%2C%20vorrei%20maggiori%20informazioni%20sui%20servizi%20di%20consulenza%20di%20Hedo%20Consulting"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        aria-label="Contattaci su WhatsApp"
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 200,
          width: 56, height: 56, borderRadius: '50%',
          background: '#25D366',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 24px rgba(37,211,102,0.35)',
          color: '#fff',
          textDecoration: 'none',
        }}
      >
        <MessageCircle size={26} fill="#fff" strokeWidth={0} />
        {/* Tooltip */}
        <span style={{
          position: 'absolute', right: 64,
          background: '#fff',
          color: '#1A2B45',
          fontSize: '0.78rem', fontWeight: 500,
          padding: '7px 14px', borderRadius: 6,
          boxShadow: '0 4px 16px rgba(11,31,59,0.12)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.2s ease',
        }} className="wa-tooltip">
          Scrivici su WhatsApp
        </span>
        <style>{`
          .whatsapp-btn:hover .wa-tooltip { opacity: 1 !important; }
          .whatsapp-btn::before {
            content: '';
            position: absolute;
            width: 56px; height: 56px;
            border-radius: 50%;
            background: rgba(37,211,102,0.3);
            animation: pulse-wa 2s ease-out infinite;
          }
          @keyframes pulse-wa {
            0% { transform: scale(1); opacity: 0.5; }
            100% { transform: scale(1.65); opacity: 0; }
          }
        `}</style>
      </a>

    </div>
  );
}
