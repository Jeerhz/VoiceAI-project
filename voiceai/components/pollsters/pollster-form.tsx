"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bot, Sparkles, Save, X } from "lucide-react";
import type { Database } from "@/lib/database.types";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

type Pollster = Database["public"]["Tables"]["pollsters"]["Row"];

interface PollsterFormProps {
  pollster?: Pollster;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
}

export function PollsterForm({
  pollster,
  isOpen,
  onClose,
  onSuccess,
  userId,
}: PollsterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: pollster?.name || "",
    objective: pollster?.objective || "",
    salutation: pollster?.salutation || "",
    final_prompt: pollster?.final_prompt || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = pollster ? `/api/pollsters/${pollster.id}` : "/api/pollsters";
      const method = pollster ? "PUT" : "POST";

      const payload = pollster ? formData : { ...formData, user_id: userId };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save pollster");
      }

      toast.success(
        pollster
          ? "Pollster updated successfully! 🎉"
          : "Pollster created successfully! 🚀",
        {
          description: pollster
            ? "Your AI pollster has been updated with the latest changes."
            : "Your new AI pollster is ready to conduct voice surveys.",
        }
      );

      onSuccess();
      onClose();

      // Reset form
      setFormData({
        name: "",
        objective: "",
        salutation: "",
        final_prompt: "",
      });
    } catch (error) {
      console.error("Error saving pollster:", error);
      toast.error("Failed to save pollster", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const initials = formData.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto glass-effect border-white/20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16 border-2 border-gradient-to-r from-sylog-indigo to-sylog-teal">
                      <AvatarFallback className="bg-gradient-to-br from-sylog-indigo to-sylog-teal text-white font-bold text-xl">
                        {initials || <Bot className="h-8 w-8" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-sylog-teal to-sylog-gold rounded-full flex items-center justify-center">
                      <Sparkles className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-sylog-indigo to-sylog-teal bg-clip-text text-transparent">
                      {pollster ? "Edit AI Pollster" : "Create New AI Pollster"}
                    </DialogTitle>
                    <DialogDescription className="text-base">
                      {pollster
                        ? "Update your AI pollster configuration and enhance its capabilities."
                        : "Design a new AI pollster for conducting voice satisfaction surveys."}
                    </DialogDescription>
                  </div>
                </div>

                {!pollster && (
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-gradient-to-r from-sylog-indigo to-sylog-teal text-white border-0">
                      AI-Powered
                    </Badge>
                    <Badge className="bg-gradient-to-r from-sylog-teal to-sylog-gold text-white border-0">
                      Voice Surveys
                    </Badge>
                    <Badge className="bg-gradient-to-r from-sylog-gold to-orange-500 text-white border-0">
                      Real-time Analytics
                    </Badge>
                  </div>
                )}
              </DialogHeader>

              <Separator className="my-6" />

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Label
                    htmlFor="name"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Pollster Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="e.g., Customer Satisfaction Agent"
                    required
                    className="border-gray-200 focus:border-sylog-indigo focus:ring-sylog-indigo/20 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Label
                    htmlFor="objective"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Objective
                  </Label>
                  <Textarea
                    id="objective"
                    value={formData.objective}
                    onChange={(e) => handleChange("objective", e.target.value)}
                    placeholder="Describe the main goal and purpose of this AI pollster..."
                    rows={3}
                    className="border-gray-200 focus:border-sylog-teal focus:ring-sylog-teal/20 transition-all duration-300 resize-none"
                  />
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label
                    htmlFor="salutation"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Greeting & Salutation
                  </Label>
                  <Textarea
                    id="salutation"
                    value={formData.salutation}
                    onChange={(e) => handleChange("salutation", e.target.value)}
                    placeholder="How should the AI greet respondents? e.g., 'Hello! Thank you for taking the time to speak with us today...'"
                    rows={2}
                    className="border-gray-200 focus:border-sylog-gold focus:ring-sylog-gold/20 transition-all duration-300 resize-none"
                  />
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label
                    htmlFor="final_prompt"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Closing Message
                  </Label>
                  <Textarea
                    id="final_prompt"
                    value={formData.final_prompt}
                    onChange={(e) =>
                      handleChange("final_prompt", e.target.value)
                    }
                    placeholder="Final message or closing statement for the survey..."
                    rows={3}
                    className="border-gray-200 focus:border-sylog-emerald focus:ring-sylog-emerald/20 transition-all duration-300 resize-none"
                  />
                </motion.div>

                <DialogFooter className="gap-3 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="hover-scale transition-all duration-300"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || !formData.name.trim()}
                    className="bg-gradient-to-r from-sylog-indigo to-sylog-teal hover:from-sylog-indigo/90 hover:to-sylog-teal/90 transition-all duration-300 hover-scale"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    {isLoading
                      ? "Saving..."
                      : pollster
                      ? "Update Pollster"
                      : "Create Pollster"}
                  </Button>
                </DialogFooter>
              </form>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
