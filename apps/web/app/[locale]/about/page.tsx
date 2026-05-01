import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle, Target, Eye, Heart, Users, Globe2, Award } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("about");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("cta");

  const teamMembers = [
    {
      name: t("member1Name"),
      role: t("member1Role"),
      emoji: "👔",
      bg: "#f0faf4",
    },
    {
      name: t("member2Name"),
      role: t("member2Role"),
      emoji: "👩‍💼",
      bg: "#f0f9ff",
    },
    {
      name: t("member3Name"),
      role: t("member3Role"),
      emoji: "💼",
      bg: "#fff9f0",
    },
    {
      name: t("member4Name"),
      role: t("member4Role"),
      emoji: "📊",
      bg: "#f9f0ff",
    },
  ];

  return (
    <>
      <Navbar locale={locale} />
      <main>
        {/* Header */}
        <section
          className="py-16 text-white"
          style={{ backgroundColor: "rgb(var(--primary))" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm opacity-75 mb-4">
              <Link href={`/${locale}`} className="hover:opacity-100">
                {tn("home")}
              </Link>
              <span>/</span>
              <span>{tn("about")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {t("title")}
            </h1>
            <p className="text-lg opacity-80 max-w-xl">{t("subtitle")}</p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div
                className="rounded-2xl h-80 flex items-center justify-center"
                style={{ backgroundColor: "rgb(var(--primary-light))" }}
              >
                <div className="text-center">
                  <div className="text-7xl mb-4">🏢</div>
                  <div
                    className="text-xl font-bold"
                    style={{ color: "rgb(var(--primary))" }}
                  >
                    FICHE
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Est. 2009</div>
                </div>
              </div>
              <div>
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  style={{
                    backgroundColor: "rgb(var(--primary-light))",
                    color: "rgb(var(--primary))",
                  }}
                >
                  🇦🇴 Angola
                </div>
                <h2 className="text-3xl font-bold text-[#212829] dark:text-white mb-4">
                  A Nossa História
                </h2>
                <p className="text-[#868e96] leading-relaxed mb-6">
                  {t("story")}
                </p>
                <ul className="space-y-3">
                  {[
                    t("feature1"),
                    t("feature2"),
                    t("feature3"),
                    t("feature4"),
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 mt-0.5 flex-shrink-0"
                        style={{ color: "rgb(var(--primary))" }}
                      />
                      <span className="text-sm text-[#495057] dark:text-slate-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section
          className="py-20"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: "rgb(var(--primary-light))" }}
                >
                  <Target
                    className="w-6 h-6"
                    style={{ color: "rgb(var(--primary))" }}
                  />
                </div>
                <h3 className="text-xl font-bold text-[#212829] dark:text-white mb-3">
                  Missão
                </h3>
                <p className="text-[#868e96] leading-relaxed">{t("mission")}</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: "rgb(var(--primary-light))" }}
                >
                  <Eye
                    className="w-6 h-6"
                    style={{ color: "rgb(var(--primary))" }}
                  />
                </div>
                <h3 className="text-xl font-bold text-[#212829] dark:text-white mb-3">
                  Visão
                </h3>
                <p className="text-[#868e96] leading-relaxed">{t("vision")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#212829] dark:text-white mb-4">
                {t("valuesTitle")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: t("value1Title"),
                  desc: t("value1Desc"),
                  icon: Heart,
                  bg: "#f0faf4",
                },
                {
                  title: t("value2Title"),
                  desc: t("value2Desc"),
                  icon: Award,
                  bg: "#f0f9ff",
                },
                {
                  title: t("value3Title"),
                  desc: t("value3Desc"),
                  icon: Globe2,
                  bg: "#f9f0ff",
                },
              ].map((value, i) => (
                <div
                  key={i}
                  className="text-center p-8 rounded-2xl border border-[#e9ecef] dark:border-slate-700 hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: value.bg }}
                  >
                    <value.icon
                      className="w-7 h-7"
                      style={{ color: "rgb(var(--primary))" }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-[#212829] dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[#868e96]">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section
          className="py-20"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#212829] mb-4">
                {t("teamTitle")}
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl"
                    style={{ backgroundColor: member.bg }}
                  >
                    {member.emoji}
                  </div>
                  <div className="font-semibold text-[#212829] text-sm">
                    {member.name}
                  </div>
                  <div className="text-xs text-[#868e96] mt-1">
                    {member.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section
          className="py-16 text-white"
          style={{ backgroundColor: "rgb(var(--primary))" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { value: "2009", label: "Ano de Fundação" },
                { value: "18", label: "Províncias Cobertas" },
                { value: "150+", label: "Colaboradores" },
                { value: "6", label: "Divisões de Negócio" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-16"
          style={{ backgroundColor: "rgb(var(--primary-dark))" }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">{tc("title")}</h2>
            <p className="text-lg opacity-80 mb-8">{tc("subtitle")}</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-white font-semibold text-sm"
              style={{ color: "rgb(var(--primary-dark))" }}
            >
              {tc("primary")}
            </Link>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
