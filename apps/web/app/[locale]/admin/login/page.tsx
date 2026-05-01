import { getTranslations } from "next-intl/server";
import { LoginForm } from "./LoginForm";
import { CheckCircle } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ redirectTo?: string }>;
}

export default async function LoginPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { redirectTo } = await searchParams;
  const t = await getTranslations("admin.login");

  const features = [
    t("feature1"),
    t("feature2"),
    t("feature3"),
    t("feature4"),
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-12 text-white"
        style={{ backgroundColor: "rgb(var(--primary-dark))" }}
      >
        <div>
          <div className="flex items-center gap-2 mb-16">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-lg">
              F
            </div>
            <span className="text-2xl font-bold">FICHE</span>
          </div>

          <h2 className="text-3xl font-bold mb-4">{t("title")}</h2>
          <p className="text-lg opacity-80 mb-10">{t("subtitle")}</p>

          <ul className="space-y-4">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 opacity-80 flex-shrink-0" />
                <span className="text-sm opacity-80">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm opacity-60">
          🇦🇴 FICHE — Angola
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-slate-950">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: "rgb(var(--primary))" }}
            >
              F
            </div>
            <span className="text-xl font-bold text-[#212829] dark:text-white">
              FICHE
            </span>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-[#e9ecef] dark:border-slate-700 p-8 shadow-lg">
            <h1 className="text-2xl font-bold text-[#212829] dark:text-white mb-1">
              {t("title")}
            </h1>
            <p className="text-sm text-[#868e96] mb-8">{t("subtitle")}</p>
            <LoginForm locale={locale} redirectTo={redirectTo} />
          </div>
        </div>
      </div>
    </div>
  );
}
