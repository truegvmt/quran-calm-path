import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Sparkles, Library, MessageCircle, Calendar, Search } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Surah Exploration",
    description: "Browse all 114 Surahs with Makki/Madani context, themes, and revelation background. See estimated reading time and personalized insight counts.",
  },
  {
    icon: Sparkles,
    title: "Personalized Insights",
    description: "AI-powered analysis connects Quranic verses to your life context. Each insight includes ayah reference, Arabic text, translation, and relevance.",
  },
  {
    icon: Library,
    title: "Your Wisdom Library",
    description: "Organize insights into Active, Archived, and Saved. Add notes, life area tags, and implementation designs. Your spiritual growth, tracked.",
  },
  {
    icon: MessageCircle,
    title: "Reflection Prompts",
    description: "Daily and weekly prompts help you pause, contemplate, and journal. Rich-text editor for deep reflection on how insights manifest.",
  },
  {
    icon: Calendar,
    title: "Smart Reminders",
    description: "Calendar integration and notification hooks (WhatsApp, Telegram) keep insights active. Focus Mode for distraction-free contemplation.",
  },
  {
    icon: Search,
    title: "Discovery & Search",
    description: "Find wisdom by theme, life situation, Surah, or ayah. Filter by active/archived status. Surface the guidance you need, when you need it.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-background">
      <div className="container px-4 md:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Core Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to transform Quranic wisdom into lived practice
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
