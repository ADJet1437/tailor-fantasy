import { FormEvent, useEffect, useRef, useState } from 'react';
import { contactApi } from '../services/api';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/** Matches the shape the backend's EmailStr will accept, so the two agree. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_MESSAGE = 10;

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const ContactModal = ({ open, onClose }: ContactModalProps) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});
  const [status, setStatus] = useState<Status>('idle');

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  // Escape to close, focus the first field, lock background scroll
  useEffect(() => {
    if (!open) return;

    restoreFocusTo.current = document.activeElement as HTMLElement | null;
    firstFieldRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      restoreFocusTo.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const validate = () => {
    const next: { email?: string; message?: string } = {};
    if (!email.trim()) next.email = 'Email is required.';
    else if (!EMAIL_RE.test(email.trim())) next.email = 'Enter a valid email address.';

    const body = message.trim();
    if (!body) next.message = 'Message is required.';
    else if (body.length < MIN_MESSAGE)
      next.message = `Please write at least ${MIN_MESSAGE} characters.`;

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending' || !validate()) return;

    try {
      setStatus('sending');
      await contactApi.send({
        email: email.trim(),
        message: message.trim(),
        website,
      });
      setStatus('sent');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      console.error('Error sending message:', err);
    }
  };

  const field =
    'w-full rounded-2xl border bg-white/[0.04] px-5 py-3.5 text-[rgb(var(--chrome))] placeholder:text-[rgb(var(--muted))]/60 transition-colors focus:outline-none focus:ring-2 focus:ring-[rgb(var(--violet))]/40';
  const ok = 'border-white/10 focus:border-white/25';
  const bad = 'border-[rgb(var(--rose))]/60';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        className="glass edge-lit relative w-full max-w-lg rounded-3xl p-8 sm:p-10"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 rounded-full p-2 text-[rgb(var(--muted))] transition-colors hover:bg-white/10 hover:text-[rgb(var(--chrome))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--violet))]"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
          </svg>
        </button>

        {status === 'sent' ? (
          <div className="py-6 text-center">
            <h2 id="contact-title" className="tracking-display text-2xl font-semibold">
              Message sent
            </h2>
            <button
              onClick={onClose}
              className="mt-6 rounded-full bg-[rgb(var(--chrome))] px-8 py-3 text-sm font-semibold text-[rgb(var(--ink))] transition-transform hover:scale-[1.02]"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <h2 id="contact-title" className="tracking-display mb-6 text-2xl font-semibold">
              Contact <span className="text-iridescent">us</span>
            </h2>

            <label htmlFor="c-email" className="mb-2 block text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
              Email <span className="text-[rgb(var(--rose))]">*</span>
            </label>
            <input
              ref={firstFieldRef}
              id="c-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'c-email-err' : undefined}
              placeholder="your@email.com"
              className={`${field} ${errors.email ? bad : ok}`}
            />
            {errors.email && (
              <p id="c-email-err" className="mt-2 text-sm text-[rgb(var(--rose))]">
                {errors.email}
              </p>
            )}

            <label htmlFor="c-message" className="mb-2 mt-5 block text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
              Message <span className="text-[rgb(var(--rose))]">*</span>
            </label>
            <textarea
              id="c-message"
              required
              rows={5}
              maxLength={5000}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'c-message-err' : undefined}
              placeholder="Tell us what you need — sizing, wholesale, a custom set…"
              className={`${field} ${errors.message ? bad : ok} resize-y`}
            />
            {errors.message && (
              <p id="c-message-err" className="mt-2 text-sm text-[rgb(var(--rose))]">
                {errors.message}
              </p>
            )}

            {/* honeypot: off-screen and skipped by tab order, so only bots reach it */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            {status === 'error' && (
              <p className="mt-4 text-sm text-[rgb(var(--rose))]">
                Something went wrong. Please try again in a moment.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-7 w-full rounded-full bg-[rgb(var(--chrome))] px-10 py-4 text-sm font-semibold text-[rgb(var(--ink))] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--violet))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--ink))]"
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
