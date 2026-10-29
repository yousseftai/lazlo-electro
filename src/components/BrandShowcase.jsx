import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader.jsx";
import { BrandMark } from "./BrandLogos.jsx";
import { BRANDS, products } from "../data/products.js";
import { useLang } from "../i18n/LangContext.jsx";
import "../styles/sections.css";

/** Brand row. Every logo links to the shop filtered by that brand. */
export default function BrandShowcase() {
  const { t } = useLang();
  return (
    <section className="section brands" aria-labelledby="brands-heading">
      <div className="container">
        <SectionHeader eyebrow={t("brands.eyebrow")} title={t("brands.title")} />
        <ul className="brands__row" id="brands-heading">
          {BRANDS.map((brand) => {
            const count = products.filter((p) => p.brand === brand.id).length;
            return (
              <li key={brand.id}>
                <Link
                  to={`/shop?brand=${brand.id}`}
                  className="brands__logo"
                  aria-label={t("brands.shopAria", { brand: brand.label, n: count })}
                >
                  <BrandMark id={brand.id} height={22} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
