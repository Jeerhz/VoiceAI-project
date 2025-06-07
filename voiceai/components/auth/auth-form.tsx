"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthFormProps {
  type: "login" | "signup";
  onSubmit: (formData: FormData) => Promise<{ error?: string } | undefined>;
}

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const result = await onSubmit(formData);

      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-lg flex items-start gap-2">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {type === "signup" && (
        <div className="space-y-2">
          <Label htmlFor="fullName">Nom complet</Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="John Doe"
            required
            autoComplete="name"
            disabled={isLoading}
          />
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
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Mot de passe</Label>
          {type === "login" && (
            <Link
              href="/forgot-password"
              className="text-xs text-sylog-indigo hover:text-sylog-teal transition-colors"
            >
              Mot de passe oublié?
            </Link>
          )}
        </div>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder={
              type === "signup" ? "8+ caractères" : "Votre mot de passe"
            }
            required
            autoComplete={
              type === "login" ? "current-password" : "new-password"
            }
            disabled={isLoading}
            className="pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-primary hover:opacity-90 text-white"
        disabled={isLoading}
      >
        {isLoading
          ? type === "login"
            ? "Connexion en cours..."
            : "Inscription en cours..."
          : type === "login"
          ? "Se connecter"
          : "S'inscrire"}
      </Button>

      <div className="text-center text-sm">
        {type === "login" ? (
          <p>
            Pas encore de compte?{" "}
            <Link
              href="/signup"
              className="text-sylog-indigo hover:text-sylog-teal font-medium"
            >
              S'inscrire
            </Link>
          </p>
        ) : (
          <p>
            Déjà un compte?{" "}
            <Link
              href="/login"
              className="text-sylog-indigo hover:text-sylog-teal font-medium"
            >
              Se connecter
            </Link>
          </p>
        )}
      </div>
    </form>
  );
}
