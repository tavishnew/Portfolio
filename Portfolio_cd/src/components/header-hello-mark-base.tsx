"use client"

import { useCallback, useState } from "react"
import { AnimatePresence } from "motion/react"

import { cn } from "@/lib/utils"
import { AppleHelloEffectEnglish } from "@/components/apple-hello-effect-english"
import { AppleHelloEffectHindi } from "@/components/apple-hello-effect-hindi"

export function HeaderHelloMarkBase({ className }: { className?: string }) {
  const [index, setIndex] = useState(0)

  const handleAnimationComplete = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % 2)
  }, [])

  const demos = [
    <AppleHelloEffectEnglish
      key="english"
      className="h-8 w-auto"
      durationScale={1}
      onAnimationComplete={handleAnimationComplete}
    />,
    <AppleHelloEffectHindi
      key="hindi"
      className="h-8 w-auto"
      durationScale={1}
      onAnimationComplete={handleAnimationComplete}
    />,
  ]

  return <div className={cn("flex h-8 w-24 shrink-0 items-center overflow-hidden text-foreground", className)}><AnimatePresence mode="wait">{demos[index]}</AnimatePresence></div>
}