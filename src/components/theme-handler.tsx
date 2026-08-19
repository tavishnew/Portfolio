"use client"

import { useEffect } from "react"

import { useTheme } from "@/components/theme-provider"

export function ThemeHandler() {
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    if (typeof document === "undefined") return

    const root = document.documentElement
    const key = "theme"

    function apply(t: string) {
      root.classList.remove("light", "dark")
      root.classList.add(t)
      root.setAttribute("data-theme", t)
    }

    function read() {
      try {
        return localStorage.getItem(key)
      } catch {
        return null
      }
    }

    function save(t: string) {
      try {
        localStorage.setItem(key, t)
      } catch {}
    }

    function init() {
      const stored = read()
      const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const initial = stored ?? (sysDark ? "dark" : "light")

      root.classList.remove("light", "dark")
      root.classList.add(initial)
      root.setAttribute("data-theme", initial)
    }

    init()

    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = (e: MediaQueryListEvent) => {
      const stored = read()
      if (!stored) {
        apply(e.matches ? "dark" : "light")
      }
    }

    mq.addEventListener("change", handler)

    if (resolvedTheme) {
      apply(resolvedTheme)
      save(resolvedTheme)
    }

    return () => mq.removeEventListener("change", handler)
  }, [resolvedTheme])

  return null
}
