/**
 * Shared section heading block: small uppercase eyebrow, big title,
 * and an optional action (usually a "View All"-style link).
 */
export default function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="section-head">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="section-head__title">{title}</h2>
        {description ? <p className="section-head__desc">{description}</p> : null}
      </div>
      {action ? <div className="section-head__action">{action}</div> : null}
    </div>
  );
}
