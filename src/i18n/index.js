import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from '../locales/en.json';
import translationES from '../locales/es.json';
import translationHT from '../locales/ht.json';
import translationZH from '../locales/zh.json';
import translationFR from '../locales/fr.json';

const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  },
  ht: {
    translation: translationHT
  },
  zh: {
    translation: translationZH
  },
  fr: {
    translation: translationFR
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;