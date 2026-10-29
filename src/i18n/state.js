/** Mutable i18n state read by non-React helpers (price/spec formatting). */
export const state = { lang: "fr" };

export function setLangState(lang) {
  state.lang = lang;
}
