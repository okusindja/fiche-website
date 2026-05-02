import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PortfolioGrid, type PortfolioProject } from "@/components/PortfolioGrid";
import { createClient } from "@/lib/supabase/server";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  return {
    title: `${t("title")} — FICHE Angola`,
    description: t("subtitle"),
  };
}

const DEFAULT_PROJECTS: PortfolioProject[] = [
  {
    id: "1",
    slug: "projecto-agricola-malanje",
    category: "agriculture",
    title_pt: "Projecto Agrícola de Malanje",
    title_en: "Malanje Agricultural Project",
    title_fr: "Projet Agricole de Malanje",
    title_zh: "马兰热农业项目",
    description_pt: "Fornecimento de equipamentos e insumos agrícolas para cooperativa em Malanje.",
    description_en: "Supply of agricultural equipment and inputs for a cooperative in Malanje.",
    description_fr: "Fourniture d'équipements et d'intrants agricoles pour une coopérative à Malanje.",
    description_zh: "为马兰热合作社提供农业设备和投入品。",
    cover_image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80&auto=format&fit=crop",
    images: [],
    client_name: "Cooperativa Agrícola de Malanje",
    location: "Malanje, Angola",
    year: 2023,
    duration: "8 meses",
    featured: true,
    sort_order: 1,
  },
  {
    id: "2",
    slug: "horticultural-benguela",
    category: "agriculture",
    title_pt: "Centro Hortícola de Benguela",
    title_en: "Benguela Horticultural Center",
    title_fr: "Centre Horticole de Benguela",
    title_zh: "本格拉园艺中心",
    description_pt: "Criação e equipamento de um centro hortícola moderno para produção de hortícolas.",
    description_en: "Creation and equipment of a modern horticultural center for vegetable production.",
    description_fr: "Création et équipement d'un centre horticole moderne.",
    description_zh: "建立并装备现代化蔬菜生产园艺中心。",
    cover_image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80&auto=format&fit=crop",
    images: [],
    client_name: "Governo Provincial de Benguela",
    location: "Benguela, Angola",
    year: 2022,
    duration: "12 meses",
    featured: false,
    sort_order: 2,
  },
  {
    id: "3",
    slug: "reabilitacao-estrada-huambo",
    category: "public_works",
    title_pt: "Reabilitação de Estrada — Huambo",
    title_en: "Road Rehabilitation — Huambo",
    title_fr: "Réhabilitation Routière — Huambo",
    title_zh: "万博道路修缮项目",
    description_pt: "Reabilitação de 45 km de estrada principal na província do Huambo.",
    description_en: "Rehabilitation of 45 km of main road in Huambo province.",
    description_fr: "Réhabilitation de 45 km de route principale dans la province de Huambo.",
    description_zh: "修缮万博省45公里主干道。",
    cover_image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop",
    images: [],
    client_name: "Ministério das Obras Públicas",
    location: "Huambo, Angola",
    year: 2023,
    duration: "18 meses",
    featured: true,
    sort_order: 3,
  },
  {
    id: "4",
    slug: "edificio-corporativo-luanda",
    category: "public_works",
    title_pt: "Edifício Corporativo — Luanda",
    title_en: "Corporate Building — Luanda",
    title_fr: "Bâtiment Corporatif — Luanda",
    title_zh: "罗安达企业大楼",
    description_pt: "Construção de edifício corporativo de 8 andares em Luanda.",
    description_en: "Construction of an 8-storey corporate building in Luanda.",
    description_fr: "Construction d'un immeuble de bureaux de 8 étages à Luanda.",
    description_zh: "在罗安达建造8层企业办公楼。",
    cover_image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop",
    images: [],
    client_name: "Grupo Empresarial",
    location: "Luanda, Angola",
    year: 2022,
    duration: "24 meses",
    featured: false,
    sort_order: 4,
  },
  {
    id: "5",
    slug: "catering-conferencia-ua",
    category: "catering",
    title_pt: "Catering — Cimeira da União Africana",
    title_en: "Catering — African Union Summit",
    title_fr: "Restauration — Sommet de l'Union Africaine",
    title_zh: "非洲联盟峰会餐饮服务",
    description_pt: "Prestação de serviços de catering para delegados da Cimeira da União Africana.",
    description_en: "Catering services for delegates of the African Union Summit.",
    description_fr: "Services de restauration pour les délégués du Sommet de l'Union Africaine.",
    description_zh: "为非洲联盟峰会代表团提供餐饮服务。",
    cover_image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80&auto=format&fit=crop",
    images: [],
    client_name: "Presidência da República",
    location: "Luanda, Angola",
    year: 2023,
    duration: "3 dias",
    featured: true,
    sort_order: 5,
  },
  {
    id: "6",
    slug: "restaurante-corporativo-chevron",
    category: "catering",
    title_pt: "Restaurante Corporativo — Chevron Angola",
    title_en: "Corporate Restaurant — Chevron Angola",
    title_fr: "Restaurant Corporatif — Chevron Angola",
    title_zh: "雪佛龙安哥拉企业餐厅",
    description_pt: "Gestão e operação de restaurante corporativo para 500 colaboradores diários.",
    description_en: "Management and operation of corporate restaurant for 500 daily employees.",
    description_fr: "Gestion et exploitation d'un restaurant d'entreprise.",
    description_zh: "管理和运营每日500名员工的企业餐厅。",
    cover_image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&auto=format&fit=crop",
    images: [],
    client_name: "Chevron Angola",
    location: "Luanda, Angola",
    year: 2021,
    duration: "Contrato anual",
    featured: false,
    sort_order: 6,
  },
  {
    id: "7",
    slug: "distribuicao-norte-angola",
    category: "logistics",
    title_pt: "Distribuição Norte de Angola",
    title_en: "Northern Angola Distribution",
    title_fr: "Distribution Nord de l'Angola",
    title_zh: "安哥拉北部配送项目",
    description_pt: "Criação de rede de distribuição logística nas províncias do norte de Angola.",
    description_en: "Creation of logistics distribution network in northern Angola provinces.",
    description_fr: "Création d'un réseau de distribution logistique dans le nord de l'Angola.",
    description_zh: "在安哥拉北部省份建立物流配送网络。",
    cover_image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80&auto=format&fit=crop",
    images: [],
    client_name: "Unilever Angola",
    location: "Norte de Angola",
    year: 2022,
    duration: "6 meses",
    featured: false,
    sort_order: 7,
  },
  {
    id: "8",
    slug: "centro-comercial-viana",
    category: "trade",
    title_pt: "Centro Comercial de Viana",
    title_en: "Viana Trade Center",
    title_fr: "Centre Commercial de Viana",
    title_zh: "维亚纳贸易中心",
    description_pt: "Abastecimento e gestão de stocks para centro comercial em Viana, Luanda.",
    description_en: "Supply and stock management for a trade center in Viana, Luanda.",
    description_fr: "Approvisionnement et gestion des stocks pour un centre commercial à Viana.",
    description_zh: "为罗安达维亚纳贸易中心提供供货和库存管理。",
    cover_image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=1200&q=80&auto=format&fit=crop",
    images: [],
    client_name: "Grupo Retail Viana",
    location: "Viana, Luanda",
    year: 2023,
    duration: "Contrato bianual",
    featured: false,
    sort_order: 8,
  },
];

export default async function PortfolioPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });

  let projects: PortfolioProject[] = DEFAULT_PROJECTS;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("portfolio_projects")
      .select("*")
      .eq("active", true)
      .order("sort_order");
    if (data && data.length > 0) projects = data;
  } catch {
    // Use defaults
  }

  const filterLabels: Record<string, string> = {
    all: t("filterAll"),
    agriculture: t("filterAgriculture"),
    catering: t("filterCatering"),
    public_works: t("filterPublicWorks"),
    logistics: t("filterLogistics"),
    trade: t("filterTrade"),
    maintenance: t("filterMaintenance"),
    noProjects: t("noProjects"),
  };

  return (
    <>
      <Navbar locale={locale} />
      <main>
        {/* Hero Section */}
        <section
          className="min-h-[40vh] flex items-center justify-center"
          style={{ backgroundColor: "rgb(var(--primary))" }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-20">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6 bg-white/20">
              FICHE Angola
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {t("title")}
            </h1>
            <p className="text-lg opacity-80 max-w-xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* Portfolio Grid Section */}
        <section className="py-16 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PortfolioGrid
              projects={projects}
              locale={locale}
              filterLabels={filterLabels}
            />
          </div>
        </section>

        {/* CTA Strip */}
        <section
          className="py-16"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#212829] dark:text-white mb-3">
              {t("ctaTitle")}
            </h2>
            <p className="text-[#868e96] mb-8">
              {t("ctaSubtitle")}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-white font-semibold transition-all"
              style={{ backgroundColor: "rgb(var(--primary))" }}
            >
              {t("ctaButton")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
