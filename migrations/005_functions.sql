-- Database functions for the Quranic Insight Platform
-- This migration creates utility functions for vector search, token management, and analytics

-- Function to find similar embeddings using cosine similarity
CREATE OR REPLACE FUNCTION match_embeddings(
    query_embedding VECTOR(1536),
    match_threshold FLOAT DEFAULT 0.5,
    match_count INT DEFAULT 5
)
RETURNS TABLE (
    content_id UUID,
    content_type VARCHAR(20),
    content_text TEXT,
    similarity FLOAT,
    metadata JSONB
)
LANGUAGE SQL
AS $$
    SELECT 
        content_id,
        content_type,
        content_text,
        1 - (embedding <=> query_embedding) AS similarity,
        metadata
    FROM embeddings
    WHERE 1 - (embedding <=> query_embedding) > match_threshold
    ORDER BY embedding <=> query_embedding
    LIMIT match_count;
$$;

-- Function to get user's weekly token usage
CREATE OR REPLACE FUNCTION get_user_weekly_tokens(user_uuid UUID)
RETURNS TABLE (
    tokens_used INTEGER,
    tokens_limit INTEGER,
    week_start DATE
)
LANGUAGE SQL
AS $$
    SELECT 
        COALESCE(tu.tokens_used, 0) as tokens_used,
        COALESCE(tu.tokens_limit, 100000) as tokens_limit,
        DATE_TRUNC('week', CURRENT_DATE)::DATE as week_start
    FROM auth_users au
    LEFT JOIN token_usage tu ON au.id = tu.user_id 
        AND tu.week_start = DATE_TRUNC('week', CURRENT_DATE)::DATE
    WHERE au.id = user_uuid;
$$;

-- Function to increment token usage
CREATE OR REPLACE FUNCTION increment_token_usage(
    user_uuid UUID,
    tokens_to_add INTEGER
)
RETURNS VOID
LANGUAGE SQL
AS $$
    INSERT INTO token_usage (user_id, week_start, tokens_used, tokens_limit)
    VALUES (
        user_uuid, 
        DATE_TRUNC('week', CURRENT_DATE)::DATE, 
        tokens_to_add, 
        100000
    )
    ON CONFLICT (user_id, week_start)
    DO UPDATE SET 
        tokens_used = token_usage.tokens_used + tokens_to_add,
        updated_at = NOW();
$$;

-- Function to reset weekly tokens (for cron job)
CREATE OR REPLACE FUNCTION reset_weekly_tokens()
RETURNS VOID
LANGUAGE SQL
AS $$
    -- This function would be called by a cron job
    -- For now, it's a placeholder
    SELECT 1;
$$;

-- Function to compute serenity signal
CREATE OR REPLACE FUNCTION compute_serenity_signal(user_uuid UUID)
RETURNS DECIMAL(3,2)
LANGUAGE SQL
AS $$
    WITH user_metrics AS (
        SELECT 
            -- Low notification rate (inverse of reminder frequency)
            (3.0 - COALESCE((up.settings->>'reminder_frequency')::INTEGER, 3)) / 3.0 as notification_score,
            
            -- Average reflection depth (rating)
            COALESCE(AVG(r.rating), 0) / 5.0 as reflection_score,
            
            -- Action plan completion rate
            COALESCE(
                COUNT(CASE WHEN ap.completed = true THEN 1 END)::DECIMAL / NULLIF(COUNT(ap.id), 0), 
                0
            ) as completion_score
        FROM auth_users au
        LEFT JOIN user_profiles up ON au.id = up.user_id
        LEFT JOIN reflections r ON au.id = r.user_id
        LEFT JOIN action_plans ap ON au.id = ap.user_id
        WHERE au.id = user_uuid
        GROUP BY up.settings
    )
    SELECT 
        COALESCE(
            (notification_score + reflection_score + completion_score) / 3.0,
            0.00
        )::DECIMAL(3,2)
    FROM user_metrics;
$$;

-- Function to get pending review insights
CREATE OR REPLACE FUNCTION get_pending_review_insights()
RETURNS TABLE (
    insight_id UUID,
    user_id UUID,
    content TEXT,
    confidence DECIMAL(3,2),
    created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE SQL
AS $$
    SELECT 
        i.id as insight_id,
        i.user_id,
        i.content,
        i.confidence,
        i.created_at
    FROM insights i
    WHERE i.review_status = 'pending'
        AND (i.confidence < 0.7 OR i.meta->>'flagged' = 'true')
    ORDER BY i.created_at ASC;
$$;

-- Function to update insight review status
CREATE OR REPLACE FUNCTION update_insight_review(
    insight_uuid UUID,
    new_status VARCHAR(20),
    reviewer_notes TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE SQL
AS $$
    UPDATE insights 
    SET 
        review_status = new_status,
        source = CASE WHEN new_status = 'approved' THEN 'scholar_review' ELSE source END,
        meta = COALESCE(meta, '{}'::JSONB) || 
               CASE WHEN reviewer_notes IS NOT NULL 
                    THEN jsonb_build_object('reviewer_notes', reviewer_notes)
                    ELSE '{}'::JSONB 
               END,
        updated_at = NOW()
    WHERE id = insight_uuid;
$$;