"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Plus, Search, Filter, Bot, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PollsterCard } from "@/components/pollsters/pollster-card";
import { PollsterForm } from "@/components/pollsters/pollster-form";
import { useUserProfile } from "@/hooks/use-user-profile";
import { usePollsters } from "@/hooks/use-pollsters";
import type { Database } from "@/lib/database.types";

type Pollster = Database["public"]["Tables"]["pollsters"]["Row"];

export default function PollstersPage() {
  // 1) get profile
  const {
    profile,
    isLoading: profileLoading,
    isError: profileError,
  } = useUserProfile();

  console.log("PollstersPage profile:", profile);

  // 2) once we have profile.id, fetch pollsters
  const userId = profile?.id;
  const {
    pollsters,
    isLoading: pollstersLoading,
    isError: pollstersError,
    mutate,
  } = usePollsters(userId ? userId : null);

  // local UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPollster, setEditingPollster] = useState<
    Pollster | undefined
  >();

  // 3) guard loading / errors
  if (profileLoading || pollstersLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Bot className="animate-spin h-8 w-8 text-gray-400" />
      </div>
    );
  }

  if (profileError) {
    return (
      <p className="text-center text-red-500">Failed to load your profile.</p>
    );
  }

  if (!profile) {
    return (
      <p className="text-center">You must be signed in to view this page.</p>
    );
  }

  if (pollstersError) {
    return (
      <div className="text-center text-red-500">
        Failed to load your pollsters.{" "}
        <button onClick={() => mutate()} className="underline">
          Retry
        </button>
      </div>
    );
  }

  // 4) filter server data with client search
  const filtered =
    pollsters?.filter((p) =>
      [p.name, p.objective]
        .filter(Boolean)
        .some((field) =>
          field!.toLowerCase().includes(searchTerm.toLowerCase())
        )
    ) || [];

  // handlers
  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingPollster(undefined);
  };
  const handleFormSuccess = () => {
    mutate();
    handleFormClose();
  };
  const handleEdit = (p: Pollster) => {
    setEditingPollster(p);
    setIsFormOpen(true);
  };
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this pollster?")) return;
    try {
      const res = await fetch(`/api/pollsters/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Deleted!");
      mutate();
    } catch {
      toast.error("Could not delete pollster");
    }
  };

  return (
    <div className="space-y-8">
      {/* ——————————————————— Header ——————————————————— */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
      >
        <div>
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-indigo-500" />
            <h1 className="text-3xl font-bold">AI Pollsters</h1>
          </div>
          <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
            <span>Welcome back,</span>
            <Badge>{profile.full_name ?? profile.email}</Badge>
          </div>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-1 h-4 w-4" /> Create Pollster
        </Button>
      </motion.div>

      {/* ——————————————————— Search ——————————————————— */}
      <Card>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-1 h-4 w-4" /> Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ——————————————————— Stats ——————————————————— */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* … your four stat cards, unchanged */}
      </div>

      {/* ——————————————————— Grid ——————————————————— */}
      <AnimatePresence>
        {filtered.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filtered.map((p, i) => (
              <PollsterCard
                key={p.id}
                pollster={p}
                onEdit={handleEdit}
                onDelete={handleDelete}
                index={i}
              />
            ))}
          </motion.div>
        ) : (
          <Card className="text-center">
            <CardContent className="py-16">
              <Bot className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg">
                {searchTerm ? "No results" : "No pollsters yet"}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {searchTerm
                  ? "Try another search term."
                  : "Create your first pollster to get started."}
              </p>
              {!searchTerm && (
                <Button className="mt-6" onClick={() => setIsFormOpen(true)}>
                  <Plus className="mr-1 h-4 w-4" /> Create Pollster
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </AnimatePresence>

      {/* ——————————————————— Form Dialog ——————————————————— */}
      {userId && (
        <PollsterForm
          userId={userId}
          pollster={editingPollster}
          isOpen={isFormOpen}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
