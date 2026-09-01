import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LegalPageProps {
  title: string;
  children: ReactNode;
}

/** Shared shell for the policy pages so their typography stays consistent. */
const LegalPage = ({ title, children }: LegalPageProps) => {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Link
        to="/"
        className="mb-6 inline-block text-sm text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--chrome))]"
      >
        ← Back
      </Link>

      <article className="glass edge-lit rounded-3xl p-8 sm:p-12">
        <h1 className="tracking-display mb-8 text-4xl font-semibold">{title}</h1>

        <div
          className="
            space-y-6 text-[rgb(var(--muted))]
            [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[rgb(var(--chrome))]
            [&_a]:text-[rgb(var(--chrome))] [&_a]:underline
            [&_li]:leading-relaxed [&_p]:leading-relaxed
            [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6
          "
        >
          {children}
        </div>
      </article>
    </div>
  );
};

export default LegalPage;
