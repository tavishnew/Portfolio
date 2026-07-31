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

import Script from "next/script"

export function JsonLdScript({ data }: { data: unknown }) {
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}
