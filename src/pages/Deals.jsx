import { useMemo } from "react";
import { Link } from "react-router-dom";
import { BadgePercent, SearchX } from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";
import { discountPercent, products } from "../data/products.js";
import { useLang } from "../i18n/LangContext.jsx";
import "../styles/pages.css";

/** Deals: the biggest discounts in the catalogue, biggest first. */
export default function Deals() {
  const { t } = useLang();
  const deals = useMemo(
    () => [...products].sort((a, b) => discountPercent(b) - discountPercent(a)).slice(0, 6),
    []
  );

  return (
    <div className="page">
      <div className="container">
        <header className="page__head">
          <p className="eyebrow eyebrow--accent">{t("deals.eyebrow")}</p>
          <h1 className="page__title">{t("deals.title")}</h1>
          <p className="page__sub">{t("deals.sub")}</p>
        </header>

        {deals.length === 0 ? (
          <div className="empty-state">
            <SearchX size={42} strokeWidth={1.4} aria-hidden="true" />
            <h2>{t("deals.emptyTitle")}</h2>
            <p>{t("deals.emptyBody")}</p>
            <Link to="/shop" className="btn btn--dark">
              {t("deals.backShop")}
            </Link>
          </div>
        ) : (
          <>
            <div className="product-grid product-grid--shop">
              {deals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="deals-cta">
              <BadgePercent size={18} aria-hidden="true" />
              <p>
                {t("deals.match")} <Link to="/contact">{t("deals.matchLink")}</Link>
                {t("deals.matchTail")}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
