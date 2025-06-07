import { create } from "zustand"
import type { KPI } from "@/lib/types"

interface KPIStore {
  kpis: KPI[]
  selectedKPIs: string[]
  isLoading: boolean
  setKPIs: (kpis: KPI[]) => void
  setSelectedKPIs: (kpiIds: string[]) => void
  setLoading: (loading: boolean) => void
  addKPI: (kpi: KPI) => void
  updateKPI: (id: string, updates: Partial<KPI>) => void
  deleteKPI: (id: string) => void
}

export const useKPIStore = create<KPIStore>((set) => ({
  kpis: [],
  selectedKPIs: [],
  isLoading: false,
  setKPIs: (kpis) => set({ kpis }),
  setSelectedKPIs: (kpiIds) => set({ selectedKPIs: kpiIds }),
  setLoading: (loading) => set({ isLoading: loading }),
  addKPI: (kpi) => set((state) => ({ kpis: [...state.kpis, kpi] })),
  updateKPI: (id, updates) =>
    set((state) => ({
      kpis: state.kpis.map((k) => (k.id === id ? { ...k, ...updates } : k)),
    })),
  deleteKPI: (id) =>
    set((state) => ({
      kpis: state.kpis.filter((k) => k.id !== id),
    })),
}))
