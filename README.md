# Lazlo.Electro — Online Laptop Store

Premium responsive storefront for **Lazlo.Electro**, an electronics shop in Derb Omar, Casablanca selling new & used laptops at competitive prices.

Demo website for now: the **order flow works via WhatsApp** — no online payment is taken on the site, exactly like the real store workflow.

## Features

- **Catalogue** of laptops (Apple, Dell, HP, Lenovo, ASUS, Acer, MSI, Microsoft) with categories, brand filters, search and sorting — all filter state lives in the URL, so every view is shareable
- **Cart & favorites** persisted in the browser (localStorage), quantity controls, live totals
- **Order on WhatsApp** — the cart is pre-filled into a friendly message to `+212 660 73 02 84`; the team confirms availability, price and delivery in chat (no card, no online payment)
- **Floating WhatsApp bubble** on every page, like the big e-commerce sites
- **Trilingual interface**: 🇫🇷 French (default) · 🇲🇦 Arabic (full RTL) · 🇬🇧 English, switchable from the header, persisted per visitor
- **Prices in Moroccan dirham** (displayed in all languages)
- Deals page, brand directory, honest About/Help/Contact pages, 404, fully responsive, accessible (aria labels, keyboard, reduced-motion)

## Tech

React 19 + Vite + JavaScript, hand-written CSS, lucide-react icons. No backend — the demo is client-side only; forms are honest demos and no data is ever sent or stored anywhere.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
npm run lint
```

## Customizing

- **WhatsApp number / message wording**: `src/utils/whatsapp.js`
- **Price conversion to dirham**: `USD_TO_MAD` constant in `src/i18n/format.js`
- **Translations (FR / AR / EN)**: `src/i18n/strings.js`
- **Catalogue & prices**: `src/data/products.js`

## Photo credits

Product photos from [Unsplash](https://unsplash.com) and Wikimedia Commons. The ASUS ROG Zephyrus G14 photo by RuinDig/Yuki Uchida is licensed CC BY 4.0 via Wikimedia Commons.
