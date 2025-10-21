// Core types for the Quranic Insight Platform

export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface Surah {
  id: number
  name: string
  nameArabic: string
  ayahCount: number
  revelationOrder: number
  revelationPlace: 'Mecca' | 'Medina'
}

export interface Ayah {
  id: number
  surahId: number
  number: number
  text: string
  textArabic: string
  translation: string
  tafsir?: string
}

export interface Insight {
  id: string
  userId: string
  surahId?: number
  ayahIds?: number[]
  content: string
  type: 'concise' | 'condensed' | 'expanded'
  confidence: number
  createdAt: Date
  updatedAt: Date
}

export interface TokenUsage {
  userId: string
  week: string
  tokensUsed: number
  tokensLimit: number
  createdAt: Date
  updatedAt: Date
}