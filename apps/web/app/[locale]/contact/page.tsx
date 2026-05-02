import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Linkedin, Facebook, Instagram } from "lucide-react";
import { ContactForm } from "./ContactForm";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const ts = await getTranslations({ locale, namespace: "seo" });
  return {
    title: t("title"),
    description: t("subtitle"),
    keywords: ts("keywords"),
    openGraph: {
      title: `${t("title")} | FICHE Angola`,
      description: t("subtitle"),
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("contact");
  const tn = await getTranslations("nav");

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
              <span>{tn("contact")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {t("title")}
            </h1>
            <p className="text-lg opacity-80 max-w-xl">{t("subtitle")}</p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* Form */}
              <div className="lg:col-span-3">
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-[#e9ecef] dark:border-slate-700 p-8 shadow-sm">
                  <h2 className="text-xl font-bold text-[#212829] dark:text-white mb-6">
                    {t("formTitle")}
                  </h2>
                  <ContactForm locale={locale} />
                </div>
              </div>

              {/* Info Panel */}
              <div className="lg:col-span-2">
                <div
                  className="rounded-2xl p-8 text-white h-full"
                  style={{ backgroundColor: "rgb(var(--primary))" }}
                >
                  <h3 className="text-xl font-bold mb-6">{t("infoTitle")}</h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm mb-1">
                          Endereço
                        </div>
                        <div className="text-sm opacity-80">
                          {t("address")}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm mb-1">
                          Telefone
                        </div>
                        <a
                          href="tel:+244923000000"
                          className="text-sm opacity-80 hover:opacity-100"
                        >
                          {t("phoneNumber")}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm mb-1">Email</div>
                        <a
                          href="mailto:geral@fiche.ao"
                          className="text-sm opacity-80 hover:opacity-100"
                        >
                          {t("emailAddress")}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm mb-1">
                          Horário
                        </div>
                        <div className="text-sm opacity-80">{t("hours")}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/20">
                    <div className="font-semibold text-sm mb-4">
                      {t("followUs")}
                    </div>
                    <div className="flex gap-3">
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
