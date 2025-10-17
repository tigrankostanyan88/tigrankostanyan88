import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '../locales/en/translation.json';
import ru from '../locales/ru/translation.json';
import hy from '../locales/hy/translation.json';

const translations: { [key: string]: any } = { en, ru, hy };

type TranslationValue = string | { [key: string]: string };

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (keyOrObject: TranslationValue, options?: { [key: string]: string | number | boolean }) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<string>('hy');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    const browserLanguage = navigator.language.split('-')[0];
    if (storedLanguage) {
      setLanguageState(storedLanguage);
    } else if (translations[browserLanguage]) {
      setLanguageState(browserLanguage);
    }
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (keyOrObject: TranslationValue, options?: { [key: string]: string | number | boolean }): any => {
    if (typeof keyOrObject === 'object') {
      return keyOrObject[language] || keyOrObject.en || Object.values(keyOrObject)[0] || '';
    }

    const keys = keyOrObject.split('.');
    let result = translations[language];
    for (const k of keys) {
      result = result?.[k];
    }

    if (!result) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Translation key not found: ${keyOrObject}`);
      }
      // Fallback to English
      result = translations.en;
      for (const k of keys) {
        result = result?.[k];
      }
    }

    if (options?.returnObjects) {
      return result;
    }

    if (result && options) {
      Object.keys(options).forEach((k) => {
        result = result.replace(`{{${k}}}`, String(options[k]));
      });
    }
    return result || keyOrObject;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};