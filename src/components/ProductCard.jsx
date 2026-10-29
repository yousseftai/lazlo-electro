import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import Rating from "./Rating.jsx";
import SafeImage from "./SafeImage.jsx";
import { discountPercent, formatPrice, formatSpecs, getBrand } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { useLang } from "../i18n/LangContext.jsx";

/**
 * Reusable product card. Receives a catalog product plus cart/favorite
 * handlers from context. Used by the home section, the shop grid and the
 * deals page.
 */
export default function ProductCard({ product, imageClass = "" }) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t } = useLang();
  const [justAdded, setJustAdded] = useState(false);

  const discount = discountPercent(product);
  const favorite = isFavorite(product.id);

  const handleAdd = () => {
    addItem(product.id);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article className="card">
      <div className={`card__media${imageClass ? ` ${imageClass}` : ""}`}>
        <SafeImage src={product.image} alt={product.alt} loading="lazy" decoding="async" />
        {discount > 0 ? <span className="card__discount">-{discount}%</span> : null}
        <button
          type="button"
          className={`card__fav${favorite ? " is-active" : ""}`}
          aria-label={t(favorite ? "card.favRemove" : "card.favAdd", { name: product.name })}
          aria-pressed={favorite}
          onClick={() => toggleFavorite(product.id)}
        >
          <Heart size={17} aria-hidden="true" />
        </button>
      </div>

      <div className="card__body">
        <p className="card__brand">{getBrand(product.brand)?.label}</p>
        <h3 className="card__name">{product.name}</h3>
        <p className="card__specs">{formatSpecs(product)}</p>
        <Rating value={product.rating} reviews={product.reviews} ariaLabel={t("card.ratingAria", { value: product.rating, outOf: 5 })} />
        <p className="card__price">
          <span className="card__price-now">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price ? (
            <s className="card__price-orig">{formatPrice(product.originalPrice)}</s>
          ) : null}
        </p>
      </div>

      <button type="button" className="btn btn--dark card__cta" onClick={handleAdd}>
        <ShoppingCart size={15} aria-hidden="true" />
        {justAdded ? t("card.added") : t("card.addToCart")}
        <span role="status" className="sr-only">
          {justAdded ? t("card.addedStatus", { name: product.name }) : ""}
        </span>
      </button>
    </article>
  );
}
