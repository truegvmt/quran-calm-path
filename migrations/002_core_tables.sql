-- Core tables for the Quranic Insight Platform
-- This migration creates all essential tables with proper constraints and indexes

-- Users table (synced from Clerk)
CREATE TABLE auth_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clerk_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles with JSONB for flexible data
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth_users(id) ON DELETE CASCADE,
    values JSONB DEFAULT '{}',
    challenges JSONB DEFAULT '{}',
    goals JSONB DEFAULT '{}',
    settings JSONB DEFAULT '{"reminder_frequency": 3, "focus_mode": false}',
    serenity_signal DECIMAL(3,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Surahs table
CREATE TABLE surahs (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    name_arabic VARCHAR(100) NOT NULL,
    ayah_count INTEGER NOT NULL,
    revelation_order INTEGER NOT NULL,
    revelation_place VARCHAR(20) CHECK (revelation_place IN ('Mecca', 'Medina')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ayahs table
CREATE TABLE ayahs (
    id SERIAL PRIMARY KEY,
    surah_id INTEGER REFERENCES surahs(id) ON DELETE CASCADE,
    number INTEGER NOT NULL,
    text TEXT NOT NULL,
    text_arabic TEXT NOT NULL,
    translation TEXT,
    tafsir TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(surah_id, number)
);

-- Insights table
CREATE TABLE insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth_users(id) ON DELETE CASCADE,
    surah_id INTEGER REFERENCES surahs(id),
    ayah_ids INTEGER[],
    content TEXT NOT NULL,
    type VARCHAR(20) CHECK (type IN ('concise', 'condensed', 'expanded')) DEFAULT 'concise',
    confidence DECIMAL(3,2) DEFAULT 0.00,
    meta JSONB DEFAULT '{}',
    review_status VARCHAR(20) DEFAULT 'pending' CHECK (review_status IN ('pending', 'approved', 'rejected')),
    source VARCHAR(50) DEFAULT 'ai' CHECK (source IN ('ai', 'scholar_review', 'user')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Embeddings table with vector support
CREATE TABLE embeddings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID NOT NULL,
    content_type VARCHAR(20) CHECK (content_type IN ('ayah', 'insight', 'tafsir')),
    content_text TEXT NOT NULL,
    embedding VECTOR(1536) NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Library items (user's saved insights)
CREATE TABLE library_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth_users(id) ON DELETE CASCADE,
    insight_id UUID REFERENCES insights(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, insight_id)
);

-- Action plans
CREATE TABLE action_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth_users(id) ON DELETE CASCADE,
    insight_id UUID REFERENCES insights(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    due_date TIMESTAMP WITH TIME ZONE,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reflections
CREATE TABLE reflections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth_users(id) ON DELETE CASCADE,
    insight_id UUID REFERENCES insights(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shared insights (community features)
CREATE TABLE shared_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth_users(id) ON DELETE CASCADE,
    insight_id UUID REFERENCES insights(id) ON DELETE CASCADE,
    anonymous BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Token usage tracking
CREATE TABLE token_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth_users(id) ON DELETE CASCADE,
    week_start DATE NOT NULL,
    tokens_used INTEGER DEFAULT 0,
    tokens_limit INTEGER DEFAULT 100000,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, week_start)
);

-- Model audit log
CREATE TABLE model_audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth_users(id) ON DELETE CASCADE,
    model_name VARCHAR(100) NOT NULL,
    prompt_tokens INTEGER,
    completion_tokens INTEGER,
    total_tokens INTEGER,
    cost_usd DECIMAL(10,6),
    request_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);