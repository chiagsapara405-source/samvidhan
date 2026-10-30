# Build Phase 1 — Constitution of India React Native App

You are a senior React Native engineer. Build the foundation of a mobile application called **Samvidhan** — an independent educational/reference app for reading the Constitution of India.

## IMPORTANT RULES

1. Do NOT build the entire application yet.
2. This is **Phase 1 only**.
3. Do NOT add authentication, backend, Supabase, AI, quizzes, payments, notifications, or analytics.
4. Do NOT invent or paraphrase constitutional text.
5. For now, use clearly marked placeholder text for constitutional article content unless authoritative source text is provided.
6. Keep the architecture scalable because later phases will contain all Parts, Articles, Schedules, Amendments, search, bookmarks, and potentially AI features.
7. Prefer simple, maintainable code over unnecessary abstractions.
8. Use TypeScript.
9. Make the application work on Android and iOS through Expo.
10. Before installing a library, verify that it is actually necessary.

---

# 1. TECH STACK

Create the project using:

- React Native
- Expo
- TypeScript
- Expo Router for navigation
- ESLint
- Prettier

Use the current stable Expo-compatible versions and install dependencies using Expo's recommended installation commands where applicable.

Do NOT install a large UI framework such as NativeBase, Tamagui, or React Native Paper at this stage.

Use React Native's built-in components and StyleSheet initially.

---

# 2. PROJECT SETUP

Create a clean Expo project.

The application should have a structure similar to:

```text
samvidhan/
│
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   │
│   ├── parts/
│   │   ├── index.tsx
│   │   └── [partId].tsx
│   │
│   └── article/
│       └── [articleId].tsx
│
├── components/
│   ├── PartCard.tsx
│   ├── ArticleCard.tsx
│   └── ScreenHeader.tsx
│
├── data/
│   └── constitution.ts
│
├── types/
│   └── constitution.ts
│
├── constants/
│   └── theme.ts
│
├── assets/
│
├── package.json
├── tsconfig.json
└── README.md
```

You may adjust the structure if Expo Router requires a better organization, but keep the same separation of:

- screens/routes
- reusable components
- data
- types
- theme/constants

---

# 3. DESIGN DIRECTION

Create a premium but simple Indian Constitution reading experience.

Visual direction:

- Modern
- Minimal
- Serious
- Educational
- Premium
- Highly readable
- Not overly patriotic or decorative
- Avoid excessive gradients
- Avoid excessive animations

Use a primarily light interface for Phase 1.

Suggested visual language:

- Warm/off-white background
- Dark text
- Deep navy/charcoal for primary UI
- Subtle saffron-inspired accent
- Thin borders
- Rounded cards
- Generous spacing
- Excellent typography

Do not use flags, Ashoka Chakra graphics, or ornamental Indian patterns everywhere.

The application should feel like a professional legal/reference application.

---

# 4. HOME SCREEN

Create the initial Home screen.

Header:

```text
Samvidhan
Constitution of India
```

Add a short introduction:

```text
Explore the Constitution of India,
part by part and article by article.
```

Add a primary card:

```text
The Constitution of India

Read the Constitution
Explore Parts and Articles
```

Add a section:

```text
Explore Constitution
```

with cards for:

```text
Parts
Articles
Schedules
Amendments
```

Only **Parts** needs to be functional in Phase 1.

The other cards can be disabled or marked "Coming soon".

Add a small disclaimer near the bottom:

```text
Independent educational/reference application.
Not affiliated with the Government of India.
```

---

# 5. PARTS SCREEN

Create:

```text
/parts
```

Screen title:

```text
Constitution
```

Subtitle:

```text
Explore the Constitution part by part.
```

For Phase 1, display Part I as functional.

You may show placeholder cards for future Parts, but do NOT invent article data.

Part I card:

```text
PART I

The Union and Its Territory

Articles 1–4
```

Tapping it should navigate to:

```text
/parts/part-1
```

---

# 6. PART I SCREEN

Create the Part I screen.

Title:

```text
Part I
The Union and Its Territory
```

Subtitle:

```text
Articles 1–4
```

Display four article cards:

### Article 1
Name and territory of the Union

### Article 2
Admission or establishment of new States

### Article 3
Formation of new States and alteration of areas, boundaries or names of existing States

### Article 4
Laws made under articles 2 and 3

Each card should be tappable.

Navigation:

```text
/parts/part-1
        ↓
/article/article-1
```

etc.

---

# 7. ARTICLE DETAIL SCREEN

Create a reusable Article Detail screen.

Example:

```text
Article 1

Name and territory of the Union
```

Sections:

```text
Official Text

[Placeholder until authoritative source text is supplied]
```

Then:

```text
Part
Part I — The Union and Its Territory
```

Add:

```text
Article 1 of 4
```

Navigation buttons:

```text
← Previous       Next →
```

For Article 1:

- Previous disabled
- Next → Article 2

For Article 4:

- Previous → Article 3
- Next disabled

Add a bookmark icon/button visually, but do not implement persistent bookmarks yet.

---

# 8. DATA ARCHITECTURE

Do NOT hardcode article information directly into screen components.

Create typed data.

Example:

```ts
export interface Article {
  id: string;
  number: number;
  title: string;
  text?: string;
}

export interface ConstitutionPart {
  id: string;
  number: string;
  title: string;
  articleRange: string;
  articles: Article[];
}
```

Then create:

```text
data/constitution.ts
```

with Part I data.

Use:

```ts
{
  id: "part-1",
  number: "Part I",
  title: "The Union and Its Territory",
  articleRange: "Articles 1–4",
  articles: [...]
}
```

Use IDs such as:

```text
article-1
article-2
article-3
article-4
```

Keep the data layer completely separate from the UI.

---

# 9. COMPONENTS

Create reusable components:

### PartCard

Props should contain the part data.

### ArticleCard

Props should contain article data.

### ScreenHeader

Reusable header with back navigation where appropriate.

Do not create dozens of tiny components unnecessarily.

---

# 10. NAVIGATION

Use Expo Router.

Expected navigation:

```text
Home
  ↓
Parts
  ↓
Part I
  ↓
Article 1
  ↓
Article 2
  ↓
Article 3
  ↓
Article 4
```

The Android hardware back button should behave naturally.

---

# 11. RESPONSIVENESS

The UI must work on:

- Small Android phones
- Normal Android phones
- Large phones
- iPhones

Do not use fixed widths for major containers.

Use:

```ts
flex
padding
margin
maxWidth
width: "100%"
```

appropriately.

Handle safe areas correctly.

---

# 12. ACCESSIBILITY

Add basic accessibility support:

- Accessible labels
- Sufficient touch target sizes
- Meaningful button labels
- Proper text hierarchy
- Do not rely only on icons to communicate actions

---

# 13. ANIMATIONS

Keep animations extremely subtle in Phase 1.

You may use React Native's Animated API for:

- card entrance
- screen transitions

Do NOT install GSAP yet.

We may evaluate Reanimated later when the core application is stable.

---

# 14. ERROR HANDLING

If a user navigates to an invalid Part or Article ID:

Display:

```text
Content not found

The requested constitutional content could not be found.
```

Provide a button:

```text
Go Home
```

Do not allow the app to crash because of invalid route parameters.

---

# 15. CODE QUALITY

Follow these rules:

- Strict TypeScript
- Avoid `any`
- Reusable components
- Meaningful variable names
- No duplicated article data
- No giant screen components
- No unnecessary state
- No unnecessary dependencies
- Keep business/data logic separate from UI
- Add comments only where they provide useful context

---

# 16. CONSTITUTIONAL CONTENT WARNING

Do not fabricate the actual constitutional text.

For the `text` property, use:

```text
[Official constitutional text to be added from an authoritative source]
```

until authoritative content is supplied.

Do not use AI-generated constitutional wording as the official text.

---

# 17. README

Create a README explaining:

- Project name
- Purpose
- Tech stack
- Installation
- Development commands
- Project structure
- Current Phase
- Future roadmap

Include commands such as:

```bash
npm install
npx expo start
```

Also explain how to run on:

```text
Android
iOS
Expo Go
```

where applicable.

---

# 18. FINAL VERIFICATION

After implementation:

1. Install dependencies.
2. Start the Expo development server.
3. Check for TypeScript errors.
4. Check for ESLint errors.
5. Verify every route.
6. Verify Android back navigation.
7. Verify invalid Article/Part IDs.
8. Verify that the app does not crash.
9. Verify that Part I displays Articles 1–4.
10. Verify that each article opens its detail screen.
11. Verify that the UI works on a small mobile viewport.

If you have access to an emulator/device, test it there.

---

# IMPORTANT — DO NOT MOVE TO PHASE 2

Stop after completing:

```text
Expo setup
        ↓
Home
        ↓
Parts
        ↓
Part I
        ↓
Articles 1–4
        ↓
Article detail
```

Do NOT implement:

- all Constitution Parts
- complete constitutional text
- search
- bookmarks database
- AI
- quizzes
- authentication
- backend
- Supabase
- cloud synchronization
- notifications
- payments

At the end, provide:

1. Files created
2. Dependencies installed
3. Commands to run the app
4. What is currently functional
5. Any issues encountered
6. Recommended next step for Phase 2