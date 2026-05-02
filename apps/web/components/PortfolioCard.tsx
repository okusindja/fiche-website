import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface PortfolioCardProps {
  title: string;
  category: string;
  coverImage: string;
  location?: string | null;
  year?: number | null;
  slug: string;
  locale: string;
  featured?: boolean;
}

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  pt: {
    agriculture: "Agricultura",
    catering: "Restauração",
    public_works: "Obras Públicas",
    logistics: "Logística",
    trade: "Comércio",
    maintenance: "Manutenção",
  },
  en: {
    agriculture: "Agriculture",
    catering: "Catering",
    public_works: "Public Works",
    logistics: "Logistics",
    trade: "Trade",
    maintenance: "Maintenance",
  },
  fr: {
    agriculture: "Agriculture",
    catering: "Restauration",
    public_works: "Travaux Publics",
    logistics: "Logistique",
    trade: "Commerce",
    maintenance: "Maintenance",
  },
  zh: {
    agriculture: "农业",
    catering: "餐饮",
    public_works: "公共工程",
    logistics: "物流",
    trade: "贸易",
    maintenance: "维护",
  },
};

function getCategoryLabel(category: string, locale: string): string {
  return CATEGORY_LABELS[locale]?.[category] ?? CATEGORY_LABELS["pt"][category] ?? category;
}

export function PortfolioCard({
  title,
  category,
  coverImage,
  location,
  year,
  slug,
  locale,
  featured = false,
}: PortfolioCardProps) {
  const cardHeight = featured ? "h-96" : "h-72";
  const categoryLabel = getCategoryLabel(category, locale);

  return (
    <Link
      href={`/${locale}/portfolio/${slug}`}
      className={`group relative ${cardHeight} rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 block`}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,40,20,0.88) 0%, transparent 60%)",
        }}
      />

      {/* Category badge */}
      <div className="absolute top-4 left-4">
        <span
          className="px-3 py-1 rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: "rgb(var(--primary))" }}
        >
          {categoryLabel}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-end justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-base leading-snug mb-1 line-clamp-2">
              {title}
            </h3>
            {(location || year) && (
              <p className="text-white/60 text-sm">
                {[location, year].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
          <div
            className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-white/30"
          >
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
}
