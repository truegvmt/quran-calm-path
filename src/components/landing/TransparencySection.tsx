import { Card } from "@/components/ui/card";
import { Shield, Users, Sparkles, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const trustPoints = [
  {
    icon: Shield,
    title: "Scholar-Backed AI",
    description: "Our AI is trained on verified Quranic translations and classical tafsir. Every insight references authentic sources.",
  },
  {
    icon: Users,
    title: "No Performative Metrics",
    description: "No likes, no streaks, no public leaderboards. Your spiritual journey is between you and Allah.",
  },
  {
    icon: Sparkles,
    title: "Transparent Process",
    description: "See exactly how insights are generated—ayah references, context, and how they map to your profile.",
  },
  {
    icon: Heart,
    title: "Humility First",
    description: "We don't claim perfection. This is a tool for reflection, not a replacement for scholars or community.",
  },
];

export const TransparencySection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/20">
      <div className="container px-4 md:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Trust & Transparency</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built with honesty and reverence for the sacred text
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {trustPoints.map((point, index) => (
            <Card
              key={index}
              className="p-6 space-y-3 hover:shadow-[var(--shadow-card)] transition-all duration-300 border-border/50"
            >
              <div className="text-primary">
                <point.icon className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-lg">{point.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
