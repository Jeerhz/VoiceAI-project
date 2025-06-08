"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/auth/auth-layout";
import { createClient } from "@/utils/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        "user@email.com"
      );
      /**
       * Step 2: Once the user is redirected back to your application,
       * ask the user to reset their password.
       */
      useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
          if (event == "PASSWORD_RECOVERY") {
            const newPassword = prompt(
              "What would you like your new password to be?"
            );
            const { data, error } = await supabase.auth.updateUser({
              password: newPassword || "",
            });
            if (data) alert("Password updated successfully!");
            if (error) alert("There was an error updating your password.");
          }
        });
      }, []);
      if (!error) {
        setSuccess(true);
      }
      error && setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout
        title="Vérifiez votre email"
        subtitle="Nous avons envoyé un lien de réinitialisation à votre adresse email"
      >
        <div className="space-y-6">
          <div className="bg-success/10 text-success p-4 rounded-lg flex items-start gap-2">
            <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              Un email a été envoyé à <strong>{email}</strong> avec les
              instructions pour réinitialiser votre mot de passe.
            </p>
          </div>

          <Button
            className="w-full bg-gradient-primary hover:opacity-90 text-white"
            asChild
          >
            <Link href="/login">Retour à la connexion</Link>
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Mot de passe oublié"
      subtitle="Entrez votre email pour recevoir un lien de réinitialisation"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="exemple@email.com"
            required
            autoComplete="email"
            disabled={isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-primary hover:opacity-90 text-white"
          disabled={isLoading}
        >
          {isLoading
            ? "Envoi en cours..."
            : "Envoyer le lien de réinitialisation"}
        </Button>

        <div className="text-center">
          <Link
            href="/login"
            className="text-sylog-indigo hover:text-sylog-teal transition-colors inline-flex items-center gap-1 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à la connexion
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
