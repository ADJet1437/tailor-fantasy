import LegalPage from './LegalPage';

/**
 * TEMPLATE ONLY -- not legal advice and not reviewed by a lawyer.
 * Replace every [bracketed] value and have counsel check it before publishing.
 */
const PrivacyPolicy = () => (
  <LegalPage title="Privacy Policy">
    <p>
      This policy explains what information Tailor Fantasy ("we", "us")
      collects when you visit this site, how we use it, and the choices you
      have. It applies to this website only.
    </p>

    <h2>Information We Collect</h2>
    <p>We keep collection to the minimum needed to run the site:</p>
    <ul>
      <li>
        <strong>Information you give us.</strong> If you contact us, we receive
        whatever you include in that message, such as your name and email
        address.
      </li>
      <li>
        <strong>Technical information.</strong> Our servers record standard
        request data such as IP address, browser type, and the pages requested.
        This is used to operate and secure the service.
      </li>
    </ul>
    <p>
      We do not require an account to browse the catalogue, and we do not ask
      for payment details on this site.
    </p>

    <h2>How We Use Information</h2>
    <ul>
      <li>To display the product catalogue and serve product images.</li>
      <li>To respond to enquiries you send us.</li>
      <li>To diagnose faults, prevent abuse, and keep the site secure.</li>
      <li>To meet legal or regulatory obligations.</li>
    </ul>
    <p>We do not sell your personal information.</p>

    <h2>Cookies</h2>
    <p>
      We use only cookies and similar storage that are strictly necessary for
      the site to function. We do not use advertising cookies. If we introduce
      analytics or marketing cookies in future, we will ask for your consent
      first and update this policy.
    </p>

    <h2>Sharing</h2>
    <p>
      We share personal information only with service providers who host and
      operate the site on our behalf, and only as far as they need it. We may
      also disclose information where required by law, or to protect our rights
      and the safety of our users.
    </p>

    <h2>Retention</h2>
    <p>
      We keep information only as long as needed for the purposes above, or as
      required by law. Server logs are retained for [retention period] and then
      deleted.
    </p>

    <h2>Your Rights</h2>
    <p>
      Depending on where you live, you may have the right to access, correct,
      delete, or export your personal information, to object to or restrict
      certain processing, and to withdraw consent. To exercise any of these,
      contact us at [contact email]. You may also complain to your local data
      protection authority.
    </p>

    <h2>Security</h2>
    <p>
      We take reasonable technical and organisational measures to protect
      personal information. No method of transmission or storage is completely
      secure, so we cannot guarantee absolute security.
    </p>

    <h2>International Transfers</h2>
    <p>
      Your information may be processed in Sweden. Where information
      leaves your jurisdiction, we rely on appropriate safeguards for the
      transfer.
    </p>

    <h2>Changes</h2>
    <p>
      We may update this policy from time to time. The revised version takes
      effect when posted.
    </p>
  </LegalPage>
);

export default PrivacyPolicy;
