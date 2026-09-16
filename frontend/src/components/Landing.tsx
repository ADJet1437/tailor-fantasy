import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { productApi, mediaUrl, Product } from '../services/api';
import { useT } from '../i18n/useLanguage';
import Butterfly from './Butterfly';

/* Positions echo the reference composition: a large focal butterfly just above
   the horizon, with smaller ones fanning out and receding. */
/* `x` is kept between 18% and 82% so a butterfly's wings never cross the viewport
   edge -- a clipped butterfly renders as a bare body, which reads as a stray bar.
   `hideOnPhone` thins the flock where there is no room. */
const BUTTERFLIES = [
  { x: '50%', y: '13%', size: 68, dur: 1.05, delay: 0,    z: 0,    hue: 0.2, op: 1,    hideOnPhone: false },
  { x: '22%', y: '29%', size: 46, dur: 0.82, delay: 0.35, z: -180, hue: 0.7, op: 0.85, hideOnPhone: false },
  { x: '78%', y: '25%', size: 50, dur: 0.94, delay: 0.6,  z: -120, hue: 0.1, op: 0.9,  hideOnPhone: false },
  { x: '20%',  y: '58%', size: 38, dur: 0.74, delay: 0.15, z: -280, hue: 0.5, op: 0.65, hideOnPhone: true  },
  { x: '80%', y: '55%', size: 40, dur: 0.88, delay: 0.5,  z: -240, hue: 0.8, op: 0.7,  hideOnPhone: true  },
  { x: '26%', y: '80%', size: 40, dur: 0.68, delay: 0.9,  z: -200, hue: 0.3, op: 0.7,  hideOnPhone: false },
  { x: '74%', y: '84%', size: 34, dur: 0.79, delay: 1.2,  z: -300, hue: 0.6, op: 0.6,  hideOnPhone: true  },
];

/* From the insert that ships with every set: thumbnail width at its widest
   point, in millimetres, mapped to the size code. The thumb is the reference
   for the whole set -- one measurement, not ten. */
const SIZES = [
  { width: '14 mm', size: 'XS' },
  { width: '15 mm', size: 'S' },
  { width: '16 mm', size: 'M' },
  { width: '17 mm', size: 'L' },
];

const Landing = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const { hash, key } = useLocation();
  const t = useT();

  useEffect(() => {
    productApi
      .list(200, 0)
      .then((r) => setProducts(r.data))
      .catch((err) => console.error('Error loading products:', err))
      .finally(() => setLoaded(true));
  }, []);

  /* React Router does not act on the hash, so `/#faq` from the header or footer
     is handled here. Waiting for `loaded` matters: the featured grid is empty
     until the request resolves, so scrolling before then lands short of the
     section. `loaded` is also set when the request fails, so a dead API leaves
     the link working rather than inert. `key` is in the deps so clicking FAQ
     again after scrolling away still jumps back -- the hash alone is unchanged
     by that click, but every navigation gets a fresh key. */
  useEffect(() => {
    if (!hash || !loaded) return;
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
  }, [hash, loaded, key]);

  useEffect(() => {
    if (!infoOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setInfoOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [infoOpen]);

  const featured = products.slice(0, 8);

  return (
    <div className="bg-[rgb(var(--ink))]">
      {/* ---------------------------------------------------------------- hero */}
      <section className="grain relative min-h-[92vh] overflow-hidden">
        {/* aurora field */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="aurora left-[-10%] top-[-15%] h-[42rem] w-[42rem]"
            style={{ background: 'rgb(var(--violet) / 0.5)' }}
          />
          <div
            className="aurora right-[-12%] top-[10%] h-[34rem] w-[34rem]"
            style={{ background: 'rgb(var(--rose) / 0.42)', animationDelay: '-7s' }}
          />
          <div
            className="aurora bottom-[-18%] left-[28%] h-[38rem] w-[38rem]"
            style={{ background: 'rgb(var(--cyan) / 0.26)', animationDelay: '-14s' }}
          />
        </div>

        {/* butterfly field -- stationary, wings flapping in place */}
        <div className="perspective-far pointer-events-none absolute inset-0">
          <div className="preserve-3d relative h-full w-full">
            {BUTTERFLIES.map((b, i) => (
              <div
                key={i}
                className={`absolute ${b.hideOnPhone ? 'hidden sm:block' : ''}`}
                style={{
                  left: b.x,
                  top: b.y,
                  opacity: b.op,
                  transform: `translate(-50%, -50%) translateZ(${b.z}px)`,
                }}
              >
                <Butterfly
                  size={b.size}
                  duration={b.dur}
                  delay={b.delay}
                  hue={b.hue}
                  className="origin-center scale-[0.72] sm:scale-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* calls to action over the butterfly field */}
        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
          <div className="animate-rise flex flex-wrap items-center justify-center gap-3 sm:gap-4"
               style={{ animationDelay: '0.28s' }}>
            <Link
              to="/#size"
              className="group relative overflow-hidden rounded-full bg-[rgb(var(--chrome))] px-9 py-3.5 text-sm font-semibold text-[rgb(var(--ink))] transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--violet))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--ink))]"
            >
              {t.hero.checkSize}
            </Link>
            <Link
              to="/#faq"
              className="rounded-full border border-white/15 px-9 py-3.5 text-sm font-medium text-[rgb(var(--chrome))] transition-colors hover:border-white/35 hover:bg-white/5"
            >
              {t.nav.faq}
            </Link>
          </div>

          {/* The size chart sits in the hero itself rather than behind a link:
              picking the wrong width is the one mistake a customer cannot undo
              after the set ships. */}
          <div
            id="size"
            className="animate-rise mt-12 w-full max-w-md scroll-mt-28"
            style={{ animationDelay: '0.42s' }}
          >
            <div className="glass rounded-2xl px-4 py-5 sm:px-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-[rgb(var(--chrome))]">
                  {t.sizing.heading}
                </h2>
                <button
                  type="button"
                  onClick={() => setInfoOpen(true)}
                  aria-label={t.sizing.infoLabel}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[rgb(var(--cyan))]/40 bg-[rgb(var(--cyan))]/10 font-display text-sm italic leading-none text-[rgb(var(--cyan))] transition-colors hover:border-[rgb(var(--cyan))]/70 hover:bg-[rgb(var(--cyan))]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--violet))]"
                >
                  i
                </button>
              </div>

              <table className="mt-4 w-full border-collapse text-center">
                <caption className="sr-only">{t.sizing.caption}</caption>
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      className="pr-3 text-left text-[0.65rem] uppercase tracking-[0.2em] text-[rgb(var(--muted))]"
                    >
                      {t.sizing.widthLabel}
                    </th>
                    {SIZES.map((s) => (
                      <td
                        key={s.size}
                        className="border-l border-white/[0.08] px-1 py-1.5 text-sm text-[rgb(var(--chrome))]"
                      >
                        {s.width}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="pr-3 text-left text-[0.65rem] uppercase tracking-[0.2em] text-[rgb(var(--muted))]"
                    >
                      {t.sizing.sizeLabel}
                    </th>
                    {SIZES.map((s) => (
                      <td
                        key={s.size}
                        className="border-l border-t border-white/[0.08] px-1 py-1.5 font-display text-lg italic text-[rgb(var(--champagne))]"
                      >
                        {s.size}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>

              <p className="mt-4 text-left text-xs leading-relaxed text-[rgb(var(--muted))]">
                {t.sizing.note}
              </p>
            </div>
          </div>
        </div>

        {/* Above the sticky header's z-50 so the bar cannot overlap it. */}
        {infoOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <div
              aria-hidden="true"
              onClick={() => setInfoOpen(false)}
              className="absolute inset-0 bg-black/70"
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="sizing-info-title"
              className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[rgb(var(--ink-raised))] p-6 text-left shadow-2xl shadow-black/60"
            >
              <h3
                id="sizing-info-title"
                className="text-base font-semibold text-[rgb(var(--chrome))]"
              >
                {t.sizing.infoTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))]">
                {t.sizing.infoBody}
              </p>
              <button
                type="button"
                onClick={() => setInfoOpen(false)}
                className="mt-6 w-full rounded-full bg-[rgb(var(--chrome))] px-4 py-2.5 text-sm font-semibold text-[rgb(var(--ink))] transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--violet))]"
              >
                {t.sizing.close}
              </button>
            </div>
          </div>
        )}

        {/* fade into the next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[rgb(var(--ink))]" />
      </section>

      {/* --------------------------------------------------------------- video */}
      <section className="px-6 py-20 sm:py-28">
        <p className="mb-8 text-center text-[0.68rem] uppercase tracking-[0.5em] text-[rgb(var(--muted))]">
          {t.howItWorks.eyebrow}
        </p>

        {/* The clip is 9:16, so "full span" is bounded by height, not width:
            at full container width it would stand two thousand pixels tall.
            The width tracks 80% of the viewport height at that ratio, and
            w-full caps it on phones where the column is the narrower limit. */}
        <div className="edge-lit mx-auto w-full max-w-[calc(80vh*0.5625)] overflow-hidden rounded-3xl bg-[rgb(var(--ink-soft))] shadow-2xl shadow-black/50">
          {/* Nearly two minutes with a soundtrack, so it waits to be asked:
              controls, a poster, and preload="none" so none of the 8 MB is
              fetched until someone presses play. */}
          <video
            src="/how-it-works.mp4"
            poster="/how-it-works-poster.jpg"
            controls
            playsInline
            preload="none"
            className="block aspect-[540/960] w-full"
          />
        </div>
      </section>

      {/* ------------------------------------------------------------- marquee */}
      {products.length > 0 && (
        <div className="relative overflow-hidden border-y border-white/[0.06] py-5">
          <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
            {[...products, ...products].map((p, i) => (
              <span
                key={`${p.id}-${i}`}
                className="text-xs uppercase tracking-[0.3em] text-[rgb(var(--muted))]/60"
              >
                {p.sku}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[rgb(var(--ink))] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[rgb(var(--ink))] to-transparent" />
        </div>
      )}

      {/* ------------------------------------------------------------ featured */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-4 text-[0.7rem] uppercase tracking-[0.4em] text-[rgb(var(--muted))]">
              {t.featured.eyebrow}
            </p>
            <h2 className="tracking-display text-4xl font-semibold sm:text-5xl">
              {t.featured.heading}
            </h2>
          </div>
          <Link
            to="/products"
            className="group text-sm font-medium text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--chrome))]"
          >
            {t.featured.viewAll(products.length)}
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {featured.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="group edge-lit block overflow-hidden rounded-2xl bg-[rgb(var(--ink-soft))] transition-transform duration-500 hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--violet))]"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={mediaUrl(p.thumb_url)}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <p className="truncate text-sm font-medium">{p.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------------- faq */}
      <section id="faq" className="scroll-mt-24 border-t border-white/[0.06] bg-[rgb(var(--ink-soft))]">
        <div className="mx-auto max-w-3xl px-6 py-28">
          <div className="mb-14">
            <h2 className="tracking-display text-4xl font-semibold leading-tight sm:text-5xl">
              {t.faq.heading}
            </h2>
          </div>

          {/* <details> gives keyboard and screen-reader behaviour for free -- no state, no library */}
          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {t.faq.items.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-medium text-[rgb(var(--chrome))] transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--violet))] sm:text-lg">
                  {f.q}
                  {/* plus turning into a minus; rotation is cheaper than swapping glyphs */}
                  <span
                    aria-hidden="true"
                    className="relative h-4 w-4 shrink-0 text-[rgb(var(--muted))] transition-transform duration-300 group-open:rotate-45"
                  >
                    <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current transition-opacity group-open:opacity-0" />
                  </span>
                </summary>
                <div className="mt-4 max-w-2xl space-y-3 pr-10 text-sm leading-relaxed text-[rgb(var(--muted))]">
                  {f.a.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Landing;
