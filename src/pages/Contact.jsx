import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, MapPin, ShieldCheck } from "lucide-react";
import WhatsAppIcon from "../components/WhatsAppIcon.jsx";
import InstagramIcon from "../components/InstagramIcon.jsx";
import { whatsappUrl, chatMessage } from "../utils/whatsapp.js";
import { useLang } from "../i18n/LangContext.jsx";
import "../styles/pages.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Contact() {
  const { lang, t } = useLang();
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const setField = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {
      name: values.name.trim().length >= 2 ? undefined : t("contact.errName"),
      email: EMAIL_PATTERN.test(values.email.trim()) ? undefined : t("contact.errEmail"),
      message: values.message.trim().length >= 10 ? undefined : t("contact.errMessage"),
    };
    if (nextErrors.name || nextErrors.email || nextErrors.message) {
      setErrors(nextErrors);
      return;
    }
    setSent(true);
  };

  const CONTACT_CARDS = [
    {
      id: "wa",
      title: t("contact.c1t"),
      lines: [t("contact.c1a"), t("contact.c1b")],
      href: whatsappUrl(chatMessage(lang)),
      wa: true,
      aria: t("contact.c1aria"),
    },
    {
      id: "ig",
      title: t("contact.c2t"),
      lines: [t("contact.c2a"), t("contact.c2b")],
      href: "https://instagram.com/lazlo.electro",
      aria: t("contact.c2aria"),
    },
    {
      id: "shop",
      icon: MapPin,
      title: t("contact.c3t"),
      lines: [t("contact.c3a"), t("contact.c3b")],
    },
    {
      id: "hours",
      icon: Clock,
      title: t("contact.c4t"),
      lines: [t("contact.c4a"), t("contact.c4b")],
    },
  ];

  return (
    <div className="page">
      <div className="container">
        <header className="page__head">
          <p className="eyebrow">{t("contact.eyebrow")}</p>
          <h1 className="page__title">{t("contact.title")}</h1>
          <p className="page__sub">{t("contact.sub")}</p>
        </header>

        <div className="contact-grid">
          <ul className="contact-cards">
            {CONTACT_CARDS.map((card) => {
              const inner = (
                <>
                  <span className="value-card__icon">
                    {card.wa ? (
                      <WhatsAppIcon size={20} />
                    ) : card.icon ? (
                      <card.icon size={20} strokeWidth={1.7} aria-hidden="true" />
                    ) : (
                      <InstagramIcon size={20} />
                    )}
                  </span>
                  <div>
                    <h3>{card.title}</h3>
                    {card.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </>
              );
              return card.href ? (
                <li key={card.id} className="contact-card">
                  <a className="contact-card__link" href={card.href} target="_blank" rel="noopener noreferrer" aria-label={card.aria}>
                    {inner}
                  </a>
                </li>
              ) : (
                <li key={card.id} className="contact-card">{inner}</li>
              );
            })}
          </ul>

          <section className="contact-form-block" aria-label={t("contact.eyebrow")}>
            {sent ? (
              <div className="form-success" role="status">
                <ShieldCheck size={26} strokeWidth={1.6} aria-hidden="true" />
                <h2>{t("contact.successTitle")}</h2>
                <p>
                  {t("contact.successBody")} <Link to="/help/faqs">{t("footer.faqs")}</Link>.
                </p>
                <button type="button" className="btn btn--light" onClick={() => setSent(false)}>
                  {t("contact.writeAnother")}
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <p className="demo-note demo-note--static">
                  <ShieldCheck size={14} aria-hidden="true" /> {t("contact.demoNote")}
                  {errors.name || errors.email || errors.message ? t("contact.demoNoteFix") : ""}
                </p>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="contact-name">{t("contact.name")}</label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={setField("name")}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      className={errors.name ? "has-error" : ""}
                    />
                    {errors.name ? (
                      <p className="form-error" id="contact-name-error">{errors.name}</p>
                    ) : null}
                  </div>
                  <div className="form-field">
                    <label htmlFor="contact-email">{t("contact.email")}</label>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      placeholder={t("contact.emailPh")}
                      value={values.email}
                      onChange={setField("email")}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      className={errors.email ? "has-error" : ""}
                    />
                    {errors.email ? (
                      <p className="form-error" id="contact-email-error">{errors.email}</p>
                    ) : null}
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="contact-message">{t("contact.message")}</label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder={t("contact.messagePh")}
                    value={values.message}
                    onChange={setField("message")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    className={errors.message ? "has-error" : ""}
                  />
                  {errors.message ? (
                    <p className="form-error" id="contact-message-error">{errors.message}</p>
                  ) : null}
                </div>
                <div className="form-row form-row--foot">
                  <button type="submit" className="btn btn--accent">
                    {t("contact.send")}
                  </button>
                  <p className="form-hint">
                    {t("contact.hint")}{" "}
                    <a href={whatsappUrl(chatMessage(lang))} target="_blank" rel="noopener noreferrer">
                      {t("contact.hintLink")}
                    </a>{" "}
                    {t("contact.faqLink")}
                  </p>
                </div>
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
