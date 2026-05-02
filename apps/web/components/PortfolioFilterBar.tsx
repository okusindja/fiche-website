"use client";

interface PortfolioFilterBarProps {
  active: string;
  onChange: (cat: string) => void;
  locale: string;
  labels: Record<string, string>;
}

export function PortfolioFilterBar({
  active,
  onChange,
  labels,
}: PortfolioFilterBarProps) {
  const categories = [
    "all",
    "agriculture",
    "catering",
    "public_works",
    "logistics",
    "trade",
    "maintenance",
  ];

  return (
    <div className="relative overflow-x-auto pb-1">
      <div className="flex items-center gap-2 min-w-max">
        {categories.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => onChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                isActive
                  ? "text-white border-transparent shadow-sm"
                  : "bg-white text-[#868e96] border-[#e9ecef] hover:border-gray-300 hover:text-[#212829] dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 dark:hover:text-white"
              }`}
              style={
                isActive
                  ? { backgroundColor: "rgb(var(--primary))", borderColor: "rgb(var(--primary))" }
                  : undefined
              }
            >
              {labels[cat] ?? cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
