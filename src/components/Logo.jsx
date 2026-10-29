import { useId } from "react";

/**
 * Lazlo.Electro wordmark recreated inline (no image dependency):
 * heavy extended "LAZLO" with the branded orange Z, "ELECTRO" letterspaced below.
 */
export default function Logo({ compact = false }) {
  const gradId = useId();
  return (
    <span className={`laz-logo${compact ? " laz-logo--compact" : ""}`}>
      <span className="laz-logo__word" aria-hidden="true">
        LA
        <svg className="laz-logo__z" width="17" height="20" viewBox="0 0 22 26" role="presentation">
          <defs>
            <linearGradient id={gradId} x1="18" y1="3" x2="6" y2="23" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#FFC821" />
              <stop offset="0.55" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#EA580C" />
            </linearGradient>
          </defs>
          <g transform="skewX(-6)">
            <path
              d="M4 4.2 H18.6 V7.4 L9.2 18.6 H19 L16.6 21.8 H3.6 V18.6 L13 7.4 H3.4 Z"
              fill={`url(#${gradId})`}
              stroke="#F8FAFC"
              strokeWidth="2.2"
              strokeLinejoin="round"
              paintOrder="stroke"
            />
          </g>
        </svg>
        LO
      </span>
      <span className="laz-logo__sub" aria-hidden="true">ELECTRO</span>
    </span>
  );
}
