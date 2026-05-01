import { Star } from "lucide-react";

interface TestimonialCardProps {
  authorName: string;
  authorRole: string;
  content: string;
}

export function TestimonialCard({
  authorName,
  authorRole,
  content,
}: TestimonialCardProps) {
  const initials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-[#e9ecef] dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm text-[#495057] dark:text-slate-300 leading-relaxed mb-6 italic">
        {content}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
          style={{
            backgroundColor: "#d4eddb",
            color: "rgb(var(--primary))",
          }}
        >
          {initials}
        </div>
        <div>
          <div className="text-sm font-semibold text-[#212829] dark:text-white">
            {authorName}
          </div>
          <div className="text-xs text-[#868e96] dark:text-slate-400">
            {authorRole}
          </div>
        </div>
      </div>
    </div>
  );
}
