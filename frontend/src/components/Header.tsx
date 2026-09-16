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
  const [open, setOpen] = useState(false);

  /* `routed: false` marks a same-document anchor. The footer lives outside the
     router's <Routes>, so `#contact` must scroll on the current page rather
     than navigate to the landing page first. `/#faq` is the opposite case: the
     FAQ only exists on the landing page, so it is a real navigation. */
  const items = [
    { to: '/', label: t.nav.home, routed: true },
    { to: '/products', label: t.nav.products, routed: true },
    { to: '/#faq', label: t.nav.faq, routed: true },
    { to: '#contact', label: t.nav.contact, routed: false },
  ];

  // transparent over the hero, frosted once the page moves
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the menu, as a dialog-like popover is expected to.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Leaving the page closes it too -- a menu left open over new content reads
  // as a stuck overlay. Anchor taps close via the items' own onClick.
  useEffect(() => setOpen(false), [pathname, hash]);

  const solid = scrolled || pathname !== '/' || open;

  /* Active state is computed here rather than by NavLink: `/#faq` and `/` share
     a path, so NavLink would light up both. The hash is what separates them.
     `#contact` never matches -- it is a scroll target, not a destination. */
  const isActive = (to: string) => {
    if (to === '/#faq') return pathname === '/' && hash === '#faq';
    if (to === '/') return pathname === '/' && hash !== '#faq';
    if (to === '/products') return pathname.startsWith(to);
    return false;
  };

  const itemClass = (to: string, extra: string) =>
    `rounded-full transition-colors ${extra} ${
      isActive(to)
        ? 'bg-white/10 text-[rgb(var(--chrome))]'
        : 'text-[rgb(var(--muted))] hover:text-[rgb(var(--chrome))]'
    }`;

  const renderItems = (extra: string) =>
    items.map((item) =>
      item.routed ? (
        <Link
          key={item.to}
          to={item.to}
          onClick={() => setOpen(false)}
          className={itemClass(item.to, extra)}
        >
          {item.label}
        </Link>
      ) : (
        <a
          key={item.to}
          href={item.to}
          onClick={() => setOpen(false)}
          className={itemClass(item.to, extra)}
        >
          {item.label}
        </a>
      ),
    );

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        solid ? 'glass' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--chrome))] sm:text-sm sm:tracking-[0.3em]"
        >
          Tailor Fantasy
        </Link>

        {/* Four tabs, a wordmark and a language switch do not fit one phone
            row, so below sm the tabs move into the menu panel instead. */}
        <nav className="ml-auto hidden items-center gap-1 sm:flex">
          {renderItems('px-4 py-2 text-sm')}
        </nav>

        {/* Two codes rather than a dropdown: with only two languages the switch
            is one tap, and the inactive code doubles as the label. It stays out
            of the burger so switching language is never two taps deep. */}
        <div
          role="group"
          aria-label={t.nav.language}
          className="ml-auto flex shrink-0 items-center rounded-full border border-white/10 p-0.5 sm:ml-3"
        >
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setLang(l.code)}
              aria-pressed={lang === l.code}
              lang={l.code}
              className={`rounded-full px-2 py-1 text-[0.7rem] font-medium tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--violet))] sm:px-2.5 sm:text-xs ${
                lang === l.code
                  ? 'bg-[rgb(var(--chrome))] text-[rgb(var(--ink))]'
                  : 'text-[rgb(var(--muted))] hover:text-[rgb(var(--chrome))]'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t.nav.closeMenu : t.nav.menu}
          className="-mr-1 rounded-full p-2 text-[rgb(var(--chrome))] transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--violet))] sm:hidden"
        >
          {/* Three bars folding into a cross: the middle bar fades, the outer
              two rotate onto each other. */}
          <span aria-hidden="true" className="relative block h-4 w-5">
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${
                open ? 'top-1/2 rotate-45' : 'top-0.5'
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 bg-current transition-opacity duration-200 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${
                open ? 'top-1/2 -rotate-45' : 'bottom-0.5'
              }`}
            />
          </span>
        </button>
      </div>

      {/* Tap anywhere below the bar to dismiss. It starts at the header's
          bottom edge so the burger and the language switch stay tappable, and
          comes before the panel in the DOM so the panel paints over it. */}
      {open && (
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="absolute inset-x-0 top-full h-screen bg-black/50 sm:hidden"
        />
      )}

      {/* Kept mounted only while open: an empty panel in the DOM would still be
          reachable by keyboard behind the closed menu. */}
      {open && (
        <nav
          id="mobile-nav"
          className="absolute inset-x-0 top-full flex flex-col gap-1 border-t border-white/[0.06] bg-[rgb(var(--ink-raised))] p-3 shadow-2xl shadow-black/50 sm:hidden"
        >
          {renderItems('px-4 py-3 text-sm')}
        </nav>
      )}
    </header>
  );
};

export default Header;
