/**
 * TEMPLATE ONLY -- not legal advice and not reviewed by a lawyer. The Swedish
 * text is a translation of that same unreviewed template, so it carries the
 * same caveat twice over. Replace every [bracketed] value and have counsel
 * check BOTH language versions before publishing.
 *
 * The policies live here as data rather than as JSX so one renderer serves both
 * languages and the markup cannot drift between them.
 */
export type ListItem = string | { lead: string; text: string };

export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'ul'; items: ListItem[] };

export interface LegalDoc {
  title: string;
  blocks: Block[];
}

const p = (text: string): Block => ({ kind: 'p', text });
const h2 = (text: string): Block => ({ kind: 'h2', text });
const ul = (items: ListItem[]): Block => ({ kind: 'ul', items });

const privacyEn: LegalDoc = {
  title: 'Privacy Policy',
  blocks: [
    p('This policy explains what information Tailor Fantasy ("we", "us") collects when you visit this site, how we use it, and the choices you have. It applies to this website only.'),
    h2('Information We Collect'),
    p('We keep collection to the minimum needed to run the site:'),
    ul([
      { lead: 'Information you give us.', text: 'If you contact us, we receive whatever you include in that message, such as your name and email address.' },
      { lead: 'Technical information.', text: 'Our servers record standard request data such as IP address, browser type, and the pages requested. This is used to operate and secure the service.' },
    ]),
    p('We do not require an account to browse the catalogue, and we do not ask for payment details on this site.'),
    h2('How We Use Information'),
    ul([
      'To display the product catalogue and serve product images.',
      'To respond to enquiries you send us.',
      'To diagnose faults, prevent abuse, and keep the site secure.',
      'To meet legal or regulatory obligations.',
    ]),
    p('We do not sell your personal information.'),
    h2('Cookies'),
    p('We use only cookies and similar storage that are strictly necessary for the site to function. We do not use advertising cookies. If we introduce analytics or marketing cookies in future, we will ask for your consent first and update this policy.'),
    h2('Sharing'),
    p('We share personal information only with service providers who host and operate the site on our behalf, and only as far as they need it. We may also disclose information where required by law, or to protect our rights and the safety of our users.'),
    h2('Retention'),
    p('We keep information only as long as needed for the purposes above, or as required by law. Server logs are retained for [retention period] and then deleted.'),
    h2('Your Rights'),
    p('Depending on where you live, you may have the right to access, correct, delete, or export your personal information, to object to or restrict certain processing, and to withdraw consent. To exercise any of these, contact us at [contact email]. You may also complain to your local data protection authority.'),
    h2('Security'),
    p('We take reasonable technical and organisational measures to protect personal information. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.'),
    h2('International Transfers'),
    p('Your information may be processed in Sweden. Where information leaves your jurisdiction, we rely on appropriate safeguards for the transfer.'),
    h2('Changes'),
    p('We may update this policy from time to time. The revised version takes effect when posted.'),
  ],
};

const privacySv: LegalDoc = {
  title: 'Integritetspolicy',
  blocks: [
    p('Den här policyn förklarar vilka uppgifter Tailor Fantasy ("vi", "oss") samlar in när du besöker webbplatsen, hur vi använder dem och vilka val du har. Den gäller endast den här webbplatsen.'),
    h2('Uppgifter vi samlar in'),
    p('Vi samlar in så lite som möjligt — bara det som behövs för att driva webbplatsen:'),
    ul([
      { lead: 'Uppgifter du lämnar till oss.', text: 'Om du kontaktar oss får vi det du väljer att skriva i meddelandet, till exempel namn och e-postadress.' },
      { lead: 'Teknisk information.', text: 'Våra servrar loggar vanliga uppgifter om förfrågningar, såsom IP-adress, webbläsartyp och vilka sidor som begärts. Detta används för att driva och säkra tjänsten.' },
    ]),
    p('Du behöver inget konto för att bläddra i katalogen, och vi efterfrågar inga betaluppgifter på den här webbplatsen.'),
    h2('Hur vi använder uppgifterna'),
    ul([
      'För att visa produktkatalogen och leverera produktbilder.',
      'För att svara på frågor du skickar till oss.',
      'För att felsöka, förhindra missbruk och hålla webbplatsen säker.',
      'För att uppfylla rättsliga krav och myndighetskrav.',
    ]),
    p('Vi säljer inte dina personuppgifter.'),
    h2('Kakor (cookies)'),
    p('Vi använder endast kakor och liknande lagring som är strikt nödvändiga för att webbplatsen ska fungera. Vi använder inga annonskakor. Om vi i framtiden inför kakor för analys eller marknadsföring kommer vi först att be om ditt samtycke och uppdatera den här policyn.'),
    h2('Delning'),
    p('Vi delar personuppgifter endast med de leverantörer som driftar och sköter webbplatsen åt oss, och bara i den omfattning de behöver dem. Vi kan också lämna ut uppgifter när lagen kräver det, eller för att skydda våra rättigheter och våra användares säkerhet.'),
    h2('Lagringstid'),
    p('Vi sparar uppgifter endast så länge det behövs för ändamålen ovan, eller så länge lagen kräver. Serverloggar sparas i [lagringstid] och raderas därefter.'),
    h2('Dina rättigheter'),
    p('Beroende på var du bor kan du ha rätt att få tillgång till, rätta, radera eller flytta dina personuppgifter, att invända mot eller begränsa viss behandling, och att återkalla ditt samtycke. Kontakta oss på [kontakt-e-post] för att utöva någon av dessa rättigheter. Du kan även lämna klagomål till din lokala dataskyddsmyndighet, i Sverige Integritetsskyddsmyndigheten (IMY).'),
    h2('Säkerhet'),
    p('Vi vidtar rimliga tekniska och organisatoriska åtgärder för att skydda personuppgifter. Ingen överföring eller lagring är helt säker, och vi kan därför inte garantera fullständig säkerhet.'),
    h2('Överföringar till tredjeland'),
    p('Dina uppgifter kan behandlas i Sverige. När uppgifter lämnar din jurisdiktion förlitar vi oss på lämpliga skyddsåtgärder för överföringen.'),
    h2('Ändringar'),
    p('Vi kan komma att uppdatera den här policyn då och då. Den ändrade versionen gäller från det att den publiceras.'),
  ],
};

const termsEn: LegalDoc = {
  title: 'Terms of Service',
  blocks: [
    p('These terms govern your use of Tailor Fantasy ("we", "us"). By using the site you agree to them. If you do not agree, please do not use the site.'),
    h2('Use of the Site'),
    p('You agree not to:'),
    ul([
      'Use the site for any unlawful purpose.',
      'Attempt to gain unauthorised access to the site, its servers, or related systems.',
      "Interfere with the site's operation, including by scraping at a rate that degrades service for others.",
      'Copy, resell, or redistribute our product images or catalogue data without written permission.',
    ]),
    h2('Product Information'),
    p('We aim to describe products accurately, but we do not warrant that descriptions, images, or availability are error-free or current. Colours shown on screen may differ from the physical product. We may correct errors and change or discontinue products at any time without notice.'),
    h2('Intellectual Property'),
    p('The site and its contents, including text, images, and design, are owned by Tailor Fantasy or its licensors and are protected by intellectual property law. You may view and share content for personal, non-commercial use only.'),
    h2('Third-Party Links'),
    p('The site may link to third-party sites. We do not control them and are not responsible for their content or practices.'),
    h2('Disclaimers'),
    p('The site is provided "as is" and "as available", without warranties of any kind, whether express or implied, to the fullest extent permitted by law. We do not warrant that the site will be uninterrupted, secure, or error-free.'),
    h2('Limitation of Liability'),
    p('To the fullest extent permitted by law, Tailor Fantasy shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the site. Nothing in these terms excludes liability that cannot be excluded by law, including for death or personal injury caused by negligence, or for fraud.'),
    h2('Indemnity'),
    p('You agree to indemnify us against claims arising from your misuse of the site or breach of these terms.'),
    h2('Termination'),
    p('We may suspend or withdraw access to the site at any time, without notice, where we reasonably consider it necessary.'),
    h2('Governing Law'),
    p('These terms are governed by the laws of [jurisdiction], and the courts of [jurisdiction] have exclusive jurisdiction over any dispute, subject to any mandatory consumer protections available to you locally.'),
    h2('Changes'),
    p('We may revise these terms from time to time. The revised version takes effect when posted. Continued use of the site means you accept the change.'),
  ],
};

const termsSv: LegalDoc = {
  title: 'Användarvillkor',
  blocks: [
    p('Dessa villkor gäller för din användning av Tailor Fantasy ("vi", "oss"). Genom att använda webbplatsen godkänner du dem. Om du inte godkänner dem ber vi dig att inte använda webbplatsen.'),
    h2('Användning av webbplatsen'),
    p('Du samtycker till att inte:'),
    ul([
      'Använda webbplatsen för något olagligt ändamål.',
      'Försöka få obehörig åtkomst till webbplatsen, dess servrar eller relaterade system.',
      'Störa webbplatsens drift, till exempel genom att skrapa innehåll i en takt som försämrar tjänsten för andra.',
      'Kopiera, sälja vidare eller sprida våra produktbilder eller katalogdata utan skriftligt tillstånd.',
    ]),
    h2('Produktinformation'),
    p('Vi strävar efter att beskriva produkterna korrekt, men vi garanterar inte att beskrivningar, bilder eller lagerstatus är felfria eller aktuella. Färger på skärmen kan skilja sig från den fysiska produkten. Vi kan rätta fel samt ändra eller sluta sälja produkter när som helst utan föregående meddelande.'),
    h2('Immateriella rättigheter'),
    p('Webbplatsen och dess innehåll, inklusive text, bilder och formgivning, ägs av Tailor Fantasy eller våra licensgivare och skyddas av immaterialrätten. Du får visa och dela innehållet endast för personligt, icke-kommersiellt bruk.'),
    h2('Länkar till tredje part'),
    p('Webbplatsen kan länka till webbplatser som drivs av tredje part. Vi kontrollerar dem inte och ansvarar inte för deras innehåll eller hantering av uppgifter.'),
    h2('Friskrivningar'),
    p('Webbplatsen tillhandahålls i befintligt skick och i mån av tillgänglighet, utan garantier av något slag, uttryckliga eller underförstådda, i den utsträckning lagen tillåter. Vi garanterar inte att webbplatsen är oavbruten, säker eller felfri.'),
    h2('Ansvarsbegränsning'),
    p('I den utsträckning lagen tillåter ansvarar Tailor Fantasy inte för indirekta skador, följdskador eller andra särskilda skador som uppstår genom din användning av webbplatsen. Inget i dessa villkor begränsar ansvar som inte får begränsas enligt lag, däribland ansvar för dödsfall eller personskada orsakad av vårdslöshet, eller för bedrägeri.'),
    h2('Skadeslöshet'),
    p('Du åtar dig att hålla oss skadeslösa mot krav som uppstår genom att du missbrukar webbplatsen eller bryter mot dessa villkor.'),
    h2('Avstängning'),
    p('Vi kan när som helst och utan föregående meddelande stänga av eller dra in åtkomsten till webbplatsen när vi rimligen bedömer det nödvändigt.'),
    h2('Tillämplig lag'),
    p('Dessa villkor regleras av lagen i [jurisdiktion], och domstolarna i [jurisdiktion] har exklusiv behörighet att pröva tvister, med förbehåll för de tvingande konsumentskydd som gäller för dig lokalt.'),
    h2('Ändringar'),
    p('Vi kan komma att revidera dessa villkor då och då. Den ändrade versionen gäller från det att den publiceras. Fortsatt användning av webbplatsen innebär att du accepterar ändringen.'),
  ],
};

export const LEGAL = {
  sv: { privacy: privacySv, terms: termsSv },
  en: { privacy: privacyEn, terms: termsEn },
};
