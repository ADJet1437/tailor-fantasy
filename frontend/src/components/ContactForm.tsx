import { FormEvent, useState } from 'react';
import { contactApi } from '../services/api';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    try {
      setStatus('sending');
      await contactApi.send({ email: email.trim(), message: message.trim() });
      setStatus('sent');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      console.error('Error sending message:', err);
    }
  };

  const field =
    'w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-[rgb(var(--chrome))] placeholder:text-[rgb(var(--muted))]/60 transition-colors focus:border-white/25 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--violet))]/40';

  if (status === 'sent') {
    return (
      <div className="mx-auto mt-10 max-w-md rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-8 text-center">
        <p className="font-medium text-[rgb(var(--chrome))]">Message sent.</p>
        <p className="mt-2 text-sm text-[rgb(var(--muted))]">
          We'll come back to you within two working days.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-5 text-sm text-[rgb(var(--muted))] underline transition-colors hover:text-[rgb(var(--chrome))]"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-10 max-w-md space-y-3 text-left">
      <label className="sr-only" htmlFor="contact-email">
        Your email
      </label>
      <input
        id="contact-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className={field}
      />

      <label className="sr-only" htmlFor="contact-message">
        Your message
      </label>
      <textarea
        id="contact-message"
        required
        rows={5}
        maxLength={5000}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Tell us what you need — sizing, wholesale, a custom set…"
        className={`${field} resize-y`}
      />

      {status === 'error' && (
        <p className="text-sm text-[rgb(var(--rose))]">
          Something went wrong. Please try again, or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-full bg-[rgb(var(--chrome))] px-10 py-4 text-sm font-semibold text-[rgb(var(--ink))] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--violet))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--ink))]"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
};

export default ContactForm;
