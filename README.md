# Quranic Insight Platform

A modern, AI-powered platform for discovering meaningful insights from the Quran. Built with Next.js 15, Vite, Supabase, Clerk, and OpenAI.

## 🏗️ Architecture

This is a **modern monorepo** built with:
- **Turbo** for build orchestration
- **Next.js 15** with App Router for the backend API
- **Vite + React 18** for the frontend
- **Supabase** for database and real-time features
- **Clerk** for authentication
- **OpenAI GPT-4o-mini** for AI insights
- **TypeScript** throughout
- **Zero deprecation warnings** - modern dependencies only

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ 
- npm 10+
- Supabase account
- Clerk account
- OpenAI API key

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd quran-calm-path
npm install
```

2. **Set up environment:**
```bash
npm run setup:env
# Edit .env with your actual values
```

3. **Run database migrations:**
```bash
# Execute these SQL files in your Supabase SQL editor:
# - migrations/001_enable_extensions.sql
# - migrations/002_core_tables.sql  
# - migrations/003_indexes.sql
# - migrations/004_rls_policies.sql
# - migrations/005_functions.sql
```

4. **Start development:**
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 📁 Project Structure

```
quran-calm-path/
├── apps/
│   ├── frontend/          # Vite + React frontend
│   └── backend/           # Next.js 15 API backend
├── packages/
│   └── shared/            # Shared TypeScript types
├── migrations/            # SQL migration files
├── scripts/              # Utility scripts
└── turbo.json            # Turbo configuration
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start all development servers
- `npm run build` - Build all packages
- `npm run test` - Run all tests
- `npm run lint` - Lint all packages
- `npm run clean` - Clean all build artifacts

### Package Scripts

**Frontend:**
- `npm run dev:frontend` - Start Vite dev server
- `npm run build:frontend` - Build for production

**Backend:**
- `npm run dev:backend` - Start Next.js dev server
- `npm run build:backend` - Build Next.js app

## 🗄️ Database Schema

### Core Tables
- `auth_users` - User accounts (synced from Clerk)
- `user_profiles` - User preferences and settings
- `surahs` - Quran chapters (114 total)
- `ayahs` - Individual verses
- `insights` - AI-generated insights
- `embeddings` - Vector embeddings for search
- `library_items` - User's saved insights
- `action_plans` - Personal action items
- `reflections` - User reflections
- `token_usage` - API usage tracking

### Key Features
- **Vector Search**: pgvector with IVFFLAT indexes
- **Row Level Security**: User data isolation
- **JSONB Fields**: Flexible user profiles and metadata
- **Audit Logging**: Complete model call tracking

## 🔐 Security

- **Authentication**: Clerk with webhook sync
- **Authorization**: Supabase RLS policies
- **Data Protection**: User data isolation
- **API Security**: Token-based rate limiting

## 🤖 AI Features

- **Smart Retrieval**: Vector similarity search
- **Progressive Generation**: Token-efficient insights
- **Scholar Review**: Human oversight workflow
- **Token Accounting**: Usage tracking and limits

## 📊 Monitoring

- **Structured Logging**: Built-in Next.js logging
- **Health Checks**: `/api/health` endpoint
- **Audit Trail**: Complete model call history

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
vercel --prod
```

### Docker
```bash
# Build and run with Docker
docker build -t quran-calm-path .
docker run -p 3000:3000 quran-calm-path
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:backend
npm run test:frontend
```

## 📝 Environment Variables

See `.env.example` for all required variables. Key ones:

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (server-only)
- `CLERK_SECRET_KEY` - Clerk secret key (server-only)
- `OPENAI_API_KEY` - OpenAI API key (server-only)

## 🎯 Zero Deprecation Guarantee

This project uses only modern, actively maintained dependencies:
- ✅ **Next.js 15** - Latest stable
- ✅ **Vite 5** - Fastest build tool
- ✅ **React 18** - Latest stable
- ✅ **TypeScript 5.6** - Latest stable
- ✅ **ESLint 9** - Modern linting
- ✅ **Vitest** - Modern testing (replaces Jest)
- ✅ **Turbo** - Modern monorepo orchestration

**No deprecated packages, no warnings, no legacy dependencies.**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For issues and questions:
1. Check the documentation
2. Search existing issues
3. Create a new issue with details

---

**Built with ❤️ for the Muslim community**