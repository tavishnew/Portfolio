"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

type Theme = "light" | "dark" | "system"

type ThemeContextValue = {
  theme: Theme
  setTheme: (t: Theme) => void
  resolvedTheme: Theme
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getSystem(): Theme {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function getStored(): Theme | null {
  try {
    const v = localStorage.getItem("theme")
    return v === "light" || v === "dark" || v === "system" ? v : null
  } catch {
    return null
  }
}

function apply(t: Theme) {
  const root = document.documentElement
  root.classList.remove("light", "dark")
  root.classList.add(t)
  root.setAttribute("data-theme", t)
}

function detectInitial(): Theme {
  return getStored() ?? getSystem()
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    return {
      theme: detectInitial(),
      setTheme: () => {},
      resolvedTheme: detectInitial(),
    }
  }
  return ctx
}

export function ThemeProvider({
  children,
  storageKey = "theme",
  defaultTheme = "system",
  enableSystem = true,
}: {
  children: ReactNode
  storageKey?: string
  defaultTheme?: Theme
  enableSystem?: boolean
}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme
    return getStored() ?? defaultTheme
  })

  const resolvedTheme = useMemo(() => {
    if (theme !== "system" || !enableSystem) return theme
    return getSystem()
  }, [theme, enableSystem])

  const setTheme = useCallback(
    (t: Theme) => {
      try {
        localStorage.setItem(storageKey, t)
      } catch {}
      setThemeState(t)
    },
    [storageKey]
  )

  useEffect(() => {
    apply(theme)
  }, [theme])

  useEffect(() => {
    const root = document.documentElement
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    apply(root.classList.contains("dark") ? "dark" : "light")

    const handler = () => {
      if (theme === "system") {
        apply(getSystem())
      }
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
    }),
    [theme, setTheme, resolvedTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
