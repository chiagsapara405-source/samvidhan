# SAMVIDHAN — PHASE 3
## Constitution Data Expansion & Scalable Content Architecture

You are working on an existing React Native + Expo + TypeScript application called:

**Samvidhan — Constitution of India**

This is a digital Constitution reference/reading application.

The project already has:
- Home screen
- Constitution/Parts listing
- Part detail/list screen
- Article detail reader
- Articles 1–4 implemented
- Official Text section
- Editorial Notes
- Part information
- Article count
- Previous/Next article navigation
- Bookmark functionality
- Reading theme: Dark / Light
- Text-size controls
- Copy Text
- Native Share
- Persistent reader preferences
- Article navigation animations
- Premium editorial/legal-reference visual design

## IMPORTANT

This is PHASE 3 only.

Do NOT redesign the application.
Do NOT rebuild the navigation system.
Do NOT add AI.
Do NOT add authentication.
Do NOT add a backend.
Do NOT add a database.
Do NOT add unnecessary libraries.

First inspect the entire existing project and understand the current architecture before modifying anything.

Preserve working functionality.

---

# PHASE 3 GOAL

Transform the Constitution content architecture from the current hardcoded Part I / Articles 1–4 implementation into a scalable, data-driven Constitution system.

The UI should consume Constitution data rather than having article information hardcoded directly inside screens.

The final architecture should make it easy to add:

- Part I
- Part II
- Part III
- Part IV
- Part IVA
- Part V
- Part VI
- Part VII where historically relevant
- Part VIII
- Part IX
- Part IXA
- Part IXB
- Part X
- Part XI
- Part XII
- Part XIII
- Part XIV
- Part XIVA
- Part XV
- Part XVI
- Part XVII
- Part XVIII
- Part XIX
- Part XX
- Part XXI
- Part XXII

without rewriting the UI.

---

# STEP 1 — INSPECT CURRENT ARCHITECTURE

Before writing code, inspect:

- app/
- screens/
- components/
- data/
- types/
- navigation
- article reader
- Part listing
- Article listing
- reader preference/theme implementation
- bookmark implementation
- existing Article 1–4 data
- existing navigation logic

Determine:

1. Where Constitution content currently lives.
2. Whether article data is hardcoded inside components.
3. How Parts are currently represented.
4. How articles are identified.
5. How Previous/Next navigation determines articles.
6. How bookmarks identify an article.
7. How the Article detail screen receives an article.
8. Whether the existing data structure can be safely migrated.

Do not immediately modify files.

After understanding the project, implement the architecture below while preserving the existing UI.

---

# STEP 2 — CREATE A SHARED CONSTITUTION DATA MODEL

Create a central TypeScript model.

For example:

```ts
export type ConstitutionPart = {
  id: string;
  number: string;
  title: string;
  shortTitle?: string;
  description?: string;
  articles: ConstitutionArticle[];
};

export type ConstitutionArticle = {
  id: string;
  number: string;
  title: string;

  partId: string;

  status?: "active" | "repealed" | "omitted";

  officialText: string;

  editorialNotes?: string[];

  explanation?: string;

  order: number;
};
```

Adjust the model to fit the existing project if a better structure already exists.

Do not blindly copy this structure if the current architecture already has an appropriate equivalent.

The important principle is:

**Content data must be separated from UI components.**

---

# STEP 3 — CREATE A CENTRAL CONSTITUTION DATA SOURCE

Create a central data entry point.

For example:

```text
data/
  constitution/
    index.ts
    parts.ts
    part-1.ts
    part-2.ts
    ...
```

Possible architecture:

```text
data/
  constitution/
    index.ts
    types.ts
    metadata.ts
    parts/
      part-1.ts
      part-2.ts
      part-3.ts
      ...
```

Use the architecture that best matches the existing project.

The important requirement is that screens should be able to retrieve data through a central source.

For example:

```ts
getAllParts()
getPartById(id)
getArticleById(id)
getArticlesByPart(partId)
getNextArticle(articleId)
getPreviousArticle(articleId)
```

These can be simple functions.

Do not introduce a state-management library just for this.

---

# STEP 4 — MIGRATE PART I

Move the existing Part I data into the new data architecture.

Part I:

**The Union and Its Territory**

Articles:

- Article 1 — Name and territory of the Union
- Article 2 — Admission or establishment of new States
- Article 3 — Formation of new States and alteration of areas, boundaries or names of existing States
- Article 4 — Laws made under articles 2 and 3 to provide for the amendment of the First and Fourth Schedules and supplemental, incidental and consequential matters

IMPORTANT:

Preserve the existing Article 1–4 official text exactly as currently implemented unless the project already contains an obvious formatting/data bug.

Do not rewrite constitutional wording.

Do not paraphrase Official Text.

Do not "improve" legal wording.

Editorial Notes must remain clearly separate from Official Text.

---

# STEP 5 — ADD PART II

Add the metadata and article structure for:

## PART II
### Citizenship

Articles:

- Article 5 — Citizenship at the commencement of the Constitution
- Article 6 — Rights of citizenship of certain persons who have migrated to India from Pakistan
- Article 7 — Rights of citizenship of certain migrants to Pakistan
- Article 8 — Rights of citizenship of certain persons of Indian origin residing outside India
- Article 9 — Persons voluntarily acquiring citizenship of a foreign State not to be citizens
- Article 10 — Continuance of the rights of citizenship
- Article 11 — Parliament to regulate the right of citizenship by law

The Part II listing must work with the existing Part and Article UI.

---

# STEP 6 — ADD PART III STRUCTURE

Add:

## PART III
### Fundamental Rights

The Part should include its article structure and metadata.

Articles:

- Article 12 — Definition
- Article 13 — Laws inconsistent with or in derogation of the fundamental rights
- Article 14 — Equality before law
- Article 15 — Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth
- Article 16 — Equality of opportunity in matters of public employment
- Article 17 — Abolition of Untouchability
- Article 18 — Abolition of titles
- Article 19 — Protection of certain rights regarding freedom of speech, etc.
- Article 20 — Protection in respect of conviction for offences
- Article 21 — Protection of life and personal liberty
- Article 21A — Right to education
- Article 22 — Protection against arrest and detention in certain cases
- Article 23 — Traffic in human beings and forced labour
- Article 24 — Prohibition of employment of children in factories, etc.
- Article 25 — Freedom of conscience and free profession, practice and propagation of religion
- Article 26 — Freedom to manage religious affairs
- Article 27 — Freedom as to payment of taxes for promotion of any particular religion
- Article 28 — Freedom as to attendance at religious instruction or religious worship in certain educational institutions
- Article 29 — Protection of interests of minorities
- Article 30 — Right of minorities to establish and administer educational institutions
- Article 31 — Compulsory acquisition of property [REPEALED]
- Article 31A — Saving of laws providing for acquisition of estates, etc.
- Article 31B — Validation of certain Acts and Regulations
- Article 31C — Saving of laws giving effect to certain directive principles
- Article 31D — Saving of laws in respect of anti-national activities [REPEALED]
- Article 32 — Remedies for enforcement of rights conferred by this Part
- Article 32A — Constitutional validity of State laws not to be considered in proceedings under article 32 [REPEALED]
- Article 33 — Power of Parliament to modify the rights conferred by this Part in their application to Forces, etc.
- Article 34 — Restriction on rights conferred by this Part while martial law is in force in any area
- Article 35 — Legislation to give effect to the provisions of this Part

IMPORTANT:

Do not treat repealed or omitted Articles as normal active articles.

The UI should clearly distinguish:

**Active**
**Repealed**
**Omitted**

Do not delete historical articles from the data if they are useful for constitutional reference.

---

# STEP 7 — DATA INTEGRITY

This is a legal reference application.

Treat constitutional text as source data, not generated content.

DO NOT:

- invent constitutional text
- paraphrase Official Text
- fabricate clauses
- generate missing articles
- silently modify wording
- merge articles
- remove article suffixes such as 21A, 31A, etc.

If exact official text is not available in the existing project/source material:

DO NOT invent it.

Instead, create the article metadata/structure and leave the officialText clearly marked as unavailable or TODO.

For example:

```ts
officialText: ""
```

or use the project's existing safe placeholder convention.

Never present generated text as official constitutional text.

---

# STEP 8 — ARTICLE IDs

Article IDs must remain stable.

Do NOT use array indexes as permanent article IDs.

Good:

```text
article-1
article-2
article-21a
article-31a
```

Bad:

```text
article-0
article-1
article-2
```

where IDs depend on array position.

Bookmarks must continue working if article ordering changes.

---

# STEP 9 — PART IDs

Use stable Part IDs.

Examples:

```text
part-i
part-ii
part-iii
part-iva
part-v
part-ix-a
part-ix-b
```

Do not depend on display numbering for internal IDs.

---

# STEP 10 — MAKE THE UI DATA-DRIVEN

Refactor the existing screens so they consume the new data model.

The UI should not contain giant hardcoded article arrays.

For example:

Part screen:

```ts
const part = getPartById(partId);
```

Article screen:

```ts
const article = getArticleById(articleId);
```

Previous/Next:

```ts
const previous = getPreviousArticle(articleId);
const next = getNextArticle(articleId);
```

The article reader should work regardless of which Part or Article is opened.

---

# STEP 11 — ARTICLE NAVIGATION

Previous/Next navigation must now work across the data source.

Example:

Article 4 → Next → Article 5

Article 5 → Previous → Article 4

Part boundaries must also work.

Example:

Last article of Part I → Next → first article of Part II.

First article of Part II → Previous → last article of Part I.

Do not hardcode these transitions.

Use the centralized article ordering/data model.

Preserve the Phase 2.5 forward/backward animation behavior.

---

# STEP 12 — PART LIST SCREEN

The Parts screen should now be generated from the Constitution data.

Each Part should display:

- Part number
- Part title
- Article range/count if available
- appropriate description if available

Do not manually create a separate UI card for every Part.

One reusable PartCard component should render all Parts.

---

# STEP 13 — ARTICLE LIST SCREEN

Article lists must be generated from the selected Part.

Each article item should display:

- Article number
- Article title
- status badge if necessary

For example:

```text
ARTICLE 21A
Right to education
```

For repealed/omitted articles:

```text
ARTICLE 31
Repealed
```

Use restrained visual treatment.

Do not make the UI look like an admin dashboard.

The visual identity must remain:

- premium
- editorial
- legal/reference oriented
- minimal
- black/charcoal
- ivory typography
- muted saffron accents
- serif display typography
- clean sans-serif UI

---

# STEP 14 — ARTICLE DETAIL

The existing Article Reader should continue to work.

For an article with official text:

Show:

ARTICLE NUMBER

TITLE

Official Text

[constitutional text]

Editorial Notes

[notes if available]

Part Information

[Part]

Source

The Constitution of India

Government of India
Ministry of Law and Justice
Legislative Department

Edition information

Keep the existing source/version treatment.

Do not make Editorial Notes look like constitutional text.

---

# STEP 15 — REPEALED / OMITTED ARTICLES

The application must correctly communicate historical article status.

Use:

```ts
status: "active"
```

or:

```ts
status: "repealed"
```

or:

```ts
status: "omitted"
```

Do not confuse:

- repealed
- omitted
- renumbered
- existing article with inserted letter suffix

The data layer should preserve the distinction.

---

# STEP 16 — SEARCH PREPARATION

Do NOT build the actual search feature yet.

But structure the data so future search can easily search:

- Part number
- Part title
- Article number
- Article title
- Official Text

Do not install a search engine or third-party library.

A future Phase can build search on top of this data layer.

---

# STEP 17 — BOOKMARK COMPATIBILITY

Ensure the existing bookmark system works with the new article IDs.

Bookmarks should reference stable article IDs.

Example:

```text
article-21
article-21a
article-32
```

Do not store the entire article object inside bookmarks.

Store IDs and retrieve the current article data from the central source.

---

# STEP 18 — PERFORMANCE

Do not load unnecessary heavy data into every screen if the current architecture allows a cleaner approach.

Avoid:

- unnecessary re-renders
- duplicated article objects
- repeated transformations
- large computations during every render

However:

DO NOT over-engineer this.

This is a local reference application.

Simple, predictable architecture is more important than premature optimization.

---

# STEP 19 — ERROR HANDLING

Handle invalid routes gracefully.

Examples:

Invalid Part ID:

```text
Part not found
```

Invalid Article ID:

```text
Article not found
```

Do not crash the application.

Provide a simple way to return to the previous screen.

---

# STEP 20 — TESTING

After implementation, test:

### Parts

- Part I opens
- Part II opens
- Part III opens

### Articles

- Article 1 opens
- Article 4 opens
- Article 5 opens
- Article 21 opens
- Article 21A opens
- Article 31 displays repealed status
- Article 32 opens

### Navigation

- Article 4 → Article 5
- Article 5 → Article 4
- Article 20 → Article 21
- Article 21 → Article 21A
- Article 21A → Article 22

### Part boundaries

- Part I last article → Part II first article
- Part II last article → Part III first article

### Reader preferences

Verify that Phase 2.5 functionality still works:

- Dark theme
- Light theme
- Text size
- Theme persistence
- Bookmark
- Copy text
- Share
- Previous/Next animation
- Back navigation

### UI

Check:

- long article text
- small screens
- large text size
- safe areas
- scrolling
- no clipping
- no overlapping buttons
- no broken navigation

---

# IMPORTANT ARCHITECTURAL RULES

Do NOT introduce:

- Redux
- Zustand
- MobX
- Firebase
- Supabase
- backend
- authentication
- AI
- vector database
- external search service

unless the existing project already requires something similar.

Do not install a library just to solve a problem that can be solved with the existing React Native / Expo architecture.

---

# VISUAL RULE

Do not redesign the existing UI.

The current design direction is intentional.

Maintain:

**Premium legal editorial reference**

rather than:

- generic government portal
- generic SaaS dashboard
- generic mobile app
- flashy AI application

Animations should remain subtle.

---

# VERY IMPORTANT: LEGAL CONTENT SAFETY

This application presents constitutional/legal reference material.

Never fabricate official constitutional text.

Never label AI-generated/paraphrased text as:

"Official Text"

If a source is unavailable, clearly mark it as unavailable/TODO rather than inventing content.

Maintain edition/version metadata.

The content architecture should make it possible to update the Constitution edition later without rewriting the application.

---

# FINAL DELIVERABLE

At the end, report:

1. Files created.
2. Files modified.
3. New data architecture.
4. Parts implemented.
5. Articles implemented.
6. How article lookup works.
7. How Previous/Next works.
8. How stable article IDs work.
9. How repealed/omitted articles are represented.
10. Any constitutional text that was intentionally NOT added because a verified source was unavailable.
11. Tests performed.
12. Any remaining issues.

Do not begin Phase 4.

STOP after Phase 3.