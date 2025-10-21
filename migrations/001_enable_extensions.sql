-- Enable required PostgreSQL extensions
-- This migration enables the vector extension and other required extensions

-- Enable vector extension for embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable trigram matching for text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Enable GIN index support
CREATE EXTENSION IF NOT EXISTS btree_gin;