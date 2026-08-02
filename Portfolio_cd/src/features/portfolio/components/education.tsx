import { GraduationCap, School } from "lucide-react"
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"
import { EDUCATION } from "@/features/portfolio/data/education"

const ID = "education"

export function Education() {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Education</a>
          <PanelTitleSup>(3)</PanelTitleSup>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <dl className="space-y-4">
        {EDUCATION.map((edu) => (
          <EducationItem key={edu.id} education={edu} />
        ))}
      </dl>
      <div className="-mt-px h-px bg-line" />
    </Panel>
  )
}

function EducationItem({ education }: { education: (typeof EDUCATION)[0] }) {
  const Icon = education.icon === "graduation-cap" ? GraduationCap : School

  return (
    <div
      data-slot="metric"
      className="screen-line-bottom flex items-center gap-4 p-4 border border-line rounded-lg"
    >
      <div className="flex-shrink-0">
        <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-base font-medium text-foreground">
          {education.degree}
        </div>
        <div className="text-sm text-muted-foreground mt-0.5">
          {education.institution}
        </div>
      </div>
    </div>
  )
}

export function EducationSkeleton() {
  return <Panel className="h-64" />
}