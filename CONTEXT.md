# Samvidhan — Agent Handoff Context

This document is a working handoff for another AI agent. Read it before changing the app. The user may switch agents/models and expects the next agent to continue from the current project state.

## Product and scope

Samvidhan is an independent educational/reference app for reading the Constitution of India. It is a React Native + Expo + TypeScript app using Expo Router. Constitutional data is bundled locally so the reader works offline.

The implemented information flow is:

```text
Home → Constitution / Parts → Part I → Articles 1–4 → Article reader
```

Phase 3.1 is implemented: Parts I–III are listed, with official text for Articles 1–35 integrated from the Legislative Department edition dated 11 November 2025. Other Parts remain future content. Do not add a backend, auth, AI, global search, or state-management library unless the user asks.

## Critical user instruction

The user specifically said: **“dont add copy yet just do other improvements.”**

The Phase 2.5 brief requests a Copy Text action, but the user's later, explicit instruction overrides that item. Do not add clipboard support, a Copy button, or a clipboard package unless the user later changes this instruction. Share is implemented separately and is allowed.

## Project layout

- `src/app/` — Expo Router screens: home, parts list, dynamic part page, dynamic article page, root navigation layout.
- `src/components/` — shared screen shell/header, themed text, Part and Article cards.
- `src/data/constitution.ts` — local typed Parts I–III, article metadata, lookups and ordered navigation helpers.
- `src/data/sources.ts` — source name, department, edition and source URL.
- `src/types/constitution.ts` — `Article`, `ArticleParagraph`, `ConstitutionPart` types.
- `src/constants/theme.ts` — centralized light/dark colors, fonts, spacing and layout constants.
- `src/hooks/use-theme.tsx` and color-scheme hooks — theme resolution and reader override.
- `phase_1.md`, `phase_2.md`, `phase_2.5.md` — project phase specifications; Phase 2.5 is the active polish brief.
- `README.md` — setup and high-level project overview (some statements predate recent reader changes; see current-state notes).

Package scripts in `package.json` include `npm run start`, `npm run android`, `npm run ios`, `npm run web`, `npm run typecheck`, `npm run lint`, `npm run format:check`. Dependencies are already installed in `node_modules`. Current stack versions include Expo `~57.0.26`, React Native `0.86.3`, React `19.2.3`, Expo Router `~57.0.24`, and TypeScript `~6.0.3`. No clipboard package is present or wanted for now.

## Current implementation

### Navigation and data

- Home offers navigation into Parts; Articles, Schedules and Amendments are disabled “Coming soon” tiles.
- Parts I–III and their Articles are rendered from the shared local data source. Part article counts and ranges come from that data.
- `getArticlePosition()` derives previous/next and overall progress from stable article IDs and explicit ordering; navigation crosses Part boundaries and keeps Article 21A in sequence.
- Articles 5–35 have structured text and edition footnotes extracted from the linked official PDF. Articles 31, 31D and 32A are marked omitted, matching the edition.
- Bookmarks store stable article IDs in reader context for the current app session; article objects are always retrieved from the central data source.
- Unknown part/article IDs have fallback screens.
- Data models preserve each article as structured paragraph entries with optional labels, indentation and `kind` (`proviso` or `explanation`); editorial notes are stored separately from the legal text.
- Source metadata currently identifies the Government of India, Ministry of Law and Justice, Legislative Department, Fourth English-Kannada diglot edition, as on 11 November 2025, with a URL in `src/data/sources.ts`. Preserve this metadata unless it is verified incorrect from the authoritative edition.

### Reader features currently in code

The dynamic article screen (`src/app/article/[articleId].tsx`) currently includes:

- Dark/light reader theme override; colors are centralized in `src/constants/theme.ts`.
- Small/medium/large legal-text sizes (16/18/21 px) that affect legal text and clause labels, not the rest of the interface.
- Session-only bookmark state; it resets when the app is restarted. No persistence/database.
- Native React Native `Share.share()` on iOS/Android, and Web Share API with a browser fallback on web.
- Official text is visually separated from editorial notes and source edition notes. Existing Article 1–4 notes should not be rewritten.
- Dynamic previous/next navigation and calculated Article X of Y progress.
- Scroll-to-top control that appears after scrolling, animates, and has accessibility-hidden state while inactive.
- Extra bottom padding for reader content and safe-area-aware ScreenShell. `ScreenShell` has optional scroll props and optional overlay; defaults are intended to preserve non-reader screens.
- Source block kept distinct from legal text.
- Accessibility labels on key reader controls; reader action buttons are at least 46 px tall. Text-size controls are currently 40 px tall and can be increased to 44 px in further polish if appropriate.

No new package was required for Share or other work. Do not add clipboard code.

### Theme persistence and article transition update

The theme and reading size now live in `src/context/reader-preferences.tsx`, provided above the Expo Router stack from `src/app/_layout.tsx`. They persist across Article route changes and returning to the reader during the current app session. **They do not yet persist across app restarts.** The requested AsyncStorage package was not installed: the package registry connection failed both in the sandbox and on the network-enabled retry. Do not claim restart persistence until AsyncStorage is installed and hydration/save logic is completed.

Next/Previous currently `replace` the dynamic Article route with a `direction` query param. The Article screen uses a restrained 280 ms native-driver horizontal transition: Next enters from the right; Previous enters from the left. Navigation controls are temporarily disabled during this transition. The existing native stack animation remains for moving between the Part screen and Article screen, and Article screen keys reset scroll position on Article changes. The lint command did not complete during this work session; rerun it after finishing persistence.

## Visual issue reported by the user

The user provided two dark UI screenshots showing a visual bug:

1. Home screen: the large Constitution feature card is almost entirely white/blank while its heading/action appear absent or low-contrast.
2. Article 1 reader: the official text surface appears white/blank; the next-article button appears as a blank white card. The title, bookmark and other labels render.

Treat this as an unresolved visual bug until verified on the current app. Inspect actual theme values, `useTheme`, root/system color scheme, `ThemedText`, and styles on Home and article navigation/text cards. Test both reader themes and a narrow viewport. In particular, distinguish a truly missing child/text from a text/background contrast mismatch. The user originally said the Expo packages were installed, so do not spend time reinstalling the stack unless a concrete dependency error appears.

## Known data/encoding issue to investigate

Several strings currently appear as mojibake in source/output, for example `â€”`, `â€œ`, `â†’`, and `â€¹`. These occur in `src/data/constitution.ts` and some UI components/screens. They should be checked and corrected carefully to proper Unicode, without changing constitutional wording or editorial notes. Because this is legal text, compare against the chosen official edition before correcting text, punctuation, omitted portions or editorial notes. Do not guess legal content. Relevant `rg` search can find suspicious sequences.

## Phase 2.5 status and remaining work

Implemented in current files: reader theme and text-size controls, session bookmark interaction, Share action, editorial-notes separation, long-scroll support/back-to-top, source explanation, accessible labels, and navigation polish. The user asked to omit copy. The optional subtle reading-progress bar was not added.

The following visual/encoding Phase 2.5 follow-up remains separate from Phase 3:

1. Reproduce and fix the reported blank/white-card visual bug on Home and Article screens.
2. Inspect and correct obvious text-encoding/mojibake defects. Verify any edits to constitutional material against the Legislative Department edition referenced in `src/data/sources.ts`; do not invent text.
3. Review whether the source edition metadata, bundled Articles 1–4 and editorial notes exactly match that edition. The data is structured, but accuracy must be confirmed at the primary source.
4. Increase text-size control hit targets from 40 px to at least 44 px if it fits cleanly; check all reader buttons and disabled states.
5. Run `npm run typecheck`, `npm run lint`, and `npm run format:check` after changes. Check web routes/build if available.
6. Manually inspect at narrow phone widths (~320 px), a normal Android phone, and a larger phone, particularly Article 3 scrolling/title/navigation/source. Verify theme toggle, font controls, bookmark, share, scroll-to-top and Articles 1–4 prev/next behavior.
7. Update `README.md` if its “Bookmark remains visual only” statement becomes confusing; it is session-interactive now but still not persisted.

Do not add clipboard Copy unless the user explicitly authorizes it later. Do not begin Phase 4 unless the user asks.

## Verification status at handoff

Phase 3.1 verification: typecheck, lint, formatting check, and Expo web export passed. Interactive browser/device visual inspection was not completed; no visual behavior beyond the static export is claimed.

## Working approach

- Inspect before editing and preserve the Expo Router architecture.
- Keep official constitutional data separate from UI.
- Prefer small changes and existing React Native primitives.
- Never paraphrase legal text or merge editions silently.
- Do not add packages without a clear need; all project dependencies are already installed.
- Tell the user what changed and which checks actually ran.
