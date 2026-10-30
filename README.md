# Samvidhan

Samvidhan is an independent educational and reference app for reading the Constitution of India.

## Tech stack

- React Native with Expo
- TypeScript with strict checking
- Expo Router for file-based navigation
- React Native built-in components and `StyleSheet`
- ESLint and Prettier for code quality

## Setup

Install dependencies with `npm install`, then run `npm run start`.

You can also use `npm run android`, `npm run ios`, or `npm run web`. In the Expo terminal, press `a` or `i` to open an available emulator, or scan its QR code with Expo Go. Web can be started with `npm run web`.

## Offline visual preview

If npm dependencies are unavailable, `phase1-preview.html` provides a clickable browser mock of the Phase 1 screens. Run `node preview-server.cjs` and open `http://127.0.0.1:4173`. This preview is separate from the Expo app.

## Current phase: Phase 5

The app represents Parts I–XXII, including inserted Parts IVA, IXA, IXB and XIVA and the historical/repealed Part VII. Article metadata is bundled offline and sourced from the Government of India Legislative Department's sixth pocket-size English-Hindi diglot edition, as on 1 May 2026. Source metadata is stored in `src/data/sources.ts`; structured article paragraphs and clauses are in `src/data/constitution.ts`.

Only Articles 1–35 currently have bundled constitutional text verified from an official Legislative Department edition. All other articles remain discoverable by their verified structural placement, but deliberately show as text unavailable until their wording is audited and transcribed. Schedules and amendment histories are not yet reader content.

The article reader includes dynamic previous and next navigation, calculated progress, session-only text-size controls, dark and light reading themes, and source notes. The Part I screen includes a jump-to-article control for Articles 1-4. Bookmark remains visual only.

## Quality commands

```bash
npm run typecheck
npm run lint
npm run format:check
```

## Project structure

```text
src/
  app/                 Expo Router screens
  components/          Shared UI components
  constants/           Theme values
  data/                Offline Constitution data and source metadata
  hooks/               Theme and color-scheme hooks
  types/               Constitution data types
assets/                App icons and images
```

Later phases may add other Constitution Parts after verifying each against an authoritative source. No backend, authentication, AI, quizzes, notifications, analytics, or payments are included in Phase 2.
