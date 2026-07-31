import type { MetadataRoute } from "next"

import { blockCategories } from "@/config/registry"
import { SITE_INFO } from "@/config/site"
import { getAllBlockStaticParams } from "@/lib/blocks"

export const revalidate = false
export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blockCategoryPages = blockCategories.map((category) => ({
    url: `${SITE_INFO.url}/blocks/${category.name}`,
    lastModified: new Date().toISOString(),
  }))

  const blocks = (await getAllBlockStaticParams()).map(
    ({ category, name }) => ({
      url: `${SITE_INFO.url}/blocks/${category}/${name}`,
      lastModified: new Date().toISOString(),
    })
  )

  const routes = [
    "",
    "/blocks",
    "/sponsors",
    "/testimonials",
  ].map((route) => ({
    url: `${SITE_INFO.url}${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routes, ...blockCategoryPages, ...blocks]
}
