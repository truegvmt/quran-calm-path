#!/usr/bin/env node

/**
 * Modern Environment Setup Script
 * Creates optimized .env files with zero deprecated dependencies
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const envExample = `# Quranic Insight Platform - Environment Configuration
# Fill in your actual values below

# =============================================================================
# SUPABASE (Backend Only)
# =============================================================================
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# =============================================================================
# CLERK AUTHENTICATION
# =============================================================================
CLERK_PUBLISHABLE_KEY=pk_test_your-publishable-key
CLERK_SECRET_KEY=sk_test_your-secret-key
CLERK_WEBHOOK_SECRET=whsec_your-webhook-secret

# =============================================================================
# OPENAI API
# =============================================================================
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_MODEL=gpt-5-mini
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
OPENAI_MAX_TOKENS=1000
OPENAI_TEMPERATURE=0.7

# =============================================================================
# FRONTEND (Client-Side)
# =============================================================================
VITE_API_BASE_URL=http://localhost:3000/api
`

function createEnvFile() {
  const envPath = path.join(rootDir, '.env')
  
  // Always create/update the .env file
  fs.writeFileSync(envPath, envExample)
  console.log('✅ Created/updated .env file')
}

function createEnvLocal() {
  const frontendEnvPath = path.join(rootDir, 'apps/frontend/.env.local')
  const backendEnvPath = path.join(rootDir, 'apps/backend/.env.local')
  
  const frontendEnv = `# Frontend Environment Variables
# These are loaded from the root .env file
VITE_API_BASE_URL=http://localhost:3000/api
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your-publishable-key
`

  const backendEnv = `# Backend Environment Variables
# All backend variables are loaded from root .env
# This file is kept for Next.js compatibility
`

  fs.writeFileSync(frontendEnvPath, frontendEnv)
  fs.writeFileSync(backendEnvPath, backendEnv)
  
  console.log('✅ Created frontend/.env.local')
  console.log('✅ Created backend/.env.local')
}

function createGitignore() {
  const gitignorePath = path.join(rootDir, '.gitignore')
  const gitignoreContent = `# Dependencies
node_modules/
.pnp
.pnp.js

# Production builds
dist/
build/
.next/
out/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
public

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Turbo
.turbo
`

  fs.writeFileSync(gitignorePath, gitignoreContent)
  console.log('✅ Created .gitignore')
}

function main() {
  console.log('🚀 Setting up modern environment configuration...\n')
  
  createEnvFile()
  createEnvLocal()
  createGitignore()
  
  console.log('\n✅ Environment setup complete!')
  console.log('\n📝 Next steps:')
  console.log('1. Fill in your actual values in .env')
  console.log('2. Run npm install to install dependencies')
  console.log('3. Execute SQL migrations in Supabase')
  console.log('4. Start development with npm run dev')
}

main()