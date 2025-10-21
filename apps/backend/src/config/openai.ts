import OpenAI from 'openai'

export const openaiConfig = {
  apiKey: process.env.OPENAI_API_KEY!,
  model: process.env.OPENAI_MODEL || 'gpt-5-mini',
  ReasoningModel: process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small',
  maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '1000'),
  temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
}

export const openaiClient = new OpenAI({
  apiKey: openaiConfig.apiKey,
})

// Helper functions for common OpenAI operations
export async function generateText(prompt: string, options?: {
  model?: string
  maxTokens?: number
  temperature?: number
}) {
  const response = await openaiClient.chat.completions.create({
    model: options?.model || openaiConfig.model,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: options?.maxTokens || openaiConfig.maxTokens,
    temperature: options?.temperature || openaiConfig.temperature,
  })

  return response.choices[0]?.message?.content || ''
}

export async function generateEmbedding(text: string) {
  const response = await openaiClient.embeddings.create({
    model: openaiConfig.ReasoningModel,
    input: text,
  })

  return response.data[0]?.embedding || []
}
