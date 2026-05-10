# Tiny Bubble Pre-School

A warm, playful website for **Tiny Bubble Pre-School** — built with React, plain CSS, and Webpack 5 (separate dev/prod configs).

## Stack
- React 18 + react-router-dom v6
- Webpack 5 (`webpack.common.js` + `webpack.dev.js` + `webpack.prod.js`)
- Babel (`@babel/preset-env`, `@babel/preset-react`)
- Tailwind CSS + plain CSS (style-loader in dev, MiniCssExtractPlugin in prod)
- Asset modules for images, videos & fonts
- S3 + CloudFront deployment

## Scripts
```bash
npm install           # install dependencies
npm start             # dev server at http://localhost:3000 (HMR, source maps)
npm run build         # production build → ./build (minified, hashed, code-split)
npm run build:github  # optional GitHub Pages build → ./docs
npm run build:dev     # development build → ./dist (no minification)
npm run deploy        # build, sync ./build to S3, and invalidate CloudFront
npm run deploy:github # optional GitHub Pages deploy using gh-pages
```

## S3 + CloudFront Deployment

Production builds are configured for hosting from the root of a CloudFront distribution. Generated asset URLs look like `/js/...`, `/css/...`, `/images/...`, and `/videos/...`.

For manual S3 upload, run `npm run build`, then upload the **contents** of the `build/` folder to the S3 bucket root. Do not upload the `build` folder as a nested folder.

Required GitHub Actions secrets:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `AWS_S3_BUCKET`
- `AWS_CLOUDFRONT_DISTRIBUTION_ID`

The workflow at `.github/workflows/deploy.yml` runs on pushes to `main` or `master`, builds `build`, syncs it to S3, and creates a CloudFront invalidation.

Recommended CloudFront settings for this React SPA:

- Origin: the S3 bucket used by `AWS_S3_BUCKET`
- Default root object: `index.html`
- Custom error responses:
  - HTTP 403 -> `/index.html` with response code `200`
  - HTTP 404 -> `/index.html` with response code `200`
- Viewer protocol policy: redirect HTTP to HTTPS

Manual deployment from your local machine:

```bash
export AWS_S3_BUCKET=your-bucket-name
export AWS_CLOUDFRONT_DISTRIBUTION_ID=your-distribution-id
npm run deploy
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
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   ├── styles/               # one CSS file per page/component
│   │   ├── global.css        # design tokens, base styles, .btn helpers
│   │   ├── Footer.css
│   │   ├── Home.css
│   │   ├── About.css
│   │   ├── Programs.css
│   │   ├── Gallery.css
│   │   └── NotFound.css
│   └── assets/
│       ├── images/           # hero.jpg, about.jpg, programs.jpg, gallery-1..12.jpg
│       └── videos/           # video-1..3.mp4
├── .github/
│   └── workflows/
│       └── deploy.yml
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
├── babel.config.json
└── package.json
```

## Webpack config notes
- `webpack.common.js` — entry, resolve aliases (`@`, `@assets`), JS/JSX + image/video/font asset rules, `HtmlWebpackPlugin` output for both `index.html` and `404.html`.
- `webpack.dev.js` — `mode: development`, `style-loader` for HMR-friendly CSS, `webpack-dev-server` on port `3000` with `historyApiFallback: true` for client routing.
- `webpack.prod.js` — `mode: production`, configurable `publicPath` and output folder, `MiniCssExtractPlugin`, content-hashed filenames, vendor `splitChunks`, runtime chunk, source maps.

## Pages
- `/` — Hero, value props, story split sections, CTA
- `/about` — Mission, values, visit info
- `/programs` — 4 age-graded programs + a-day-in-the-life timeline
- `/gallery` — 12-photo grid with keyboard-navigable lightbox
- `/contact` — Contact details, directions, and summer camp announcement
- `*` — Friendly 404
