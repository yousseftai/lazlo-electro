import WhatsAppIcon from "./WhatsAppIcon.jsx";
import { whatsappUrl, chatMessage } from "../utils/whatsapp.js";
import { useLang } from "../i18n/LangContext.jsx";
import "../styles/whatsapp.css";

/**
 * Floating "Chat on WhatsApp" pill shown on every page (like iris.ma).
 * Opens the store's WhatsApp chat in a new tab — no message is sent
 * automatically and nothing is stored.
 */
export default function WhatsAppBubble() {
  const { lang, t } = useLang();
  return (
    <a
      className="wa-bubble"
      href={whatsappUrl(chatMessage(lang))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("chat.bubble")}
    >
      <span className="wa-bubble__icon">
        <WhatsAppIcon size={24} />
      </span>
      <span className="wa-bubble__text">
        <strong>{t("chat.strong")}</strong>
        <small>{t("chat.small")}</small>
      </span>
    </a>
  );
}
