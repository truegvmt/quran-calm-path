-- Row Level Security (RLS) policies
-- This migration enables RLS and creates policies for user data protection

-- Enable RLS on all user-owned tables
ALTER TABLE auth_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE action_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_audit_log ENABLE ROW LEVEL SECURITY;

-- Auth users policies
CREATE POLICY "Users can view own profile" ON auth_users
    FOR SELECT USING (auth.uid()::text = clerk_id);

CREATE POLICY "Users can update own profile" ON auth_users
    FOR UPDATE USING (auth.uid()::text = clerk_id);

-- User profiles policies
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (user_id IN (
        SELECT id FROM auth_users WHERE clerk_id = auth.uid()::text
    ));

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (user_id IN (
        SELECT id FROM auth_users WHERE clerk_id = auth.uid()::text
    ));

CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (user_id IN (
        SELECT id FROM auth_users WHERE clerk_id = auth.uid()::text
    ));

-- Insights policies
CREATE POLICY "Users can view own insights" ON insights
    FOR SELECT USING (user_id IN (
        SELECT id FROM auth_users WHERE clerk_id = auth.uid()::text
    ));

CREATE POLICY "Users can insert own insights" ON insights
    FOR INSERT WITH CHECK (user_id IN (
        SELECT id FROM auth_users WHERE clerk_id = auth.uid()::text
    ));

CREATE POLICY "Users can update own insights" ON insights
    FOR UPDATE USING (user_id IN (
        SELECT id FROM auth_users WHERE clerk_id = auth.uid()::text
    ));

-- Library items policies
CREATE POLICY "Users can view own library" ON library_items
    FOR SELECT USING (user_id IN (
        SELECT id FROM auth_users WHERE clerk_id = auth.uid()::text
    ));

CREATE POLICY "Users can manage own library" ON library_items
    FOR ALL USING (user_id IN (
        SELECT id FROM auth_users WHERE clerk_id = auth.uid()::text
    ));

-- Action plans policies
CREATE POLICY "Users can view own action plans" ON action_plans
    FOR SELECT USING (user_id IN (
        SELECT id FROM auth_users WHERE clerk_id = auth.uid()::text
    ));

CREATE POLICY "Users can manage own action plans" ON action_plans
    FOR ALL USING (user_id IN (
        SELECT id FROM auth_users WHERE clerk_id = auth.uid()::text
    ));

-- Reflections policies
CREATE POLICY "Users can view own reflections" ON reflections
    FOR SELECT USING (user_id IN (
        SELECT id FROM auth_users WHERE clerk_id = auth.uid()::text
    ));

CREATE POLICY "Users can manage own reflections" ON reflections
    FOR ALL USING (user_id IN (
        SELECT id FROM auth_users WHERE clerk_id = auth.uid()::text
    ));

-- Shared insights policies (read-only for community)
CREATE POLICY "Users can view shared insights" ON shared_insights
    FOR SELECT USING (true);

CREATE POLICY "Users can share own insights" ON shared_insights
    FOR INSERT WITH CHECK (user_id IN (
        SELECT id FROM auth_users WHERE clerk_id = auth.uid()::text
    ));

-- Token usage policies
CREATE POLICY "Users can view own token usage" ON token_usage
    FOR SELECT USING (user_id IN (
        SELECT id FROM auth_users WHERE clerk_id = auth.uid()::text
    ));

-- Model audit log policies
CREATE POLICY "Users can view own audit log" ON model_audit_log
    FOR SELECT USING (user_id IN (
        SELECT id FROM auth_users WHERE clerk_id = auth.uid()::text
    ));

-- Public read access for surahs and ayahs
CREATE POLICY "Public can view surahs" ON surahs FOR SELECT USING (true);
CREATE POLICY "Public can view ayahs" ON ayahs FOR SELECT USING (true);
CREATE POLICY "Public can view embeddings" ON embeddings FOR SELECT USING (true);