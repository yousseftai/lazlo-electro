import { Link } from "react-router-dom";
import { ArrowRight, Lock, RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import SafeImage from "./SafeImage.jsx";
import { useLang } from "../i18n/LangContext.jsx";
import "../styles/hero.css";

const HERO_PERKS = [
  { icon: Truck, key: "hero.perk.shipping" },
  { icon: ShieldCheck, key: "hero.perk.warranty" },
  { icon: RefreshCcw, key: "hero.perk.returns" },
  { icon: Lock, key: "hero.perk.secure" },
];

export default function Hero() {
  const { t } = useLang();
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">{t("hero.eyebrow")}</p>
          <h1 className="hero__title">
            {t("hero.title1")} <span className="hero__highlight">{t("hero.titleHi")}</span>
          </h1>
          <p className="hero__lead">{t("hero.lead")}</p>

          <div className="hero__actions">
            <Link to="/shop" className="btn btn--accent btn--lg">
              {t("hero.shopNow")} <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link to="/deals" className="btn btn--ghost btn--lg">
              {t("hero.exploreDeals")}
            </Link>
          </div>

          <ul className="hero__perks">
            {HERO_PERKS.map((perk) => (
              <li key={perk.key}>
                <perk.icon size={15} aria-hidden="true" />
                <span>{t(perk.key)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__media">
          <SafeImage
            src="/img/hero-laptop.jpg"
            alt={t("hero.alt")}
            width="680"
            height="620"
            fetchPriority="high"
          />
          <div className="hero__badge">
            <span className="hero__badge-label">{t("hero.badgeUp")}</span>
            <strong className="hero__badge-value">30%</strong>
            <span className="hero__badge-label">{t("hero.badgeOff")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
