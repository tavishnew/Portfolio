"use client"

import { useLayoutEffect } from "react"

const DEFAULT_COLOR = "#ffffff"
const DARK_COLOR = "#09090b"

export function InitialTheme() {
  useLayoutEffect(() => {
    const root = document.documentElement
    const stored = localStorage.getItem("theme")
    let isDark = false

    if (
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      isDark = true
    }

    root.classList.remove("light", "dark")
    root.classList.add(isDark ? "dark" : "light")
    root.setAttribute("data-theme", isDark ? "dark" : "light")

    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute("content", isDark ? DARK_COLOR : DEFAULT_COLOR)
  }, [])

  return null
}
