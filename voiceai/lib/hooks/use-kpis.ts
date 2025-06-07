import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"
import type { KPI } from "@/lib/types"
import { useKPIStore } from "@/lib/stores/kpi-store"

const fetcher = async (url: string) => {
  const supabase = createClient()
  const { data, error } = await supabase.from("kpis").select("*").order("created_at", { ascending: false })

  if (error) throw error
  return data as KPI[]
}

export function useKPIs() {
  const { setKPIs, setLoading } = useKPIStore()

  const { data, error, isLoading, mutate } = useSWR("/api/kpis", fetcher, {
    onSuccess: (data) => {
      setKPIs(data)
      setLoading(false)
    },
    onLoadingSlow: () => setLoading(true),
  })

  return {
    kpis: data || [],
    isLoading,
    error,
    mutate,
  }
}
