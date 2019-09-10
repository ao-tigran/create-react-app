    
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';
import { isDev } from '../helpers/common';
import en from './translations/en';
import hy from './translations/hy';

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    detection: {
      order: ['localStorage'],
    },
    fallbackLng: 'hy',
    debug: isDev(),

    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: '.',

    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },

    react: {
      wait: true,
    },
  });

i18n.addResourceBundle('en', 'translations', en);
i18n.addResourceBundle('hy', 'translations', hy);
i18n.addResourceBundle('ru', 'translations', ru);

export default i18n;