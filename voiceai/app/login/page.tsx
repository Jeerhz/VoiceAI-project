"use client";

import { login } from "@/app/actions/auth";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthLayout } from "@/components/auth/auth-layout";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Connexion"
      subtitle="Entrez vos identifiants pour accéder à votre compte"
    >
      <AuthForm type="login" onSubmit={login} />
    </AuthLayout>
  );
}
