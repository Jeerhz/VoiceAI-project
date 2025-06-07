import { create } from "zustand"
import type { Campaign } from "@/lib/types"

interface CampaignStore {
  campaigns: Campaign[]
  selectedCampaign: Campaign | null
  isLoading: boolean
  setCampaigns: (campaigns: Campaign[]) => void
  setSelectedCampaign: (campaign: Campaign | null) => void
  setLoading: (loading: boolean) => void
  addCampaign: (campaign: Campaign) => void
  updateCampaign: (id: string, updates: Partial<Campaign>) => void
  deleteCampaign: (id: string) => void
}

export const useCampaignStore = create<CampaignStore>((set) => ({
  campaigns: [],
  selectedCampaign: null,
  isLoading: false,
  setCampaigns: (campaigns) => set({ campaigns }),
  setSelectedCampaign: (campaign) => set({ selectedCampaign: campaign }),
  setLoading: (loading) => set({ isLoading: loading }),
  addCampaign: (campaign) => set((state) => ({ campaigns: [...state.campaigns, campaign] })),
  updateCampaign: (id, updates) =>
    set((state) => ({
      campaigns: state.campaigns.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    })),
  deleteCampaign: (id) =>
    set((state) => ({
      campaigns: state.campaigns.filter((c) => c.id !== id),
    })),
}))
