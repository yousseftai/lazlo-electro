import { useState } from "react";
import { useLang } from "../i18n/LangContext.jsx";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Footer newsletter form. Purely client-side: it validates the address and
 * shows honest feedback — it does not claim a real newsletter subscription.
 */
export default function NewsletterForm() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | error | success

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <form className="newsletter" onSubmit={handleSubmit} noValidate>
      <div className={`newsletter__field${status === "error" ? " has-error" : ""}`}>
        <label htmlFor="newsletter-email" className="sr-only">
          {t("contact.email")}
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder={t("nl.placeholder")}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "idle") setStatus("idle");
          }}
        />
        <button type="submit" className="newsletter__submit" aria-label={t("nl.subscribe")}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m5 19 14-7-14-7v6l9 1-9 1z" />
          </svg>
        </button>
      </div>
      <p className="newsletter__status" role="status" aria-live="polite">
        {status === "error" ? t("nl.error") : ""}
        {status === "success" ? t("nl.success") : ""}
      </p>
    </form>
  );
}
