import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productApi, mediaUrl, Product } from '../services/api';
import ChromeOrb from './ChromeOrb';

/** Cards in the hero, placed on a 3D plane. */
const HERO_SLOTS = [
  { x: '4%',  y: '14%', z: -160, tilt: '-9deg',  w: 'w-40 sm:w-48', delay: '0s'   },
  { x: '68%', y: '6%',  z: -60,  tilt: '7deg',   w: 'w-44 sm:w-56', delay: '1.1s' },
  { x: '78%', y: '58%', z: -220, tilt: '-5deg',  w: 'w-36 sm:w-44', delay: '2.2s' },
  { x: '12%', y: '62%', z: -20,  tilt: '6deg',   w: 'w-48 sm:w-60', delay: '0.6s' },
];

const PILLARS = [
  {
    n: '01',
    title: 'Hand-finished',
    body: 'Every press-on set is shaped, painted and cured by hand. No two are identical, and none of them came off a press.',
  },
  {
    n: '02',
    title: 'Salon-grade materials',
    body: 'Soft-gel tips and cured gel colour — the same system a technician would use, engineered to sit flush against your nail.',
  },
  {
    n: '03',
    title: 'Wear in minutes',
    body: 'A full set applied at your kitchen table in under fifteen minutes, removed without acetone, and worn again.',
  },
];

const Landing = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productApi
      .list(200, 0)
      .then((r) => setProducts(r.data))
      .catch((err) => console.error('Error loading products:', err));
  }, []);

  const hero = products.slice(0, HERO_SLOTS.length);
  const featured = products.slice(0, 8);
  const handcrafted = products.filter((p) => p.name.includes('Handcrafted')).length;

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

        {/* floating product plane */}
        <div className="perspective-far pointer-events-none absolute inset-0 hidden lg:block">
          <div className="preserve-3d relative h-full w-full">
            {hero.map((p, i) => {
              const s = HERO_SLOTS[i];
              return (
                <figure
                  key={p.id}
                  className={`animate-float-slow absolute ${s.w} overflow-hidden rounded-2xl edge-lit`}
                  style={{
                    left: s.x,
                    top: s.y,
                    ['--tilt' as string]: s.tilt,
                    transform: `translateZ(${s.z}px) rotate(${s.tilt})`,
                    animationDelay: s.delay,
                    boxShadow: '0 40px 90px -30px rgba(0,0,0,0.85)',
                  }}
                >
                  <img
                    src={mediaUrl(p.thumb_url)}
                    alt=""
                    loading="lazy"
                    className="aspect-square w-full object-cover"
                  />
                </figure>
              );
            })}
          </div>
        </div>

        {/* headline */}
        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
          <ChromeOrb className="animate-rise mb-10 h-24 w-24 sm:h-28 sm:w-28" />

          <p className="animate-rise mb-6 text-[0.7rem] uppercase tracking-[0.45em] text-[rgb(var(--muted))]"
             style={{ animationDelay: '0.05s' }}>
            Handcrafted in Sweden
          </p>

          <h1
            className="animate-rise tracking-display text-5xl font-semibold leading-[0.95] sm:text-7xl"
            style={{ animationDelay: '0.12s' }}
          >
            Nails that look
            <br />
            <span className="font-display text-iridescent italic">impossible</span>
            <br />
            to do at home.
          </h1>

          <p
            className="animate-rise mt-8 max-w-lg text-lg leading-relaxed text-[rgb(var(--muted))]"
            style={{ animationDelay: '0.2s' }}
          >
            Press-on sets finished by hand, engineered to sit flush and last for
            weeks. The salon result, without the salon.
          </p>

          <div className="animate-rise mt-11 flex flex-wrap items-center justify-center gap-4"
               style={{ animationDelay: '0.28s' }}>
            <Link
              to="/shop"
              className="group relative overflow-hidden rounded-full bg-[rgb(var(--chrome))] px-9 py-3.5 text-sm font-semibold text-[rgb(var(--ink))] transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--violet))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--ink))]"
            >
              Explore the collection
            </Link>
            <a
              href="#craft"
              className="rounded-full border border-white/15 px-9 py-3.5 text-sm font-medium text-[rgb(var(--chrome))] transition-colors hover:border-white/35 hover:bg-white/5"
            >
              How it's made
            </a>
          </div>
        </div>

        {/* fade into the next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[rgb(var(--ink))]" />
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

      {/* --------------------------------------------------------------- craft */}
      <section id="craft" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-[0.7rem] uppercase tracking-[0.4em] text-[rgb(var(--muted))]">
            The craft
          </p>
          <h2 className="tracking-display text-4xl font-semibold leading-tight sm:text-5xl">
            Made the slow way,
            <span className="font-display italic text-iridescent"> on purpose.</span>
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl bg-white/[0.07] sm:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.n} className="bg-[rgb(var(--ink-soft))] p-9">
              <span className="font-display text-3xl italic text-[rgb(var(--champagne))]/70">
                {p.n}
              </span>
              <h3 className="mb-3 mt-5 text-lg font-semibold">{p.title}</h3>
              <p className="text-sm leading-relaxed text-[rgb(var(--muted))]">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ featured */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-4 text-[0.7rem] uppercase tracking-[0.4em] text-[rgb(var(--muted))]">
              Selected pieces
            </p>
            <h2 className="tracking-display text-4xl font-semibold sm:text-5xl">
              This season
            </h2>
          </div>
          <Link
            to="/shop"
            className="group text-sm font-medium text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--chrome))]"
          >
            View all {products.length || ''} designs
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

      {/* ----------------------------------------------------------------- cta */}
      <section className="relative overflow-hidden px-6 pb-32">
        <div className="glass edge-lit relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] px-8 py-20 text-center">
          <div
            className="aurora left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2"
            style={{ background: 'rgb(var(--rose) / 0.3)' }}
          />
          <div className="relative">
            <h2 className="tracking-display mx-auto max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
              {handcrafted > 0 ? `${handcrafted} handcrafted sets,` : 'Handcrafted sets,'}
              <span className="font-display italic text-iridescent"> ready to wear.</span>
            </h2>
            <Link
              to="/shop"
              className="mt-10 inline-block rounded-full bg-[rgb(var(--chrome))] px-10 py-4 text-sm font-semibold text-[rgb(var(--ink))] transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--violet))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--ink))]"
            >
              Shop the collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
