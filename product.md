# Quranic Insight Platform — Product Documentation

> **An AI-powered spiritual companion for meaningful Quran exploration.**

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Target Audience](#2-target-audience)
3. [Core Value Proposition](#3-core-value-proposition)
4. [Key Features](#4-key-features)
5. [User Journey](#5-user-journey)
6. [Pages & Screens](#6-pages--screens)
7. [Technology Stack](#7-technology-stack)
8. [Architecture Overview](#8-architecture-overview)
9. [Data Models](#9-data-models)
10. [AI & Semantic Search](#10-ai--semantic-search)
11. [Internationalization (i18n)](#11-internationalization-i18n)
12. [Transparency & Trust](#12-transparency--trust)
13. [Security](#13-security)
14. [API Endpoints](#14-api-endpoints)
15. [Future Roadmap](#15-future-roadmap)

---

## 1. Product Overview

The **Quranic Insight Platform** is a web application that helps Muslims build a deeper, more personal connection with the Quran. It combines traditional Quranic text with modern AI technology to deliver **personalized reflections and insights** tailored to each user's life stage, interests, and spiritual goals.

### Mission

*To make the wisdom of the Quran accessible, relevant, and personally meaningful for every Muslim — through thoughtful technology that respects the sacred nature of the text.*

### Problem We Solve

Many Muslims want to engage more deeply with the Quran but face barriers:
- Difficulty finding verses relevant to their current life circumstances
- Lack of personalized guidance connecting scripture to daily life
- Language barriers between classical Arabic text and modern understanding
- No centralized place to save, reflect on, and act upon Quranic wisdom

The Quranic Insight Platform bridges these gaps by combining AI-powered semantic search with a thoughtful, personalized experience.

---

## 2. Target Audience

| Segment | Description |
|---------|-------------|
| **Students** | Young Muslims seeking guidance on faith, purpose, and identity |
| **Professionals** | Working adults balancing career, ethics, and spiritual growth |
| **Parents** | Family-focused individuals seeking wisdom on relationships and upbringing |
| **Retirees** | Individuals deepening their spiritual connection in later life |

All segments share a desire for **meaningful, personalized engagement** with the Quran — regardless of their level of Arabic proficiency.

---

## 3. Core Value Proposition

```
Personalized AI-generated insights from the Quran,
tailored to your life context,
in your preferred language.
```

**What makes us different:**
- 🤖 **AI-Powered, Not AI-Replaced** — AI assists discovery; scholars verify; you decide
- 🌍 **Trilingual** — Full support for English, Arabic, and Urdu with automatic RTL
- 📚 **Personal Library** — Save, organize, and revisit your favorite verses and insights
- 🔒 **Privacy-First** — Your spiritual journey is yours; data is isolated per user
- ✅ **Transparent** — All AI-generated content is clearly labeled

---

## 4. Key Features

### 4.1 Personalized Insights
AI-generated reflections tailored to the user's life context. The system considers:
- Life stage (student, professional, parent, retired)
- Topic interests (faith, family, career, health, ethics, community)
- Spiritual goals (deeper understanding, daily reflection, personal growth, spiritual connection)

Insight types:
| Type | Description |
|------|-------------|
| `concise` | Brief, focused reflection (default) |
| `condensed` | Medium-length contextual insight |
| `expanded` | In-depth exploration with practical applications |

### 4.2 Surah Explorer
Browse all **114 surahs** of the Quran with:
- Surah name in English and Arabic
- Verse count and revelation place (Meccan/Medinan)
- Full-text search across surah names
- Individual verse view with Arabic text, translation, and tafsir (commentary)

### 4.3 Personal Library
Users can save and organize:
- **Verses** — Individual ayahs that resonate
- **Insights** — AI-generated reflections worth revisiting
- Organized by tabs: All, Recent, Favorites
- Folder-based organization for advanced users

### 4.4 Multilingual Support
Three fully supported languages:
- 🇬🇧 **English** (LTR)
- 🇸🇦 **Arabic** (RTL)
- 🇵🇰 **Urdu** (RTL)

Every UI string, label, and content area is translated. The app automatically switches text direction based on the selected language.

### 4.5 Daily Reflections
Fresh, personalized insights delivered regularly to inspire consistent engagement with the Quran.

### 4.6 Action Plans & Reflections
- Create personal **action plans** tied to insights (with due dates and completion tracking)
- Write **reflections** on insights with 1–5 star ratings
- Track spiritual growth over time

### 4.7 Community Sharing
Share insights with the community (optionally anonymous) to inspire others.

---

## 5. User Journey

```
Landing Page
    │
    ▼
Onboarding Quiz (3 steps)
    ├── Step 1: Life Stage (single select)
    ├── Step 2: Topic Interests (multi-select)
    └── Step 3: Spiritual Goals (multi-select)
    │
    ▼
Authentication (Sign In / Sign Up)
    │
    ▼
Explore Surahs ──────────────────┐
    │                             │
    ▼                             ▼
Surah Detail View          Personal Library
    ├── Verses (Arabic + Translation)
    ├── AI Insights (Generate on demand)
    ├── Save to Library
    └── Share
```

### Onboarding Flow Detail

The onboarding quiz personalizes the experience before the user even creates an account:

1. **Life Stage** — Select one: Student, Professional, Parent, Retired
2. **Interests** — Select multiple: Faith & Belief, Family & Relationships, Career & Purpose, Health & Wellbeing, Ethics & Character, Community & Society
3. **Spiritual Goals** — Select multiple: Deeper Understanding, Daily Reflection, Personal Growth, Spiritual Connection

Users can skip the quiz at any time and proceed directly to authentication.

---

## 6. Pages & Screens

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Hero, How It Works, Features, Transparency, CTA |
| `/onboarding` | Onboarding | 3-step personalization quiz |
| `/auth` | Authentication | Sign In / Sign Up forms |
| `/explore` | Explore | Browse and search all 114 surahs |
| `/surah/:id` | Surah Detail | Verses, translations, AI insights |
| `/library` | Library | Saved verses and insights (authenticated) |

### Landing Page Sections
1. **Hero** — "Discover Meaningful Insights from the Quran" with primary CTA
2. **How It Works** — 3-step visual explanation (Share Context → Receive Verses → Explore Insights)
3. **Features** — Personalized Insights, Personal Library, Multilingual Support, Daily Reflections
4. **Transparency** — Commitment to authenticity (AI labeling, original text, scholar verification)
5. **CTA** — "Begin Your Spiritual Journey Today"

---

## 7. Technology Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.3 | UI framework |
| Vite | 5.4 | Build tool and dev server |
| TypeScript | 5.6 | Type safety |
| Tailwind CSS | 3.4 | Utility-first styling |
| React Router | 6.30+ | Client-side routing |
| TanStack React Query | 5.x | Server state management |
| Lucide React | 0.468+ | Icon library |
| Clerk React | 5.7 | Authentication UI |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 15 | API routes (App Router) |
| Clerk | — | Authentication & user management |
| OpenAI | GPT-4o-mini | AI insight generation |
| Supabase | — | PostgreSQL database + pgvector |

### Infrastructure
| Technology | Purpose |
|-----------|---------|
| Turbo | Monorepo build orchestration |
| ESLint 9 | Code linting |
| PostCSS + Autoprefixer | CSS processing |

---

## 8. Architecture Overview

### Monorepo Structure

```
quran-calm-path/
├── src/                        # Main Lovable frontend (port 8080)
│   ├── components/             # UI components
│   │   └── landing/            # Landing page sections
│   ├── contexts/               # React contexts (Language, Theme)
│   └── pages/                  # Route pages
├── apps/
│   ├── frontend/               # Vite + React frontend (port 5173)
│   │   └── src/
│   │       ├── components/     # Frontend components
│   │       └── lib/            # API client utilities
│   └── backend/                # Next.js 15 API (port 3000)
│       └── src/
│           ├── app/api/        # API route handlers
│           ├── config/         # Service configurations
│           └── lib/            # Auth utilities
├── packages/
│   └── shared/                 # Shared TypeScript types & schemas
│       └── src/
│           ├── types.ts        # Core type definitions
│           └── schemas.ts      # Validation schemas
├── migrations/                 # SQL migration files (001–005)
└── turbo.json                  # Build orchestration config
```

### Data Flow

```
User Browser
    │
    ▼
React Frontend (Vite)
    │  HTTP requests via API client
    ▼
Next.js Backend API
    ├── Clerk Auth Middleware (verify JWT)
    ├── OpenAI (generate insights)
    └── Supabase (read/write data)
         └── PostgreSQL + pgvector
```

### Key Architectural Decisions
- **API-First**: The frontend never communicates directly with the database. All data flows through the Next.js backend API.
- **Shared Types**: The `packages/shared` package ensures type consistency between frontend and backend.
- **Row-Level Security**: Supabase RLS policies ensure users can only access their own data.
- **Vector Embeddings**: pgvector enables semantic search — finding Quranic verses by meaning, not just keywords.

---

## 9. Data Models

### Entity Relationship Overview

```
auth_users (Clerk sync)
    │
    ├── user_profiles (1:1) — JSONB values, challenges, goals, settings
    ├── insights (1:many) — AI-generated reflections
    │       ├── library_items (many:many via user+insight)
    │       ├── action_plans (1:many)
    │       ├── reflections (1:many)
    │       └── shared_insights (1:many)
    ├── token_usage (1:many per week)
    └── model_audit_log (1:many)

surahs (114 chapters)
    └── ayahs (1:many) — Individual verses

embeddings — Vector representations of ayahs, insights, tafsir
```

### Core Tables

| Table | Description | Key Fields |
|-------|-------------|------------|
| `auth_users` | User accounts synced from Clerk | `clerk_id`, `email`, `first_name`, `last_name` |
| `user_profiles` | Personalization data (JSONB) | `values`, `challenges`, `goals`, `settings`, `serenity_signal` |
| `surahs` | 114 Quran chapters | `name`, `name_arabic`, `ayah_count`, `revelation_place` |
| `ayahs` | Individual verses | `text`, `text_arabic`, `translation`, `tafsir` |
| `insights` | AI-generated reflections | `content`, `type`, `confidence`, `review_status`, `source` |
| `embeddings` | Vector representations (1536-dim) | `embedding`, `content_type`, `metadata` |
| `library_items` | User's saved insights | `user_id`, `insight_id` |
| `action_plans` | Personal action items | `title`, `description`, `due_date`, `completed` |
| `reflections` | User reflections on insights | `content`, `rating` (1–5) |
| `shared_insights` | Community shared insights | `anonymous` flag |
| `token_usage` | Weekly API usage tracking | `tokens_used`, `tokens_limit` |
| `model_audit_log` | AI model call audit trail | `model_name`, `prompt_tokens`, `completion_tokens`, `cost_usd` |

---

## 10. AI & Semantic Search

### How AI Insights Work

1. **User requests an insight** for a specific surah or verse
2. **Backend retrieves context**: user profile (life stage, interests, goals) + verse text
3. **OpenAI GPT-4o-mini** generates a personalized reflection considering:
   - The user's life context from their onboarding profile
   - The original Arabic text and its translation
   - Relevant tafsir (scholarly commentary)
4. **Insight is stored** with a confidence score and marked as AI-generated
5. **Review status** defaults to `pending` — can be elevated to `approved` by scholars

### Semantic Verse Search (pgvector)

The platform uses **1536-dimensional vector embeddings** to enable meaning-based search:

- Each ayah, insight, and tafsir passage is embedded using OpenAI's embedding model
- When a user describes their situation, the system finds the most semantically relevant verses
- IVFFLAT indexes ensure fast approximate nearest-neighbor search at scale

### Token Management

- Users have a **weekly token budget** (default: 100,000 tokens)
- Every AI call is tracked in `token_usage` and `model_audit_log`
- Cost tracking in USD for operational visibility

---

## 11. Internationalization (i18n)

### Supported Languages

| Language | Code | Direction | Script |
|----------|------|-----------|--------|
| English | `en` | LTR | Latin |
| Arabic | `ar` | RTL | Arabic |
| Urdu | `ur` | RTL | Nastaliq |

### Implementation

- **Context-based**: `LanguageContext` provides `t()` translation function, current `language`, and `direction`
- **Automatic RTL**: `document.documentElement.dir` is set automatically when language changes
- **Persistent**: Language preference saved to `localStorage`
- **Comprehensive coverage**: 80+ translation keys covering all UI strings:
  - Navigation, Hero, How It Works, Features, Transparency, CTA
  - Onboarding (all steps and options)
  - Explore, Surah Detail, Library
  - Authentication forms
  - Common UI elements (loading, error, retry, close)

### Language Selector

Available in the header navigation, allowing instant language switching with immediate visual feedback.

---

## 12. Transparency & Trust

The platform takes a principled approach to AI and religious content:

| Principle | Implementation |
|-----------|---------------|
| **AI Labeling** | All AI-generated insights are clearly marked with disclaimers |
| **Original Text** | Arabic Quranic text is always shown alongside translations |
| **Scholar Verification** | Insights have a `review_status` (pending → approved/rejected) |
| **User Verification** | Users are encouraged to verify insights with qualified scholars |
| **Community Feedback** | Users can rate and reflect on insights to improve quality |
| **Source Tracking** | Every insight tracks its `source` (ai, scholar_review, user) |

### AI Disclaimer

Displayed on every insight:
> *"AI-generated content. Please verify with qualified scholars."*

Available in all three languages.

---

## 13. Security

### Authentication
- **Clerk** handles all authentication (sign-up, sign-in, session management)
- **Webhook sync** keeps Clerk users in sync with the `auth_users` table
- **JWT verification** on every API request via Next.js middleware

### Data Protection
- **Row-Level Security (RLS)** policies on all user-facing tables
- Users can only read/write their own data
- Service role key used only on the backend (never exposed to the client)

### API Security
- All API routes protected by Clerk middleware
- Token-based rate limiting per user per week
- Model audit log tracks all AI API calls with cost

### Infrastructure Security
- Environment variables for all secrets (Supabase, Clerk, OpenAI keys)
- Backend validates all configuration on startup
- CORS and CSRF protections via Next.js defaults

---

## 14. API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/health` | Health check | No |
| `GET` | `/api/test` | API test endpoint | No |
| `GET` | `/api/surahs` | List all surahs | Yes |
| `GET` | `/api/user/profile` | Get user profile | Yes |
| `POST` | `/api/insights/generate` | Generate AI insight | Yes |
| `POST` | `/api/auth/webhook` | Clerk webhook handler | Webhook |

---

## 15. Future Roadmap

### Phase 1 — Content Completion
- [ ] Complete surah data for all 114 chapters
- [ ] Full ayah dataset with translations and tafsir
- [ ] Audio playback for verses (Quranic recitation)

### Phase 2 — Enhanced AI
- [ ] Semantic search UI — describe your situation, find relevant verses
- [ ] Conversation mode — multi-turn dialogue about verses
- [ ] Progressive insight generation (concise → condensed → expanded)

### Phase 3 — Community & Scholars
- [ ] Scholar review workflow with approval dashboard
- [ ] Community sharing and discovery feed
- [ ] User-submitted insights and reflections
- [ ] Upvoting and curation of community content

### Phase 4 — Engagement & Growth
- [ ] Push notifications for daily reflections
- [ ] Streaks and engagement tracking
- [ ] Advanced action plan workflows (reminders, progress tracking)
- [ ] Social sharing (WhatsApp, Twitter, Instagram stories)

### Phase 5 — Platform Expansion
- [ ] Mobile-optimized PWA
- [ ] Offline support for saved content
- [ ] Additional languages (Turkish, Malay, French, Bengali)
- [ ] Integration with Islamic calendar events

---

## Appendix: Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `SUPABASE_URL` | Supabase project URL | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side database access | ✅ |
| `SUPABASE_ANON_KEY` | Client-side database access | ✅ |
| `CLERK_SECRET_KEY` | Clerk authentication (backend) | ✅ |
| `CLERK_PUBLISHABLE_KEY` | Clerk authentication (frontend) | ✅ |
| `CLERK_WEBHOOK_SECRET` | Clerk webhook verification | ✅ |
| `OPENAI_API_KEY` | OpenAI GPT-4o-mini API access | ✅ |

---

*Built with ❤️ for the Muslim community*
