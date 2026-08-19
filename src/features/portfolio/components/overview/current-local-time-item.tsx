"use client"

import { useEffect, useState } from "react"
import { TZDate, tzOffset } from "@date-fns/tz"
import { format } from "date-fns"
import {
  Clock1Icon,
  Clock2Icon,
  Clock3Icon,
  Clock4Icon,
  Clock5Icon,
  Clock6Icon,
  Clock7Icon,
  Clock8Icon,
  Clock9Icon,
  Clock10Icon,
  Clock11Icon,
  Clock12Icon,
  type LucideIcon,
} from "lucide-react"

import { IntroItem, IntroItemContent, IntroItemIcon } from "./intro-item"

const CLOCK_ICONS: Record<number, LucideIcon> = {
  1: Clock1Icon,
  2: Clock2Icon,
  3: Clock3Icon,
  4: Clock4Icon,
  5: Clock5Icon,
  6: Clock6Icon,
  7: Clock7Icon,
  8: Clock8Icon,
  9: Clock9Icon,
  10: Clock10Icon,
  11: Clock11Icon,
  12: Clock12Icon,
}

type CurrentLocalTimeItemProps = {
  timeZone: string
  label?: string
}

function useCurrentLocalTime(timeZone: string) {
  const [timeString, setTimeString] = useState<string>("")
  const [diffText, setDiffText] = useState<string>("")
  const [ClockIcon, setClockIcon] = useState<LucideIcon>(Clock12Icon)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()

      // Get time in target timezone using TZDate
      const targetTime = TZDate.tz(timeZone)
      const formattedTime = format(targetTime, "HH:mm:ss")
      setTimeString(formattedTime)

      // Get hour for clock icon (1-12)
      const hour = targetTime.getHours()
      const hour12 = hour % 12 || 12
      setClockIcon(CLOCK_ICONS[hour12])

      // Calculate timezone offset difference using tzOffset
      const viewerOffset = -now.getTimezoneOffset() // in minutes
      const targetOffset = tzOffset(timeZone, now) // in minutes

      const minutesDiff = Math.abs(targetOffset - viewerOffset)
      const hoursDiff = minutesDiff / 60

      let diff = ""
      if (hoursDiff < 1) {
        diff = " // same time"
      } else {
        const hours = Math.floor(hoursDiff)
        const isAhead = targetOffset > viewerOffset
        diff = ` // ${hours}h ${isAhead ? "ahead" : "behind"}`
      }
      setDiffText(diff)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [timeZone])

  return {
    ClockIcon,
    diffText,
    timeString,
  }
}

export function CurrentLocalTimeText({ timeZone }: { timeZone: string }) {
  const { diffText, timeString } = useCurrentLocalTime(timeZone)

  if (!timeString) {
    return <span>00:00</span>
  }

  return (
    <span className="inline-flex items-baseline gap-2 whitespace-nowrap">
      <span className="text-foreground/80">{timeString}</span>
      <span className="text-muted-foreground/60" aria-hidden="true">
        {diffText.trimStart()}
      </span>
    </span>
  )
}

export function CurrentLocalTimeItem({
  timeZone,
  label,
}: CurrentLocalTimeItemProps) {
  const { ClockIcon, diffText, timeString } = useCurrentLocalTime(timeZone)

  if (!timeString) {
    return (
      <IntroItem>
        <IntroItemIcon>
          <Clock12Icon />
        </IntroItemIcon>

        <IntroItemContent>00:00</IntroItemContent>
      </IntroItem>
    )
  }

  return (
    <IntroItem>
      <IntroItemIcon>
        <ClockIcon />
      </IntroItemIcon>

      <IntroItemContent
        aria-label={`Local time${label ? ` in ${label}` : ""}: ${timeString}`}
      >
        {label && <span>{label}: </span>}
        <span>{timeString}</span>
        <span className="ml-2 text-muted-foreground/60" aria-hidden="true">
          {diffText.trimStart()}
        </span>
      </IntroItemContent>
    </IntroItem>
  )
}
