import { NextResponse } from 'next/server'
import { 
  openaiConfig, 
  supabaseConfig, 
  clerkConfig,
  validateConfig,
  validateOpenAIConfig,
  validateSupabaseConfig,
  validateClerkConfig
} from '@/config'

export async function GET() {
  try {
    // Only validate in runtime, not during build
    if (process.env.NODE_ENV !== 'production' || process.env.VERCEL_ENV) {
      validateConfig()
    }
    
    return NextResponse.json({
      message: 'Backend API is working!',
      timestamp: new Date().toISOString(),
      configuration: {
        openai: {
          model: openaiConfig.model,
          embeddingModel: openaiConfig.ReasoningModel,
          maxTokens: openaiConfig.maxTokens,
          temperature: openaiConfig.temperature,
          hasApiKey: !!openaiConfig.apiKey
        },
        supabase: {
          url: supabaseConfig.url,
          hasAnonKey: !!supabaseConfig.anonKey,
          hasServiceRoleKey: !!supabaseConfig.serviceRoleKey
        },
        clerk: {
          hasPublishableKey: !!clerkConfig.publishableKey,
          hasSecretKey: !!clerkConfig.secretKey,
          hasWebhookSecret: !!clerkConfig.webhookSecret
        }
      },
      status: 'All configurations validated successfully'
    })
  } catch (error) {
    return NextResponse.json({
      message: 'Configuration validation failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
