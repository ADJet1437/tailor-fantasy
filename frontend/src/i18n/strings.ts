/**
 * UI copy for both locales. `sv` is typed as `typeof en`, so a key added to
 * English that is missing (or mistyped) in Swedish is a build error rather than
 * a blank spot on the page.
 *
 * Product names and descriptions are NOT here -- they come from the database
 * and are shown in whatever language they were seeded in.
 */
export const en = {
  nav: {
    home: 'Home',
    products: 'Products',
    faq: 'FAQ',
    contact: 'Contact us',
    language: 'Language',
    menu: 'Menu',
    closeMenu: 'Close menu',
  },
  hero: {
    checkSize: 'Check your size',
  },
  sizing: {
    heading: 'Find your size',
    // The printed insert measures the thumb only, and that one width sets the
    // size of the whole set -- worth saying outright so nobody measures ten.
    note: 'Measure your thumbnail at its widest point. That single width sets the size for the whole set.',
    widthLabel: 'Width',
    sizeLabel: 'Size',
    caption: 'Nail size by thumbnail width',
    infoLabel: 'About measuring',
    infoTitle: 'About AI measurement',
    infoBody:
      'AI measurement is not accurate yet and we are working on it. For now, please use the measuring tools provided in the machine to find your size.',
    close: 'Close',
  },
  featured: {
    eyebrow: 'Selected pieces',
    heading: 'This season',
    viewAll: (n: number) => `View all ${n || ''} designs`,
  },
  faq: {
    heading: 'FAQ',
    items: [
      {
        q: 'Do I always have to print?',
        a: 'No. Every set in the collection is wearable exactly as it arrives. Printing your own design is a choice, not a requirement: the handcraft and DIY ranges let you do it if you want to, and press-on sets need no printing at all.',
      },
      {
        q: 'Can I buy now and print later?',
        a: 'Yes. Every order arrives with a QR card. Scan it whenever the mood strikes and it brings you straight back here to have a design printed for the set you already own. There is no deadline, and nothing to decide at checkout.',
      },
      {
        q: 'How do I take them off again?',
        a: 'With what is already in the box. Every set ships with the removal tools you need, so the nails come off gently at home — no salon appointment, no separate kit to buy.',
      },
    ],
  },
  products: {
    eyebrow: 'The collection',
    loading: 'Loading products…',
    loadError: 'Failed to load products. Please try again.',
    retry: 'Try Again',
    empty: 'No products available yet.',
    view: 'View',
    // One heading per filter: Swedish compounds these differently, so the whole
    // phrase is translated rather than glued together from a label plus a noun.
    headings: {
      all: 'All designs',
      'press-on': 'Press-On designs',
      handcraft: 'Handcraft designs',
      diy: 'DIY designs',
    },
    filters: {
      all: 'All',
      'press-on': 'Press-On',
      handcraft: 'Handcraft',
      diy: 'DIY',
    },
  },
  detail: {
    loadError: 'Failed to load this product.',
    notFound: 'Product not found.',
    back: '← Back',
    noImage: 'No detail image available.',
  },
  footer: {
    tagline:
      'DIY nail art kits and supplies for people who would rather make it themselves.',
    support: 'Support',
    legal: 'Legal',
    follow: 'Follow Us',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    rights: (year: number) => `© ${year} Tailor Fantasy. All rights reserved.`,
  },
  legalShell: {
    back: '← Back',
  },
};

export const sv: typeof en = {
  nav: {
    home: 'Hem',
    products: 'Produkter',
    faq: 'FAQ',
    contact: 'Kontakta oss',
    language: 'Språk',
    menu: 'Meny',
    closeMenu: 'Stäng menyn',
  },
  hero: {
    checkSize: 'Kolla din storlek',
  },
  sizing: {
    heading: 'Hitta din storlek',
    note: 'Mät tumnageln på dess bredaste punkt. Den bredden avgör storleken för hela setet.',
    widthLabel: 'Bredd',
    sizeLabel: 'Storlek',
    caption: 'Nagelstorlek utifrån tumnagelns bredd',
    infoLabel: 'Om mätning',
    infoTitle: 'Om AI-mätning',
    infoBody:
      'AI-mätningen är inte tillförlitlig ännu och vi arbetar på det. Använd så länge mätverktygen som finns i maskinen för att hitta din storlek.',
    close: 'Stäng',
  },
  featured: {
    eyebrow: 'Utvalda favoriter',
    heading: 'Den här säsongen',
    viewAll: (n: number) => `Visa alla ${n || ''} designer`,
  },
  faq: {
    heading: 'FAQ',
    items: [
      {
        q: 'Måste jag alltid trycka?',
        a: 'Nej. Varje set i kollektionen går att bära precis som det levereras. Att trycka sin egen design är ett val, inte ett krav: i sortimenten Handmålat och DIY kan du göra det om du vill, och press-on-set behöver inte tryckas alls.',
      },
      {
        q: 'Kan jag köpa nu och trycka senare?',
        a: 'Ja. Varje beställning kommer med ett QR-kort. Skanna det när andan faller på, så kommer du direkt tillbaka hit för att trycka en design till setet du redan äger. Det finns ingen tidsgräns, och inget att bestämma i kassan.',
      },
      {
        q: 'Hur tar jag av dem igen?',
        a: 'Med det som redan finns i förpackningen. Varje set levereras med de verktyg du behöver, så naglarna lossnar skonsamt hemma — ingen salongstid, inget extra kit att köpa.',
      },
    ],
  },
  products: {
    eyebrow: 'Kollektionen',
    loading: 'Laddar produkter…',
    loadError: 'Det gick inte att ladda produkterna. Försök igen.',
    retry: 'Försök igen',
    empty: 'Inga produkter tillgängliga ännu.',
    view: 'Visa',
    headings: {
      all: 'Alla designer',
      'press-on': 'Press-on-designer',
      handcraft: 'Handmålade designer',
      diy: 'DIY-designer',
    },
    filters: {
      all: 'Alla',
      'press-on': 'Press-on',
      handcraft: 'Handmålat',
      diy: 'DIY',
    },
  },
  detail: {
    loadError: 'Det gick inte att ladda produkten.',
    notFound: 'Produkten hittades inte.',
    back: '← Tillbaka',
    noImage: 'Ingen detaljbild tillgänglig.',
  },
  footer: {
    tagline:
      'DIY-nagelkit och tillbehör för dig som hellre gör det själv.',
    support: 'Support',
    legal: 'Juridik',
    follow: 'Följ oss',
    privacy: 'Integritetspolicy',
    terms: 'Användarvillkor',
    rights: (year: number) => `© ${year} Tailor Fantasy. Med ensamrätt.`,
  },
  legalShell: {
    back: '← Tillbaka',
  },
};

export const STRINGS = { sv, en };
