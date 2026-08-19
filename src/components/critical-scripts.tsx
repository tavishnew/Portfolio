"use client"

import { useLayoutEffect } from "react"

export function CriticalScripts({ jsonLd }: { jsonLd: string }) {
  useLayoutEffect(() => {
    if (document.getElementById("dark-mode-init")) return

    const script = document.createElement("script")
    script.id = "dark-mode-init"
    script.src = "/dark-mode-init.js"
    script.type = "text/javascript"
    document.head.appendChild(script)

    if (!document.getElementById("json-ld")) {
      const el = document.createElement("script")
      el.id = "json-ld"
      el.type = "application/ld+json"
      el.textContent = jsonLd
      document.head.appendChild(el)
    }
  }, [jsonLd])

  return null
}
