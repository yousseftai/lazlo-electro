import { CreditCard, Headphones, ShieldCheck, Truck } from "lucide-react";
import { useLang } from "../i18n/LangContext.jsx";
import "../styles/sections.css";

/**
 * Dark benefits strip. Copy is configurable demo content — live store
 * policies would come from the real business data.
 */
const BENEFITS = [
  { icon: Truck, title: "benefits.b1t", desc: "benefits.b1d" },
  { icon: ShieldCheck, title: "benefits.b2t", desc: "benefits.b2d" },
  { icon: Headphones, title: "benefits.b3t", desc: "benefits.b3d" },
  { icon: CreditCard, title: "benefits.b4t", desc: "benefits.b4d" },
];

export default function BenefitsBar() {
  const { t } = useLang();
  return (
    <section className="benefits" aria-label={t("benefits.aria")}>
      <div className="container benefits__grid">
        {BENEFITS.map((benefit) => (
          <div key={benefit.title} className="benefits__item">
            <span className="benefits__icon">
              <benefit.icon size={22} strokeWidth={1.7} aria-hidden="true" />
            </span>
            <div>
              <h3 className="benefits__title">{t(benefit.title)}</h3>
              <p className="benefits__desc">{t(benefit.desc)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
