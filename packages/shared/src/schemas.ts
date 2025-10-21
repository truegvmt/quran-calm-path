import { z } from 'zod'

// Validation schemas for API requests
export const GenerateInsightSchema = z.object({
  userId: z.string().min(1),
  surahId: z.number().optional(),
  ayahIds: z.array(z.number()).optional(),
  type: z.enum(['concise', 'condensed', 'expanded']).default('concise'),
  seedHints: z.string().optional()
})

export const CreateActionPlanSchema = z.object({
  userId: z.string().min(1),
  insightId: z.string().min(1),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  dueDate: z.string().datetime().optional()
})

export const CreateReflectionSchema = z.object({
  userId: z.string().min(1),
  insightId: z.string().min(1),
  content: z.string().min(1).max(2000),
  rating: z.number().min(1).max(5)
})

export type GenerateInsightRequest = z.infer<typeof GenerateInsightSchema>
export type CreateActionPlanRequest = z.infer<typeof CreateActionPlanSchema>
export type CreateReflectionRequest = z.infer<typeof CreateReflectionSchema>