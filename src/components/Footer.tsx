import { BookOpen, Github, Twitter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-semibold">Quranic Insight</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Turn Quranic guidance into actionable wisdom, personalized for your life.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a></li>
              <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#explore" className="hover:text-foreground transition-colors">Explore Surahs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Methodology</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Scholars</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Connect</h3>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>Built with humility. Scholar-backed insights powered by AI.</p>
        </div>
      </div>
    </footer>
  );
};
