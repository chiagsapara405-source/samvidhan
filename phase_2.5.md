# SAMVIDHAN — PHASE 2.5

You are continuing the existing **Samvidhan — Constitution of India** React Native + Expo + TypeScript application.

Phase 1 and Phase 2 are already complete.

The application currently has:

Home
→ Constitution
→ Part I
→ Articles 1–4
→ Article Reader

The constitutional text, source information, reading controls, navigation, and themes are already implemented.

This task is a **Phase 2.5 polish and stability pass**.

## IMPORTANT

Do NOT rebuild the application.

Before modifying anything:

1. Inspect the existing project.
2. Understand the current architecture.
3. Preserve all working Phase 1 and Phase 2 functionality.
4. Make incremental changes.
5. Do not replace Expo Router.
6. Do not introduce a state-management library.
7. Do not add a backend.
8. Do not add AI.
9. Do not add authentication.
10. Do not add additional Constitution Parts.

The goal is to make the existing Part I reader feel polished, reliable, and ready for Phase 3.

---

# 1. EDITORIAL NOTES — CLEAR SEPARATION

Improve the distinction between:

OFFICIAL TEXT

and

EDITORIAL NOTES

The user must never confuse editorial notes with constitutional text.

Keep the existing official text visually dominant.

Create a clearer editorial notes section.

Suggested hierarchy:

```text
OFFICIAL TEXT

┌─────────────────────────────┐
│                             │
│ (1) India, that is Bharat...│
│                             │
│ (2) The States...           │
│                             │
└─────────────────────────────┘


EDITORIAL NOTES

1. Clause (2) was substituted...
2. Sub-clause (b) was substituted...
```

Add a subtle explanatory label:

```text
Editorial notes are reference notes
from the selected constitutional edition
and are not part of the Article text.
```

Do not alter the actual constitutional text.

Do not rewrite editorial notes.

---

# 2. ARTICLE TEXT FORMATTING

Improve the legal-text reading experience.

The reader must correctly display:

- numbered clauses
- lettered sub-clauses
- provisos
- explanations
- paragraphs
- indentation

Do not flatten everything into one paragraph.

For example:

```text
(3) The territory of India shall comprise—

    (a) the territories of the States;

    (b) the Union territories specified
        in the First Schedule; and

    (c) such other territories as may
        be acquired.
```

Maintain readable indentation.

Long clauses must wrap naturally.

Do not use manual line breaks that break when the screen width changes.

---

# 3. READING FONT SIZE

The existing controls are:

```text
A−    A    A+
```

Keep them.

However, ensure that changing text size affects ONLY the constitutional reading content.

It should NOT dramatically resize:

- screen header
- Article title
- Bookmark button
- navigation buttons
- source metadata
- UI labels

Create a dedicated reading-text style.

Suggested sizes:

Small:
16px

Medium:
18px

Large:
21px

If the existing application uses slightly different values, preserve its design language while maintaining a sensible difference between the three sizes.

---

# 4. READING THEME

Keep:

```text
Dark
Light
```

The theme switch should affect the entire reading experience consistently.

Dark:

```text
Background: near black
Surface: dark charcoal
Primary text: warm white
Secondary text: muted gray
Accent: muted saffron
```

Light:

```text
Background: warm ivory / off-white
Surface: white
Primary text: dark charcoal
Secondary text: muted gray
Accent: muted saffron
```

Do not use pure white everywhere in Light mode.

Do not introduce additional themes.

---

# 5. COPY ARTICLE

Add a simple action:

```text
Copy Text
```

Place it near the Bookmark control.

Possible layout:

```text
☆ Bookmark     Copy
```

When the user taps Copy:

1. Copy the official Article text to the clipboard.
2. Show a small temporary confirmation.

Example:

```text
✓ Article text copied
```

The confirmation should disappear automatically.

Do not create a permanent notification screen.

Use the appropriate Expo/React Native clipboard package.

Before adding a dependency, check whether the project already has a suitable clipboard implementation.

If a new dependency is genuinely required, install the Expo-compatible version.

---

# 6. SHARE ARTICLE

Add:

```text
Share
```

The share action should use the native device share sheet where supported.

Share useful information such as:

```text
Article 1 — Name and territory of the Union

The Constitution of India

[official article text]
```

Do not implement a custom social sharing UI.

Use the native sharing functionality.

Check platform compatibility before implementation.

---

# 7. BOOKMARK BUTTON

The current Bookmark button already exists.

Do not introduce authentication.

For Phase 2.5, improve the interaction if bookmarking already has state.

When selected:

```text
☆ Bookmark
```

becomes something visually equivalent to:

```text
★ Bookmarked
```

Use the existing theme.

If bookmark persistence does not currently exist, DO NOT build a database.

A simple local implementation is acceptable.

If persistence is already implemented, preserve it.

Do not add Supabase or another backend.

---

# 8. LONG ARTICLE READING UX

Article 3 is significantly longer than Articles 1 and 2.

Make sure long Articles work correctly.

Requirements:

- smooth vertical scrolling
- no clipped text
- no horizontal overflow
- no content hidden behind floating UI
- proper bottom padding
- proper safe-area handling

The user must be able to reach the end of Article 3 comfortably.

The article navigation and source section must remain reachable.

---

# 9. OPTIONAL SUBTLE READING PROGRESS

Add a very subtle reading progress indicator ONLY if it fits the existing architecture cleanly.

Example:

```text
━━━━━━━━━━━━━━
```

It should represent the user's approximate position within the Article.

Do NOT add a large progress widget.

Do NOT allow it to distract from reading.

If implementing this introduces unnecessary complexity or performance issues, skip it.

---

# 10. BACK-TO-TOP

For long Articles such as Article 3, add a small floating back-to-top control.

Example:

```text
↑
```

Requirements:

- initially hidden
- appears after the user scrolls down
- tapping it scrolls to the top
- subtle animation
- does not cover constitutional text
- respects safe areas

Keep it small.

Do not create a large floating action button.

---

# 11. SOURCE SECTION

Keep the existing source information.

It should remain clearly separated from the constitutional content.

Example:

```text
SOURCE

The Constitution of India

Government of India,
Ministry of Law and Justice,
Legislative Department

Edition:
English edition as on 11 November 2025
```

Do not change the source/version information unless the existing data is incorrect.

Do not invent source information.

The source section should visually communicate:

"This identifies the edition of the constitutional material used by this application."

---

# 12. ARTICLE NAVIGATION POLISH

Keep the existing dynamic navigation.

For example:

Article 2:

```text
┌───────────────────┐  ┌───────────────────┐
│ ← Previous        │  │ Next →            │
│                   │  │                   │
│ Article 1         │  │ Article 3         │
│ Name and territory│  │ Formation of new  │
│ of the Union      │  │ States...         │
└───────────────────┘  └───────────────────┘
```

Requirements:

- both cards have consistent height where practical
- long titles wrap correctly
- disabled navigation is visually clear
- no blank buttons
- no horizontal overflow
- touch targets are comfortable

Article 1:

Previous disabled.

Article 4:

Next disabled.

---

# 13. ARTICLE 3 SPECIFIC TEST

Article 3 is the stress test for the reader.

Test:

- long title
- multiple clauses
- sub-clauses
- proviso
- explanations
- editorial notes
- navigation
- source
- scrolling
- font-size changes
- dark/light theme

Make sure the layout does not break anywhere.

---

# 14. RESPONSIVE DESIGN

Test narrow phone widths.

At minimum verify:

- 320px-ish width
- normal Android phone
- large phone

Check:

- Article title
- constitutional text
- navigation cards
- source information
- Article 3
- buttons

Nothing should be cut off.

---

# 15. ACCESSIBILITY

Improve accessibility where appropriate.

Buttons must have meaningful labels.

Examples:

```text
"Decrease text size"
"Default text size"
"Increase text size"
"Copy Article text"
"Share Article"
"Bookmark Article"
"Scroll to top"
```

Do not rely only on icons.

Maintain comfortable touch targets.

---

# 16. LOADING AND ERROR STATES

If Article data is temporarily unavailable or invalid, show a clean error state.

Example:

```text
Unable to load Article

The requested constitutional content
could not be loaded.

[ Back to Part ]
```

The application must not crash.

---

# 17. PERFORMANCE

Do not add unnecessary libraries.

Do not add:

- Redux
- Zustand
- MobX
- React Query
- Supabase
- Firebase
- a UI framework

unless the existing architecture already requires one.

Keep the current architecture lightweight.

For long content, use the appropriate React Native scrolling component.

Avoid unnecessary re-renders while scrolling.

---

# 18. VISUAL POLISH

Maintain the existing visual identity:

- black / charcoal
- warm ivory
- muted saffron
- editorial serif headings
- clean sans-serif UI
- subtle borders
- restrained animations

Do not introduce:

- neon colors
- glassmorphism everywhere
- excessive gradients
- excessive shadows
- excessive animations
- generic SaaS dashboard styling

The application should feel like a premium digital reference library.

---

# 19. DO NOT CHANGE THE INFORMATION ARCHITECTURE

Keep:

```text
Home
 ↓
Constitution
 ↓
Part I
 ↓
Article
```

Do not add bottom navigation yet.

Do not add global search yet.

Do not add profile/account screens.

Do not add AI screens.

Do not add quiz screens.

---

# 20. TESTING CHECKLIST

After implementation test:

### Article 1

- Official text displays correctly
- Font size works
- Theme works
- Copy works
- Share works
- Bookmark works
- Previous disabled
- Next → Article 2

### Article 2

- Previous → Article 1
- Next → Article 3

### Article 3

- Long content scrolls correctly
- Clauses are readable
- Editorial notes are separated
- Back-to-top works
- Font size works
- Theme works
- Copy works
- Share works
- Previous → Article 2
- Next → Article 4

### Article 4

- Previous → Article 3
- Next disabled

### General

- No horizontal overflow
- No crashes
- No blank buttons
- No clipped text
- No console errors
- No TypeScript errors
- No unnecessary dependencies

---

# FINAL OUTPUT

After completing Phase 2.5, report:

1. Files modified
2. Dependencies added
3. Features added
4. Bugs fixed
5. Accessibility improvements
6. Performance considerations
7. Tests performed
8. Any remaining issues

STOP HERE.

Do not begin Phase 3.

Phase 3 will be a separate task for expanding the Constitution to additional Parts.
