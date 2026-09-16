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
  howItWorks: {
    eyebrow: 'How it works',
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
    // `a` is a list of paragraphs -- these answers are too long to read as one
    // block, and the paragraph breaks carry meaning (what is included, then
    // how to use it).
    items: [
      {
        q: 'Do I always have to print the nails I buy?',
        a: [
          'No. All our nail sets can be used exactly as they are. You can apply the nails directly using the gel pads included, regardless of which set you choose.',
          'Printing your own design is completely optional. If you choose Hand-painted or DIY, you can print your own design if you want to. Our Press-on sets already have a finished design and are ready to use straight away, without you having to print anything.',
        ],
      },
      {
        q: 'Can I buy a nail set now and finish it later?',
        a: [
          'Yes, of course. On the back of each package, there is a QR code linked specifically to your nail set.',
          'You can scan the QR code whenever you want – immediately after purchase, a few hours later, or after several days – and come back to finish, design, or print your set.',
          'There is no time limit after purchase. This means you can buy the nail set first and then take your time deciding how you want it.',
        ],
      },
      {
        q: 'How do I apply and remove the nails?',
        a: [
          'Everything you need is already included in the package. Each set contains gel pads for attaching the nails and a small plastic stick that helps you with both application and removal.',
          'When applying the nails, you use the gel pads to attach them to your natural nails. When you want to remove them, carefully slide the plastic stick under the edge of the nail and gently lift until the nail comes off.',
          'The gel pads provide a strong hold that keeps the nails securely in place, while still being easy to remove when you want to change or take off the nails. Each set also includes two sets of gel pads, so you have extras if you need to redo a nail or want to use the nails again.',
          'This gives you both a secure hold and easy removal – without regular nail glue.',
        ],
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
  howItWorks: {
    eyebrow: 'Så funkar det',
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
        q: 'Måste jag alltid printa naglarna jag köper?',
        a: [
          'Nej. Alla våra nagelset kan användas precis som de är. Du kan sätta på naglarna direkt med gelékuddarna som följer med, oavsett vilket set du väljer.',
          'Att printa en egen design är helt valfritt. Väljer du Handmålat eller DIY kan du printa din egen design om du vill. Våra Press-on-set har redan en färdig design och är redo att användas direkt, utan att du behöver printa något.',
        ],
      },
      {
        q: 'Kan jag köpa ett nagelset nu och färdigställa det senare?',
        a: [
          'Ja, självklart. På baksidan av varje förpackning finns en QR-kod som är kopplad till just ditt nagelset.',
          'Du kan skanna QR-koden när du vill – direkt efter köpet, några timmar senare eller efter flera dagar – och komma tillbaka för att färdigställa, designa eller printa ditt set.',
          'Det finns ingen tidsgräns efter köpet. Du kan alltså köpa nagelsetet först och sedan i lugn och ro bestämma hur du vill ha det.',
        ],
      },
      {
        q: 'Hur sätter jag på och tar av naglarna?',
        a: [
          'Allt du behöver finns redan i förpackningen. Varje set innehåller gelékuddar för att fästa naglarna och en liten plastpinne som hjälper dig vid både applicering och borttagning.',
          'När du sätter på naglarna använder du gelékuddarna för att fästa dem på dina egna naglar. När du vill ta av dem för du försiktigt in plastpinnen under kanten på nageln och lyfter försiktigt tills nageln lossnar.',
          'Gelékuddarna har ett starkt fäste som håller naglarna säkert på plats, samtidigt som de är enkla att ta bort när du vill byta eller ta av naglarna. Varje set innehåller dessutom dubbla uppsättningar gelékuddar, så att du har extra om du behöver göra om en nagel eller vill använda naglarna igen.',
          'Du får alltså både ett stabilt fäste och en smidig borttagning – utan vanligt nagellim.',
        ],
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
