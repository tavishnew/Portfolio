"use client"

import { useMediaQuery } from "@/hooks/use-media-query"
import { TOCMinimap } from "@/components/toc-minimap"

export function TOC() {
  const isDesktop = useMediaQuery("(min-width: 64rem)") // xl breakpoint

  if (!isDesktop) {
    return null
  }

  return (
    <div className="fixed top-[calc(var(--header-height)+var(--cover-height)+(--spacing(3))+1px)] right-0 z-50">
      <TOCMinimap
        className="transition-opacity duration-200 data-[active-anchor=components]:opacity-30"
        items={[
          { title: "Overview", url: "/", depth: 2 },
          { title: "About", url: "#about", depth: 2 },
          { title: "Experience", url: "#experience", depth: 2 },
          { title: "Projects", url: "#projects", depth: 2 },
          { title: "Education", url: "#education", depth: 2 },
        ]}
        options={{
          threshold: 0,
          rootMargin: "-20% 0% -60% 0%",
        }}
      />
    </div>
  )
}

export default TOC
