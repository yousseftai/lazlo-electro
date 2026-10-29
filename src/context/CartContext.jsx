import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "../data/products.js";

const CartContext = createContext(null);
const STORAGE_KEY = "laptophub.cart.v1";
const MAX_QTY = 99;

/** Read the saved cart, dropping any entries whose product no longer exists. */
function loadSavedCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((entry) => entry && typeof entry.id === "string" && getProduct(entry.id))
      .map((entry) => ({
        id: entry.id,
        qty: Math.min(Math.max(1, Math.floor(Number(entry.qty) || 1)), MAX_QTY),
      }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadSavedCart);

  // Persist every change so the cart survives reloads.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Private-mode browsers may block localStorage; the cart then lives for the session only.
    }
  }, [items]);

  const addItem = (id, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((entry) => entry.id === id);
      if (existing) {
        return prev.map((entry) =>
          entry.id === id ? { ...entry, qty: Math.min(entry.qty + qty, MAX_QTY) } : entry
        );
      }
      return [...prev, { id, qty }];
    });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((entry) => entry.id !== id));
  };

  const setQty = (id, qty) => {
    const next = Math.min(Math.max(1, Math.floor(Number(qty) || 1)), MAX_QTY);
    setItems((prev) => prev.map((entry) => (entry.id === id ? { ...entry, qty: next } : entry)));
  };

  const clearCart = () => setItems([]);

  const { itemCount, subtotal, lines } = useMemo(() => {
    let count = 0;
    let total = 0;
    const detailed = [];
    for (const entry of items) {
      const product = getProduct(entry.id);
      if (!product) continue;
      count += entry.qty;
      total += product.price * entry.qty;
      detailed.push({ ...entry, product, lineTotal: product.price * entry.qty });
    }
    return { itemCount: count, subtotal: total, lines: detailed };
  }, [items]);

  const value = { items, lines, itemCount, subtotal, addItem, removeItem, setQty, clearCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
