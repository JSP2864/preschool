# Context Summary

## Project Overview

Tiny Bubble is a React single-page website for a preschool and daycare called Tiny Bubble Pre-School & Daycare. It is a warm, playful marketing and information site for parents, with pages for home, about, programs, gallery, contact, and a friendly not-found route.

The app is currently static/client-side only. There is no backend, API integration, database, authentication, or real form submission.

## Tech Stack

- React 18
- React DOM 18
- React Router DOM v6
- Webpack 5 with separate common, development, and production configs
- Babel using `@babel/preset-env` and `@babel/preset-react`
- Tailwind CSS 3 with PostCSS and Autoprefixer
- Plain CSS files for several page/component styles
- Webpack asset modules for images, videos, and fonts
- AWS Lambda/API Gateway proxy for the Ollama Cloud chatbot

## Main Commands

```bash
npm install
npm start
npm run build
npm run build:dev
npm run deploy
```

- `npm start` runs `webpack-dev-server` on `http://localhost:3000`.
- `npm run build` creates a production build in `build`.
- `npm run build:dev` creates a development build in `dist`.
- `npm run deploy` builds `build`, syncs it to S3, and invalidates CloudFront.
- Do not use subpath/static-page deployment commands or alternate deployment output for this project.

## Application Structure

```text
public/
  index.html

src/
  index.js
  App.jsx
  media.js
  components/
    Navbar.jsx
    Footer.jsx
  pages/
    Home.jsx
    About.jsx
    Programs.jsx
    Gallery.jsx
    Contact.jsx
    NotFound.jsx
  styles/
    global.css
    About.css
    Footer.css
    Gallery.css
    Home.css
    NotFound.css
    Programs.css
  assets/
    images/
    videos/

webpack.common.js
webpack.dev.js
webpack.prod.js
tailwind.config.js
postcss.config.js
babel.config.json
package.json
README.md
.github/workflows/deploy.yml
```

## Entry Points and Routing

- `src/index.js` mounts the React app into `#root`, wraps it in `React.StrictMode`, and provides `BrowserRouter`.
- The production router should run at the root of `https://www.tinybubble-preschool.in/` behind CloudFront.
- `src/App.jsx` defines the shared page shell with `Navbar`, route outlet via `Routes`, and `Footer`.

Routes:

- `/` -> `Home`
- `/about` -> `About`
- `/programs` -> `Programs`
- `/gallery` -> `Gallery`
- `/contact` -> `Contact`
- `*` -> `NotFound`

## Pages

### Home

`src/pages/Home.jsx`

The home page includes:

- Rotating hero image collage
- Enrollment call-to-action
- Preschool stats
- Photo strip linking to the gallery
- Three autoplaying local video cards
- Feature cards for learning approach, class size, and snacks
- Final contact call-to-action

It uses `localPhotos` and `localVideos` from `src/media.js`.

### About

`src/pages/About.jsx`

The about page describes the preschool mission, values, visit information, address, hours, email, and phone. It imports `about.jpg` through the `@assets` alias.

### Programs

`src/pages/Programs.jsx`

The programs page presents four age-based programs:

- Tiny Tots: 1.5 to 2.5 yrs
- Sprouts: 2.5 to 3.5 yrs
- Sunbeams: 3.5 to 4.5 yrs
- Stars: 4.5 to 5 yrs

It also includes a day-in-the-life timeline.

### Gallery

`src/pages/Gallery.jsx`

The gallery page renders a 12-image grid with captions. Clicking an image opens a lightbox. The lightbox supports:

- Escape to close
- ArrowRight for next image
- ArrowLeft for previous image
- Previous/next buttons
- Click outside to close

### Contact

`src/pages/Contact.jsx`

The contact page displays visit details, directions, school hours, email, phone, and a summer camp announcement. The previous tour form has been removed for now.

### Not Found

`src/pages/NotFound.jsx`

Simple friendly 404 page with a link back to home.

## Shared Components

### Navbar

`src/components/Navbar.jsx`

The navbar includes:

- Tiny Bubble brand/logo with Pre-School & Daycare subtitle
- Desktop route links
- Mobile menu toggle
- Active route styling via `NavLink`

It currently uses Tailwind utility classes directly. There is no separate `Navbar.css` file.

### Footer

`src/components/Footer.jsx`

The footer includes brand copy, explore links, visit details, contact links, and the current year. It imports `src/styles/Footer.css`.

## Styling

The project uses a mixed styling approach:

- Tailwind is enabled globally through `src/styles/global.css`.
- Tailwind theme extensions live in `tailwind.config.js`.
- Some newer pages/components use Tailwind utility classes directly.
- Several pages still use dedicated CSS files in `src/styles`.

Global styles define:

- Base fonts: Fredoka for headings and Quicksand for body text
- Color CSS variables
- Button utility classes: `.btn-primary`, `.btn-secondary`
- Card utility class: `.card`
- Reduced-motion handling

The public HTML imports Google Fonts.

## Assets

`src/media.js` imports and exports:

- 15 local photos, including hero/about/programs/gallery images
- 3 local MP4 videos

Webpack handles images and videos through asset/resource rules and emits hashed files in production.

## Webpack Setup

### Common Config

`webpack.common.js`

- Entry: `src/index.js`
- Aliases:
  - `@` -> `src`
  - `@assets` -> `src/assets`
- Babel loader for JS/JSX
- Asset modules for images, videos, and fonts
- `HtmlWebpackPlugin` using `public/index.html`
- Generates both `index.html` and `404.html`. S3 + CloudFront should serve `index.html` for SPA fallback responses.

### Development Config

`webpack.dev.js`

- Mode: development
- Source maps: `eval-cheap-module-source-map`
- CSS handled by `style-loader`, `css-loader`, and `postcss-loader`
- Dev server:
  - Port 3000
  - Hot reload enabled
  - `historyApiFallback: true` for React Router
  - Browser auto-open enabled

### Production Config

`webpack.prod.js`

- Mode: production
- Source maps enabled
- CSS extracted with `MiniCssExtractPlugin`
- Content-hashed JS and CSS output
- Production `publicPath` and output path are configurable with Webpack env arguments.
- Default `npm run build` uses `publicPath=/` and `outputPath=build` for S3 + CloudFront.
- Do not introduce subpath public paths or alternate deployment folders.
- Vendor split chunk
- Runtime chunk
- Performance warning thresholds set to 512 KB

## S3 + CloudFront Deployment

Primary deployment target is S3 behind CloudFront.

Default production build:

```text
build/
```

Deployment support:

- `.github/workflows/deploy.yml` builds on pushes to `main` or `master`, syncs `build` to S3, and invalidates CloudFront.
- For manual S3 upload, upload the contents of `build/` to the bucket root, not the folder itself.
- `package.json` has `deploy` and `deploy:s3` scripts for local AWS CLI deployment.
- Required GitHub Actions secrets:
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `AWS_REGION`
  - `AWS_S3_BUCKET`
  - `AWS_CLOUDFRONT_DISTRIBUTION_ID`
- Recommended CloudFront settings:
  - Default root object: `index.html`
  - Custom error response 403 -> `/index.html` with response code `200`
  - Custom error response 404 -> `/index.html` with response code `200`
  - Viewer protocol policy: redirect HTTP to HTTPS

## Chatbot Architecture

The site includes a floating Tiny Bubble assistant:

- Frontend: `src/components/Chatbot.jsx`
- Styling: `src/styles/Chatbot.css`
- Browser endpoint: `POST /api/chat`
- Backend: `server/chat-lambda.js`
- Model: Ollama Cloud `gemma4:31b`

CloudFront uses two origins:

- Default behavior -> S3 website assets
- `/api/*` behavior -> API Gateway/Lambda with caching disabled

The Lambda stores `OLLAMA_API_KEY` as an environment variable and calls
`https://ollama.com/api/chat`. The key must never be placed in frontend code,
Webpack variables, S3, or Git. See `server/README.md` for setup.

## Domain and SEO

Production domain:

```text
https://www.tinybubble-preschool.in/
```

SEO support:

- `public/robots.txt` must point crawlers to `https://www.tinybubble-preschool.in/sitemap.xml`.
- `public/sitemap.xml` must list canonical URLs on `https://www.tinybubble-preschool.in/`.
- Canonical tags, Open Graph URLs, and structured data URLs should use the production domain.
- Do not publish crawl files that point to repository-hosted preview URLs, subpaths, or non-production domains.

## Current Build Status

`npm run build` completes successfully after S3 + CloudFront configuration.

Observed build result:

- Production entrypoint is about 232 KB excluding auxiliary media assets.
- Total emitted/cached asset payload is about 43 MB.
- `build/index.html` and `build/404.html` are generated and match.
- Generated CSS and JS URLs point to root-relative paths such as `/js/...` and `/css/...`.
- Generated crawl files should point to `https://www.tinybubble-preschool.in/`.
- Webpack reports performance warnings because many image and video files exceed the configured 512 KB limit.

Large assets include:

- `hero.jpg`
- `about.jpg`
- gallery images
- `video-1.mp4`
- `video-2.mp4`
- `video-3.mp4`

The app builds, but media weight is the main performance concern.

## Known Gaps and Notes

- The repository is not currently initialized as a Git repository.
- The README has been updated for the current pages and S3 + CloudFront deployment.
- The contact page is informational only; registration happens through the listed phone number.
- There are no tests configured.
- There is no lint script or formatter script in `package.json`.
- Images and videos should be optimized before production deployment.

## Recommended Next Steps

1. Optimize media assets.
   - Compress large JPGs.
   - Consider WebP/AVIF variants.
   - Compress or shorten MP4 files.
   - Lazy-load video-heavy sections where possible.

2. Configure AWS hosting.
   - Create or choose the S3 bucket.
   - Put CloudFront in front of the bucket.
   - Configure SPA fallback error responses.
   - Add the required AWS secrets to GitHub Actions.

3. Decide whether summer camp registration should submit somewhere later.
   - Options include a simple enquiry form, Formspree, Netlify Forms, a custom API, or WhatsApp integration.

4. Add basic quality tooling.
   - Add linting.
   - Add formatting.
   - Add smoke tests for route rendering if the project will grow.

5. Consider route-level lazy loading.
   - This could reduce initial JavaScript and media pressure as the app expands.

## High-Level Summary

Tiny Bubble is a polished static React preschool website with strong visual content and a simple route-based structure. It is configured for S3 + CloudFront as the primary deployment target and builds successfully. Its main technical risk is performance from large local media assets. Its main product gap is that summer camp registration is currently handled through phone contact rather than a connected online workflow.
