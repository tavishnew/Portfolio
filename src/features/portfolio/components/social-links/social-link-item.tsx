import Image from "next/image"
import { addQueryParams } from "@/utils/url"
import { ArrowUpRightIcon, FileUser } from "lucide-react"

import { cn } from "@/lib/utils"
import type { SocialLink } from "@/features/portfolio/types/social-links"

const SOCIAL_LINK_UTM_PARAMS = {
  utm_source: "69ftw.site",
}

export function SocialLinkItem({
  icon,
  title,
  href,
  ariaLabel,
  target,
  rel,
}: SocialLink) {
  const isEmailLink = href.startsWith("mailto:")
  const isWhatsAppLink = href.startsWith("https://wa.me/")
  const isResumeLink = href === "/Tavish_Resume.pdf"
  const hrefWithTracking =
    isEmailLink || isWhatsAppLink
      ? href
      : addQueryParams(href, SOCIAL_LINK_UTM_PARAMS)

  const linkTarget =
    target ?? (isEmailLink || isWhatsAppLink ? undefined : "_blank")
  const linkRel =
    rel ?? (isEmailLink || isWhatsAppLink ? undefined : "noopener noreferrer")

  return (
    <div
      className={cn(
        "relative flex cursor-pointer items-center gap-4 p-4 pr-2 transition-[background-color] ease-out hover:bg-accent-muted"
      )}
    >
      <div className="relative size-8 shrink-0 [--image-radius:var(--radius-lg)]">
        {isResumeLink ? (
          <FileUser className="size-full text-foreground" aria-hidden="true" />
        ) : (
          <>
            <Image
              className="size-full rounded-(--image-radius) object-contain select-none"
              src={icon}
              alt={`${title} logo`}
              width={32}
              height={32}
              quality={100}
              unoptimized
            />
            <div className="pointer-events-none absolute inset-0 rounded-(--image-radius) inset-ring-1 inset-ring-black/10 dark:inset-ring-white/15" />
          </>
        )}
      </div>

      <h3 className="flex-1 font-medium">
        <a
          href={hrefWithTracking}
          target={linkTarget}
          rel={linkRel}
          aria-label={ariaLabel}
        >
          <span className="absolute inset-0" aria-hidden />
          {title}
        </a>
      </h3>

      <ArrowUpRightIcon className="size-4 text-muted-foreground" />
    </div>
  )
}
