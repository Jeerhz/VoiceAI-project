"use client"

import { Calendar, Phone, Play, Pause, MoreHorizontal } from "lucide-react"
import type { Campaign } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CampaignCardProps {
  campaign: Campaign
  onEdit?: (campaign: Campaign) => void
  onDelete?: (id: string) => void
  onToggleStatus?: (id: string, status: Campaign["status"]) => void
}

export function CampaignCard({ campaign, onEdit, onDelete, onToggleStatus }: CampaignCardProps) {
  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{campaign.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{campaign.description || "No description provided"}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={cn("text-xs", getStatusColor(campaign.status))}>{campaign.status}</Badge>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-1" />
            <span>{campaign.target_contacts?.length || 0} contacts</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>
              {campaign.scheduled_at ? new Date(campaign.scheduled_at).toLocaleDateString() : "Not scheduled"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-400">Created {new Date(campaign.created_at).toLocaleDateString()}</div>
        <div className="flex items-center space-x-2">
          {campaign.status === "active" ? (
            <Button variant="outline" size="sm" onClick={() => onToggleStatus?.(campaign.id, "paused")}>
              <Pause className="h-4 w-4 mr-1" />
              Pause
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={() => onToggleStatus?.(campaign.id, "active")}>
              <Play className="h-4 w-4 mr-1" />
              Start
            </Button>
          )}
          <Button variant="default" size="sm" onClick={() => onEdit?.(campaign)}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  )
}
