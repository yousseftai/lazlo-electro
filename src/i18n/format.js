import { state } from "./state.js";

/**
 * Prices are stored in the catalog as "reference USD" numbers.
 * They are displayed in Moroccan dirham after a single conversion factor,
 * so the client can reprice the whole catalogue by editing one constant.
 */
export const USD_TO_MAD = 10;

function groupNumber(n) {
  // fr-FR groups with (narrow no-break) spaces: "12 790" — the convention used
  // in Morocco for dirham prices (Latin digits in FR, AR and EN).
  return new Intl.NumberFormat("fr-FR").format(n);
}

/**
 * Format an amount as Moroccan dirham for the active language.
 * fr/en → "12 790 DH" · ar → "12 790 د.م." (Latin digits, Moroccan convention)
 */
export function formatPrice(value) {
  const spoken = Math.round((Number(value) || 0) * USD_TO_MAD);
  const suffix = state.lang === "ar" ? " د.م." : " DH";
  return `${groupNumber(spoken)}${suffix}`;
}

/** Plain number formatting for counts that must not carry a currency. */
export function formatNumber(n) {
  return groupNumber(n);
}

const RAM_MESSAGES = { fr: (n) => `RAM ${n} Go`, ar: (n) => `رام ${n} جيجا`, en: (n) => `${n}GB RAM` };
const RAM_TB = { fr: (n) => `RAM ${n} To`, ar: (n) => `رام ${n} تيرا`, en: (n) => `${n}TB RAM` };
const SSD = { fr: (n) => `SSD ${n} Go`, ar: (n) => `SSD ${n} جيجا`, en: (n) => `${n}GB SSD` };
const SSD_TB = { fr: (n) => `SSD ${n} To`, ar: (n) => `SSD ${n} تيرا`, en: (n) => `${n}TB SSD` };

/**
 * Localize the "8GB RAM · 256GB SSD · 14\"" spec line that lives in the
 * product data. Unknown patterns pass through unchanged.
 */
export function formatSpecs(product) {
  const lang = state.lang;
  const localizeSize = (raw) => {
    let m = raw.match(/^(\d+(?:\.\d+)?)TB\s+RAM$/);
    if (m) return RAM_TB[lang](m[1]);
    m = raw.match(/^(\d+(?:\.\d+)?)GB\s+RAM$/);
    if (m) return RAM_MESSAGES[lang](m[1]);
    m = raw.match(/^(\d+(?:\.\d+)?)TB\s+SSD$/);
    if (m) return SSD_TB[lang](m[1]);
    m = raw.match(/^(\d+(?:\.\d+)?)GB\s+SSD$/);
    if (m) return SSD[lang](m[1]);
    return raw;
  };
  const localizeScreen = (raw) => {
    const m = raw.match(/^(\d+(?:\.\d+)？?)"$/);
    if (m) return lang === "fr" ? `${m[1].replace(".", ",")}″` : raw;
    return raw;
  };
  return [product.ram, product.storage, product.screen].map((raw) => {
    const s = localizeSize(raw);
    return s === raw ? localizeScreen(raw) : s;
  }).join(" · ");
}
