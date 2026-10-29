import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import Logo from "./Logo.jsx";
import { formatPrice, searchProducts } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import { useLang } from "../i18n/LangContext.jsx";
import { LANGS } from "../i18n/strings.js";
import "../styles/header.css";

const NAV_LINKS = [
  { to: "/", key: "nav.home" },
  { to: "/shop", key: "nav.shop" },
  { to: "/brands", key: "nav.brands" },
  { to: "/deals", key: "nav.deals" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
];

function LangSwitch({ className = "" }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`lang-switch lang-switch--header${className ? ` ${className}` : ""}`} role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button
          key={l.id}
          type="button"
          className={`lang-switch__btn${lang === l.id ? " is-active" : ""}`}
          aria-pressed={lang === l.id}
          title={l.full}
          onClick={() => setLang(l.id)}
        >
          {l.id === "ar" ? "ع" : l.label}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const { t, tPlural } = useLang();
  const [openMenu, setOpenMenu] = useState(null); // null | "search" | "account" | "mobile"
  const [query, setQuery] = useState("");
  const [flash, setFlash] = useState(false); // brief cart feedback when an item is added
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const rootRef = useRef(null);

  // Close any open panel when navigating or pressing Escape.
  useEffect(() => setOpenMenu(null), [location.pathname, location.search]);
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Click outside the header closes every panel.
  useEffect(() => {
    if (!openMenu) return undefined;
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openMenu]);

  const results = useMemo(() => searchProducts(query).slice(0, 5), [query]);
  const totalResults = useMemo(() => searchProducts(query).length, [query]);

  const toggleMenu = (name) => setOpenMenu((prev) => (prev === name ? null : name));

  const submitSearch = (event) => {
    event.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/shop?q=${encodeURIComponent(q)}`);
    setOpenMenu(null);
  };

  // Flash the cart icon for a moment after a product is added anywhere on the site.
  useEffect(() => {
    if (itemCount === 0) return undefined;
    setFlash(true);
    const timer = window.setTimeout(() => setFlash(false), 900);
    return () => window.clearTimeout(timer);
  }, [itemCount]);

  const cartLabel = itemCount === 0 ? t("header.cartEmpty") : tPlural(itemCount, "header.cartSome");

  return (
    <header className="header" ref={rootRef}>
      <div className="container header__inner">
          <Link to="/" className="header__logo" aria-label={t("header.homeAria")}>
          <Logo />
        </Link>

        <nav className="header__nav" aria-label={t("header.mainNav")}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}
            >
              {t(link.key)}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <LangSwitch />
          <button
            type="button"
            className={`icon-btn${openMenu === "search" ? " is-open" : ""}`}
            aria-expanded={openMenu === "search"}
            aria-controls="header-search"
            aria-label={t("header.search")}
            onClick={() => toggleMenu("search")}
          >
            <Search size={19} />
          </button>

          <button
            type="button"
            className={`icon-btn icon-btn--account${openMenu === "account" ? " is-open" : ""}`}
            aria-expanded={openMenu === "account"}
            aria-controls="header-account"
            aria-label={t("header.account")}
            onClick={() => toggleMenu("account")}
          >
            <User size={19} />
          </button>

          <Link
            to="/cart"
            className={`icon-btn header__cart${flash ? " is-flash" : ""}`}
            aria-label={cartLabel}
          >
            <ShoppingCart size={19} />
            {itemCount > 0 ? (
              <span className="cart-badge" aria-hidden="true">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            ) : null}
          </Link>

          <button
            type="button"
            className={`icon-btn header__burger${openMenu === "mobile" ? " is-open" : ""}`}
            aria-expanded={openMenu === "mobile"}
            aria-controls="header-mobile"
            aria-label={t("header.openMenu")}
            onClick={() => toggleMenu("mobile")}
          >
            {openMenu === "mobile" ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {openMenu === "search" ? (
        <div className="header-panel" id="header-search">
          <div className="container">
            <form className="search-form" role="search" onSubmit={submitSearch}>
              <Search size={17} aria-hidden="true" />
              <input
                type="search"
                className="search-input"
                placeholder={t("header.searchPlaceholder")}
                aria-label={t("header.search")}
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              {query ? (
                <button
                  type="button"
                  className="search-clear"
                  aria-label={t("header.clearSearch")}
                  onClick={() => setQuery("")}
                >
                  <X size={15} />
                </button>
              ) : null}
            </form>

            {query.trim() ? (
              <div className="search-results">
                {results.length === 0 ? (
                  <p className="search-empty">
                    {t("header.searchEmpty", { q: query.trim() })}
                  </p>
                ) : (
                  <>
                    <ul className="search-list">
                      {results.map((product) => (
                        <li key={product.id}>
                          <Link
                            to={`/shop?q=${encodeURIComponent(product.name)}`}
                            className="search-item"
                            onClick={() => setOpenMenu(null)}
                          >
                            <img src={product.image} alt="" width="46" height="34" />
                            <span className="search-item__name">{product.name}</span>
                            <span className="search-item__price">{formatPrice(product.price)}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={`/shop?q=${encodeURIComponent(query.trim())}`}
                      className="search-see-all"
                      onClick={() => setOpenMenu(null)}
                    >
                      {tPlural(totalResults, "header.seeAll")}
                    </Link>
                  </>
                )}
              </div>
            ) : (
              <p className="search-hint">{t("header.searchHint")}</p>
            )}
          </div>
        </div>
      ) : null}

      {openMenu === "account" ? (
        <div className="header-panel" id="header-account">
          <div className="container account-panel">
            <div>
              <p className="account-panel__title">{t("header.accountTitle")}</p>
              <p className="account-panel__copy">{t("header.accountCopy")}</p>
            </div>
            <div className="account-panel__links">
              <Link to="/help/track-order">{t("header.trackOrder")}</Link>
              <Link to="/help">{t("header.helpCenter")}</Link>
              <Link to="/contact">{t("header.contactTeam")}</Link>
            </div>
          </div>
        </div>
      ) : null}

      {openMenu === "mobile" ? (
        <nav className="header-panel mobile-menu" id="header-mobile" aria-label={t("header.mobileNav")}>
          <div className="container">
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) => `mobile-menu__link${isActive ? " is-active" : ""}`}
                  >
                    {t(link.key)}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mobile-menu__foot">
              <Link
                to="/cart"
                className="btn btn--accent mobile-menu__cart-link"
                aria-label={cartLabel}
              >
                <ShoppingCart size={16} /> {t("header.mobileCart")}
                {itemCount > 0 ? <span className="cart-badge cart-badge--inline">{itemCount}</span> : null}
              </Link>
              <LangSwitch />
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
