"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Bot,
  Calendar,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Database } from "@/lib/database.types";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { motion } from "framer-motion";

type Pollster = Database["public"]["Tables"]["pollsters"]["Row"];

interface PollsterCardProps {
  pollster: Pollster;
  onEdit: (pollster: Pollster) => void;
  onDelete: (id: string) => void;
  index: number;
}

export function PollsterCard({
  pollster,
  onEdit,
  onDelete,
  index,
}: PollsterCardProps) {
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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-white to-gray-50/50 hover:from-violet-50/30 hover:via-white hover:to-teal-50/30 transition-all duration-500 card-shadow hover-glow">
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-sylog-indigo via-sylog-teal to-sylog-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="w-14 h-14 border-2 border-gradient-to-r from-sylog-indigo to-sylog-teal">
                  <AvatarFallback className="bg-gradient-to-br from-sylog-indigo to-sylog-teal text-white font-bold text-lg">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-sylog-teal to-sylog-gold rounded-full flex items-center justify-center">
                  <Bot className="h-3 w-3 text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-sylog-indigo transition-colors duration-300">
                  {pollster.name}
                </h3>
                <p className="text-sm text-gray-500 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDistanceToNow(new Date(pollster.created_at!), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover-scale"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="glass-effect border-white/20"
              >
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/pollster/${pollster.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(pollster)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(pollster.id)}
                  className="text-sylog-red"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="pt-0 space-y-4">
          {pollster.objective && (
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {pollster.objective}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-violet-100 to-violet-200 text-violet-700 border-0 hover-scale"
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              {pollster.question_ids?.length || 0} Questions
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-teal-100 to-teal-200 text-teal-700 border-0 hover-scale"
            >
              <AlertTriangle className="h-3 w-3 mr-1" />
              {pollster.answer_to_objection_ids?.length || 0} Objections
            </Badge>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <TrendingUp className="h-4 w-4 text-sylog-emerald" />
              <span>Active</span>
            </div>
            <Link href={`/dashboard/pollster/${pollster.id}`}>
              <Button
                variant="ghost"
                size="sm"
                className="text-sylog-indigo hover:text-sylog-teal hover:bg-sylog-indigo/5 transition-all duration-300 hover-scale"
              >
                View Details →
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
