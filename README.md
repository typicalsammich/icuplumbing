# Plumbing ICU — Rebuild handoff

Built October 24, 2026. This is a separate, owner-private Site; plumbingicu.com has not been changed.

## Run and maintain

Requires Node.js, no npm dependencies. From the project directory:

- `node build.mjs` generates 58 static HTML pages from `content.mjs`.
- `node server.mjs` serves `dist/` at http://127.0.0.1:4173.
- With the server running, `node check.mjs` validates pages and local references.
- Edit styles in `dist/style.css`, interactions and entrance in `dist/app.js`, and visual artwork in `dist/assets/pipe.svg`. The build preserves these assets.
- `.openai/hosting.json` identifies the private Site. Do not create another Site for this checkout.

## Architecture and SEO

Static HTML, CSS and dependency-free JavaScript. Shared header/footer, map, CTAs and FAQ helpers live in build.mjs; structured business/services/area/article data lives in content.mjs. Service pages use four compositions; area pages use three, with individual preparation notes and utility references. Every page has its own title, description, canonical and one H1. JSON-LD uses Plumber, Service and BreadcrumbList. No invented ratings or local offices. Sitemap and robots are generated. Canonicals currently use the private Site origin; update business.origin before migration to plumbingicu.com.

The original homepage URL and service/book/testimonial fragments remain on the unchanged original site. This build preserves #services and provides the original booking URL. The audited site exposed only one HTML page and fragment navigation, so no old internal page slugs required 301 redirects. On domain migration, route #why-us to About, #process to the About process, #testimonials to Reviews, #service-area to Service Areas, and #book to Contact (fragment compatibility can be handled on the homepage; fragments never reach an HTTP redirect server).

## Entrance

`dist/app.js` defines INTRO at the top: enabled, duration (5000 ms desktop), mobileDuration (3000 ms). Set enabled:false to disable. Canvas draws an ECG that weakens and flatlines; a reflective droplet falls, an impact ripple restores the pulse, and the same sampled trace thickens into water. A perspective metallic pipe interior leads to the actual logo and homepage. This is a procedural 2D approximation, not a photorealistic 3D render or fluid simulation. A professionally rendered clip would improve fidelity to the cinematic brief.

Muted, with no audio assets or playback. Session-only playback; safe bypass when storage is unavailable; reduced-motion bypass; keyboard-accessible skip with focus restoration; timeout; cleanup on hidden tab/page exit; capped 1.5 device pixel ratio; no animation dependencies. Main content stays in static HTML and the overlay does not affect layout. CSS includes a failsafe. Browser session replay bypass was observed. Full skip timing, all viewport sizes, reduced-motion emulation, and cross-browser animation testing remain unverified.

## Map

There was no iframe in the original HTML. It used Google Maps JavaScript API, Tampa center 27.9477,-82.4584, zoom 9, roadmap, cooperative gestures, styled roads/water, and a 72,420 m reference circle. That configuration and existing public browser key are retained, with lazy opt-in loading. No geographic coverage is inferred from the radius alone.

Location buttons filter by text, become active, update the information panel and link to their individual page. With API access, Geocoder focuses the selected community and a marker labels the community, never an office. Per-location pages preselect their area. On API failure, a supported key-free Google Maps query iframe is shown and updated on selection. The original API failed in the local preview; owner should inspect key restrictions and authorize the deployed domain for Maps JavaScript API and Geocoding API. No key restrictions were changed. The fallback is Google Maps, not a substituted provider; its appearance is not filtered. Cross-origin marker control is not attempted.

## Booking

All conversion links either call the verified number or lead to Contact. Contact links to the functioning original form at https://plumbingicu.com/#book. A browser-local request checklist validates inputs and prepares copyable text, explicitly marked NOT submitted. It does not pretend to deliver a request. No backend email, endpoint, account or price has been invented. Integrating booking on this new host requires the original form’s delivery setup or an owner-approved backend. No genuine request was sent during QA.

## Research and content boundaries

Primary audit: https://plumbingicu.com/ (downloaded separately as original.html, excluded from packaged source). Actual logo and favicon downloaded from /assets/logo.png and /assets/favicon.svg. Brand tokens: navy #071A33, blue #0B4CC4, red #C62026. Phone (813) 722-4287; Florida license CFC1434572; licensed and insured and same-day availability are business-published claims, not independently verified regulator records. Call to confirm availability. No street address, email, detailed business hours, social profile, certifications or team members verified.

All 14 services and all 30 areas match the source website. The site also claims 15+ years, 4,800+ jobs, 4.9 rating, <60-minute response, no overtime and a satisfaction guarantee; these were not independently substantiated and are omitted from promotional statistics. Three brief testimonial excerpts retain attribution and link to the original page, explicitly labeled as company-published and not independently verified. No invented aggregate rating schema.

The original site contained no usable project photography, blog articles, privacy policy or terms in accessible links. No fake gallery or staff photos were created. Hero artwork is labeled as an illustration. Three new general educational guides were written. Privacy/terms routes state actual site behavior and flag missing owner documents; they are noindex and do not invent contractual terms.

Local source references are attached to area notes. Some notes are general preparation guidance rather than unsupported city-specific plumbing claims:

- https://www.tampa.gov/water/about-us
- https://pinellas.gov/pinellas-county-utilities-water-service-areas-map
- https://pinellas.gov/current-water-sources/
- https://planhillsborough.org/wp-content/uploads/2023/05/One-Water-Background-Data-and-Analysis.pdf
- https://www.hernandocounty.us/living-here/utilities/
- https://www.tampabaywater.org/contact/

## Validation

Production generation: 58 pages (including 404 and owner-review legal-information routes), 14 service pages, 30 location pages. Automated check: all 58 pages return 200 when directly requested, unknown URLs return custom 404, 4,625 local asset/link references exist, no empty href="#", one H1 per page, unique titles/descriptions, expected canonicals, valid JSON-LD. JavaScript syntax checked with node --check.

Browser QA: narrow mobile-like in-app viewport, homepage screenshot, menu expand/collapse, search filtering to Clearwater, selected-location active state, matching area link, original API failure handling, and session intro bypass. No claim of Lighthouse/Core Web Vitals results, desktop visual review, all 30 map centers, all browser engines, clipboard or actual booking submission. CSS defines layouts for 320/350/600/820/1100/1500 breakpoints; these are implemented, not all visually tested.

## Before public business-domain launch

Owner review: business claims and service list, current license/insurance, service coverage, original testimonials, utility notes, new educational copy and legal documents. Supply real project photos for a gallery. Confirm Maps domain/API settings, wire booking delivery if replacing the original form, set the canonical origin to the business domain, configure the domain, and complete cross-browser/performance testing. The deployed Site is private; it does not replace the existing public website.


## Publication status

Private Site registration succeeded (appgprj_6adcfc8d025081918ab44655845d16a5), but source upload and deployment did not. The terminal input action was rejected by automatic approval review because sandbox approval is disabled. An in-memory alternative could not connect to the source repository (getaddrinfo thread failure). No credentials are included in this archive. Resume with the same Site ID from an environment with working network/process access. The original business website is unchanged.

The entrance is a procedural 2D approximation; photorealistic rendering, cross-browser QA, approved legal documents and booking delivery on the new host remain outstanding.


## Dark navy and entrance revision

All major light surfaces now use the original navy #071A33 with deeper blue section variations, pale text, blue borders and brighter link accents. The actual white-background logo and normal Google map remain unfiltered.

The entrance is now in dist/intro.js; config.duration and config.mobileDuration are both 5000 ms. Set config.enabled:false to disable automatic playback. Replay remains available through an explicit Watch our cinematic entrance link on every page and the homepage replay control. /?intro=replay bypasses the session flag, then removes the query parameter. The session key is icu-flatline-v2-seen. Unavailable storage no longer suppresses playback. Playback waits for a visible tab and pauses while hidden instead of completing unseen. The overlay lives outside main; Skip is no longer blocked by the main pointer-events rule. Reduced-motion visitors get a static logo reveal when they explicitly request replay. No extra animation dependencies were added.

Validation for this revision: all 58 static pages, 4742 local asset/link references, unique metadata, one H1 each, new script references and entrance links checked directly from generated files; both scripts compiled with node:vm. A mocked DOM/canvas lifecycle harness passed Skip cleanup, replay after seen, completion, hidden-tab pause/resume, storage unavailable, reduced-motion static playback and explicit replay query. These are code-level checks, not browser visual verification.

The current local preview server timed out in the in-app browser. Opening a file URL for the offline preview was rejected by browser security policy; no bypass was attempted. The offline HTML preview can be downloaded and opened manually in a regular browser. The full site should be served with node server.mjs; the offline HTML is a visual entrance demonstration rather than a replacement for the full server. The publication retry again failed connecting to the Git source service (getaddrinfo thread failure). No hosted deployment is claimed.

## Transparent logo and continuous homepage handoff

The shared UI logo is now dist/assets/logo-transparent.png (1536 × 1024 PNG, genuine alpha transparency), used in header, footer and entrance; original logo.png is retained. White logo plaques have been removed. The built-in ImageGen tool was used for background extraction. Final selected prompt: remove only the white/off-white background; preserve PLUMBING, ICU, the tagline, red cross, blue letters, white ECG and pipe/IV artwork; output transparent PNG. An initial extraction was selected after inspecting both results. Alpha sampling verified transparent corners and near-opaque artwork (maximum alpha 254).

The logo emerges at 74–81% of playback over the restored pulse/pipe scene. From 84–99%, the same image element interpolates into the header image's measured viewport rectangle as the canvas fades to reveal the actual homepage. The header logo remains hidden during this handoff, then becomes visible at the identical position on completion, preventing a duplicate or a position jump. The tagline fades during the move. Explicit Replay starts from the top so the target is visible. Mobile uses its own measured header position. Reduced motion retains a static brand reveal. Duration remains five seconds; config is in dist/intro.js. Session key is now icu-flatline-v3-seen.

Run node test-handoff.mjs to verify central emergence, exact final rectangle, backdrop opacity, no duplicate logo at completion, Skip cleanup, replay and reduced motion in a mocked DOM/canvas harness. These tests pass; they do not constitute browser visual QA. Run node check.mjs --static for source/metadata/link checks without a server. Live preview remained unavailable (loopback timed out), so the final animation has not been visually verified in-browser. The offline preview is self-contained and can be downloaded and opened manually; full multi-page navigation needs node server.mjs.
