# StyleSync — personalized fashion shopping

A responsive, inclusive fashion storefront built with React, React Router, Redux Toolkit, and Vite. StyleSync demonstrates product discovery, category filtering, persistent cart state, profile and delivery address management, and outfit suggestions.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Create a production build with `npm run build`.

## Features

- Responsive landing page, collection, product detail, cart, and style discovery routes.
- Product search by name, category filters, ascending/descending price sorting, and load-more pagination.
- Expands the curated 24-item collection with live fashion products and photos from the free [DummyJSON products API](https://dummyjson.com/docs/products).
- Redux Toolkit cart slice with add, remove, quantity controls, derived totals, and localStorage persistence.
- Style quiz filters recommendations by style, occasion, and budget.
- Login/profile demo with editable customer details and saved delivery addresses; checkout requires sign-in and an address.
- Product categories include tops, bottoms, dresses, ethnic wear, layers, footwear, bags, jewellery, and accessories.
- Weather-aware advice uses the free What to Wear API; complementary item pairings are curated from the local catalogue.
- Reusable product cards, navigation, empty states, and checkout summary.

## Project structure

- `src/EnhancedApp.jsx` — storefront, account pages, address book, cart and style advice.
- `src/store.js` — Redux Toolkit cart slice and store.
- `src/products.js` — static product catalogue and image helper.
- `src/main.jsx` — React, Redux, and router entry point.
- `src/style.css`, `src/more.css`, and `src/accounts.css` — responsive storefront styles.

Product and hero photography is served from Unsplash; failed product image requests fall back to a verified fashion photograph. The shop loads fashion categories from DummyJSON when available and keeps the curated catalogue when the service is unavailable. Profile and cart data are stored in browser localStorage. Login and checkout are frontend demonstrations: there is no server-side authentication, order processing, or payment integration. Weather advice may be unavailable if the third-party service is offline; catalogue-based outfit pairings still work.
