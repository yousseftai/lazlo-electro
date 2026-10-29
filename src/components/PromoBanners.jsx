import { Link } from "react-router-dom";
import { ArrowLeftRight, GraduationCap } from "lucide-react";
import SafeImage from "./SafeImage.jsx";
import { useLang } from "../i18n/LangContext.jsx";
import "../styles/sections.css";

/**
 * Two promo panels. Both lead to real pages that explain the flow —
 * neither claims that a discount has been verified or a trade-in quoted.
 */
export default function PromoBanners() {
  const { t } = useLang();
  return (
    <section className="section promos" aria-label={t("promos.aria")}>
      <div className="container promos__grid">
        <article className="promo promo--student">
          <div className="promo__copy">
            <p className="eyebrow promo__eyebrow promo__eyebrow--green">{t("promos.studentEyebrow")}</p>
            <h3 className="promo__title">{t("promos.studentTitle")}</h3>
            <p className="promo__sub">{t("promos.studentSub")}</p>
            <div className="promo__actions">
              <Link to="/contact" className="btn btn--green">
                {t("promos.verify")}
              </Link>
              <p className="promo__note">{t("promos.studentNote")}</p>
            </div>
          </div>
          <div className="promo__media">
            <SafeImage src="/img/promo-student.jpg" alt="Students working together on laptops" loading="lazy" decoding="async" />
            <span className="promo__chip" aria-hidden="true">
              <GraduationCap size={16} />
              {t("promos.studentChip")}
            </span>
          </div>
        </article>

        <article className="promo promo--trade">
          <div className="promo__copy">
            <p className="eyebrow promo__eyebrow promo__eyebrow--blue">{t("promos.tradeEyebrow")}</p>
            <h3 className="promo__title">{t("promos.tradeTitle")}</h3>
            <p className="promo__sub promo__sub--muted">{t("promos.tradeSub")}</p>
            <div className="promo__actions">
              <Link to="/about#trade-in" className="btn btn--blue">
                {t("promos.learnMore")}
              </Link>
              <p className="promo__note">{t("promos.tradeNote")}</p>
            </div>
          </div>
          <div className="promo__media">
            <SafeImage src="/img/promo-tradein.jpg" alt="A previous laptop on a wooden desk, ready to be exchanged" loading="lazy" decoding="async" />
            <span className="promo__chip promo__chip--blue" aria-hidden="true">
              <ArrowLeftRight size={16} />
              {t("promos.tradeChip")}
            </span>
          </div>
        </article>
      </div>
    </section>
  );
}
