import type { MetadataRoute } from "next"
import { createClient } from "@/lib/supabase/server"

const BASE_URL = "https://fiche-website-tau.vercel.app"
const locales = ["pt", "en", "fr", "zh"]

const pages = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []

  for (const page of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: locale === "pt" ? page.priority : page.priority * 0.9,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${page.path}`])
          ),
        },
      })
    }
  }

  // Add individual project pages
  try {
    const supabase = await createClient()
    const { data: projects } = await supabase
      .from("portfolio_projects")
      .select("slug, created_at")
      .eq("active", true)

    if (projects) {
      for (const project of projects) {
        for (const locale of locales) {
          entries.push({
            url: `${BASE_URL}/${locale}/portfolio/${project.slug}`,
            lastModified: project.created_at ? new Date(project.created_at) : new Date(),
            changeFrequency: "monthly",
            priority: locale === "pt" ? 0.7 : 0.63,
            alternates: {
              languages: Object.fromEntries(
                locales.map((l) => [l, `${BASE_URL}/${l}/portfolio/${project.slug}`])
              ),
            },
          })
        }
      }
    }
  } catch {
    // Skip project entries if DB unavailable
  }

  return entries
}
