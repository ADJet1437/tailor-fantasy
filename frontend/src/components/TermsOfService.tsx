import { LEGAL } from '../i18n/legal';
import { useLanguage } from '../i18n/useLanguage';
import LegalPage from './LegalPage';

const TermsOfService = () => {
  const { lang } = useLanguage();
  return <LegalPage doc={LEGAL[lang].terms} />;
};

export default TermsOfService;
