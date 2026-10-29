import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeader from "../components/SectionHeader.jsx";
import { BrandMark } from "../components/BrandLogos.jsx";
import { BRANDS, products } from "../data/products.js";
import { useLang } from "../i18n/LangContext.jsx";
import "../styles/pages.css";

/** Brand directory — every card filters the shop. */
export default function Brands() {
  const { t, tPlural } = useLang();
  return (
    <div className="page">
      <div className="container">
        <SectionHeader
          eyebrow={t("brands.browseEyebrow")}
          title={t("brands.browseTitle")}
          description={t("brands.browseDesc")}
        />

        <div className="brands-directory">
          {BRANDS.map((brand) => {
            const list = products.filter((product) => product.brand === brand.id);
            return (
              <Link key={brand.id} to={`/shop?brand=${brand.id}`} className="brand-card">
                <BrandMark id={brand.id} height={24} />
                <span className="brand-card__count">{tPlural(list.length, "brands.inStore")}</span>
                <span className="brand-card__cta">
                  {t("brands.viewLaptops")} <ArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
