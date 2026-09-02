import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
];

const Header = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // transparent over the hero, frosted once the page moves
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || pathname !== '/';

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        solid ? 'glass' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-sm font-semibold uppercase tracking-[0.3em] text-[rgb(var(--chrome))]"
        >
          Tailor Fantasy
        </Link>

        <nav className="flex items-center gap-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-white/10 text-[rgb(var(--chrome))]'
                    : 'text-[rgb(var(--muted))] hover:text-[rgb(var(--chrome))]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
