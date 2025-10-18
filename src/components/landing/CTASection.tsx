import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-primary/5">
      <div className="container px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Ready to transform guidance into action?
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Begin your personalized journey through the Quran. No credit card required. Start reflecting today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button variant="hero" size="lg" className="gap-2 group" onClick={() => window.location.href = "/onboarding"}>
              Get Started Free
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.location.href = "/explore"}>
              Watch Demo
            </Button>
          </div>

          <p className="text-sm text-muted-foreground pt-4">
            Join thousands seeking deeper connection with Quranic wisdom
          </p>
        </div>
      </div>
    </section>
  );
};
