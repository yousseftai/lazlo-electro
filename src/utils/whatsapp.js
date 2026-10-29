/**
 * WhatsApp ordering (no online payment).
 *
 * The store takes orders directly in WhatsApp chat, like iris.ma does:
 * the customer sends a pre-filled cart message and confirms with the team.
 * Centralised here so the phone number lives in exactly one place.
 */

/** Lazlo.Electro WhatsApp business number (from the client's Instagram bio, international format). */
export const WHATSAPP_NUMBER = "212660730284";

/** Greeting used by the generic "chat with us" links, per site language. */
export function chatMessage(lang = "fr") {
  if (lang === "ar") return "مرحباً Lazlo.Electro 👋 عندي سؤال على اللابتوبات ديالكم.";
  if (lang === "en") return "Hello Lazlo.Electro 👋 I have a question about your laptops.";
  return "Bonjour Lazlo.Electro 👋 J'ai une question sur vos laptops.";
}

/** Build a wa.me link — pass a message to pre-fill the chat text. */
export function whatsappUrl(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Pre-filled order message from the current cart lines, in the site language.
 * Lines: {qty, lineTotal, product:{name}} — totals are already dirham strings.
 */
export function buildOrderMessage(lines, subtotal, formatPrice, lang = "fr") {
  const items = lines
    .map((line) => `• ${line.product.name} × ${line.qty} — ${formatPrice(line.lineTotal)}`)
    .join("\n");
  if (lang === "ar") {
    return [
      "مرحباً Lazlo.Electro 👋",
      "بغيت نطلب من الموقع:",
      "",
      items,
      "",
      `المجموع: ${formatPrice(subtotal)}`,
      "",
      "مرجو تأكيد التوفر والتوصيل. 🙏",
    ].join("\n");
  }
  if (lang === "en") {
    return [
      "Hello Lazlo.Electro 👋",
      "I'd like to order from the website:",
      "",
      items,
      "",
      `Total: ${formatPrice(subtotal)}`,
      "",
      "Please confirm availability and delivery, thanks. 🙏",
    ].join("\n");
  }
  return [
    "Bonjour Lazlo.Electro 👋",
    "Je souhaite commander depuis le site :",
    "",
    items,
    "",
    `Total : ${formatPrice(subtotal)}`,
    "",
    "Merci de me confirmer la disponibilité et la livraison. 🙏",
  ].join("\n");
}

/** wa.me link with the whole cart pre-filled as the chat message. */
export function whatsappOrderUrl(lines, subtotal, formatPrice, lang = "fr") {
  return whatsappUrl(buildOrderMessage(lines, subtotal, formatPrice, lang));
}
