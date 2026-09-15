import { Link } from 'react-router-dom';
import { Block, LegalDoc } from '../i18n/legal';
import { useT } from '../i18n/useLanguage';

/** Shared shell for the policy pages so their typography stays consistent. */
const LegalPage = ({ doc }: { doc: LegalDoc }) => {
  const t = useT();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Link
        to="/"
        className="mb-6 inline-block text-sm text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--chrome))]"
      >
        {t.legalShell.back}
      </Link>

      <article className="glass edge-lit rounded-3xl p-8 sm:p-12">
        <h1 className="tracking-display mb-8 text-4xl font-semibold">{doc.title}</h1>

        <div
          className="
            space-y-6 text-[rgb(var(--muted))]
            [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[rgb(var(--chrome))]
            [&_a]:text-[rgb(var(--chrome))] [&_a]:underline
            [&_li]:leading-relaxed [&_p]:leading-relaxed
            [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6
          "
        >
          {/* Index keys are safe here: the blocks are static content, never
              reordered or filtered. */}
          {doc.blocks.map((block, i) => renderBlock(block, i))}
        </div>
      </article>
    </div>
  );
};

const renderBlock = (block: Block, i: number) => {
  switch (block.kind) {
    case 'h2':
      return <h2 key={i}>{block.text}</h2>;
    case 'p':
      return <p key={i}>{block.text}</p>;
    case 'ul':
      return (
        <ul key={i}>
          {block.items.map((item, j) =>
            typeof item === 'string' ? (
              <li key={j}>{item}</li>
            ) : (
              <li key={j}>
                <strong>{item.lead}</strong> {item.text}
              </li>
            ),
          )}
        </ul>
      );
  }
};

export default LegalPage;
