import { Link } from "react-router-dom";
import { ArrowLeftRight, BadgeDollarSign, GraduationCap, Trophy } from "lucide-react";
import SectionHeader from "../components/SectionHeader.jsx";
import { useLang } from "../i18n/LangContext.jsx";
import "../styles/pages.css";

const VALUES = [
  { icon: Trophy, title: "about.v1t", copy: "about.v1c" },
  { icon: BadgeDollarSign, title: "about.v2t", copy: "about.v2c" },
  { icon: GraduationCap, title: "about.v3t", copy: "about.v3c" },
  { icon: ArrowLeftRight, title: "about.v4t", copy: "about.v4c" },
];

export default function About() {
  const { t } = useLang();
  return (
    <div className="page">
      <div className="container">
        <header className="page__head">
          <p className="eyebrow">{t("about.eyebrow")}</p>
          <h1 className="page__title">{t("about.title")}</h1>
          <p className="page__sub">{t("about.sub")}</p>
        </header>

        <div className="about-split">
          <img
            src="/img/macbook-air-m3.jpg"
            alt={t("about.alt")}
            loading="lazy"
            decoding="async"
          />
          <div>
            <h2>{t("about.storyTitle")}</h2>
            <p>{t("about.story1")}</p>
            <p>{t("about.story2")}</p>
          </div>
        </div>

        <div className="values-grid">
          {VALUES.map((value) => (
            <article key={value.title} className="value-card">
              <span className="value-card__icon">
                <value.icon size={20} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h3>{t(value.title)}</h3>
              <p>{t(value.copy)}</p>
            </article>
          ))}
        </div>

        <section className="demo-programs" aria-labelledby="trade-in">
          <h2 id="trade-in">{t("about.programsTitle")}</h2>
          <div className="demo-programs__grid">
            <article>
              <h3>
                <GraduationCap size={17} aria-hidden="true" /> {t("about.p1t")}
              </h3>
              <p>{t("about.p1c")}</p>
            </article>
            <article>
              <h3>
                <ArrowLeftRight size={17} aria-hidden="true" /> {t("about.p2t")}
              </h3>
              <p>{t("about.p2c")}</p>
            </article>
            <article>
              <h3>
                <BadgeDollarSign size={17} aria-hidden="true" /> {t("about.p3t")}
              </h3>
              <p>{t("about.p3c")}</p>
            </article>
          </div>
        </section>

        <section className="credits">
          <h2>{t("about.creditsTitle")}</h2>
          <p>
            {t("about.credits")}{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Tokyo-Game-Show-2025_0121.jpg" target="_blank" rel="noopener noreferrer">
              source
            </a>
            {t("about.creditsTail")}
          </p>
        </section>

        <SectionHeader
          eyebrow={t("about.qEyebrow")}
          title={t("about.qTitle")}
          action={
            <Link to="/contact" className="btn btn--dark">
              {t("nav.contact")}
            </Link>
          }
        />
      </div>
    </div>
  );
}
