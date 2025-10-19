import { Card } from "@/components/ui/card";
import { ListChecks, Lightbulb, Target, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const getSteps = (t: any) => [
  {
    icon: ListChecks,
    title: t('howItWorks.steps.0.title'),
    description: t('howItWorks.steps.0.description'),
    color: "text-primary",
  },
  {
    icon: Lightbulb,
    title: t('howItWorks.steps.1.title'),
    description: t('howItWorks.steps.1.description'),
    color: "text-accent",
  },
  {
    icon: Target,
    title: t('howItWorks.steps.2.title'),
    description: t('howItWorks.steps.2.description'),
    color: "text-primary",
  },
  {
    icon: Heart,
    title: t('howItWorks.steps.3.title'),
    description: t('howItWorks.steps.3.description'),
    color: "text-accent",
  },
];

export const HowItWorksSection = () => {
  const { t } = useLanguage();
  const steps = getSteps(t);
  
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 md:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t('howItWorks.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
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
