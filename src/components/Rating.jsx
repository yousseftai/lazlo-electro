import { Star } from "lucide-react";

const STAR_SIZE = 14;

function StarRow({ filled }) {
  return (
    <span className="stars__group" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          size={STAR_SIZE}
          stroke={filled ? "none" : "currentColor"}
          fill={filled ? "currentColor" : "none"}
          strokeWidth={filled ? 0 : 1.6}
        />
      ))}
    </span>
  );
}

/**
 * Five-star rating with a partial-fill overlay, plus the review count.
 * Renders as a single accessible label.
 */
export default function Rating({ value, reviews, ariaLabel, outOf = 5 }) {
  if (typeof value !== "number") return null;
  const pct = Math.max(0, Math.min(100, (value / outOf) * 100));
  return (
    <div className="rating">
      <span
        className="stars"
        role="img"
        aria-label={ariaLabel}
      >
        <span className="stars__base">
          <StarRow filled={false} />
        </span>
        <span className="stars__fill" style={{ width: `${pct}%` }}>
          <StarRow filled={true} />
        </span>
      </span>
      <span className="rating__count">({reviews})</span>
    </div>
  );
}
