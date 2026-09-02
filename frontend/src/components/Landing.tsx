import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productApi, mediaUrl, Product } from '../services/api';
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

/* One column per category, linking straight into that filter. */
const RANGES = [
  {
    slug: 'press-on',
    n: '01',
    title: 'Press-On',
    body: 'Ready to wear straight out of the box. No lamp, no tools, no drying time — press them on and go.',
  },
  {
    slug: 'handcraft',
    n: '02',
    title: 'Handcraft',
    body: 'Hand-painted one set at a time. A premium finish for anyone who wants the craft without the salon chair.',
  },
  {
    slug: 'diy',
    n: '03',
    title: 'DIY',
    body: 'The everyday range. Printed tips you shape, style and make your own.',
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

        {/* headline */}
        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
          <p
            className="animate-rise mb-6 text-[0.6rem] uppercase tracking-[0.35em] text-[rgb(var(--muted))] sm:mb-7 sm:text-[0.68rem] sm:tracking-[0.5em]"
            style={{ animationDelay: '0.05s' }}
          >
            Handcrafted in Sweden
          </p>

          <h1
            className="animate-rise tracking-display text-[clamp(1.9rem,8.5vw,4.5rem)] font-semibold leading-[1.05]"
            style={{ animationDelay: '0.12s' }}
          >
            Smart Beauty
            <br />
            <span className="text-iridescent">Tailor Fantasy</span>
          </h1>

          <div className="animate-rise mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
               style={{ animationDelay: '0.28s' }}>
            <Link
              to="/products"
              className="group relative overflow-hidden rounded-full bg-[rgb(var(--chrome))] px-9 py-3.5 text-sm font-semibold text-[rgb(var(--ink))] transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--violet))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--ink))]"
            >
              Explore the collection
            </Link>
            <a
              href="#craft"
              className="rounded-full border border-white/15 px-9 py-3.5 text-sm font-medium text-[rgb(var(--chrome))] transition-colors hover:border-white/35 hover:bg-white/5"
            >
              See the range
            </a>
          </div>
        </div>

        {/* fade into the next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[rgb(var(--ink))]" />
      </section>

      {/* --------------------------------------------------------------- video */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="mb-4 text-[0.68rem] uppercase tracking-[0.5em] text-[rgb(var(--muted))]">
              How it works
            </p>
            <h2 className="tracking-display text-[clamp(1.75rem,6vw,3rem)] font-semibold leading-tight">
              From screen to nail
              <span className="text-iridescent"> in minutes.</span>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-[rgb(var(--muted))]">
              Pick a design, print it straight onto the tip, cure it under the
              lamp. The whole set is done at the machine — no appointment, no
              drying time at home.
            </p>
            <Link
              to="/products?category=diy"
              className="group mt-8 inline-block text-sm font-medium text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--chrome))]"
            >
              Browse the DIY range
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* the clip is 9:16, so it is capped rather than stretched across the column */}
          <div className="order-1 lg:order-2">
            <div className="edge-lit mx-auto w-full max-w-[320px] overflow-hidden rounded-3xl bg-[rgb(var(--ink-soft))] shadow-2xl sm:max-w-[360px]">
              <video
                src="/diy-printing.mp4"
                poster="/diy-printing-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                controls
                className="block aspect-[544/960] w-full object-cover"
              />
            </div>
          </div>
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

      {/* --------------------------------------------------------------- craft */}
      <section id="craft" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-[0.7rem] uppercase tracking-[0.4em] text-[rgb(var(--muted))]">
            The range
          </p>
          <h2 className="tracking-display text-4xl font-semibold leading-tight sm:text-5xl">
            Three ways
            <span className="font-display italic text-iridescent"> to wear it.</span>
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl bg-white/[0.07] sm:grid-cols-3">
          {RANGES.map((r) => {
            const count = products.filter((p) => p.category === r.slug).length;
            return (
              <Link
                key={r.slug}
                to={`/products?category=${r.slug}`}
                className="group bg-[rgb(var(--ink-soft))] p-9 transition-colors hover:bg-[rgb(var(--ink-raised))] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[rgb(var(--violet))]"
              >
                <span className="font-display text-3xl italic text-[rgb(var(--champagne))]/70">
                  {r.n}
                </span>
                <h3 className="mb-3 mt-5 text-lg font-semibold">{r.title}</h3>
                <p className="text-sm leading-relaxed text-[rgb(var(--muted))]">{r.body}</p>
                <span className="mt-6 inline-block text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted))]/70 transition-colors group-hover:text-[rgb(var(--chrome))]">
                  {count > 0 ? `${count} designs` : 'Browse'}
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            );
          })}
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
            to="/products"
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

    </div>
  );
};

export default Landing;
