import useSWR from "swr";
import { createClient } from "@/utils/supabase/client";
import type { Database } from "@/lib/database.types";

type Pollster = Database["public"]["Tables"]["pollsters"]["Row"];

const fetcher = async (userId: string): Promise<Pollster[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("pollsters")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

const fetchSingle = async (id: string): Promise<Pollster | null> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("pollsters")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export function usePollsters(userId: string | null) {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `pollsters-${userId}` : null,
    () => fetcher(userId!),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 30000, // 30 seconds
    }
  );

  return {
    pollsters: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function usePollster(id: string | null) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `pollster-${id}` : null,
    () => fetchSingle(id!),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // 1 minute
    }
  );

  return {
    pollster: data,
    isLoading,
    isError: error,
    mutate,
  };
}
