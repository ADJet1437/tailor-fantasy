import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Lang } from '../i18n/context';
import { useLanguage } from '../i18n/useLanguage';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'sv', label: 'SV' },
  { code: 'en', label: 'EN' },
];

const Header = () => {
  const { pathname, hash } = useLocation();
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  /* `/#faq` is a section of the landing page, not a route -- Landing scrolls to
     it once its content has loaded (see the hash effect there). */
  const nav = [
    { to: '/', label: t.nav.home },
    { to: '/products', label: t.nav.products },
    { to: '/#faq', label: t.nav.faq },
  ];

  // transparent over the hero, frosted once the page moves
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || pathname !== '/';

  /* Active state is computed here rather than by NavLink: `/#faq` and `/` share a
     path, so NavLink would light up both. The hash is what separates them. */
  const isActive = (to: string) => {
    if (to === '/#faq') return pathname === '/' && hash === '#faq';
    if (to === '/') return pathname === '/' && hash !== '#faq';
    return pathname.startsWith(to);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        solid ? 'glass' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-4">
        <Link
          to="/"
          className="text-sm font-semibold uppercase tracking-[0.3em] text-[rgb(var(--chrome))]"
        >
          Tailor Fantasy
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-full px-3 py-2 text-sm transition-colors sm:px-4 ${
                  isActive(item.to)
                    ? 'bg-white/10 text-[rgb(var(--chrome))]'
                    : 'text-[rgb(var(--muted))] hover:text-[rgb(var(--chrome))]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Two codes rather than a dropdown: with only two languages the
              switch is one tap, and the inactive code doubles as the label. */}
          <div
            role="group"
            aria-label={t.nav.language}
            className="flex items-center rounded-full border border-white/10 p-0.5"
          >
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLang(l.code)}
                aria-pressed={lang === l.code}
                lang={l.code}
                className={`rounded-full px-2.5 py-1 text-xs font-medium tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--violet))] ${
                  lang === l.code
                    ? 'bg-[rgb(var(--chrome))] text-[rgb(var(--ink))]'
                    : 'text-[rgb(var(--muted))] hover:text-[rgb(var(--chrome))]'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
