import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LANG, Lang, LanguageContext, STORAGE_KEY } from './context';
import { STRINGS } from './strings';

const isLang = (value: unknown): value is Lang => value === 'sv' || value === 'en';

/* Read once, synchronously, so the first paint is already in the right language
   -- switching after mount would flash Swedish at an English visitor. Storage
   can throw in private-mode browsers, hence the try/catch. */
const initialLang = (): Lang => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    /* storage unavailable -- fall through to the default */
  }
  // No stored choice means Swedish, deliberately: the browser's own language is
  // not consulted, so a first-time visitor always lands on the shop's language.
  return DEFAULT_LANG;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(initialLang);

  // Screen readers and the browser's own translation prompt key off this.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* a preference we cannot persist is still worth applying for this visit */
    }
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, t: STRINGS[lang] }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
