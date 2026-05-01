import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  iconBg?: string;
  slug: string;
  locale: string;
  learnMoreLabel: string;
}

export function ServiceCard({
  icon,
  title,
  description,
  iconBg = "#f0faf4",
  slug,
  locale,
  learnMoreLabel,
}: ServiceCardProps) {
  return (
    <div className="group bg-white dark:bg-slate-800 rounded-xl border border-[#e9ecef] dark:border-slate-700 p-6 hover:shadow-lg hover:border-transparent transition-all duration-300 hover:-translate-y-1">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </div>
      <h3 className="text-base font-semibold text-[#212829] dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-[#868e96] dark:text-slate-400 leading-relaxed mb-4">
        {description}
      </p>
      <Link
        href={`/${locale}/services#${slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:gap-2.5"
        style={{ color: "rgb(var(--primary))" }}
      >
        {learnMoreLabel}
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
