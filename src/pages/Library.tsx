import { useState } from "react";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Archive, Bookmark, CheckCircle2, Edit2, Trash2 } from "lucide-react";

// INTEGRATION POINT: Supabase
// Fetch from library table with filters: status = "active" | "archived" | "saved"
// Fields: insight_id, action_plan, notes, life_area_tags, created_at, last_reflected

const mockLibraryItems = [
  {
    id: 1,
    status: "active",
    insight: "Patience in difficulty transforms trials into spiritual growth",
    ayah: "2:153",
    action_plan: {
      what: "When I feel anxious, pause and make dua before reacting",
      when: "Throughout the day, especially in stressful moments",
      frequency: "As needed",
      metrics: "Feel calmer, respond rather than react",
    },
    notes: "Started noticing I react less impulsively. Need to be more consistent.",
    life_areas: ["Mental Health", "Relationships"],
    created_at: "2025-01-15",
  },
  {
    id: 2,
    status: "active",
    insight: "Gratitude opens the heart to recognize Allah's constant blessings",
    ayah: "2:172",
    action_plan: {
      what: "Write 3 blessings each night before bed",
      when: "Before sleep",
      frequency: "Daily",
      metrics: "More positive mindset, less complaining",
    },
    notes: "This has been transformative. Sleep better and wake up grateful.",
    life_areas: ["Spiritual Growth", "Mental Health"],
    created_at: "2025-01-10",
  },
];

export default function Library() {
  const [activeTab, setActiveTab] = useState("active");
  const [editingNote, setEditingNote] = useState<number | null>(null);
  const [noteText, setNoteText] = useState("");

  const filteredItems = mockLibraryItems.filter((item) => item.status === activeTab);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8 md:px-8 max-w-6xl mx-auto">
        <div className="space-y-2 mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Your Wisdom Library</h1>
          <p className="text-lg text-muted-foreground">
            Track your active practices, archive completed ones, and save inspiration
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="active" className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Active
            </TabsTrigger>
            <TabsTrigger value="archived" className="gap-2">
              <Archive className="h-4 w-4" />
              Archived
            </TabsTrigger>
            <TabsTrigger value="saved" className="gap-2">
              <Bookmark className="h-4 w-4" />
              Saved
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-8 space-y-6">
            {filteredItems.length === 0 ? (
              <Card className="text-center p-12 border-dashed">
                <p className="text-muted-foreground">No items yet. Start exploring Surahs to add insights!</p>
              </Card>
            ) : (
              filteredItems.map((item, index) => (
                <Card
                  key={item.id}
                  className="hover:shadow-[var(--shadow-card)] transition-all duration-300 animate-fade-in border-border/50"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-xl">{item.insight}</CardTitle>
                          <Badge variant="outline" className="text-xs">{item.ayah}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.life_areas.map((area) => (
                            <Badge key={area} variant="secondary" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Archive className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription className="text-xs">
                      Added {new Date(item.created_at).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Action Plan */}
                    <div className="space-y-3 p-4 bg-muted/20 rounded-lg">
                      <h3 className="font-semibold text-sm">Action Plan</h3>
                      <div className="grid gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground font-medium">What: </span>
                          <span>{item.action_plan.what}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <span className="text-muted-foreground font-medium">When: </span>
                            <span>{item.action_plan.when}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground font-medium">Frequency: </span>
                            <span>{item.action_plan.frequency}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground font-medium">Success looks like: </span>
                          <span>{item.action_plan.metrics}</span>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-semibold">Your Reflections</Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs gap-1"
                          onClick={() => {
                            setEditingNote(item.id);
                            setNoteText(item.notes);
                          }}
                        >
                          <Edit2 className="h-3 w-3" />
                          Edit
                        </Button>
                      </div>
                      {editingNote === item.id ? (
                        <div className="space-y-2">
                          <Textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            className="min-h-[80px]"
                            placeholder="How is this practice going? What have you noticed?"
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => {
                                // INTEGRATION: Update in Supabase
                                console.log("Saving note:", noteText);
                                setEditingNote(null);
                              }}
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditingNote(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground leading-relaxed p-3 bg-muted/10 rounded-lg">
                          {item.notes || "No reflections yet. Click Edit to add your thoughts."}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
