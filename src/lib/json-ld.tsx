import type { BreadcrumbList, WithContext } from "schema-dts"

import { absoluteUrl } from "@/lib/utils"

export type BreadcrumbItem = {
  name: string
  href: string
}

export function jsonLdBreadcrumbList(
  items: BreadcrumbItem[]
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  }
}

export function JsonLdScript({ data }: { data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c")

  if (typeof document === "undefined") {
    return (
      <script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: json }}
      />
    )
  }

  if (typeof window !== "undefined") {
    if (document.getElementById("json-ld")) return null
    const el = document.createElement("script")
    el.id = "json-ld"
    el.type = "application/ld+json"
    el.textContent = json
    document.head.appendChild(el)
  }

  return null
}
