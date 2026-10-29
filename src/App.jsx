import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LangProvider } from "./i18n/LangContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppBubble from "./components/WhatsAppBubble.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Deals from "./pages/Deals.jsx";
import Brands from "./pages/Brands.jsx";
import Cart from "./pages/Cart.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Help from "./pages/Help.jsx";
import NotFound from "./pages/NotFound.jsx";

/** Scrolls the window to the top whenever the route pathname changes. */
function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <LangProvider>
      <CartProvider>
        <FavoritesProvider>
          <ScrollManager />
          <div className="app-shell">
            <Header />
            <main id="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/help/:section?" element={<Help />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <WhatsAppBubble />
        </FavoritesProvider>
      </CartProvider>
    </LangProvider>
  );
}
