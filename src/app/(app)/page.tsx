import { Suspense } from "react"
import type { Metadata } from "next"
import dynamic from "next/dynamic"
import type { ProfilePage as PageSchema, WithContext } from "schema-dts"

import { JsonLdScript } from "@/lib/json-ld"
import { cn } from "@/lib/utils"
import { About } from "@/features/portfolio/components/about"
import {
  Education,
  EducationSkeleton,
} from "@/features/portfolio/components/education"
import { Experiences } from "@/features/portfolio/components/experiences"
import { Overview } from "@/features/portfolio/components/overview"
import { Panel } from "@/features/portfolio/components/panel"
import { ProfileActivityMosaicCover } from "@/features/portfolio/components/profile-activity-mosaic-cover"
import { ProfileHeader } from "@/features/portfolio/components/profile-header"
import { Projects } from "@/features/portfolio/components/projects"
import { TechStack } from "@/features/portfolio/components/tech-stack"
import { USER } from "@/features/portfolio/data/user"

const TOC = dynamic(() => import("@/features/portfolio/components/toc"))

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLdScript data={getPageJsonLd()} />

      <div className="[--cover-height:370px] [--separator-height:--spacing(8)] **:data-[slot=panel]:scroll-mt-[calc(var(--header-height)+var(--separator-height))]">
        <div id="top" className="h-0" />
        <div className="mx-auto md:max-w-3xl">
          <ProfileActivityMosaicCover />
          <ProfileHeader />
          <Separator />

          <Overview />
          <Separator />

          <About />
          <Separator />

          <Experiences />
          <Separator />

          <Projects />
          <Separator />

          <Panel id="skills">
            <TechStack />
          </Panel>
          <Separator />

          <Suspense fallback={<EducationSkeleton />}>
            <Education />
          </Suspense>
          <Separator />
        </div>

        <TOC />
      </div>
    </>
  )
}

function getPageJsonLd(): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: new Date(USER.dateCreated).toISOString(),
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
  }
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-(--separator-height) w-full border-x border-line",
        "before:absolute before:left-[-100vw] before:-z-1 before:h-(--separator-height) before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-line)]/80",
        className
      )}
    >
      {/* <div
        className="absolute -top-1.25 -left-1.25 z-2 flex size-2.25 border bg-background"
        aria-hidden
      />
      <div
        className="absolute -top-1.25 -right-1.25 z-2 flex size-2.25 border bg-background"
        aria-hidden
      /> */}
    </div>
  )
}
