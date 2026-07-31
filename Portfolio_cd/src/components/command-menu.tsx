"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"
import { copyToClipboardWithEvent } from "@/utils/copy"
import { useRouter } from "@bprogress/next/app"
import { useTiks } from "@rexa-developer/tiks/react"
import {
  BoxIcon,
  BriefcaseBusinessIcon,
  CornerDownLeftIcon,
  DownloadIcon,
  GraduationCap,
  MonitorIcon,
  MoonStarIcon,
  SunMediumIcon,
  TextInitialIcon,
  TypeIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useHotkeys } from "react-hotkeys-hook"
import { toast } from "sonner"

import { trackEvent } from "@/lib/events"
import { useClickSound } from "@/hooks/soundcn/use-click-sound"
import { useMutationObserver } from "@/hooks/use-mutation-observer"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import type { DocPreview } from "@/features/doc/types/document"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"

import { ChanhDaiMark, getMarkSVG } from "./chanhdai-mark"
import { getWordmarkSVG } from "./chanhdai-wordmark"
import { Icons } from "./icons"
import { Button } from "./ui/button"
import { Kbd, KbdGroup } from "./ui/kbd"

type CommandKind = "command" | "page" | "link" | "component"

type CommandLinkItem = {
  title: string
  href: string
  kind: CommandKind
  icon?: React.ReactElement
  iconImage?: string
  shortcut?: string
  keywords?: string[]
  openInNewTab?: boolean
}

const MENU_LINKS: CommandLinkItem[] = [
  {
    title: "Home",
    href: "/",
    kind: "page",
    icon: <ChanhDaiMark />,
    shortcut: "GH",
  },
]

const PORTFOLIO_LINKS: CommandLinkItem[] = [
  {
    title: "About",
    href: "/#about",
    kind: "page",
    icon: <TextInitialIcon />,
  },
  {
    title: "Experience",
    href: "/#experience",
    kind: "page",
    icon: <BriefcaseBusinessIcon />,
  },
  {
    title: "Projects",
    href: "/#projects",
    kind: "page",
    icon: <BoxIcon />,
  },
  {
    title: "Education",
    href: "/#education",
    kind: "page",
    icon: <GraduationCap />,
  },
]

const SOCIAL_LINK_ITEMS: CommandLinkItem[] = SOCIAL_LINKS.map((item) => ({
  title: item.title,
  href: item.href,
  kind: "link",
  iconImage: item.icon,
  openInNewTab: true,
}))

const OTHER_LINK_ITEMS: CommandLinkItem[] = []

// Tailwind class constants for deduplication
const DIALOG_CONTAINER = "rounded-xl bg-background ring-1 ring-border"
const LIST_CONTAINER = "min-h-80 supports-timeline-scroll:scroll-fade-effect-y"
const FOOTER_WRAPPER = "absolute inset-x-0 bottom-0 flex h-10 items-center justify-between gap-2 rounded-b-2xl px-4 text-xs font-medium"
const FOOTER_ICON = "size-6 text-muted-foreground"
const FOOTER_ACTIONS = "flex items-center gap-2 max-sm:hidden"
const TRIGGER_BASE = "gap-1.5 rounded-full text-muted-foreground shadow-none select-none hover:bg-background hover:text-muted-foreground dark:hover:bg-input/30"
const KB_GROUP_MAC = "hidden sm:in-[.os-macos_&]:flex"
const KB_GROUP_OTHER = "hidden sm:not-[.os-macos_&]:flex"
const KB_KEY = "w-5 min-w-5"
const ICON_IMG = "size-4 rounded-sm"
const TITLE_TEXT = "line-clamp-1"
const SHORTCUT_TEXT = "font-mono tracking-[0.2em] max-sm:hidden"

export function CommandMenu({
  docs,
  enabledHotkeys = false,
}: {
  docs: DocPreview[]
  enabledHotkeys?: boolean
}) {
  const router = useRouter()

  const { setTheme } = useTheme()

  const [open, setOpen] = useState(false)

  const [selectedCommandKind, setSelectedCommandKind] =
    useState<CommandKind | null>(null)

  const [click] = useClickSound()

  const { success: tiksSuccess } = useTiks()

  useHotkeys(
    "mod+k, slash",
    (e) => {
      e.preventDefault()

      setOpen((open) => {
        if (!open) {
          trackEvent({
            name: "open_command_menu",
            properties: {
              method: "keyboard",
              key: e.key === "/" ? "/" : e.metaKey ? "cmd+k" : "ctrl+k",
            },
          })
        }
        return !open
      })
    },
    { enabled: enabledHotkeys }
  )

  const handleOpenLink = useCallback(
    (href: string, openInNewTab = false) => {
      setOpen(false)

      trackEvent({
        name: "command_menu_action",
        properties: {
          action: "navigate",
          href: href,
          open_in_new_tab: openInNewTab,
        },
      })

      if (openInNewTab) {
        window.open(href, "_blank", "noopener")
      } else {
        router.push(href)
      }
    },
    [router]
  )

  const handleCopyText = useCallback(
    (text: string, message: string) => {
      setOpen(false)
      copyToClipboardWithEvent(text, {
        name: "command_menu_action",
        properties: {
          action: "copy",
          text: text,
        },
      })
      toast.success(message)
      tiksSuccess()
    },
    [tiksSuccess]
  )

  const createThemeHandler = useCallback(
    (theme: "light" | "dark" | "system") => () => {
      click()
      setOpen(false)

      trackEvent({
        name: "command_menu_action",
        properties: {
          action: "change_theme",
          theme: theme,
        },
      })

      setTheme(theme)
    },
    [click, setTheme]
  )

  const handleLinkHighlight = useCallback((link: CommandLinkItem) => {
    setSelectedCommandKind(link.kind)
  }, [])

  const handleCommandHighlight = useCallback(() => {
    setSelectedCommandKind("command")
  }, [])

  return (
    <>
      <CommandMenuTrigger
        onClick={() => {
          setOpen(true)
          trackEvent({
            name: "open_command_menu",
            properties: {
              method: "click",
            },
          })
        }}
      />

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandMenuInput />

        <div className={DIALOG_CONTAINER} data-testid="command-menu-dialog">
          <CommandList className={LIST_CONTAINER}>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandLinkGroup
              heading="Menu"
              links={MENU_LINKS}
              onLinkHighlight={handleLinkHighlight}
              onLinkSelect={handleOpenLink}
            />

            <CommandLinkGroup
              heading="Portfolio"
              links={PORTFOLIO_LINKS}
              onLinkHighlight={handleLinkHighlight}
              onLinkSelect={handleOpenLink}
            />

            <CommandLinkGroup
              heading="Social Links"
              links={SOCIAL_LINK_ITEMS}
              onLinkHighlight={handleLinkHighlight}
              onLinkSelect={handleOpenLink}
            />

            <BrandAssetsSection onHighlight={handleCommandHighlight} onCopy={handleCopyText} />

            <ThemeSection onHighlight={handleCommandHighlight} onSelect={createThemeHandler} />

            <CommandLinkGroup
              heading="Other"
              links={OTHER_LINK_ITEMS}
              onLinkHighlight={handleLinkHighlight}
              onLinkSelect={handleOpenLink}
            />
          </CommandList>
        </div>

        <CommandMenuFooter selectedCommandKind={selectedCommandKind} />
      </CommandDialog>
    </>
  )
}

export default CommandMenu

// --- Sub-components ---

function BrandAssetsSection({
  onHighlight,
  onCopy,
}: {
  onHighlight: () => void
  onCopy: (text: string, message: string) => void
}) {
  return (
    <CommandGroup heading="Brand Assets" data-testid="command-brand-assets">
      <CommandMenuItem onHighlight={onHighlight} onSelect={() => onCopy(getMarkSVG(), "Mark as SVG copied")}>
        <ChanhDaiMark />
        Copy Mark as SVG
      </CommandMenuItem>

      <CommandMenuItem onHighlight={onHighlight} onSelect={() => onCopy(getWordmarkSVG(), "Logotype as SVG copied")}>
        <TypeIcon />
        Copy Logotype as SVG
      </CommandMenuItem>

      <CommandMenuItem onHighlight={onHighlight} asChild>
        <a
          href="https://assets.chanhdai.com/chanhdai-brand.zip"
          download
        >
          <DownloadIcon />
          Download Brand Assets
        </a>
      </CommandMenuItem>
    </CommandGroup>
  )
}

function ThemeSection({
  onHighlight,
  onSelect,
}: {
  onHighlight: () => void
  onSelect: (theme: "light" | "dark" | "system") => () => void
}) {
  return (
    <CommandGroup heading="Theme" data-testid="command-theme">
      <CommandMenuItem keywords={["theme"]} onHighlight={onHighlight} onSelect={onSelect("light")}>
        <SunMediumIcon />
        Light
      </CommandMenuItem>
      <CommandMenuItem keywords={["theme"]} onHighlight={onHighlight} onSelect={onSelect("dark")}>
        <MoonStarIcon />
        Dark
      </CommandMenuItem>
      <CommandMenuItem keywords={["theme"]} onHighlight={onHighlight} onSelect={onSelect("system")}>
        <MonitorIcon />
        System
      </CommandMenuItem>
    </CommandGroup>
  )
}

function CommandMenuTrigger({ ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="command-menu-trigger"
      data-testid="command-menu-trigger"
      className={TRIGGER_BASE}
      variant="outline"
      size="sm"
      {...props}
    >
      <Icons.search />

      <span className="font-sans text-sm/4 font-medium sm:hidden">Search…</span>

      <KbdGroup className={KB_GROUP_MAC}>
        <Kbd className={KB_KEY}>⌘</Kbd>
        <Kbd className={KB_KEY}>K</Kbd>
      </KbdGroup>

      <KbdGroup className={KB_GROUP_OTHER}>
        <Kbd>Ctrl</Kbd>
        <Kbd className={KB_KEY}>K</Kbd>
      </KbdGroup>
    </Button>
  )
}

function CommandMenuInput() {
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    if (searchValue.length >= 2) {
      const timeoutId = setTimeout(() => {
        trackEvent({
          name: "command_menu_search",
          properties: {
            query: searchValue,
            query_length: searchValue.length,
          },
        })
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [searchValue])

  return (
    <CommandInput
      placeholder="Type a command or search…"
      value={searchValue}
      onValueChange={setSearchValue}
    />
  )
}

function CommandMenuItem({
  children,
  onHighlight,
  ...props
}: React.ComponentProps<typeof CommandItem> & {
  onHighlight?: () => void
  "data-selected"?: string
  "aria-selected"?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  useMutationObserver(ref, (mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "aria-selected" &&
        ref.current?.getAttribute("aria-selected") === "true"
      ) {
        onHighlight?.()
      }
    })
  })

  return (
    <CommandItem ref={ref} {...props}>
      {children}
    </CommandItem>
  )
}

function CommandLinkGroup({
  heading,
  links,
  fallbackIcon,
  onLinkHighlight,
  onLinkSelect,
}: {
  heading: string
  links: CommandLinkItem[]
  fallbackIcon?: React.ReactElement
  onLinkHighlight: (link: CommandLinkItem) => void
  onLinkSelect: (href: string, openInNewTab?: boolean) => void
}) {
  return (
    <CommandGroup heading={heading}>
      {links.map((link) => {
        const icon = link?.icon ?? fallbackIcon ?? <React.Fragment />

        return (
          <CommandMenuItem
            key={link.href}
            keywords={link.keywords}
            onHighlight={() => onLinkHighlight(link)}
            onSelect={() => onLinkSelect(link.href, link.openInNewTab)}
          >
            {link?.iconImage ? (
              <img className={ICON_IMG} src={link.iconImage} alt={link.title} />
            ) : (
              icon
            )}

            <p className={TITLE_TEXT}>{link.title}</p>

            {link.shortcut && (
              <CommandShortcut className={SHORTCUT_TEXT}>
                {link.shortcut}
              </CommandShortcut>
            )}
          </CommandMenuItem>
        )
      })}
    </CommandGroup>
  )
}

const ENTER_ACTION_LABELS: Record<CommandKind, string> = {
  command: "Run Command",
  page: "Go to Page",
  link: "Open Link",
  component: "Go to Component",
}

function CommandMenuFooter({ selectedCommandKind }: { selectedCommandKind: CommandKind | null }) {
  return (
    <>
      <div className="flex h-10" aria-hidden="true" />

      <footer className={FOOTER_WRAPPER} data-testid="command-menu-footer">
        <ChanhDaiMark className={FOOTER_ICON} aria-hidden="true" />

        <div className={FOOTER_ACTIONS}>
          <span>{ENTER_ACTION_LABELS[selectedCommandKind ?? "page"]}</span>
          <Kbd>
            <CornerDownLeftIcon />
          </Kbd>
        </div>
      </footer>
    </>
  )
}