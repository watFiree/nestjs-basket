import * as i18next from 'i18next';
import enTranslations from './en';
import plTranslations from './pl'

enum LangCode {
  en = 'en',
  pl = 'pl'
}

const languageCode = process.env.LANG_CODE || LangCode.en;

i18next.init<LangCode>({
  lng: languageCode,
  resources: {
    [LangCode.en]: {
      translation: enTranslations,
    },
    [LangCode.pl]: {
      translation: plTranslations,
    },
  },

});

export default i18next;

export const translate = (key: string, options?: i18next.TOptions) =>
  i18next.t(key, options);
