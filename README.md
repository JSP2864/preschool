# Tiny Bubble Pre-School

A warm, playful website for **Tiny Bubble Pre-School** — built with React, plain CSS, and Webpack 5 (separate dev/prod configs).

## Stack
- React 18 + react-router-dom v6
- Webpack 5 (`webpack.common.js` + `webpack.dev.js` + `webpack.prod.js`)
- Babel (`@babel/preset-env`, `@babel/preset-react`)
- Plain CSS (style-loader in dev, MiniCssExtractPlugin in prod)
- Asset modules for images & fonts

## Scripts
```bash
npm install           # install dependencies
npm start             # dev server at http://localhost:3000 (HMR, source maps)
npm run build         # production build → ./dist (minified, hashed, code-split)
npm run build:dev     # development build → ./dist (no minification)
```

## Project layout
```
tiny-bubble/
├── public/
│   └── index.html
├── src/
│   ├── index.js              # entry — mounts <App /> with BrowserRouter
│   ├── App.jsx               # routes
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Programs.jsx
│   │   ├── Gallery.jsx
│   │   └── NotFound.jsx
│   ├── styles/               # one CSS file per page/component
│   │   ├── global.css        # design tokens, base styles, .btn helpers
│   │   ├── Navbar.css
│   │   ├── Footer.css
│   │   ├── Home.css
│   │   ├── About.css
│   │   ├── Programs.css
│   │   ├── Gallery.css
│   │   └── NotFound.css
│   └── assets/
│       └── images/           # hero.jpg, about.jpg, programs.jpg, gallery-1..12.jpg
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
├── babel.config.json
└── package.json
```

## Webpack config notes
- `webpack.common.js` — entry, resolve aliases (`@`, `@assets`), JS/JSX + image/font asset rules, `HtmlWebpackPlugin`.
- `webpack.dev.js` — `mode: development`, `style-loader` for HMR-friendly CSS, `webpack-dev-server` on port `3000` with `historyApiFallback: true` for client routing.
- `webpack.prod.js` — `mode: production`, `MiniCssExtractPlugin`, content-hashed filenames, vendor `splitChunks`, runtime chunk, source maps.

## Pages
- `/` — Hero, value props, story split sections, CTA
- `/about` — Mission, values, visit info
- `/programs` — 4 age-graded programs + a-day-in-the-life timeline
- `/gallery` — 12-photo grid with keyboard-navigable lightbox
- `*` — Friendly 404
