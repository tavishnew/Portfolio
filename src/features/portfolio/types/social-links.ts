export type SocialLink = {
  /** Icon image URL (absolute or path under /public) shown beside the title. */
  icon: string
  title: string
  /** Optional handle/username or subtitle displayed under the title. */
  subtitle?: string
  /** External profile URL opened when the item is clicked. */
  href: string
  /** Optional aria-label for accessibility (e.g., "Open Resume in a new tab"). */
  ariaLabel?: string
  /** Optional link target override (default: "_blank" for external links). */
  target?: string
  /** Optional link rel override (default: "noopener" for external links). */
  rel?: string
}
