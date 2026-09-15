import { useContext } from 'react';
import { LanguageContext, LanguageValue } from './context';

export const useLanguage = (): LanguageValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
};

/** Shorthand for the common case of only needing the copy. */
export const useT = () => useLanguage().t;
