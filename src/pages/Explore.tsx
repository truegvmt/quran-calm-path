import { useState } from "react";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Book, MapPin, Clock } from "lucide-react";

// INTEGRATION POINT: Load from Quran JSON
// Structure: { number, name_arabic, name_english, type: "Makki"/"Madani", total_verses, themes: [] }

const mockSurahs = [
  { number: 1, name_arabic: "ٱلْفَاتِحَة", name_english: "Al-Fatihah", type: "Makki", verses: 7, themes: ["Opening", "Guidance", "Prayer"], insights: 12 },
  { number: 2, name_arabic: "ٱلْبَقَرَة", name_english: "Al-Baqarah", type: "Madani", verses: 286, themes: ["Law", "Faith", "Guidance"], insights: 43 },
  { number: 18, name_arabic: "ٱلْكَهْف", name_english: "Al-Kahf", type: "Makki", verses: 110, themes: ["Trials", "Faith", "Knowledge"], insights: 28 },
  { number: 36, name_arabic: "يٰسٓ", name_english: "Ya-Sin", type: "Makki", verses: 83, themes: ["Resurrection", "Truth", "Warning"], insights: 19 },
  { number: 55, name_arabic: "ٱلرَّحْمَٰن", name_english: "Ar-Rahman", type: "Madani", verses: 78, themes: ["Mercy", "Blessings", "Creation"], insights: 22 },
  { number: 67, name_arabic: "ٱلْمُلْك", name_english: "Al-Mulk", type: "Makki", verses: 30, themes: ["Kingdom", "Sovereignty", "Warning"], insights: 15 },
];

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSurahs = mockSurahs.filter((surah) =>
    surah.name_english.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.name_arabic.includes(searchQuery) ||
    surah.number.toString() === searchQuery
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-12 md:px-8">
        {/* Search Header */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Explore Surahs</h1>
            <p className="text-lg text-muted-foreground">
              Discover personalized insights from all 114 Surahs
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, number, or theme..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>

        {/* Surah Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredSurahs.map((surah, index) => (
            <Card
              key={surah.number}
              className="group hover:shadow-[var(--shadow-card)] transition-all duration-300 cursor-pointer animate-fade-in border-border/50"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => window.location.href = `/surah/${surah.number}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {surah.name_english}
                    </CardTitle>
                    <p className="text-2xl text-muted-foreground font-arabic">
                      {surah.name_arabic}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {surah.number}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{surah.type}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Book className="h-4 w-4" />
                    <span>{surah.verses} verses</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {surah.themes.slice(0, 3).map((theme) => (
                    <Badge key={theme} variant="secondary" className="text-xs">
                      {theme}
                    </Badge>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-border/50">
                  <span className="text-sm text-primary font-medium">
                    {surah.insights} personalized insights
                  </span>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Explore →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
