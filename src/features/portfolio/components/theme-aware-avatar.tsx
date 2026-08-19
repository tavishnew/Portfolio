"use client"

import { useRef, useState } from "react"

import { cn } from "@/lib/utils"
import { useAvatarLights } from "@/hooks/use-avatar-lights"
import { useTheme } from "@/components/theme-provider"

interface ThemeAwareAvatarProps {
  lightSrc: string
  darkSrc: string
  lightOnSrc?: string
  darkOnSrc?: string
  alt: string
  className?: string
}

function AvatarImage({
  src,
  alt,
  fetchPriority,
  className,
}: {
  src: string
  alt: string
  fetchPriority?: "high" | "low"
  className?: string
}) {
  return (
    <img
      className={cn(
        "size-full object-cover object-center select-none",
        className
      )}
      src={src}
      alt={alt}
      fetchPriority={fetchPriority}
    />
  )
}

function PreloadImages({ sources }: { sources: string[] }) {
  return (
    <>
      {sources.map((src) => (
        <link
          key={src}
          rel="preload"
          as="image"
          href={src}
          fetchPriority="high"
        />
      ))}
    </>
  )
}

export function ThemeAwareAvatar({
  lightSrc,
  darkSrc,
  lightOnSrc,
  darkOnSrc,
  alt,
  className,
  ...props
}: ThemeAwareAvatarProps) {
  const { resolvedTheme } = useTheme()

  const theme = resolvedTheme === "dark" ? "dark" : "light"
  const containerRef = useRef<HTMLDivElement>(null)

  const [mounted] = useState(() => {
    if (typeof window === "undefined") return false
    return true
  })

  const allSources = [lightSrc, darkSrc].filter(Boolean) as string[]
  if (lightOnSrc) allSources.push(lightOnSrc)
  if (darkOnSrc) allSources.push(darkOnSrc)

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative size-30 rounded-(--avatar-radius) border border-line bg-background p-1.5 shadow-xs min-[24rem]:size-32 sm:size-40",
        "[--avatar-inner-radius:calc(var(--avatar-radius)-var(--avatar-inset))] [--avatar-inset:--spacing(1.5)] [--avatar-radius:var(--radius-2xl)]",
        className
      )}
      data-avatar-lights="off"
      {...props}
    >
      <PreloadImages sources={allSources} />

      {!mounted && (
        <div className="absolute inset-1.5 animate-pulse overflow-hidden rounded-(--avatar-inner-radius) bg-muted/50 [clip-path:inset(0_round_var(--avatar-inner-radius))]" />
      )}

      <div
        className="absolute inset-1.5 overflow-hidden rounded-(--avatar-inner-radius) transition-opacity! duration-1200 ease-[cubic-bezier(0.42,0,0.58,1)] [clip-path:inset(0_round_var(--avatar-inner-radius))]"
        style={{ opacity: mounted && theme === "dark" ? 0 : 1 }}
      >
        <AvatarImage
          src={lightSrc}
          alt={`${alt} (light mode)`}
          fetchPriority="high"
        />
      </div>

      <div
        className="absolute inset-1.5 overflow-hidden rounded-(--avatar-inner-radius) transition-opacity! duration-1200 ease-[cubic-bezier(0.42,0,0.58,1)] [clip-path:inset(0_round_var(--avatar-inner-radius))]"
        style={{ opacity: mounted && theme === "dark" ? 1 : 0 }}
      >
        <AvatarImage
          src={darkSrc}
          alt={`${alt} (dark mode)`}
          fetchPriority="high"
        />
      </div>

      {(lightOnSrc || darkOnSrc) && (
        <div className="absolute inset-1.5 overflow-hidden rounded-(--avatar-inner-radius) opacity-0 transition-opacity! duration-1200 ease-[cubic-bezier(0.42,0,0.58,1)] [clip-path:inset(0_round_var(--avatar-inner-radius))] in-[[data-avatar-lights=on]]:opacity-100">
          <AvatarImage
            src={
              mounted && theme === "dark"
                ? (darkOnSrc ?? darkSrc)
                : (lightOnSrc ?? lightSrc)
            }
            alt={`${alt} (lights on)`}
            fetchPriority="high"
          />
        </div>
      )}
    </div>
  )
}

export function ThemeAwareAvatarToggle({
  lightSrc,
  darkSrc,
  lightOnSrc,
  darkOnSrc,
  alt,
  className,
  ...props
}: ThemeAwareAvatarProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { toggleLights } = useAvatarLights()

  return (
    <button
      className={cn(
        "group/avatar-lights-toggle mx-0.5 my-0.75 flex outline-none",
        className
      )}
      onClick={(e) => {
        e.preventDefault()
        toggleLights()
        props.onClick?.(e as React.MouseEvent<HTMLButtonElement>)
      }}
      aria-label="Toggle avatar lights"
      {...props}
    >
      <ThemeAwareAvatar
        lightSrc={lightSrc}
        darkSrc={darkSrc}
        lightOnSrc={lightOnSrc}
        darkOnSrc={darkOnSrc}
        alt={alt}
      />
    </button>
  )
}
