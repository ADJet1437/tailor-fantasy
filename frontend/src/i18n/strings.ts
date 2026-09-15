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
    language: 'Language',
  },
  hero: {
    tagline: 'Bring fantasy to life.',
    explore: 'Explore the collection',
    seeRange: 'See the range',
  },
  ranges: {
    eyebrow: 'The range',
    headingLead: 'Three ways',
    headingAccent: ' to wear it.',
    browse: 'Browse',
    designCount: (n: number) => `${n} designs`,
    items: {
      'press-on': {
        title: 'Press-On',
        body: 'Ready to wear straight out of the box. No lamp, no tools, no drying time — press them on and go.',
      },
      handcraft: {
        title: 'Handcraft',
        body: 'Hand-painted one set at a time. A premium finish for anyone who wants the craft without the salon chair.',
      },
      diy: {
        title: 'DIY',
        body: 'The everyday range. Printed tips you shape, style and make your own.',
      },
    },
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
    language: 'Språk',
  },
  hero: {
    tagline: 'Väck fantasin till liv.',
    explore: 'Utforska kollektionen',
    seeRange: 'Se sortimentet',
  },
  ranges: {
    eyebrow: 'Sortimentet',
    headingLead: 'Tre sätt',
    headingAccent: ' att bära det.',
    browse: 'Bläddra',
    designCount: (n: number) => `${n} designer`,
    items: {
      'press-on': {
        title: 'Press-on',
        body: 'Färdiga att bära direkt ur förpackningen. Ingen lampa, inga verktyg, ingen torktid — tryck fast och gå.',
      },
      handcraft: {
        title: 'Handmålat',
        body: 'Handmålade, ett set i taget. Ett exklusivt utförande för dig som vill ha hantverket utan salongsstolen.',
      },
      diy: {
        title: 'DIY',
        body: 'Vardagssortimentet. Tryckta tippar som du formar, stylar och gör till dina egna.',
      },
    },
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
