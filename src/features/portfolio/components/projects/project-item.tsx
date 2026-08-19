"use client"

import Image from "next/image"
import { addQueryParams } from "@/utils/url"
import { BoxIcon, LinkIcon } from "lucide-react"

import { UTM_PARAMS } from "@/config/site"
import { Tag } from "@/components/ui/tag"
import { Prose } from "@/components/ui/typography"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { Markdown } from "@/components/markdown"

import type { Project } from "../../types/projects"

export function ProjectItem({
  className,
  project,
}: {
  className?: string
  project: Project
}) {
  return (
    <details className={className} data-project-item={project.title}>
      <summary className="list-none [&::-webkit-details-marker]:hidden">
        <div className="flex items-center hover:bg-accent-muted">
          {project.logo ? (
            <Image
              src={project.logo}
              alt={project.title}
              width={32}
              height={32}
              quality={100}
              className="mx-4 flex size-6 shrink-0 select-none"
              unoptimized
              aria-hidden
            />
          ) : (
            <div className="mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-line ring-offset-1 ring-offset-background select-none">
              <BoxIcon className="size-4" />
            </div>
          )}

          <div className="flex min-w-0 flex-1 items-center border-l border-dashed border-line p-4 pr-4 text-left">
            <div className="min-w-0 flex-1">
              <h3 className="mb-1 leading-snug font-medium text-balance">
                {project.title}
              </h3>
            </div>

            <div className="flex shrink-0 items-center gap-2 text-muted-foreground [&_svg]:size-4">
              <div aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 15L12 20L17 15" />
                  <path d="M7 9L12 4L17 9" />
                </svg>
              </div>

              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      className="relative flex size-6 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                      href={addQueryParams(project.link, UTM_PARAMS)}
                      target="_blank"
                      rel="noopener"
                      aria-label="Open Project Link"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <LinkIcon className="pointer-events-none size-4" />
                    </a>
                  }
                />
                <TooltipContent>
                  <p>Open Project Link</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </summary>

      <div className="overflow-hidden">
        <div className="space-y-4 border-t border-line p-4">
          {project.description && (
            <Prose>
              <Markdown>{project.description}</Markdown>
            </Prose>
          )}

          {project.skills.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {project.skills.map((skill, index) => (
                <li key={index} className="flex">
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </details>
  )
}
