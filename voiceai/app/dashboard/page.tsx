import {
  Bot,
  PlayIcon as Campaign,
  Phone,
  Target,
  TrendingUp,
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-violet-600 via-violet-700 to-teal-600 rounded-2xl p-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-display font-bold mb-2">
            Welcome to VoiceSurvey
          </h1>
          <p className="text-violet-100 text-lg mb-6">
            Conduct AI-powered voice satisfaction surveys and gain valuable
            insights from your customers.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-white text-violet-700 hover:bg-gray-100">
              Create Campaign
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              View Analytics
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Campaigns"
          value={12}
          change="+2 this week"
          changeType="positive"
          icon={Campaign}
        />
        <StatsCard
          title="Total Calls"
          value="1,247"
          change="+18% from last month"
          changeType="positive"
          icon={Phone}
        />
        <StatsCard
          title="Avg Satisfaction"
          value="8.4/10"
          change="+0.3 from last month"
          changeType="positive"
          icon={Target}
        />
        <StatsCard
          title="AI Agents"
          value={5}
          change="2 active"
          changeType="neutral"
          icon={Bot}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Campaigns */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Campaigns
            </h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {[
              {
                name: "Customer Satisfaction Q4",
                status: "Active",
                calls: 156,
              },
              {
                name: "Product Feedback Survey",
                status: "Completed",
                calls: 89,
              },
              { name: "Support Quality Check", status: "Paused", calls: 23 },
            ].map((campaign, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{campaign.name}</p>
                  <p className="text-sm text-gray-500">
                    {campaign.calls} calls
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    campaign.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : campaign.status === "Completed"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {campaign.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Performance Metrics
            </h2>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Response Rate</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "87%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium">87%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Call Success Rate</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "92%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium">92%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Avg Call Duration</span>
              <span className="text-sm font-medium">3m 24s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Customer Satisfaction</span>
              <span className="text-sm font-medium text-green-600">8.4/10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
