-- Indexes for optimal performance
-- This migration creates all necessary indexes including vector indexes

-- Standard indexes
CREATE INDEX idx_auth_users_clerk_id ON auth_users(clerk_id);
CREATE INDEX idx_auth_users_email ON auth_users(email);
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_ayahs_surah_id ON ayahs(surah_id);
CREATE INDEX idx_insights_user_id ON insights(user_id);
CREATE INDEX idx_insights_surah_id ON insights(surah_id);
CREATE INDEX idx_insights_created_at ON insights(created_at);
CREATE INDEX idx_insights_review_status ON insights(review_status);
CREATE INDEX idx_embeddings_content_id ON embeddings(content_id);
CREATE INDEX idx_embeddings_content_type ON embeddings(content_type);
CREATE INDEX idx_library_items_user_id ON library_items(user_id);
CREATE INDEX idx_action_plans_user_id ON action_plans(user_id);
CREATE INDEX idx_reflections_user_id ON reflections(user_id);
CREATE INDEX idx_shared_insights_user_id ON shared_insights(user_id);
CREATE INDEX idx_token_usage_user_id ON token_usage(user_id);
CREATE INDEX idx_token_usage_week_start ON token_usage(week_start);
CREATE INDEX idx_model_audit_log_user_id ON model_audit_log(user_id);
CREATE INDEX idx_model_audit_log_created_at ON model_audit_log(created_at);

-- Vector similarity search index (IVFFLAT)
CREATE INDEX idx_embeddings_vector ON embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- GIN indexes for JSONB columns
CREATE INDEX idx_user_profiles_values ON user_profiles USING GIN (values);
CREATE INDEX idx_user_profiles_challenges ON user_profiles USING GIN (challenges);
CREATE INDEX idx_user_profiles_goals ON user_profiles USING GIN (goals);
CREATE INDEX idx_user_profiles_settings ON user_profiles USING GIN (settings);
CREATE INDEX idx_insights_meta ON insights USING GIN (meta);
CREATE INDEX idx_embeddings_metadata ON embeddings USING GIN (metadata);

-- Text search indexes
CREATE INDEX idx_ayahs_text_search ON ayahs USING GIN (to_tsvector('english', text));
CREATE INDEX idx_ayahs_arabic_search ON ayahs USING GIN (to_tsvector('simple', text_arabic));
CREATE INDEX idx_insights_content_search ON insights USING GIN (to_tsvector('english', content));