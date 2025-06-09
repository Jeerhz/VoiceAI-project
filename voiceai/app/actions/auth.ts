"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const signupFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    full_name: formData.get("fullName") as string,
  };

  const { data: signUpData, error } = await supabase.auth.signUp({
    email: signupFormData.email,
    password: signupFormData.password,
    options: {
      data: {
        full_name: signupFormData.full_name,
      },
    },
  });

  if (signUpData?.user?.id === undefined) {
    return { error: "User ID is undefined. Please try again." };
  }

  // Create corresponding profile in profiles table
  const { error: profileError } = await supabase.from("profiles").insert([
    {
      id: signUpData.user.id,
      avatar_url: null,
      full_name: signupFormData.full_name,
      email: signupFormData.email,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  if (profileError) {
    console.error("Error creating profile:", profileError);
    return { error: "Failed to create user profile. Please try again." };
  }

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/login?verified=pending");
}
