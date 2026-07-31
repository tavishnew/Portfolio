import { Parkinsans, Space_Grotesk } from "next/font/google"

import { cn } from "@/lib/utils"

const fontSans = Parkinsans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  fallback: ["sans-serif"],
  variable: "--font-parkinsans",
})

const fontHeading = Space_Grotesk({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
  fallback: ["sans-serif"],
  variable: "--font-space-grotesk",
})

export const fontVariables = cn(
  fontSans.variable,
  fontHeading.variable,
  "[--font-sans:var(--font-parkinsans)]",
  "[--font-mono:var(--font-parkinsans)]",
  "[--font-serif:var(--font-parkinsans)]",
  "[--font-pixel-square:var(--font-parkinsans)]",
  "[--font-98cn:var(--font-parkinsans)]",
  "[--font-heading:var(--font-space-grotesk)]"
)
