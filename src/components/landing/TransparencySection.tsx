import { Card } from "@/components/ui/card";
import { Shield, Users, Sparkles, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const getTrustPoints = (t: any) => [
  {
    icon: Shield,
    title: t('transparency.points.0.title'),
    description: t('transparency.points.0.description'),
  },
  {
    icon: Users,
    title: t('transparency.points.1.title'),
    description: t('transparency.points.1.description'),
  },
  {
    icon: Sparkles,
    title: t('transparency.points.2.title'),
    description: t('transparency.points.2.description'),
  },
  {
    icon: Heart,
    title: t('transparency.points.3.title'),
    description: t('transparency.points.3.description'),
  },
];

export const TransparencySection = () => {
  const { t } = useLanguage();
  const trustPoints = getTrustPoints(t);
  
  return (
    <section className="py-20 md:py-28 bg-muted/20">
      <div className="container px-4 md:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t('transparency.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('transparency.subtitle')}
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
