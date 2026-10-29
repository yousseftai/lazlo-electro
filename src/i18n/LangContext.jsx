import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LANG, LANGS, translate } from "./strings.js";
import { setLangState } from "./state.js";

const STORAGE_KEY = "laptophub.lang.v1";

function loadLang() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw && LANGS.some((l) => l.id === raw)) return raw;
  } catch {
    // storage unavailable → default
  }
  return DEFAULT_LANG;
}

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(loadLang);

  // Keep the non-React formatters (prices, specs) in sync.
  setLangState(lang);

  // <html lang dir> + document title, per language.
  useEffect(() => {
    const meta = LANGS.find((l) => l.id === lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = translate(lang, "doc.title");
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch { /* session-only */ }
    return () => { void meta; };
  }, [lang]);

  const t = useCallback(
    (key, vars) => translate(lang, key, vars),
    [lang]
  );

  // Simple English-style plural helper: tPlural(n, "cart.count") → {n} + {s} injection.
  const tPlural = useCallback(
    (n, key) => translate(lang, key, { n, s: n === 1 ? "" : "s" }),
    [lang]
  );

  // Arabic has no "-s"; strings contain {s} that stays empty there.
  const value = useMemo(
    () => ({ lang, setLang, t, tPlural, dir: lang === "ar" ? "rtl" : "ltr" }),
    [lang, t, tPlural]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
