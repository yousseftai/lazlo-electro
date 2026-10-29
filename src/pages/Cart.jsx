import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { formatPrice, formatSpecs } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import { useLang } from "../i18n/LangContext.jsx";
import WhatsAppIcon from "../components/WhatsAppIcon.jsx";
import { whatsappOrderUrl } from "../utils/whatsapp.js";
import "../styles/pages.css";

export default function Cart() {
  const { lines, subtotal, itemCount, setQty, removeItem, clearCart } = useCart();
  const { t, tPlural, lang } = useLang();

  if (itemCount === 0) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state">
            <ShoppingBag size={44} strokeWidth={1.4} aria-hidden="true" />
            <h2>{t("cart.emptyTitle")}</h2>
            <p>{t("cart.emptyBody")}</p>
            <Link to="/shop" className="btn btn--dark">
              {t("cart.browse")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container cart">
        <header className="page__head">
          <p className="eyebrow">{t("cart.eyebrow")}</p>
          <h1 className="page__title">{t("cart.title")}</h1>
          <p className="page__sub">{tPlural(itemCount, "cart.count")}</p>
        </header>

        <div className="cart__layout">
          <ul className="cart__list">
            {lines.map((line) => (
              <li key={line.id} className="cart-item">
                <Link to={`/shop?q=${encodeURIComponent(line.product.name)}`} className="cart-item__media">
                  <img src={line.product.image} alt={line.product.alt} width="112" height="84" />
                </Link>
                <div className="cart-item__info">
                  <p className="cart-item__brand">{line.product.name}</p>
                  <p className="cart-item__meta">{formatSpecs(line.product)}</p>
                  <div className="cart-item__controls">
                    <div className="qty" role="group" aria-label={t("cart.qtyAria", { name: line.product.name })}>
                      <button
                        type="button"
                        aria-label={t("cart.decrease")}
                        disabled={line.qty <= 1}
                        onClick={() => setQty(line.id, line.qty - 1)}
                      >
                        <Minus size={14} aria-hidden="true" />
                      </button>
                      <span className="qty__value" aria-live="polite">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        aria-label={t("cart.increase")}
                        disabled={line.qty >= 99}
                        onClick={() => setQty(line.id, line.qty + 1)}
                      >
                        <Plus size={14} aria-hidden="true" />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="cart-item__remove"
                      onClick={() => removeItem(line.id)}
                      aria-label={t("cart.remove", { name: line.product.name })}
                    >
                      <Trash2 size={15} aria-hidden="true" /> {t("cart.removeText")}
                    </button>
                  </div>
                </div>
                <div className="cart-item__prices">
                  <p className="cart-item__total">{formatPrice(line.lineTotal)}</p>
                  <p className="cart-item__unit">{t("cart.each", { price: formatPrice(line.product.price) })}</p>
                </div>
              </li>
            ))}
            <li>
              <button type="button" className="link-arrow" onClick={clearCart}>
                {t("cart.clear")}
              </button>
            </li>
          </ul>

          <aside className="cart__summary" aria-label={t("cart.summary")}>
            <h2>{t("cart.summaryTitle")}</h2>
            <dl>
              <div>
                <dt>{t("cart.subtotal")}</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div>
                <dt>{t("cart.shipping")}</dt>
                <dd className="cart-summary__free">{t("cart.free")}</dd>
              </div>
              <div className="cart__total">
                <dt>{t("cart.total")}</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
            </dl>
            <p className="cart__taxline">{t("cart.noPayment")}</p>
            <a
              className="btn btn--whatsapp btn--block"
              href={whatsappOrderUrl(lines, subtotal, formatPrice, lang)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("cart.orderWAAria")}
            >
              <WhatsAppIcon size={18} /> {t("cart.orderWA")}
            </a>
            <Link to="/shop" className="cart__continue">
              {t("cart.keepShopping")}
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
