import { Platform } from "@prisma/client";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const platformsForm = [
  { id: Platform.PC, label: "PC" },
  { id: Platform.PS4, label: "PS4" },
  { id: Platform.PS5, label: "PS5" },
  { id: Platform.XBOX_ONE, label: "Xbox One" },
  { id: Platform.XBOX_SERIES_X_S, label: "Xbox Series X|S" },
  { id: Platform.NINTENDO_SWITCH, label: "Nintendo Switch" },
] as const;

export const filterForm = [
  { id: 'cheaper', label: "Cheaper" },
  { id: 'expensive', label: "Expensive" },
  { id: 'recent', label: "Recent" },
  { id: 'older', label: "Older" }
] as const;