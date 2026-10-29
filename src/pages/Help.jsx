import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useLang } from "../i18n/LangContext.jsx";
import "../styles/pages.css";

/**
 * Help & policies. Each section is anchored so footer links like
 * "/help/shipping" land somewhere real. All copy is honest demo content,
 * translated per site language.
 */
const SECTIONS = [
  { id: "shipping", title: "help.s.shipping", paras: ["help.s.shipping1", "help.s.shipping2"] },
  { id: "returns", title: "help.s.returns", paras: ["help.s.returns1", "help.s.returns2"] },
  { id: "warranty", title: "help.s.warranty", paras: ["help.s.warranty1"] },
  { id: "payment", title: "help.s.payment", paras: ["help.s.payment1", "help.s.payment2"] },
  { id: "track-order", title: "help.s.track", paras: ["help.s.track1"] },
  {
    id: "faqs",
    title: "help.s.faqs",
    faqs: [
      { q: "help.faq.q1", a: "help.faq.a1" },
      { q: "help.faq.q2", a: "help.faq.a2" },
      { q: "help.faq.q3", a: "help.faq.a3" },
      { q: "help.faq.q4", a: "help.faq.a4" },
    ],
  },
  { id: "terms", title: "help.s.terms", paras: ["help.s.terms1"] },
  { id: "privacy", title: "help.s.privacy", paras: ["help.s.privacy1"] },
];

export default function Help() {
  const { section } = useParams();
  const navigate = useNavigate();
  const { t } = useLang();

  useEffect(() => {
    if (SECTIONS.some((s) => s.id === section)) {
      const anchor = document.getElementById(section);
      anchor?.scrollIntoView({ block: "start", behavior: "auto" });
    }
  }, [section]);

  return (
    <div className="page help">
      <div className="container help__layout">
        <aside className="help__nav" aria-label={t("help.navAria")}>
          <h2>{t("help.navTitle")}</h2>
          <ul>
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <Link to={`/help/${s.id}`} className={`help__nav-link${section === s.id ? " is-active" : ""}`}>
                  {t(s.title)}
                </Link>
              </li>
            ))}
          </ul>
          <p className="help__nav-note">
            {t("help.navNote")} <Link to="/contact">{t("help.navNoteLink")}</Link>
          </p>
        </aside>

        <div className="help__content">
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className="help__section" aria-label={t(s.title)}>
              <h2>{t(s.title)}</h2>
              {s.paras?.map((key) => (
                <p key={key}>{t(key)}</p>
              ))}
              {s.faqs ? (
                <dl className="help-faq">
                  {s.faqs.map((faq) => (
                    <div key={faq.q}>
                      <dt>{t(faq.q)}</dt>
                      <dd>{t(faq.a)}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </section>
          ))}

          <div className="help-back">
            <button type="button" className="link-arrow" onClick={() => navigate("/")}>
              <ArrowLeft size={14} aria-hidden="true" /> {t("help.backHome")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
