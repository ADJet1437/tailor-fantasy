import LegalPage from './LegalPage';

/**
 * TEMPLATE ONLY -- not legal advice and not reviewed by a lawyer.
 * Replace every [bracketed] value and have counsel check it before publishing.
 */
const TermsOfService = () => (
  <LegalPage title="Terms of Service">
    <p>
      These terms govern your use of Tailor Fantasy ("we", "us"). By using the
      site you agree to them. If you do not agree, please do not use the site.
    </p>

    <h2>Use of the Site</h2>
    <p>You agree not to:</p>
    <ul>
      <li>Use the site for any unlawful purpose.</li>
      <li>
        Attempt to gain unauthorised access to the site, its servers, or related
        systems.
      </li>
      <li>
        Interfere with the site's operation, including by scraping at a rate
        that degrades service for others.
      </li>
      <li>
        Copy, resell, or redistribute our product images or catalogue data
        without written permission.
      </li>
    </ul>

    <h2>Product Information</h2>
    <p>
      We aim to describe products accurately, but we do not warrant that
      descriptions, images, or availability are error-free or current. Colours
      shown on screen may differ from the physical product. We may correct
      errors and change or discontinue products at any time without notice.
    </p>

    <h2>Intellectual Property</h2>
    <p>
      The site and its contents, including text, images, and design, are owned
      by Tailor Fantasy or its licensors and are protected by
      intellectual property law. You may view and share content for personal,
      non-commercial use only.
    </p>

    <h2>Third-Party Links</h2>
    <p>
      The site may link to third-party sites. We do not control them and are not
      responsible for their content or practices.
    </p>

    <h2>Disclaimers</h2>
    <p>
      The site is provided "as is" and "as available", without warranties of any
      kind, whether express or implied, to the fullest extent permitted by law.
      We do not warrant that the site will be uninterrupted, secure, or
      error-free.
    </p>

    <h2>Limitation of Liability</h2>
    <p>
      To the fullest extent permitted by law, Tailor Fantasy shall not be
      liable for any indirect, incidental, special, consequential, or punitive
      damages arising from your use of the site. Nothing in these terms excludes
      liability that cannot be excluded by law, including for death or personal
      injury caused by negligence, or for fraud.
    </p>

    <h2>Indemnity</h2>
    <p>
      You agree to indemnify us against claims arising from your misuse of the
      site or breach of these terms.
    </p>

    <h2>Termination</h2>
    <p>
      We may suspend or withdraw access to the site at any time, without notice,
      where we reasonably consider it necessary.
    </p>

    <h2>Governing Law</h2>
    <p>
      These terms are governed by the laws of [jurisdiction], and the courts of
      [jurisdiction] have exclusive jurisdiction over any dispute, subject to
      any mandatory consumer protections available to you locally.
    </p>

    <h2>Changes</h2>
    <p>
      We may revise these terms from time to time. The revised version takes
      effect when posted. Continued use of the site means you accept the
      change.
    </p>
  </LegalPage>
);

export default TermsOfService;
