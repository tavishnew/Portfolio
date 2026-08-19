import { CurrentLocalTimeText } from "@/features/portfolio/components/overview/current-local-time-item"
import { USER } from "@/features/portfolio/data/user"

import { FlipSentences } from "./flip-sentences"
import { ThemeAwareAvatarToggle } from "./theme-aware-avatar"
import { VerifiedIcon } from "./verified-icon"

export function ProfileHeader() {
  return (
    <div className="screen-line-bottom flex border-x border-line">
      <div className="shrink-0 border-r border-line">
        <ThemeAwareAvatarToggle
          className="group/avatar-lights-toggle mx-0.5 my-0.75 flex outline-none"
          lightSrc={USER.avatarVariants.lightOff}
          darkSrc={USER.avatarVariants.darkOff}
          alt={USER.displayName}
        />
      </div>

      <div className="flex flex-1 flex-col">
        {/* <div className="flex grow items-end pb-1 pl-4">
          <div
            className="line-clamp-1 font-mono text-xs text-zinc-300 select-none max-sm:hidden dark:text-zinc-800"
            aria-hidden
          >
            {"text-3xl "}
            <span className="inline dark:hidden">text-zinc-950</span>
            <span className="hidden dark:inline">text-zinc-50</span>
            {" font-medium"}
          </div>
        </div> */}
        <div className="flex grow items-start justify-end px-4 py-3 font-mono text-sm text-muted-foreground">
          <CurrentLocalTimeText timeZone={USER.timeZone} />
        </div>

        <div className="border-t border-line">
          <div className="flex items-center gap-2 pl-4">
            <h1 className="-translate-y-px text-3xl font-semibold tracking-tight">
              {USER.displayName}
            </h1>

            <VerifiedIcon
              className="size-4.5 text-[#FDC700] select-none"
              aria-hidden
            />
          </div>

          <FlipSentences className="h-12.5 border-t border-line py-1 pl-4 sm:h-9">
            {USER.flipSentences}
          </FlipSentences>
        </div>
      </div>
    </div>
  )
}
