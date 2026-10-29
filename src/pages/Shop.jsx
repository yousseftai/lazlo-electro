import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeftRight, LayoutGrid, SearchX, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";
import BrandLogo from "../components/BrandLogos.jsx";
import { BRANDS, CATEGORIES, products, searchProducts } from "../data/products.js";
import { useLang } from "../i18n/LangContext.jsx";
import "../styles/products.css";
import "../styles/pages.css";

const SORTS = [
  { id: "featured", key: "sort.featured" },
  { id: "price-asc", key: "sort.priceAsc" },
  { id: "price-desc", key: "sort.priceDesc" },
  { id: "rating", key: "sort.rating" },
];

/**
 * The full catalog: search (reuses ?q=), category and brand filters,
 * sorting, plus an honest empty state. All state lives in the URL so
 * every link is shareable.
 */
export default function Shop() {
  const { t, tPlural } = useLang();
  const [params, setParams] = useSearchParams();
  const [searchDraft, setSearchDraft] = useState(params.get("q") ?? "");

  const query = params.get("q") ?? "";
  const brand = params.get("brand") ?? "";
  const category = params.get("category") ?? "";
  const sort = params.get("sort") ?? "featured";

  const updateParams = (patch) => {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries(patch)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    setParams(next, { preventScrollReset: true });
  };

  const results = useMemo(() => {
    let list = [...products];

    if (query.trim()) list = searchProducts(query);
    if (brand) list = list.filter((product) => product.brand === brand);
    if (category) list = list.filter((product) => product.category === category);

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, brand, category, sort]);

  const hasFilters = Boolean(query.trim()) || Boolean(brand) || Boolean(category) || sort !== "featured";

  const resultLabel =
    tPlural(results.length, "shop.results") +
    (brand ? t("shop.fromBrand", { brand: BRANDS.find((b) => b.id === brand)?.label ?? brand }) : "") +
    (category ? t("shop.inCategory", { category: CATEGORIES.find((c) => c.id === category)?.label ?? category }) : "") +
    (query.trim() ? t("shop.forQuery", { q: query.trim() }) : "") +
    ".";

  return (
    <div className="page">
      <div className="container">
        <header className="page__head">
          <p className="eyebrow">{t("shop.eyebrow")}</p>
          <h1 className="page__title">{t("shop.title")}</h1>
          <p className="page__sub">{resultLabel}</p>
        </header>

        <form
          className="shop-toolbar"
          onSubmit={(event) => {
            event.preventDefault();
            updateParams({ q: searchDraft.trim() });
          }}
        >
          <div className="shop-toolbar__search">
            <SlidersHorizontal size={18} aria-hidden="true" />
            <label htmlFor="shop-search" className="sr-only">
              {t("shop.searchLabel")}
            </label>
            <input
              id="shop-search"
              type="search"
              placeholder={t("shop.searchPlaceholder")}
              value={searchDraft}
              onChange={(event) => setSearchDraft(event.target.value)}
            />
          </div>

          <div className="shop-toolbar__cats" role="group" aria-label={t("shop.categoryGroup")}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`chip${category === cat.id ? " is-active" : ""}`}
                aria-pressed={category === cat.id}
                onClick={() => updateParams({ category: category === cat.id ? "" : cat.id })}
              >
                {t(`cat.${cat.id}`)}
              </button>
            ))}
          </div>

          <div className="shop-toolbar__right">
            <label htmlFor="shop-sort" className="sr-only">
              {t("shop.sortLabel")}
            </label>
            <select
              id="shop-sort"
              className="select"
              value={sort}
              onChange={(event) => updateParams({ sort: event.target.value })}
            >
              {SORTS.map((option) => (
                <option key={option.id} value={option.id}>
                  {t(option.key)}
                </option>
              ))}
            </select>
            {hasFilters ? (
              <button type="button" className="link-arrow" onClick={() => setSearchDraft("") || setParams({})}>
                <ArrowLeftRight size={14} aria-hidden="true" /> {t("shop.reset")}
              </button>
            ) : null}
          </div>
        </form>

        <div className="shop-brandschips" role="group" aria-label={t("shop.brandGroup")}>
          <button
            type="button"
            className={`chip${brand === "" ? " is-active" : ""}`}
            aria-pressed={brand === ""}
            onClick={() => updateParams({ brand: "" })}
          >
            <LayoutGrid size={13} aria-hidden="true" /> {t("shop.allBrands")}
          </button>
          {BRANDS.map((b) => (
            <button
              key={b.id}
              type="button"
              className={`chip chip--brand${brand === b.id ? " is-active" : ""}`}
              aria-pressed={brand === b.id}
              onClick={() => updateParams({ brand: brand === b.id ? "" : b.id })}
            >
              <BrandLogo id={b.id} size={14} className="chip__svg" /> {b.label}
            </button>
          ))}
        </div>

        {results.length === 0 ? (
          <div className="empty-state">
            <SearchX size={42} strokeWidth={1.4} aria-hidden="true" />
            <h2>{t("shop.emptyTitle")}</h2>
            <p>{t("shop.emptyBody", { n: products.length })}</p>
            <Link to="/shop" className="btn btn--dark">
              {t("shop.resetFilters")}
            </Link>
          </div>
        ) : (
          <div className="product-grid product-grid--shop">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
