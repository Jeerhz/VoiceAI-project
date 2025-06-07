"use client"

import { useState } from "react"
import { Plus, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CampaignCard } from "@/components/campaigns/campaign-card"
import { CreateCampaignModal } from "@/components/campaigns/create-campaign-modal"
import { useCampaigns } from "@/lib/hooks/use-campaigns"
import type { Campaign } from "@/lib/types"

export default function CampaignsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const { campaigns, isLoading } = useCampaigns()

  // Mock AI agents for the demo
  const mockAIAgents = [
    {
      id: "1",
      name: "Sarah - Customer Service",
      user_id: "1",
      description: "",
      voice_settings: {},
      personality_traits: {},
      language: "en-US",
      created_at: "",
      updated_at: "",
    },
    {
      id: "2",
      name: "Mike - Sales Assistant",
      user_id: "1",
      description: "",
      voice_settings: {},
      personality_traits: {},
      language: "en-US",
      created_at: "",
      updated_at: "",
    },
  ]

  const handleCreateCampaign = (campaignData: Partial<Campaign>) => {
    console.log("Creating campaign:", campaignData)
    // Here you would typically call your API to create the campaign
    setIsCreateModalOpen(false)
  }

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-600 mt-1">Manage your voice survey campaigns</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Campaigns Grid */}
      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
          <p className="text-gray-500 mb-6">Get started by creating your first voice survey campaign.</p>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Campaign
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onEdit={(campaign) => console.log("Edit campaign:", campaign)}
              onDelete={(id) => console.log("Delete campaign:", id)}
              onToggleStatus={(id, status) => console.log("Toggle status:", id, status)}
            />
          ))}
        </div>
      )}

      {/* Create Campaign Modal */}
      <CreateCampaignModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateCampaign}
        aiAgents={mockAIAgents}
      />
    </div>
  )
}
