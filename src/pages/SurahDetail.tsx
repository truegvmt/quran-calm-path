import { useState } from "react";
import { Header } from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Book, MapPin, Clock, Sparkles, ArrowLeft, Plus, MessageCircle } from "lucide-react";

// INTEGRATION POINT: CursorAI + Quran JSON
// Generate insights based on user profile + Surah content
// Fetch from supabase edge function that calls CursorAI

const mockInsights = [
  {
    id: 1,
    core_message: "Patience in difficulty transforms trials into spiritual growth",
    ayah_number: "2:153",
    ayah_arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ",
    ayah_translation: "O you who have believed, seek help through patience and prayer.",
    context: "Revealed during early Madani period when Muslims faced hardship",
    personal_relevance: "You mentioned struggling with anxiety. This ayah connects patience with active worship.",
    reflection_prompt: "Think of a current challenge. How could viewing it as a test of patience shift your response?",
  },
  {
    id: 2,
    core_message: "Gratitude opens the heart to recognize Allah's constant blessings",
    ayah_number: "2:172",
    ayah_arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
    ayah_translation: "So remember Me; I will remember you. And be grateful to Me and do not deny Me.",
    context: "Part of dietary laws section, emphasizing gratitude in daily acts",
    personal_relevance: "Aligns with your goal of cultivating a gratitude mindset in everyday moments.",
    reflection_prompt: "What's one blessing you've overlooked today? How might acknowledging it change your state?",
  },
];

export default function SurahDetail() {
  const { t } = useLanguage();
  const [selectedInsight, setSelectedInsight] = useState<typeof mockInsights[0] | null>(null);
  const [actionPlan, setActionPlan] = useState({
    what: "",
    when: "",
    frequency: "",
    metrics: "",
  });

  // Mock data - INTEGRATION: fetch from API
  const surah = {
    number: 2,
    name_arabic: "ٱلْبَقَرَة",
    name_english: "Al-Baqarah",
    type: "Madani",
    verses: 286,
    themes: ["Law", "Faith", "Guidance", "Patience", "Gratitude"],
    revelation_context: "Revealed in Madinah over several years, establishing Islamic law and community principles.",
    reading_time: "45 min",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8 md:px-8 max-w-6xl mx-auto">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6 gap-2" onClick={() => window.location.href = "/explore"}>
          <ArrowLeft className="h-4 w-4" />
          {t('surahDetail.backToExplore')}
        </Button>

        {/* Surah Overview */}
        <Card className="mb-8 border-border/50">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-3xl">{surah.name_english}</CardTitle>
                <p className="text-4xl text-muted-foreground font-arabic">{surah.name_arabic}</p>
              </div>
              <Badge variant="outline" className="text-base px-3 py-1">
                {t('surahDetail.surah')} {surah.number}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{surah.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                <span>{surah.verses} {t('surahDetail.verses')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{surah.reading_time} {t('surahDetail.read')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-primary font-medium">{mockInsights.length} {t('surahDetail.personalizedInsights')}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-sm">{t('surahDetail.keyThemes')}</h3>
              <div className="flex flex-wrap gap-2">
                {surah.themes.map((theme) => (
                  <Badge key={theme} variant="secondary">
                    {theme}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="font-semibold text-sm">{t('surahDetail.revelationContext')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{surah.revelation_context}</p>
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{t('surahDetail.insightsTailored')}</h2>

          {mockInsights.map((insight, index) => (
            <Card
              key={insight.id}
              className="hover:shadow-[var(--shadow-card)] transition-all duration-300 animate-fade-in border-border/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-xl leading-relaxed">{insight.core_message}</CardTitle>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {insight.ayah_number}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Arabic + Translation */}
                <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
                  <p className="text-xl text-right font-arabic leading-loose">{insight.ayah_arabic}</p>
                  <p className="text-sm text-muted-foreground italic">{insight.ayah_translation}</p>
                  <p className="text-xs text-muted-foreground pt-2">{insight.context}</p>
                </div>

                {/* Personal Relevance */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <Sparkles className="h-4 w-4" />
                    <span>{t('surahDetail.whyThisMatters')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{insight.personal_relevance}</p>
                </div>

                {/* Reflection Prompt */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <MessageCircle className="h-4 w-4" />
                    <span>{t('surahDetail.reflectionPromptLabel')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">{insight.reflection_prompt}</p>
                </div>

                {/* Action Gateway */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="wisdom" className="w-full gap-2" onClick={() => setSelectedInsight(insight)}>
                      <Plus className="h-4 w-4" />
                      {t('surahDetail.addToLibraryBtn')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{t('surahDetail.actionPlanTitle')}</DialogTitle>
                      <DialogDescription>
                        {t('surahDetail.actionPlanDescription')}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 pt-4">
                      <div className="p-4 bg-muted/30 rounded-lg text-sm">
                        <p className="font-medium mb-1">{selectedInsight?.core_message}</p>
                        <p className="text-xs text-muted-foreground">{selectedInsight?.ayah_number}</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="what">{t('surahDetail.whatLabel')}</Label>
                        <Textarea
                          id="what"
                          placeholder={t('surahDetail.whatPlaceholder')}
                          value={actionPlan.what}
                          onChange={(e) => setActionPlan({ ...actionPlan, what: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="when">{t('surahDetail.whenLabel')}</Label>
                          <Input
                            id="when"
                            placeholder={t('surahDetail.whenPlaceholder')}
                            value={actionPlan.when}
                            onChange={(e) => setActionPlan({ ...actionPlan, when: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="frequency">{t('surahDetail.howOftenLabel')}</Label>
                          <Input
                            id="frequency"
                            placeholder={t('surahDetail.howOftenPlaceholder')}
                            value={actionPlan.frequency}
                            onChange={(e) => setActionPlan({ ...actionPlan, frequency: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="metrics">{t('surahDetail.metricsLabel')}</Label>
                        <Textarea
                          id="metrics"
                          placeholder={t('surahDetail.metricsPlaceholder')}
                          value={actionPlan.metrics}
                          onChange={(e) => setActionPlan({ ...actionPlan, metrics: e.target.value })}
                        />
                      </div>

                      <Button
                        variant="hero"
                        className="w-full"
                        onClick={() => {
                          // INTEGRATION: Save to Supabase library table
                          console.log("Saving action plan:", { insight: selectedInsight, plan: actionPlan });
                          // await supabase.from('library').insert({ ... })
                        }}
                      >
                        {t('surahDetail.saveToLibraryBtn')}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
