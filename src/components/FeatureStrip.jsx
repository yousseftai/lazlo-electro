import { BatteryCharging, Cpu, Feather, Monitor } from "lucide-react";
import { useLang } from "../i18n/LangContext.jsx";
import "../styles/sections.css";

const FEATURES = [
  { icon: Cpu, title: "features.f1t", desc: "features.f1d" },
  { icon: BatteryCharging, title: "features.f2t", desc: "features.f2d" },
  { icon: Monitor, title: "features.f3t", desc: "features.f3d" },
  { icon: Feather, title: "features.f4t", desc: "features.f4d" },
];

export default function FeatureStrip() {
  const { t } = useLang();
  return (
    <section className="features" aria-label={t("features.aria")}>
      <div className="container">
        <ul className="features__panel">
          {FEATURES.map((feature) => (
            <li key={feature.title} className="features__item">
              <span className="features__icon">
                <feature.icon size={26} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <div>
                <h3 className="features__title">{t(feature.title)}</h3>
                <p className="features__desc">{t(feature.desc)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
