import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

// INTEGRATION POINT: Supabase
// Store quiz results in user_profile table with fields:
// values, life_stage, challenges, spiritual_goals, learning_style, notes

const steps = [
  {
    id: "values",
    title: "Your Core Values",
    description: "What matters most in your life right now?",
    type: "multi-select",
    options: [
      "Family & Relationships",
      "Career & Purpose",
      "Health & Wellbeing",
      "Knowledge & Learning",
      "Community & Service",
      "Patience & Resilience",
    ],
  },
  {
    id: "life_stage",
    title: "Life Stage",
    description: "Where are you in your journey?",
    type: "single",
    options: [
      "Student exploring faith",
      "Young professional",
      "Parent raising children",
      "Mid-life reflection",
      "Elder seeking wisdom",
    ],
  },
  {
    id: "challenges",
    title: "Current Challenges",
    description: "What are you navigating right now? (Select all that apply)",
    type: "multi-select",
    options: [
      "Anxiety or stress",
      "Difficult relationships",
      "Career decisions",
      "Loss or grief",
      "Finding purpose",
      "Staying consistent",
    ],
  },
  {
    id: "spiritual_goals",
    title: "Spiritual Goals",
    description: "What do you hope to cultivate?",
    type: "multi-select",
    options: [
      "Deeper connection with Allah",
      "Better understanding of Quran",
      "More consistent practice",
      "Inner peace",
      "Gratitude mindset",
      "Living Quranic values",
    ],
  },
  {
    id: "learning_style",
    title: "Learning Preference",
    description: "How do you best absorb wisdom?",
    type: "single",
    options: [
      "Short daily insights",
      "Deep weekly reflections",
      "Thematic explorations",
      "Problem-solving guidance",
    ],
  },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  const progress = ((currentStep + 1) / steps.length) * 100;
  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // INTEGRATION: Save to Supabase and redirect to dashboard
      console.log("Quiz completed:", answers);
      // await supabase.from('user_profiles').update({ ...answers })
      window.location.href = "/explore";
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswer = (value: string | string[]) => {
    setAnswers({ ...answers, [step.id]: value });
  };

  const isStepComplete = Boolean(answers[step.id] && 
    (Array.isArray(answers[step.id]) ? answers[step.id].length > 0 : answers[step.id]));

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8 space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="animate-fade-in border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">{step.title}</CardTitle>
            <CardDescription className="text-base">{step.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {step.type === "single" ? (
              <RadioGroup
                value={answers[step.id] as string}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {step.options.map((option) => (
                  <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <div className="space-y-3">
                {step.options.map((option) => {
                  const isSelected = Array.isArray(answers[step.id]) && answers[step.id].includes(option);
                  return (
                    <div
                      key={option}
                      onClick={() => {
                        const current = (answers[step.id] as string[]) || [];
                        const updated = isSelected
                          ? current.filter((v) => v !== option)
                          : [...current, option];
                        handleAnswer(updated);
                      }}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-primary/10 border-primary"
                          : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <span>{option}</span>
                      {isSelected && <Check className="h-4 w-4 text-primary" />}
                    </div>
                  );
                })}
              </div>
            )}

            {currentStep === steps.length - 1 && (
              <div className="pt-4">
                <Label htmlFor="notes" className="text-sm text-muted-foreground">
                  Anything else you'd like to share? (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Share your thoughts..."
                  className="mt-2 min-h-[100px]"
                  value={(answers.notes as string) || ""}
                  onChange={(e) => handleAnswer(e.target.value)}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button
            variant="hero"
            onClick={handleNext}
            disabled={!isStepComplete}
            className="gap-2"
          >
            {currentStep === steps.length - 1 ? "Complete" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
