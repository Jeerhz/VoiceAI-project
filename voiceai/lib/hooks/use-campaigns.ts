import useSWR from "swr";
import { createClient } from "@/utils/supabase/client";
import type { Campaign } from "@/lib/types";
import { useCampaignStore } from "@/lib/stores/campaign-store";

const fetcher = async (url: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("campaigns")
    .select(
      `
      *,
      ai_agent:ai_agents(*)
    `
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Campaign[];
};

export function useCampaigns() {
  const { setCampaigns, setLoading } = useCampaignStore();

  const { data, error, isLoading, mutate } = useSWR("/api/campaigns", fetcher, {
    onSuccess: (data) => {
      setCampaigns(data);
      setLoading(false);
    },
    onLoadingSlow: () => setLoading(true),
  });

  return {
    campaigns: data || [],
    isLoading,
    error,
    mutate,
  };
}
