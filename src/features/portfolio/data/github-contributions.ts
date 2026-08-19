import "server-only"

import { unstable_cache } from "next/cache"

import { GITHUB_USERNAME } from "@/config/site"
import type { Activity } from "@/registry/components/contribution-graph"

type GitHubContributionsResponse = {
  contributions: Activity[]
}

const GITHUB_CONTRIBUTIONS_API_URL =
  process.env.GITHUB_CONTRIBUTIONS_API_URL?.trim() ||
  "https://github-contributions-api.jogruber.de"

export const getGitHubContributions = unstable_cache(
  async () => {
    try {
      const res = await fetch(
        `${GITHUB_CONTRIBUTIONS_API_URL}/v4/${GITHUB_USERNAME}?y=last`
      )
      if (!res.ok) {
        return []
      }
      const data = (await res.json()) as GitHubContributionsResponse
      return data.contributions ?? []
    } catch {
      return []
    }
  },
  ["github-contributions", GITHUB_USERNAME],
  { revalidate: 86400 } // Cache for 1 day (86400 seconds)
)
