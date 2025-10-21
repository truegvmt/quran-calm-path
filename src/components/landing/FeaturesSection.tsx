import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Sparkles, Library, MessageCircle, Calendar, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const getFeatures = (t: any) => [
  {
    icon: BookOpen,
    title: t('features.list.0.title'),
    description: t('features.list.0.description'),
  },
  {
    icon: Sparkles,
    title: t('features.list.1.title'),
    description: t('features.list.1.description'),
  },
  {
    icon: Library,
    title: t('features.list.2.title'),
    description: t('features.list.2.description'),
  },
  {
    icon: MessageCircle,
    title: t('features.list.3.title'),
    description: t('features.list.3.description'),
  },
  {
    icon: Calendar,
    title: t('features.list.4.title'),
    description: t('features.list.4.description'),
  },
  {
    icon: Search,
    title: t('features.list.5.title'),
    description: t('features.list.5.description'),
  },
];

export const FeaturesSection = () => {
  const { t } = useLanguage();
  const features = getFeatures(t);
  
  return (
    <section id="features" className="py-20 md:py-28 bg-background">
      <div className="container px-4 md:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t('features.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-[var(--shadow-card)] transition-all duration-300 animate-fade-in border-border/50"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <CardHeader>
                <div className="mb-2 text-primary group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
