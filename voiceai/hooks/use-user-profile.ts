"use client";
import useSWR from "swr";
import { createClient } from "@/utils/supabase/client";
import type { Database } from "@/lib/database.types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

const supabase = createClient();

/**
 * Fetch the current user's profile from Supabase.
 */
async function fetchUserProfile(): Promise<Profile | null> {
  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (getUserError) {
    throw getUserError;
  }

  if (!user) {
    return null;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    throw error;
  }

  return profile;
}

export function useUserProfile() {
  const {
    data: profile,
    error,
    isValidating,
    mutate,
  } = useSWR<Profile | null>(
    // only fetch on client
    typeof window !== "undefined" ? "userProfile" : null,
    fetchUserProfile,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60_000,
    }
  );

  console.log("useUserProfile profile:", profile);

  return {
    profile,
    isLoading: !error && !profile && isValidating,
    isError: !!error,
    mutate,
  };
}
