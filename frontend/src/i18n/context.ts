import { createContext } from 'react';
import { STRINGS } from './strings';

export type Lang = 'sv' | 'en';

/** Swedish is the default: the shop is Swedish, English is the fallback. */
export const DEFAULT_LANG: Lang = 'sv';

export const STORAGE_KEY = 'tf.lang';

export interface LanguageValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Copy for the active language. */
  t: typeof STRINGS.en;
}

/* Kept in its own module (no component alongside it) so react-refresh can keep
   fast reload working for the provider. */
export const LanguageContext = createContext<LanguageValue | null>(null);
