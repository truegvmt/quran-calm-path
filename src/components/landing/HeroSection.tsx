import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-quran.jpg";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 py-20 md:py-28 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              <span>AI + Scholar-Backed Wisdom</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Turn Quranic guidance into{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                actionable wisdom
              </span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl max-w-2xl">
              Personalized insights from the Quran, tailored to your life stage, challenges, and spiritual goals.
              No performative metrics—just reflection, action, and growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="hero" size="lg" className="gap-2 group" onClick={() => window.location.href = "/onboarding"}>
                Start Your Journey
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.location.href = "/explore"}>
                Explore Surahs
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span>Scholar-verified insights</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span>Daily reflection prompts</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in-slow">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
            <img
              src={heroImage}
              alt="Open Quran with peaceful lighting"
              className="relative rounded-3xl shadow-[var(--shadow-soft)] w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
