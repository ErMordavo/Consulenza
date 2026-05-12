import React, { createContext, useContext, useState, useEffect } from 'react';
import it from '../locales/it.json';
import en from '../locales/en.json';

type Language = 'it' | 'en';
type Translations = typeof it;

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: keyof Translations) => string;
}

const translations: Record<Language, Translations> = { it, en };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('preferredLang');
    return (saved === 'it' || saved === 'en') ? saved : 'it';
  });

  useEffect(() => {
    localStorage.setItem('preferredLang', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'it' ? 'en' : 'it'));
  };

  const t = (key: keyof Translations): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
