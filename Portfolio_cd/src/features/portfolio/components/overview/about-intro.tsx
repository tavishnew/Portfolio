"use client"

import { useState } from "react"
import {
  BoldIcon,
  FlameIcon,
  ItalicIcon,
  UnderlineIcon,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/base/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/base/ui/popover"

type NameStyle = "bold" | "italic" | "underline"

const NAME_TOOLS: {
  key: NameStyle
  label: string
  icon: LucideIcon
}[] = [
  {
    key: "bold",
    label: "Bold",
    icon: BoldIcon,
  },
  {
    key: "italic",
    label: "Italic",
    icon: ItalicIcon,
  },
  {
    key: "underline",
    label: "Underline",
    icon: UnderlineIcon,
  },
]

export function AboutIntro() {
  return (
    <p>
      I'm <InteractiveName />, a 22-year-old software developer from India passionate about full-stack development, AI, and building modern, scalable applications. I enjoy solving real-world problems through clean code, thoughtful design, and creating products that are fast, intuitive, and easy to use.
    </p>
  )
}

function InteractiveName() {
  const [styles, setStyles] = useState<Record<NameStyle, boolean>>({
    bold: false,
    italic: false,
    underline: false,
  })

  const toggleStyle = (style: NameStyle) => {
    setStyles((current) => ({
      ...current,
      [style]: !current[style],
    }))
  }

  return (
    <Popover>
      <span className="inline-flex items-baseline gap-1">
        <span
          className={cn(
            "transition-all duration-150",
            styles.bold &&
              "font-bold [font-synthesis-weight:auto] [text-shadow:0.015em_0_0_currentColor]",
            styles.italic && "italic",
            styles.underline &&
              "underline decoration-foreground/70 underline-offset-4"
          )}
        >
          Tavish
        </span>

        <span className="not-prose mx-1 inline-flex translate-y-1 rotate-6 rounded-lg border border-line p-0.5">
          <PopoverTrigger
            className="inline-flex size-7 items-center justify-center rounded-md border border-line bg-background text-muted-foreground shadow-xs transition-colors hover:bg-muted hover:text-[#F97316] focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none hover:[&_svg]:fill-[#F97316]"
            aria-label="Open name formatting toolbar"
          >
            <FlameIcon
              className="size-4 fill-transparent transition-colors"
              aria-hidden
            />
          </PopoverTrigger>
        </span>
      </span>

      <PopoverContent
        className="not-prose w-auto flex-row gap-1 rounded-lg border border-line p-1 shadow-md"
        side="top"
        sideOffset={6}
      >
        {NAME_TOOLS.map((tool) => {
          const Icon = tool.icon
          const isPressed = styles[tool.key]

          return (
            <Button
              key={tool.key}
              type="button"
              variant="ghost"
              size="icon-xs"
              className={cn(
                "size-7 rounded-md",
                isPressed && "bg-muted text-foreground"
              )}
              aria-label={tool.label}
              aria-pressed={isPressed}
              onClick={() => toggleStyle(tool.key)}
            >
              <Icon className="size-3.5" aria-hidden />
            </Button>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
