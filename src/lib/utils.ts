import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Compass,
  PenTool,
  Layers,
  Building2,
  HardHat,
  Ruler,
  Settings,
  Lightbulb,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import React from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Icon mapping for services and other entities
export const iconMap: Record<string, React.ReactNode> = {
  compass: React.createElement(Compass, { className: "h-5 w-5" }),
  "pen-tool": React.createElement(PenTool, { className: "h-5 w-5" }),
  layers: React.createElement(Layers, { className: "h-5 w-5" }),
  building2: React.createElement(Building2, { className: "h-5 w-5" }),
  "hard-hat": React.createElement(HardHat, { className: "h-5 w-5" }),
  ruler: React.createElement(Ruler, { className: "h-5 w-5" }),
  settings: React.createElement(Settings, { className: "h-5 w-5" }),
  lightbulb: React.createElement(Lightbulb, { className: "h-5 w-5" }),
  target: React.createElement(Target, { className: "h-5 w-5" }),
  users: React.createElement(Users, { className: "h-5 w-5" }),
};

// Icon options for dropdown selects
export const iconOptions = [
  { value: "compass", label: "Compass" },
  { value: "pen-tool", label: "Pen Tool" },
  { value: "layers", label: "Layers" },
  { value: "building2", label: "Building" },
  { value: "hard-hat", label: "Hard Hat" },
  { value: "ruler", label: "Ruler" },
  { value: "settings", label: "Settings" },
  { value: "lightbulb", label: "Lightbulb" },
  { value: "target", label: "Target" },
  { value: "users", label: "Users" },
];

// Get icon component by name
export const getIconByName = (name: string): LucideIcon => {
  const icons: Record<string, LucideIcon> = {
    compass: Compass,
    "pen-tool": PenTool,
    layers: Layers,
    building2: Building2,
    "hard-hat": HardHat,
    ruler: Ruler,
    settings: Settings,
    lightbulb: Lightbulb,
    target: Target,
    users: Users,
  };
  return icons[name] || Settings;
};

