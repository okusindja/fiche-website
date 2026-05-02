"use client";

import { useState, useRef } from "react";
import { PortfolioCard } from "./PortfolioCard";
import { PortfolioFilterBar } from "./PortfolioFilterBar";

export interface PortfolioProject {
  id: string;
  slug: string;
  category: string;
  title_pt: string;
  title_en: string;
  title_fr: string;
  title_zh: string;
  description_pt: string;
  description_en: string;
  description_fr: string;
  description_zh: string;
  full_description_pt?: string | null;
  full_description_en?: string | null;
  full_description_fr?: string | null;
  full_description_zh?: string | null;
  cover_image: string;
  images?: string[];
  client_name?: string | null;
  location?: string | null;
  year?: number | null;
  duration?: string | null;
  featured?: boolean;
  active?: boolean;
  sort_order?: number;
}

interface PortfolioGridProps {
  projects: PortfolioProject[];
  locale: string;
  filterLabels: Record<string, string>;
}

function getTitle(project: PortfolioProject, locale: string): string {
  const map: Record<string, string> = {
    pt: project.title_pt,
    en: project.title_en,
    fr: project.title_fr,
    zh: project.title_zh,
  };
  return map[locale] ?? project.title_pt;
}

export function PortfolioGrid({ projects, locale, filterLabels }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visible, setVisible] = useState(true);
  const pendingFilter = useRef<string | null>(null);

  const handleFilterChange = (cat: string) => {
    if (cat === activeFilter) return;
    pendingFilter.current = cat;
    setVisible(false);
    setTimeout(() => {
      setActiveFilter(pendingFilter.current ?? cat);
      setVisible(true);
    }, 180);
  };

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div>
      <div className="mb-8">
        <PortfolioFilterBar
          active={activeFilter}
          onChange={handleFilterChange}
          locale={locale}
          labels={filterLabels}
        />
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-200"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)" }}
      >
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-16 text-[#868e96]">
            {filterLabels["noProjects"] ?? "No projects found"}
          </div>
        ) : (
          filtered.map((project) => (
            <div
              key={project.id}
              className={project.featured ? "lg:col-span-2" : ""}
            >
              <PortfolioCard
                title={getTitle(project, locale)}
                category={project.category}
                coverImage={project.cover_image}
                location={project.location}
                year={project.year}
                slug={project.slug}
                locale={locale}
                featured={project.featured}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
