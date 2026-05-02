import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ThemeInjector } from "@/components/ThemeInjector"
import type { Metadata } from "next"

const locales = ["pt", "en", "fr", "zh"]
const BASE_URL = "https://fiche-website-tau.vercel.app"

const localeHtmlLang: Record<string, string> = {
  pt: "pt-AO",
  en: "en",
  fr: "fr",
  zh: "zh-Hans",
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "seo" })

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t("defaultTitle"),
      template: `%s | FICHE Angola`,
    },
    description: t("defaultDescription"),
    keywords: t("keywords"),
    authors: [{ name: "FICHE — Comércio e Prestação de Serviços" }],
    creator: "FICHE Angola",
    publisher: "FICHE Angola",
    applicationName: "FICHE",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: localeHtmlLang[locale] ?? locale,
      url: `${BASE_URL}/${locale}`,
      siteName: "FICHE Angola",
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      images: [
        {
          url: `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "FICHE — Soluções Completas para o Seu Negócio em Angola",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      images: [`${BASE_URL}/og-image.jpg`],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        "pt-AO":    `${BASE_URL}/pt`,
        "en":       `${BASE_URL}/en`,
        "fr":       `${BASE_URL}/fr`,
        "zh-Hans":  `${BASE_URL}/zh`,
        "x-default":`${BASE_URL}/pt`,
      },
    },
    category: "business",
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale)) {
    notFound()
  }

  const messages = await getMessages()

  /* ── JSON-LD Organisation schema ── */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "FICHE — Comércio e Prestação de Serviços",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo-full.svg`,
      width: 792,
      height: 222,
    },
    description:
      "Empresa angolana multissectorial com mais de 15 anos de experiência em produtos agrícolas, restauração, obras públicas, comércio geral, manutenção e logística.",
    foundingDate: "2009",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua da Missão, 45",
      addressLocality: "Luanda",
      addressCountry: "AO",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+244-923-456-789",
      email: "geral@fiche.co.ao",
      contactType: "customer service",
      availableLanguage: ["Portuguese", "English", "French", "Chinese"],
    },
    sameAs: [
      "https://facebook.com/ficheangola",
      "https://linkedin.com/company/ficheangola",
      "https://instagram.com/ficheangola",
    ],
    areaServed: { "@type": "Country", name: "Angola" },
  }

  return (
    <html lang={localeHtmlLang[locale] ?? locale} suppressHydrationWarning>
      <head>
        <ThemeInjector />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* hreflang */}
        <link rel="alternate" hrefLang="pt-AO"    href={`${BASE_URL}/pt`} />
        <link rel="alternate" hrefLang="en"        href={`${BASE_URL}/en`} />
        <link rel="alternate" hrefLang="fr"        href={`${BASE_URL}/fr`} />
        <link rel="alternate" hrefLang="zh-Hans"   href={`${BASE_URL}/zh`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/pt`} />
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
