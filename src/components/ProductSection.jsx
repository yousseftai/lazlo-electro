import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard.jsx";
import SectionHeader from "./SectionHeader.jsx";
import { products } from "../data/products.js";
import { useLang } from "../i18n/LangContext.jsx";

const PAGE_SIZE = 4;

/** "Popular Laptops" section: a 4-up grid with working pagination dots. */
export default function ProductSection() {
  const { t } = useLang();
  const [pageIndex, setPageIndex] = useState(0);
  const pageCount = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const visible = products.slice(pageIndex * PAGE_SIZE, pageIndex * PAGE_SIZE + PAGE_SIZE);

  return (
    <section className="section popular" aria-labelledby="popular-heading">
      <div className="container">
        <SectionHeader
          eyebrow={t("popular.eyebrow")}
          title={t("popular.title")}
          action={
            <Link to="/shop" className="link-arrow">
              {t("popular.viewAll")} <ArrowRight size={15} aria-hidden="true" />
            </Link>
          }
        />

        <div className="product-grid" key={pageIndex}>
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {pageCount > 1 ? (
          <div className="grid-dots" role="tablist" aria-label={t("popular.dotsLabel")}>
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={pageIndex === index}
                aria-label={t("popular.dot", { a: index * PAGE_SIZE + 1, b: Math.min((index + 1) * PAGE_SIZE, products.length) })}
                className={`grid-dots__dot${pageIndex === index ? " is-active" : ""}`}
                onClick={() => setPageIndex(index)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
