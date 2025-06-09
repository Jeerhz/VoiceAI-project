"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Bot,
  Calendar,
  Target,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  Users,
  Phone,
  BarChart3,
  Sparkles,
  Copy,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { PollsterForm } from "@/components/pollsters/pollster-form";
import { usePollster } from "@/hooks/use-pollsters";
import type { Database } from "@/lib/database.types";
import { formatDistanceToNow, format } from "date-fns";
import { toast } from "sonner";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Pollster = Database["public"]["Tables"]["pollsters"]["Row"];

// Mock user ID - in a real app, this would come from authentication
const MOCK_USER_ID = "user-123";

export default function PollsterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pollsterId = params.pollster_id as string;

  const [isFormOpen, setIsFormOpen] = useState(false);
  const { pollster, isLoading, isError, mutate } = usePollster(pollsterId);

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this pollster? This action cannot be undone."
      )
    )
      return;

    try {
      const response = await fetch(`/api/pollsters/${pollsterId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete pollster");
      }

      toast.success("Pollster deleted successfully! 🗑️", {
        description: "Redirecting to pollsters dashboard...",
      });

      setTimeout(() => {
        router.push("/dashboard/pollsters");
      }, 1000);
    } catch (error) {
      console.error("Error deleting pollster:", error);
      toast.error("Failed to delete pollster", {
        description: "Please try again or contact support.",
      });
    }
  };

  const handleFormSuccess = () => {
    mutate();
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(pollster?.id || "");
    toast.success("Pollster ID copied to clipboard! 📋");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse glass-effect">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-32"></div>
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <Card key={i} className="animate-pulse glass-effect">
                <CardHeader>
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !pollster) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center h-64"
      >
        <Card className="w-full max-w-md glass-effect border-sylog-red/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <Bot className="mx-auto h-12 w-12 text-sylog-red animate-pulse" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                Pollster not found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                The pollster you're looking for doesn't exist.
              </p>
              <div className="mt-6">
                <Link href="/dashboard/pollsters">
                  <Button variant="outline" className="hover-scale">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Pollsters
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const initials = pollster.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/dashboard/pollsters">
            <Button
              variant="outline"
              size="sm"
              className="hover-scale transition-all duration-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="w-16 h-16 border-2 border-gradient-to-r from-sylog-indigo to-sylog-teal">
                <AvatarFallback className="bg-gradient-to-br from-sylog-indigo to-sylog-teal text-white font-bold text-xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-sylog-teal to-sylog-gold rounded-full flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient">
                {pollster.name}
              </h1>
              <div className="flex items-center space-x-4 mt-1">
                <p className="text-gray-500 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Created{" "}
                  {formatDistanceToNow(new Date(pollster.created_at!), {
                    addSuffix: true,
                  })}
                </p>
                <Badge className="bg-gradient-to-r from-sylog-emerald to-green-500 text-white">
                  Active
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setIsFormOpen(true)}
            className="hover-scale transition-all duration-300"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            className="hover-scale transition-all duration-300"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="hover-scale transition-all duration-300"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-effect border-white/20 hover-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Target className="mr-3 h-6 w-6 text-sylog-indigo" />
                  Objective & Purpose
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {pollster.objective ||
                    "No objective specified for this pollster."}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Salutation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-effect border-white/20 hover-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <MessageSquare className="mr-3 h-6 w-6 text-sylog-teal" />
                  Greeting & Salutation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-sylog-teal/5 to-sylog-indigo/5 p-4 rounded-lg border border-sylog-teal/20">
                  <p className="text-gray-700 leading-relaxed italic">
                    "
                    {pollster.salutation ||
                      "No salutation configured for this pollster."}
                    "
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Final Prompt */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-effect border-white/20 hover-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <AlertTriangle className="mr-3 h-6 w-6 text-sylog-gold" />
                  Closing Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-sylog-gold/5 to-orange-500/5 p-4 rounded-lg border border-sylog-gold/20">
                  <p className="text-gray-700 leading-relaxed italic">
                    "
                    {pollster.final_prompt ||
                      "No final prompt configured for this pollster."}
                    "
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Questions & Objections */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Card className="glass-effect border-white/20 hover-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-sylog-indigo" />
                  Survey Questions
                </CardTitle>
                <CardDescription>
                  Questions configured for this pollster
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-sylog-indigo/10 to-sylog-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-sylog-indigo" />
                  </div>
                  <div className="text-3xl font-bold text-sylog-indigo mb-2">
                    {pollster.question_ids?.length || 0}
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Questions configured
                  </p>
                  <Button variant="outline" size="sm" className="hover-scale">
                    Manage Questions
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-white/20 hover-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-sylog-gold" />
                  Objection Handling
                </CardTitle>
                <CardDescription>
                  Responses to common objections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-sylog-gold/10 to-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="h-8 w-8 text-sylog-gold" />
                  </div>
                  <div className="text-3xl font-bold text-sylog-gold mb-2">
                    {pollster.answer_to_objection_ids?.length || 0}
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Objection responses
                  </p>
                  <Button variant="outline" size="sm" className="hover-scale">
                    Manage Objections
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Performance Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-effect border-white/20 hover-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-sylog-emerald" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Success Rate</span>
                    <Badge
                      variant="secondary"
                      className="bg-sylog-emerald/10 text-sylog-emerald"
                    >
                      N/A
                    </Badge>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Avg. Call Duration
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-sylog-teal/10 text-sylog-teal"
                    >
                      N/A
                    </Badge>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Satisfaction Score
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-sylog-gold/10 text-sylog-gold"
                    >
                      N/A
                    </Badge>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Campaign Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-effect border-white/20 hover-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-sylog-indigo" />
                  Campaign Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Campaigns</span>
                  <Badge
                    variant="secondary"
                    className="bg-sylog-indigo/10 text-sylog-indigo"
                  >
                    0
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Calls</span>
                  <Badge
                    variant="secondary"
                    className="bg-sylog-teal/10 text-sylog-teal"
                  >
                    0
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Now</span>
                  <Badge
                    variant="secondary"
                    className="bg-sylog-emerald/10 text-sylog-emerald"
                  >
                    0
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-effect border-white/20 hover-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Pollster Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Created
                  </span>
                  <p className="text-sm text-gray-900">
                    {format(new Date(pollster.created_at!), "PPP")}
                  </p>
                </div>
                <Separator />
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Last Updated
                  </span>
                  <p className="text-sm text-gray-900">
                    {pollster.updated_at
                      ? format(new Date(pollster.updated_at), "PPP")
                      : "Never"}
                  </p>
                </div>
                <Separator />
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-600">
                      Pollster ID
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyId}
                      className="h-6 w-6 p-0 hover-scale"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 font-mono break-all bg-gray-50 p-2 rounded">
                    {pollster.id}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-effect border-white/20 hover-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start hover-scale transition-all duration-300"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Create Campaign
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start hover-scale transition-all duration-300"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Test Call
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start hover-scale transition-all duration-300"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Duplicate Pollster
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start hover-scale transition-all duration-300"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Edit Form */}
      <AnimatePresence>
        {isFormOpen && (
          <PollsterForm
            pollster={pollster}
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSuccess={handleFormSuccess}
            userId={MOCK_USER_ID}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
