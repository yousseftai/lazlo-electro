import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import NewsletterForm from "./NewsletterForm.jsx";
import WhatsAppIcon from "./WhatsAppIcon.jsx";
import InstagramIcon from "./InstagramIcon.jsx";
import { whatsappUrl } from "../utils/whatsapp.js";
import { useLang } from "../i18n/LangContext.jsx";
import "../styles/footer.css";

const CURRENT_YEAR = new Date().getFullYear();

/* Brand glyphs for social links (kept inline; lucide v1 no longer ships brand icons) */
function InstagramGlyph() {
  return <InstagramIcon size={16} />;
}

const FOOTER_COLUMNS = [
  {
    title: "footer.colShop",
    links: [
      { key: "footer.l.all", to: "/shop" },
      { key: "footer.l.gaming", to: "/shop?category=gaming" },
      { key: "footer.l.business", to: "/shop?category=business" },
      { key: "footer.l.student", to: "/shop?category=student" },
      { key: "footer.l.accessories", to: "/shop?category=accessories" },
    ],
  },
  {
    title: "footer.colSupport",
    links: [
      { key: "footer.delivery", to: "/help/shipping" },
      { key: "footer.returns", to: "/help/returns" },
      { key: "footer.faqs", to: "/help/faqs" },
      { key: "footer.warranty", to: "/help/warranty" },
      { key: "footer.track", to: "/help/track-order" },
      { key: "footer.payment", to: "/help/payment" },
      { key: "footer.terms", to: "/help/terms" },
      { key: "footer.privacy", to: "/help/privacy" },
    ],
  },
];

/* Only real, verified channels — no placeholder social profiles. */
const SOCIAL_LINKS = [
  { id: "WhatsApp", href: whatsappUrl(), Icon: WhatsAppIcon },
  { id: "Instagram", href: "https://instagram.com/lazlo.electro", Icon: InstagramGlyph },
];

const PAYMENT_METHODS = [
  { label: "Visa", logo: "/img/pay/visa.svg" },
  { label: "Mastercard", logo: "/img/pay/mastercard.svg" },
  { label: "PayPal", logo: "/img/pay/paypal.svg" },
  { label: "Apple Pay", logo: "/img/pay/applepay.svg" },
];

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand-col">
          <Link to="/" className="header__logo footer__logo" aria-label={t("header.homeAria")}>
            <Logo />
          </Link>
          <p className="footer__tagline">{t("footer.tagline")}</p>
          <ul className="footer__social" aria-label={t("footer.socialAria")}>
            {SOCIAL_LINKS.map((social) => (
              <li key={social.id}>
                <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={t("footer.onBrand", { name: social.id })}>
                  <social.Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <nav key={column.title} className="footer__col" aria-label={t(column.title)}>
            <h3 className="footer__heading">{t(column.title)}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link.key}>
                  <Link to={link.to}>{t(link.key)}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="footer__col footer__col--newsletter">
          <h3 className="footer__heading">{t("footer.newsletter")}</h3>
          <p className="footer__tagline">{t("footer.newsletterTag")}</p>
          <NewsletterForm />
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>{t("footer.bottom", { y: CURRENT_YEAR })} {t("footer.bottomNote")}</p>
          <ul className="footer__payments" aria-label={t("footer.paymentsLabel")}>
            {PAYMENT_METHODS.map((method) => (
              <li key={method.label}>
                <img src={method.logo} alt={method.label} width="46" height="18" loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
