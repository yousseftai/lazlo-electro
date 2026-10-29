import { Link } from "react-router-dom";
import { useLang } from "../i18n/LangContext.jsx";
import "../styles/pages.css";

export default function NotFound() {
  const { t } = useLang();
  return (
    <div className="page">
      <div className="container">
        <div className="empty-state">
          <p className="empty-state__code">{t("nf.code")}</p>
          <h2>{t("nf.title")}</h2>
          <p>{t("nf.body")}</p>
          <Link to="/" className="btn btn--dark">
            {t("nf.back")}
          </Link>
        </div>
      </div>
    </div>
  );
}
