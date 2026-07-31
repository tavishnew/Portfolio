"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const COVER_LIGHT = "/images/profile-cover-light.jpg"
const COVER_DARK = "/images/profile-cover-dark.jpg"

function PreloadImages({ sources }: { sources: string[] }) {
  return (
    <>
      {sources.map((src) => (
        <link key={src} rel="preload" as="image" href={src} fetchPriority="high" />
      ))}
    </>
  )
}

export function ProfileActivityMosaicCover() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const theme = resolvedTheme === "dark" ? "dark" : "light"

  return (
    <div
      className="screen-line-top screen-line-bottom w-full border-x border-line px-0.5 py-0.75 before:-top-px after:-bottom-px"
      aria-hidden
    >
      <div className="relative overflow-hidden rounded-(--cover-radius) border border-line bg-background p-1.5 shadow-xs [--cover-inner-radius:calc(var(--cover-radius)-var(--cover-inset))] [--cover-inset:--spacing(1.5)] [--cover-radius:var(--radius-2xl)]">
        <div className="relative aspect-[1080/500] overflow-hidden rounded-(--cover-inner-radius) [clip-path:inset(0_round_var(--cover-inner-radius))]">
          <PreloadImages sources={[COVER_LIGHT, COVER_DARK]} />

          {!mounted && (
            <div className="absolute inset-0 bg-muted/50 animate-pulse" />
          )}

          <div
            className="absolute inset-0 overflow-hidden transition-opacity! duration-1200 ease-[cubic-bezier(0.42,0,0.58,1)]"
            style={{ opacity: mounted && theme === "dark" ? 0 : 1 }}
          >
            <img
              className="size-full object-cover object-center select-none"
              src={COVER_LIGHT}
              alt=""
              fetchPriority="high"
            />
          </div>

          <div
            className="absolute inset-0 overflow-hidden transition-opacity! duration-1200 ease-[cubic-bezier(0.42,0,0.58,1)]"
            style={{ opacity: mounted && theme === "dark" ? 1 : 0 }}
          >
            <img
              className="size-full object-cover object-center select-none"
              src={COVER_DARK}
              alt=""
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </div>
  )
}