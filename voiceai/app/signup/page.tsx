"use client";

import { signup } from "@/app/actions/auth";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthLayout } from "@/components/auth/auth-layout";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Créer un compte"
      subtitle="Inscrivez-vous pour commencer à utiliser VoiceSurvey"
    >
      <AuthForm type="signup" onSubmit={signup} />
    </AuthLayout>
  );
}
