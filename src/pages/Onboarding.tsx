import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function Onboarding() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [selections, setSelections] = useState<Record<number, string[]>>({
    0: [],
    1: [],
    2: [],
  })

  const steps = [
    {
      question: t('onboarding.lifeStage'),
      options: [
        { key: 'student', label: t('onboarding.student') },
        { key: 'professional', label: t('onboarding.professional') },
        { key: 'parent', label: t('onboarding.parent') },
        { key: 'retired', label: t('onboarding.retired') },
      ],
      multiple: false,
    },
    {
      question: t('onboarding.interests'),
      options: [
        { key: 'faith', label: t('onboarding.faith') },
        { key: 'family', label: t('onboarding.family') },
        { key: 'career', label: t('onboarding.career') },
        { key: 'health', label: t('onboarding.health') },
        { key: 'ethics', label: t('onboarding.ethics') },
        { key: 'community', label: t('onboarding.community') },
      ],
      multiple: true,
    },
    {
      question: t('onboarding.goals'),
      options: [
        { key: 'deeperUnderstanding', label: t('onboarding.deeperUnderstanding') },
        { key: 'dailyReflection', label: t('onboarding.dailyReflection') },
        { key: 'personalGrowth', label: t('onboarding.personalGrowth') },
        { key: 'spiritualConnection', label: t('onboarding.spiritualConnection') },
      ],
      multiple: true,
    },
  ]

  const currentStepData = steps[currentStep]

  const toggleSelection = (key: string) => {
    setSelections(prev => {
      const current = prev[currentStep] || []
      if (currentStepData.multiple) {
        return {
          ...prev,
          [currentStep]: current.includes(key)
            ? current.filter(k => k !== key)
            : [...current, key],
        }
      } else {
        return {
          ...prev,
          [currentStep]: [key],
        }
      }
    })
  }

  const isSelected = (key: string) => selections[currentStep]?.includes(key)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Quiz complete, redirect to auth
      navigate('/auth')
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = selections[currentStep]?.length > 0

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12">
      <div className="max-w-2xl mx-auto px-4 w-full">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              {t('onboarding.step')} {currentStep + 1} {t('onboarding.of')} {steps.length}
            </span>
            <button
              onClick={() => navigate('/auth')}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {t('onboarding.skip')}
            </button>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-card rounded-2xl border border-border p-8">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            {currentStepData.question}
          </h2>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {currentStepData.options.map((option) => (
              <button
                key={option.key}
                onClick={() => toggleSelection(option.key)}
                className={`p-4 rounded-xl border-2 transition-all text-start ${
                  isSelected(option.key)
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{option.label}</span>
                  {isSelected(option.key) && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
              {t('onboarding.back')}
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === steps.length - 1 ? t('onboarding.finish') : t('onboarding.next')}
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}