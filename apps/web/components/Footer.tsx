import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { MapPin, Phone, Mail, Clock, Linkedin, Facebook, Instagram, Twitter } from "lucide-react";

interface FooterProps {
  locale: string;
}

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations("footer");
  const ts = await getTranslations("services");

  const services = [
    { key: "agriculture", slug: "produtos-agricolas" },
    { key: "catering", slug: "restauracao" },
    { key: "publicWorks", slug: "obras-publicas" },
    { key: "trade", slug: "comercio-geral" },
    { key: "maintenance", slug: "manutencao" },
    { key: "logistics", slug: "logistica" },
  ];

  return (
    <footer style={{ backgroundColor: "#212829" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: "rgb(var(--primary))" }}
              >
                F
              </div>
              <span className="text-xl font-bold tracking-tight">FICHE</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              {t("tagline")}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
                aria-label="Twitter/X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
              {t("servicesTitle")}
            </h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.key}>
                  <Link
                    href={`/${locale}/services#${s.slug}`}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {ts(`${s.key}.title` as Parameters<typeof ts>[0])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
              {t("companyTitle")}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  {t("aboutLink")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/services`}
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  {t("servicesTitle")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  {t("careersLink")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  {t("partnersLink")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
              {t("contactTitle")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-300">
                  Rua Marechal Brós Tito,
                  <br />
                  Luanda, Angola
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <a
                  href="tel:+244923000000"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  +244 923 000 000
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <a
                  href="mailto:geral@fiche.ao"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  geral@fiche.ao
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-300">
                  Seg–Sex: 08:00–17:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">{t("copyright")}</p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">
                🇦🇴 {t("address")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
