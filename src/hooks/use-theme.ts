"use client"

import { useCallback, useEffect, useSyncExternalStore } from "react"

type Theme = "light" | "dark" | "system"

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function readStored(): Theme | null {
  try {
    return (localStorage.getItem("theme") as Theme | null) ?? null
  } catch {
    return null
  }
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb)
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", cb)
  return () => {
    window.removeEventListener("storage", cb)
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", cb)
  }
}

function getSnapshot(): Theme {
  return readStored() ?? getSystemTheme()
}

function getServerSnapshot(): Theme {
  return "light"
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setTheme = useCallback((t: Theme) => {
    try {
      localStorage.setItem("theme", t)
    } catch {}
    applyTheme(t)
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return { theme, setTheme, resolvedTheme: theme }
}

function applyTheme(t: Theme) {
  const root = document.documentElement
  root.classList.remove("light", "dark")
  root.classList.add(t)
  root.setAttribute("data-theme", t)
  const color =
    t === "dark" ? "var(--color-scheme-dark)" : "var(--color-scheme-light)"
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute("content", color)
}
