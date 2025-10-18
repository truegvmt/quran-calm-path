import { BookOpen, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

// INTEGRATION POINT: Clerk Auth
// When implementing, import { SignInButton, UserButton, useUser } from "@clerk/clerk-react"
// Show SignInButton when !user, UserButton when user exists

export const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = "/"}>
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold tracking-tight">{t('header.title')}</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="/#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('header.howItWorks')}
          </a>
          <a href="/#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('header.features')}
          </a>
          <a href="/explore" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('header.explore')}
          </a>
          <a href="/library" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('header.library')}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSelector />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            className="rounded-full"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* CLERK INTEGRATION: Replace with actual auth */}
          <Button variant="outline" size="sm" onClick={() => window.location.href = "/auth"}>
            {t('header.signIn')}
          </Button>
          <Button variant="hero" size="sm" onClick={() => window.location.href = "/onboarding"}>
            {t('header.getStarted')}
          </Button>
        </div>
      </div>
    </header>
  );
};
