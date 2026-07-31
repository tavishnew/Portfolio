import { MapPinIcon } from "lucide-react"

import { Prose } from "@/components/ui/typography"
import { SocialLinksContent } from "@/features/portfolio/components/social-links"
import { USER } from "@/features/portfolio/data/user"

import { Panel, PanelContent } from "../panel"
import { AboutIntro } from "./about-intro"
import { EmailItem } from "./email-item"
import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item"
import { JobItem } from "./job-item"

export function Overview() {
  return (
    <Panel>
      <h2 className="sr-only">Overview</h2>

      <PanelContent className="screen-line-bottom">
        <Prose>
          <AboutIntro />
        </Prose>
      </PanelContent>

      <div
        className="relative flex h-(--separator-height) w-full before:absolute before:left-[-100vw] before:-z-1 before:h-(--separator-height) before:w-[200vw] before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-line)]/56"
        aria-hidden
      />

      <SocialLinksContent />

      <div
        className="screen-line-bottom relative flex h-(--separator-height) w-full before:absolute before:left-[-100vw] before:-z-1 before:h-(--separator-height) before:w-[200vw] before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-line)]/56"
        aria-hidden
      />

      <PanelContent className="space-y-2.5">
        <div className="grid gap-x-4 gap-y-2.5 sm:grid-cols-2">
          <EmailItem email={USER.email} />

          <IntroItem>
            <IntroItemIcon>
              <MapPinIcon />
            </IntroItemIcon>
            <IntroItemContent>
              <IntroItemLink
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(USER.address)}`}
                aria-label={`Location: ${USER.address}`}
              >
                {USER.address}
              </IntroItemLink>
            </IntroItemContent>
          </IntroItem>
        </div>
      </PanelContent>
    </Panel>
  )
}
