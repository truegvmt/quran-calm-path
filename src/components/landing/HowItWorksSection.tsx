import { Card } from "@/components/ui/card";
import { ListChecks, Lightbulb, Target, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const steps = [
  {
    icon: ListChecks,
    title: "Share Your Context",
    description: "Tell us about your values, life stage, challenges, and spiritual goals through a thoughtful quiz.",
    color: "text-primary",
  },
  {
    icon: Lightbulb,
    title: "Receive Insights",
    description: "Get personalized Quranic wisdom with ayah references, translations, and context tailored to your life.",
    color: "text-accent",
  },
  {
    icon: Target,
    title: "Design Your Action",
    description: "Transform insights into concrete action plans with what, when, how, and success metrics you define.",
    color: "text-primary",
  },
  {
    icon: Heart,
    title: "Reflect & Grow",
    description: "Journal your experiences, track reflections, and let the wisdom deepen over time.",
    color: "text-accent",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 md:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A calm, deliberate process from insight to implementation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative p-6 space-y-4 hover:shadow-[var(--shadow-card)] transition-all duration-300 animate-fade-in border-border/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground border-2 border-background">
                {index + 1}
              </div>

              <div className={`${step.color} mb-2`}>
                <step.icon className="h-8 w-8" />
              </div>

              <h3 className="font-semibold text-lg">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
