"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bot,
  PlayIcon as Campaign,
  Home,
  Menu,
  Phone,
  Settings,
  Target,
  X,
  Users,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home, badge: null },
  {
    name: "Campaigns",
    href: "/dashboard/campaigns",
    icon: Campaign,
    badge: null,
  },
  {
    name: "Pollsters",
    href: "/dashboard/pollsters",
    icon: Users,
    badge: "New",
  },
  { name: "AI Agents", href: "/dashboard/agents", icon: Bot, badge: null },
  { name: "Calls", href: "/dashboard/calls", icon: Phone, badge: null },
  { name: "KPIs", href: "/dashboard/kpis", icon: Target, badge: null },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    badge: null,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    badge: null,
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="glass-effect hover-glow"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-sylog-indigo via-violet-800 to-sylog-indigo transform transition-all duration-500 ease-in-out lg:translate-x-0",
          "backdrop-blur-xl border-r border-white/10",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-white/10">
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="w-10 h-10 bg-gradient-to-br from-sylog-teal to-sylog-gold rounded-xl flex items-center justify-center animate-pulse-glow">
                <Sparkles className="h-5 w-5 text-sylog-indigo" />
              </div>
              <span className="text-xl font-poppins font-bold text-white text-shadow">
                VoiceSurvey
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <div
                  key={item.name}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300",
                      "hover-lift hover-glow",
                      isActive
                        ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20"
                        : "text-violet-200 hover:bg-white/10 hover:text-white hover:border-white/10 border border-transparent"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                      {item.name}
                    </div>
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className="bg-sylog-gold text-sylog-indigo text-xs animate-pulse"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center space-x-3 p-3 rounded-xl glass-effect hover-glow transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-sylog-teal to-sylog-gold rounded-full animate-float"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  John Doe
                </p>
                <p className="text-xs text-violet-300 truncate">Pro Plan</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
