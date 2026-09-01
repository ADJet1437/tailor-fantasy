import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productApi, mediaUrl, Product } from '../services/api';
import Butterfly from './Butterfly';
import ContactForm from './ContactForm';

/* Positions echo the reference composition: a large focal butterfly just above
   the horizon, with smaller ones fanning out and receding. */
const BUTTERFLIES = [
  { x: '50%', y: '15%', size: 84, dur: 1.05, delay: 0,    z: 0,    hue: 0.2, op: 1    },
  { x: '17%', y: '30%', size: 56, dur: 0.82, delay: 0.35, z: -180, hue: 0.7, op: 0.85 },
  { x: '83%', y: '26%', size: 60, dur: 0.94, delay: 0.6,  z: -120, hue: 0.1, op: 0.9  },
  { x: '9%',  y: '58%', size: 42, dur: 0.74, delay: 0.15, z: -280, hue: 0.5, op: 0.65 },
  { x: '91%', y: '55%', size: 46, dur: 0.88, delay: 0.5,  z: -240, hue: 0.8, op: 0.7  },
  { x: '24%', y: '81%', size: 48, dur: 0.68, delay: 0.9,  z: -200, hue: 0.3, op: 0.7  },
  { x: '76%', y: '84%', size: 40, dur: 0.79, delay: 1.2,  z: -300, hue: 0.6, op: 0.6  },
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
              <Butterfly
                key={i}
                size={b.size}
                duration={b.dur}
                delay={b.delay}
                hue={b.hue}
                style={{
                  position: 'absolute',
                  left: b.x,
                  top: b.y,
                  opacity: b.op,
                  transform: `translate(-50%, -50%) translateZ(${b.z}px)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* headline */}
        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
          <p
            className="animate-rise mb-7 text-[0.68rem] uppercase tracking-[0.5em] text-[rgb(var(--muted))]"
            style={{ animationDelay: '0.05s' }}
          >
            Handcrafted in Sweden
          </p>

          <h1
            className="animate-rise tracking-display text-[2.75rem] font-semibold leading-[1.02] sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '0.12s' }}
          >
            Smart Beauty
            <br />
            <span className="text-iridescent">Tailor Fantasy</span>
          </h1>

          <div className="animate-rise mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
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
              See the range
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
                to={`/shop?category=${r.slug}`}
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

      {/* ------------------------------------------------------------- contact */}
      <section id="contact" className="relative overflow-hidden px-6 pb-32">
        <div className="glass edge-lit relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] px-8 py-20 text-center">
          <div
            className="aurora left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2"
            style={{ background: 'rgb(var(--rose) / 0.3)' }}
          />
          <div className="relative">
            <p className="mb-4 text-[0.68rem] uppercase tracking-[0.5em] text-[rgb(var(--muted))]">
              Contact us
            </p>
            <h2 className="tracking-display mx-auto max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
              Questions, sizing, or
              <span className="text-iridescent"> wholesale?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[rgb(var(--muted))]">
              Tell us what you need and we'll come back to you within two
              working days.
            </p>

            <ContactForm />

            <p className="mt-8 text-xs uppercase tracking-[0.25em] text-[rgb(var(--muted))]/60">
              Handcrafted in Sweden
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Landing;
