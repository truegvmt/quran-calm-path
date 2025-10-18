import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // INTEGRATION POINT: Clerk Auth
    // Handle actual authentication here
    console.log(isSignUp ? "Sign up" : "Sign in", { email, password });
    
    // Redirect to explore page after signup/signin
    navigate("/explore");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      <div className="container max-w-md mx-auto py-16 px-4">
        <Card className="animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t('auth.welcome')}</CardTitle>
            <CardDescription>
              {isSignUp ? t('auth.signUpTitle') : t('auth.signInTitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" variant="hero" className="w-full">
                {isSignUp ? t('auth.signUp') : t('auth.signIn')}
              </Button>
            </form>
            
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                {isSignUp ? t('auth.haveAccount') : t('auth.noAccount')}{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-primary hover:underline font-medium"
                >
                  {isSignUp ? t('auth.switchToSignIn') : t('auth.switchToSignUp')}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
