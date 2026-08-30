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
        className="mb-6 inline-block text-sm text-purple-600 hover:text-purple-800"
      >
        ← Back
      </Link>

      <article className="rounded-2xl bg-white p-8 shadow-md sm:p-10">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">{title}</h1>

        <div
          className="
            space-y-6 text-gray-600
            [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-800
            [&_a]:text-purple-600 hover:[&_a]:text-purple-800
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
