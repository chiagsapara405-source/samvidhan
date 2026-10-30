# SAMVIDHAN — PHASE 2

You are continuing development of the existing React Native + Expo + TypeScript application called **Samvidhan**.

Phase 1 is complete.

The existing application currently has:

Home
→ Constitution / Parts
→ Part I
→ Articles 1–4
→ Article Detail

The UI bugs from Phase 1 have already been fixed.

Your job now is to implement **Phase 2: Real Constitution Reader**.

---

# CORE OBJECTIVE

Turn Part I from a prototype into a functioning constitutional reading experience.

Do NOT build the entire Constitution yet.

Do NOT add Part II or other Parts yet.

The goal is to make:

**Part I → Articles 1–4**

fully functional using verified constitutional content from an authoritative source.

---

# 1. AUTHORITATIVE SOURCE REQUIREMENT

The application must use an authoritative source for the constitutional text.

Preferred sources:

1. Government of India — Legislative Department
2. India Code

Do NOT use:

- random blogs
- Wikipedia
- educational websites
- AI-generated constitutional text
- copied snippets from unknown websites

Do not silently combine text from multiple editions.

Record the source/version used by the application.

Use the current verified English Constitution edition selected for this project.

Add source metadata to the data layer.

Example:

```ts
const constitutionSource = {
  name: "Government of India — Legislative Department",
  edition: "2025",
  language: "English",
};
```

If authoritative text cannot be verified automatically, STOP and clearly report that instead of inventing or guessing legal text.

---

# 2. DATA ARCHITECTURE

Keep constitutional data completely separate from UI components.

Use:

```text
data/
  constitution.ts
  sources.ts

types/
  constitution.ts
```

Create strongly typed models.

Example:

```ts
export interface ConstitutionSource {
  name: string;
  edition: string;
  language: string;
}

export interface Article {
  id: string;
  number: number;
  title: string;
  text: string;
  partId: string;
}

export interface ConstitutionPart {
  id: string;
  number: string;
  title: string;
  articleRange: string;
  articles: Article[];
}
```

Do not use `any`.

---

# 3. PART I DATA

Part I is:

```text
Part I
The Union and Its Territory
```

Articles:

```text
Article 1
Name and territory of the Union

Article 2
Admission or establishment of new States

Article 3
Formation of new States and alteration of areas, boundaries or names of existing States

Article 4
Laws made under articles 2 and 3 to provide for the amendment of the First and the Fourth Schedules and supplemental, incidental and consequential matters
```

Use the verified authoritative text for each Article.

Preserve the official numbering, clauses, sub-clauses, provisos, explanations, and punctuation.

Do not summarize or rewrite the official text.

---

# 4. ARTICLE READER

Redesign the Article Detail screen into a proper reading experience.

Structure:

```text
ARTICLE 1

Name and territory
of the Union

────────────────────────

OFFICIAL TEXT

[actual constitutional text]

────────────────────────

PART

Part I — The Union and Its Territory

ARTICLE 1 OF 4

[ Previous ]       [ Next ]
```

The legal text should be the primary focus of the page.

---

# 5. LEGAL TEXT TYPOGRAPHY

The official constitutional text must be highly readable.

Use:

- 17–19px body text initially
- comfortable line height
- generous paragraph spacing
- clear clause indentation
- strong contrast
- no overly decorative typography

For example:

```text
(1) India, that is Bharat, shall be a
Union of States.

(2) The States and the territories
thereof shall be as specified in the
First Schedule.
```

Preserve structure instead of putting the entire Article into one giant paragraph.

If the source contains:

```text
(a)
(b)
(c)
```

preserve those structures visually.

---

# 6. FONT SIZE CONTROL

Add a reading control.

Use:

```text
A−    A    A+
```

Allow at least three reading sizes:

Small
Medium
Large

The default should be Medium.

Use React state for the current session.

Do not add persistent settings storage yet unless it is already available in the project.

---

# 7. THEME CONTROL

The application currently uses a dark visual design.

Keep the existing dark theme.

Add a simple reading-theme control:

```text
Dark
Light
```

The Light mode should use:

- warm/off-white background
- dark text
- subtle borders

Do not add multiple unnecessary themes.

Keep the theme centralized in:

```text
constants/theme.ts
```

---

# 8. ARTICLE NAVIGATION

Navigation must be data-driven.

Do NOT hardcode:

```text
Article 1 → Article 2
Article 2 → Article 3
```

Instead:

1. Find the current Article index.
2. Determine the previous Article.
3. Determine the next Article.
4. Navigate dynamically.

This architecture must work when additional Parts are added later.

For Article 1:

```text
Previous = disabled
Next = Article 2
```

For Article 2:

```text
Previous = Article 1
Next = Article 3
```

For Article 3:

```text
Previous = Article 2
Next = Article 4
```

For Article 4:

```text
Previous = Article 3
Next = disabled
```

---

# 9. NEXT/PREVIOUS BUTTON DESIGN

Do not use blank buttons.

Use:

```text
← Previous
Article 1
```

and:

```text
Next →
Article 2
```

Where appropriate.

The secondary Article number/title can be smaller than the primary navigation label.

Disabled buttons must still have readable disabled-state text.

---

# 10. ARTICLE PROGRESS

Show:

```text
ARTICLE 1 OF 4
```

For Article 3:

```text
ARTICLE 3 OF 4
```

Calculate this dynamically.

Do not hardcode the number.

---

# 11. ARTICLE LIST

Improve the Part I article list so each card contains:

```text
01

Name and territory
of the Union

Article 1 →
```

The title must wrap naturally.

Article 3 has a long title, so specifically test it on narrow mobile screens.

No horizontal overflow.

---

# 12. SOURCE INFORMATION

At the bottom of the Article Detail page, add a subtle source section:

```text
SOURCE

Constitution of India
Government of India
Legislative Department
Edition: 2025
```

This is reference metadata.

Do not make it visually compete with the legal text.

---

# 13. IMPORTANT LEGAL CONTENT RULE

Never alter the official text for styling purposes.

You may format:

- paragraphs
- clauses
- subclauses
- spacing
- indentation

But do NOT change the wording.

Do not automatically "correct" constitutional language.

Do not use AI to paraphrase the official text and present the paraphrase as the Constitution.

---

# 14. SEARCH/JUMP CONTROL

Add a simple "Jump to Article" interaction on the Part I page.

Example:

```text
[ Jump to Article... ]
```

For Phase 2, it only needs to support Articles 1–4.

The architecture should allow it to support all Articles later.

Possible behavior:

User enters:

```text
3
```

Show:

```text
Article 3
Formation of new States...
```

Tapping it opens Article 3.

Do not implement global search yet.

---

# 15. BOOKMARK UI

Keep the existing Bookmark button.

For Phase 2:

- It may remain visual-only.
- Do NOT implement database persistence yet.
- Do NOT add authentication.

If bookmark state is already implemented, do not break it.

---

# 16. OFFLINE-FIRST ARCHITECTURE

The constitutional text for Part I should be bundled with the application.

Do NOT fetch Article text from an API every time the user opens an article.

The user should be able to read Part I without internet access.

Do not introduce a backend for this phase.

---

# 17. ERROR STATES

If an Article cannot be found:

```text
Article not found

The requested constitutional article
could not be found.
```

Button:

```text
Back to Part
```

The app must not crash.

---

# 18. PERFORMANCE

Avoid unnecessary re-renders.

Do not introduce a state management library just for this phase.

React state and the existing architecture are sufficient.

For article lists, use FlatList if appropriate.

---

# 19. NO NEW FEATURES

Do NOT implement:

- Part II
- Part III
- all Constitution Parts
- amendments database
- search across the entire Constitution
- authentication
- Supabase
- Firebase
- AI assistant
- AI explanations
- quizzes
- flashcards
- notifications
- analytics
- payments
- user profiles

Those belong to later phases.

---

# 20. FINAL TESTING

Before finishing:

### Home

Verify Home loads correctly.

### Parts

Verify Part I opens.

### Part I

Verify Articles 1–4 appear.

### Article 1

Verify official text loads.

Verify:

```text
Previous disabled
Next → Article 2
```

### Article 2

Verify:

```text
Previous → Article 1
Next → Article 3
```

### Article 3

Verify:

```text
Previous → Article 2
Next → Article 4
```

### Article 4

Verify:

```text
Previous → Article 3
Next disabled
```

### Reading controls

Verify:

```text
A−
A
A+
```

change text size.

### Theme

Verify:

```text
Dark
Light
```

works correctly.

### Offline

Verify Article content is available without a network request.

### Mobile

Test on a narrow mobile viewport.

Specifically test Article 3 because its title is long.

---

# FINAL REPORT

After implementation, report:

1. Files created/modified
2. Dependencies added, if any
3. Authoritative source/version used
4. How the constitutional data is structured
5. Reading features implemented
6. Navigation changes
7. Theme/font-size changes
8. Tests performed
9. Any remaining issues

STOP after Phase 2.
Do not continue into Phase 3 automatically.