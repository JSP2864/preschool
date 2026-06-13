---
name: tiny-bubble-site
description: Use this skill when working on the Tiny Bubble Pre-School React/Webpack site, especially content updates, S3/CloudFront builds, preschool contact details, summer camp announcements, navigation changes, and deployment-safe edits.
---

# Tiny Bubble Site

## Project

Tiny Bubble is a React 18 single-page preschool website built with Webpack 5, React Router, Tailwind CSS, and page-specific CSS.

Primary deployment is S3 + CloudFront only. The manual upload folder is `build/`.
The production domain is `https://www.tinybubble-preschool.in/`. SEO files,
canonical URLs, structured data URLs, robots.txt, and sitemap output must point
to this domain.

The chatbot frontend calls `/api/chat`. CloudFront routes `/api/*` to API
Gateway and AWS Lambda. The Lambda calls Ollama Cloud; API credentials must
remain server-side.

## Commands

```bash
npm start
npm run build
npm run deploy
```

- `npm run build` outputs S3/CloudFront-ready files to `build/`.
- Upload the **contents** of `build/` to the S3 bucket root.
- `npm run deploy` runs the S3 sync and CloudFront invalidation workflow.
- `build/` and `dist/` are generated folders and should not be committed unless explicitly requested.
- Do not use alternate static-host workflows, subpath builds, or non-`build/` deployment output.

## Deployment Rules

For S3 + CloudFront:

- `build/index.html` must be at the bucket root.
- Asset URLs should be root-relative, such as `/js/...`, `/css/...`, `/images/...`.
- CloudFront default root object should be `index.html`.
- CloudFront custom error responses should route `403` and `404` to `/index.html` with response code `200`.
- Do not introduce custom router basenames, subpath public paths, or alternate static-host deploy folders.
- Route `/api/*` to API Gateway with CloudFront caching disabled.
- Never put `OLLAMA_API_KEY` in React code, Webpack configuration, `public/`,
  `build/`, Git, or any browser-visible environment variable.

## Current Business Details

Use these consistently across the site:

- Brand: `Tiny Bubble Pre-School`
- Address: `SK-137, Sec-116 Noida`
- Directions coordinates: `28.568299,77.398063`
- Phone: `+91 82878 39782`
- Phone display where compact: `82878 39782`
- Email: `contact@tinybubblepreschool.com`
- Hours: `Monday - Saturday · 8:30 AM - 2:00 PM`
- Enrollment: `Now enrolling — ages 2 to 7`

## Content Guidelines

- Do not use standalone “bubble” wording in visible copy. Use `Tiny Bubble`, `child`, `children`, `learners`, or similar instead.
- The News section has been removed. Do not re-add `/news` unless explicitly requested.
- The Contact page should not show a tour booking form for now.
- The Contact page should promote summer camp and direct users to call.
- Summer camp message:
  - `Summer Camp starts 18 May onward`
  - Include activities such as creative activities, stories, music, movement, and outdoor play.
  - Include phone number `82878 39782`.

## Current UI Patterns

- `src/components/DirectionLink.jsx` is the reusable location marker link.
- Navbar contact actions should show:
  1. location marker icon
  2. visible phone pill `82878 39782`
- Summer camp ticker styling lives in `src/styles/global.css` under `news-marquee` classes.
- The summer camp ticker should appear on Home, About, Programs, and Gallery.
- Prefer refactoring duplicated ticker markup into a reusable component, such as `src/components/NewsMarquee.jsx`, if editing it again.
- The chatbot UI lives in `src/components/Chatbot.jsx` and
  `src/styles/Chatbot.css`.
- The school knowledge prompt and Ollama request live only in
  `server/chat-lambda.js`.
- Chatbot answers must not invent fees, availability, transport, policies, or
  admission guarantees. Direct those questions to `+91 82878 39782`.

## Important Files

- App routes: `src/App.jsx`
- Navigation: `src/components/Navbar.jsx`
- Footer: `src/components/Footer.jsx`
- Direction marker: `src/components/DirectionLink.jsx`
- Home: `src/pages/Home.jsx`
- About: `src/pages/About.jsx`
- Programs: `src/pages/Programs.jsx`
- Gallery: `src/pages/Gallery.jsx`
- Contact/summer camp: `src/pages/Contact.jsx`
- Global Tailwind/CSS utilities: `src/styles/global.css`
- Production build config: `webpack.prod.js`
- S3 workflow: `.github/workflows/deploy.yml`
- SEO crawl files: `public/robots.txt`, `public/sitemap.xml`
- Chatbot frontend: `src/components/Chatbot.jsx`
- Chatbot Lambda: `server/chat-lambda.js`
- Chatbot AWS setup: `server/README.md`

## Validation

After code or content changes, run:

```bash
npm run build
```

Build warnings about large media assets are known. Do not treat them as failures unless the user asks to optimize media.
