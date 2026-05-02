import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { HeroCarousel } from "@/components/HeroCarousel";
import { PortfolioCard } from "@/components/PortfolioCard";
import { ArrowRight, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return {
    title: t("defaultTitle"),
    description: t("defaultDescription"),
    keywords: t("keywords"),
  };
}

const DEFAULT_SERVICES = [
  {
    slug: "produtos-agricolas",
    icon: "🌾",
    icon_bg: "#f0faf4",
    title_pt: "Produtos Agrícolas",
    title_en: "Agricultural Products",
    title_fr: "Produits Agricoles",
    title_zh: "农业产品",
    description_pt:
      "Sementes, fertilizantes, equipamentos e insumos para o campo angolano. Parceria com fornecedores certificados.",
    description_en:
      "Seeds, fertilizers, equipment and inputs for Angolan farms. Partnership with certified suppliers.",
    description_fr:
      "Semences, engrais, équipements et intrants pour les exploitations agricoles angolaises.",
    description_zh: "为安哥拉农场提供种子、化肥、设备和农业投入品。",
  },
  {
    slug: "restauracao",
    icon: "🍽️",
    icon_bg: "#f0f9ff",
    title_pt: "Restauração",
    title_en: "Catering",
    title_fr: "Restauration",
    title_zh: "餐饮服务",
    description_pt:
      "Serviços de catering e restauração para eventos corporativos, casamentos e funcionamento diário.",
    description_en:
      "Catering and restaurant services for corporate events, weddings and daily operations.",
    description_fr:
      "Services de restauration et traiteur pour événements d'entreprise et mariages.",
    description_zh: "为企业活动、婚礼和日常运营提供餐饮和餐厅服务。",
  },
  {
    slug: "obras-publicas",
    icon: "🏗️",
    icon_bg: "#fff9f0",
    title_pt: "Obras Públicas",
    title_en: "Public Works",
    title_fr: "Travaux Publics",
    title_zh: "公共工程",
    description_pt:
      "Construção civil, reabilitação de infraestruturas e prestação de serviços de engenharia.",
    description_en:
      "Civil construction, infrastructure rehabilitation and engineering services.",
    description_fr:
      "Construction civile, réhabilitation d'infrastructures et services d'ingénierie.",
    description_zh: "全国范围内的民用建筑、基础设施修缮和工程服务。",
  },
  {
    slug: "comercio-geral",
    icon: "🛒",
    icon_bg: "#f9f0ff",
    title_pt: "Comércio Geral",
    title_en: "General Trade",
    title_fr: "Commerce Général",
    title_zh: "综合贸易",
    description_pt:
      "Distribuição e venda de produtos de consumo geral — parceiros fiáveis para retalhistas e grossistas.",
    description_en:
      "Distribution and sale of general consumer products — reliable partners for retailers.",
    description_fr:
      "Distribution et vente de produits de consommation générale.",
    description_zh: "一般消费品的分销和销售——零售商和批发商的可靠合作伙伴。",
  },
  {
    slug: "manutencao",
    icon: "🔧",
    icon_bg: "#fff0f0",
    title_pt: "Manutenção",
    title_en: "Maintenance",
    title_fr: "Maintenance",
    title_zh: "维护服务",
    description_pt:
      "Serviços de manutenção industrial, predial e de equipamentos para garantir a continuidade do negócio.",
    description_en:
      "Industrial, building and equipment maintenance services to ensure business continuity.",
    description_fr:
      "Services de maintenance industrielle, immobilière et d'équipements.",
    description_zh: "工业、建筑和设备维护服务，确保业务连续性。",
  },
  {
    slug: "logistica",
    icon: "📦",
    icon_bg: "#f0f2ff",
    title_pt: "Logística",
    title_en: "Logistics",
    title_fr: "Logistique",
    title_zh: "物流服务",
    description_pt:
      "Transporte e distribuição eficiente de mercadorias em Angola com frota própria e rede de parceiros.",
    description_en:
      "Efficient transport and distribution of goods in Angola with own fleet and partner network.",
    description_fr:
      "Transport et distribution efficaces de marchandises en Angola.",
    description_zh: "拥有自有车队和合作伙伴网络，在安哥拉高效运输和分发货物。",
  },
];

const DEFAULT_TESTIMONIALS = [
  {
    id: "1",
    author_name: "Maria Graça",
    author_role: "Gerente Agrícola, Huambo",
    content_pt:
      "A FICHE transformou a nossa produção agrícola. Equipamentos de qualidade e suporte técnico excepcional.",
    content_en:
      "FICHE transformed our agricultural production. Quality equipment and exceptional technical support.",
    content_fr:
      "La FICHE a transformé notre production agricole. Équipements de qualité et support technique exceptionnel.",
    content_zh: "FICHE改变了我们的农业生产。高质量的设备和出色的技术支持。",
  },
  {
    id: "2",
    author_name: "Carlos Mendes",
    author_role: "Empresário, Luanda",
    content_pt:
      "Para obras civis, a FICHE é o parceiro certo. Cumprem prazos e entregam qualidade acima do esperado.",
    content_en:
      "For civil works, FICHE is the right partner. They meet deadlines and deliver quality above expectations.",
    content_fr:
      "Pour les travaux civils, FICHE est le bon partenaire. Ils respectent les délais.",
    content_zh:
      "对于土木工程，FICHE是正确的合作伙伴。他们按时完成并提供超出预期的质量。",
  },
  {
    id: "3",
    author_name: "Ana Ferreira",
    author_role: "Chef, Restaurante Benguela",
    content_pt:
      "O serviço de catering da FICHE salvou o nosso evento. Profissionalismo e sabor autêntico angolano.",
    content_en:
      "FICHE's catering service saved our event. Professionalism and authentic Angolan flavor.",
    content_fr:
      "Le service traiteur de FICHE a sauvé notre événement. Professionnalisme et saveur angolaise.",
    content_zh: "FICHE的餐饮服务挽救了我们的活动。专业精神和正宗的安哥拉风味。",
  },
];

const DEFAULT_FEATURED_PROJECTS = [
  {
    id: "f1",
    slug: "projecto-agricola-malanje",
    category: "agriculture",
    title_pt: "Projecto Agrícola de Malanje",
    title_en: "Malanje Agricultural Project",
    title_fr: "Projet Agricole de Malanje",
    title_zh: "马兰热农业项目",
    cover_image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80&auto=format&fit=crop",
    location: "Malanje, Angola",
    year: 2023,
    featured: true,
  },
  {
    id: "f2",
    slug: "reabilitacao-estrada-huambo",
    category: "public_works",
    title_pt: "Reabilitação de Estrada — Huambo",
    title_en: "Road Rehabilitation — Huambo",
    title_fr: "Réhabilitation Routière — Huambo",
    title_zh: "万博道路修缮项目",
    cover_image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop",
    location: "Huambo, Angola",
    year: 2023,
    featured: true,
  },
  {
    id: "f3",
    slug: "catering-conferencia-ua",
    category: "catering",
    title_pt: "Catering — Cimeira da União Africana",
    title_en: "Catering — African Union Summit",
    title_fr: "Restauration — Sommet de l'Union Africaine",
    title_zh: "非洲联盟峰会餐饮服务",
    cover_image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80&auto=format&fit=crop",
    location: "Luanda, Angola",
    year: 2023,
    featured: true,
  },
];

type FeaturedProject = (typeof DEFAULT_FEATURED_PROJECTS)[0];

function getFeaturedTitle(p: FeaturedProject, locale: string): string {
  const map: Record<string, string> = {
    pt: p.title_pt,
    en: p.title_en,
    fr: p.title_fr,
    zh: p.title_zh,
  };
  return map[locale] || p.title_pt;
}

type ServiceRecord = (typeof DEFAULT_SERVICES)[0];
type TestimonialRecord = (typeof DEFAULT_TESTIMONIALS)[0];

function getServiceTitle(s: ServiceRecord, locale: string): string {
  const map: Record<string, string> = {
    pt: s.title_pt,
    en: s.title_en,
    fr: s.title_fr,
    zh: s.title_zh,
  };
  return map[locale] || s.title_pt;
}

function getServiceDesc(s: ServiceRecord, locale: string): string {
  const map: Record<string, string> = {
    pt: s.description_pt,
    en: s.description_en,
    fr: s.description_fr,
    zh: s.description_zh,
  };
  return map[locale] || s.description_pt;
}

function getTestimonialContent(t: TestimonialRecord, locale: string): string {
  const map: Record<string, string> = {
    pt: t.content_pt,
    en: t.content_en,
    fr: t.content_fr,
    zh: t.content_zh,
  };
  return map[locale] || t.content_pt;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("hero");
  const ts = await getTranslations("services");
  const tt = await getTranslations("testimonials");
  const tc = await getTranslations("cta");
  const tstats = await getTranslations("stats");
  const tab = await getTranslations("about");
  const tp = await getTranslations("portfolio");

  // Try to fetch from Supabase, fall back to defaults
  let services: ServiceRecord[] = DEFAULT_SERVICES;
  let testimonials: TestimonialRecord[] = DEFAULT_TESTIMONIALS;
  let featuredProjects: FeaturedProject[] = DEFAULT_FEATURED_PROJECTS;

  try {
    const supabase = await createClient();
    const [svRes, tmRes, fpRes] = await Promise.all([
      supabase
        .from("services")
        .select("*")
        .eq("active", true)
        .order("sort_order"),
      supabase
        .from("testimonials")
        .select("*")
        .eq("active", true)
        .order("sort_order"),
      supabase
        .from("portfolio_projects")
        .select("id,slug,category,title_pt,title_en,title_fr,title_zh,cover_image,location,year,featured")
        .eq("active", true)
        .eq("featured", true)
        .order("sort_order")
        .limit(3),
    ]);
    if (svRes.data && svRes.data.length > 0) services = svRes.data;
    if (tmRes.data && tmRes.data.length > 0) testimonials = tmRes.data;
    if (fpRes.data && fpRes.data.length > 0) featuredProjects = fpRes.data;
  } catch {
    // Use defaults
  }

  // Hero carousel slides
  const heroSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80&auto=format&fit=crop",
      badge: t("eyebrow"),
      title: t("title1"),
      subtitle: t("title2"),
      description: t("description"),
      cta: t("primaryCta"),
      ctaLink: "/services",
      ctaSecondary: t("secondaryCta"),
      ctaSecondaryLink: "/about",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80&auto=format&fit=crop",
      badge: "🏗️ Obras Públicas & Construção",
      title: "Infraestrutura de",
      subtitle: "Qualidade Superior",
      description: "Construção civil, reabilitação de estradas e infraestruturas urbanas com engenheiros qualificados e equipamentos modernos.",
      cta: t("primaryCta"),
      ctaLink: "/services",
      ctaSecondary: t("secondaryCta"),
      ctaSecondaryLink: "/about",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1600&q=80&auto=format&fit=crop",
      badge: "🍽️ Restauração & Catering",
      title: "Gastronomia Autêntica",
      subtitle: "Com Sabor Angolano",
      description: "Serviços de catering para eventos corporativos, casamentos e celebrações com ingredientes frescos e chefs experientes.",
      cta: t("primaryCta"),
      ctaLink: "/services",
      ctaSecondary: t("secondaryCta"),
      ctaSecondaryLink: "/about",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80&auto=format&fit=crop",
      badge: "📦 Logística & Distribuição",
      title: "Distribuição Eficiente",
      subtitle: "Por Todo o País",
      description: "Transporte e distribuição de mercadorias com frota própria e rede de parceiros em todas as províncias de Angola.",
      cta: t("primaryCta"),
      ctaLink: "/services",
      ctaSecondary: t("secondaryCta"),
      ctaSecondaryLink: "/about",
    },
  ];

  return (
    <>
      <Navbar locale={locale} />
      <main>
        {/* ── Hero Carousel ── */}
        <HeroCarousel slides={heroSlides} locale={locale} />

        {/* ── Services Section ── */}
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#212829] dark:text-white mb-4">
                {ts("title")}
              </h2>
              <p className="text-[#868e96] max-w-xl mx-auto">{ts("subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard
                  key={service.slug}
                  icon={service.icon}
                  title={getServiceTitle(service, locale)}
                  description={getServiceDesc(service, locale)}
                  iconBg={service.icon_bg}
                  slug={service.slug}
                  locale={locale}
                  learnMoreLabel={ts("learnMore")}
                />
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-all"
                style={{ backgroundColor: "rgb(var(--primary))" }}
              >
                {ts("viewAll")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <section
          className="py-14"
          style={{ backgroundColor: "rgb(var(--primary))" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
              {[
                { value: "15+", label: tstats("years") },
                { value: "250+", label: tstats("clients") },
                { value: "6", label: tstats("areas") },
                { value: "1000+", label: tstats("projects") },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm font-medium opacity-80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Projects Section ── */}
        <section
          className="py-20"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#212829] dark:text-white mb-4">
                {tp("featuredTitle")}
              </h2>
              <p className="text-[#868e96] max-w-xl mx-auto">{tp("featuredSubtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <PortfolioCard
                  key={project.id}
                  title={getFeaturedTitle(project, locale)}
                  category={project.category}
                  coverImage={project.cover_image}
                  location={project.location}
                  year={project.year}
                  slug={project.slug}
                  locale={locale}
                  featured={false}
                />
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href={`/${locale}/portfolio`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-all"
                style={{ backgroundColor: "rgb(var(--primary))" }}
              >
                {tp("viewAll")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── About Section ── */}
        <section
          className="py-20 bg-white dark:bg-slate-950"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left — real photo */}
              <div className="hidden lg:block">
                <div className="w-full h-96 rounded-2xl overflow-hidden shadow-xl relative">
                  <Image
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80&auto=format&fit=crop"
                    alt="Equipa FICHE Angola"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(var(--primary),0.25) 0%, transparent 60%)",
                    }}
                  />
                </div>
              </div>

              {/* Right content */}
              <div>
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  style={{
                    backgroundColor: "rgb(var(--primary-light))",
                    color: "rgb(var(--primary))",
                  }}
                >
                  {tab("title")}
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#212829] mb-4">
                  {tab("subtitle")}
                </h2>
                <p className="text-[#868e96] leading-relaxed mb-6">
                  {tab("story")}
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    tab("feature1"),
                    tab("feature2"),
                    tab("feature3"),
                    tab("feature4"),
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 mt-0.5 flex-shrink-0"
                        style={{ color: "rgb(var(--primary))" }}
                      />
                      <span className="text-sm text-[#495057]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/about`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold text-sm transition-all"
                  style={{ backgroundColor: "rgb(var(--primary))" }}
                >
                  {tab("cta")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#212829] dark:text-white mb-4">
                {tt("title")}
              </h2>
              <p className="text-[#868e96]">{tt("subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  authorName={testimonial.author_name}
                  authorRole={testimonial.author_role}
                  content={getTestimonialContent(testimonial, locale)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section
          className="py-20"
          style={{ backgroundColor: "rgb(var(--primary-dark))" }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {tc("title")}
            </h2>
            <p className="text-lg opacity-80 mb-10 max-w-xl mx-auto">
              {tc("subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-white font-semibold text-sm transition-all hover:bg-gray-100"
                style={{ color: "rgb(var(--primary-dark))" }}
              >
                {tc("primary")}
              </Link>
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm border-2 border-white text-white transition-all hover:bg-white/10"
              >
                {tc("secondary")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
