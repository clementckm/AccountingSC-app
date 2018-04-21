// translations/index.js 

import { addLocaleData } from 'react-intl';

import enLocaleData from 'react-intl/locale-data/en';
import zhLocaleData from 'react-intl/locale-data/zh';
import enTranslationMessages from './en.json';
import zhTranslationMessages from './zh.json';

addLocaleData(enLocaleData);
addLocaleData(zhLocaleData);

export const appLocales = [
  'en',
  'zh'
];

const DEFAULT_LOCALE = 'en';

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages) : {};
  const formattedMessages = {};
  const messageKeys = Object.keys(messages);
  for (const messageKey of messageKeys) {
    if (locale === DEFAULT_LOCALE) {
      formattedMessages[messageKey] = messages[messageKey];
    } else {
      formattedMessages[messageKey] = messages[messageKey] || defaultFormattedMessages[messageKey];
    }
  }

  return formattedMessages;
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  zh: formatTranslationMessages('zh', zhTranslationMessages)
};
