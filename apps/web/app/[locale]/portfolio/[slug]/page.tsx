import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PortfolioCard } from "@/components/PortfolioCard";
import { createClient } from "@/lib/supabase/server";
import type { LucideIcon } from "lucide-react";
import {
  ChevronRight,
  User,
  MapPin,
  Calendar,
  Clock,
  Tag,
} from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// ── Default projects (same set as the listing page) ──────────────────────────
const DEFAULT_PROJECTS = [
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
    full_description_pt: "A FICHE forneceu uma gama completa de equipamentos agrícolas e insumos para a Cooperativa Agrícola de Malanje. O projeto incluiu a instalação de sistemas de irrigação, fornecimento de sementes certificadas, fertilizantes orgânicos e formação dos agricultores. Resultado: aumento de 40% na produtividade na campanha seguinte.",
    full_description_en: "FICHE provided a complete range of agricultural equipment and inputs for the Malanje Agricultural Cooperative. The project included installation of irrigation systems, supply of certified seeds, organic fertilizers and farmer training. Result: 40% increase in productivity in the following campaign.",
    full_description_fr: "FICHE a fourni une gamme complète d'équipements agricoles et d'intrants pour la Coopérative Agricole de Malanje. Le projet comprenait l'installation de systèmes d'irrigation, la fourniture de semences certifiées et la formation des agriculteurs.",
    full_description_zh: "FICHE为马兰热农业合作社提供了一整套农业设备和投入品。项目包括灌溉系统安装、认证种子供应、有机肥料以及农民培训，使下一季度生产力提高了40%。",
    cover_image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80&auto=format&fit=crop",
    ],
    client_name: "Cooperativa Agrícola de Malanje",
    location: "Malanje, Angola",
    year: 2023,
    duration: "8 meses",
    featured: true,
    active: true,
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
    full_description_pt: "A FICHE foi responsável pelo planeamento, equipamento e formação para o Centro Hortícola de Benguela. Instalamos estufas modernas, sistemas de rega automatizada, e fornecemos apoio técnico contínuo. O centro passou a abastecer supermercados locais com produtos frescos.",
    full_description_en: "FICHE was responsible for planning, equipping and training for the Benguela Horticultural Center. We installed modern greenhouses, automated irrigation systems, and provided ongoing technical support.",
    full_description_fr: "FICHE a été responsable de la planification, de l'équipement et de la formation pour le Centre Horticole de Benguela.",
    full_description_zh: "FICHE负责本格拉园艺中心的规划、设备安装和培训，安装了现代化温室和自动灌溉系统。",
    cover_image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592982537447-6f2a6a0a3b2d?w=1200&q=80&auto=format&fit=crop",
    ],
    client_name: "Governo Provincial de Benguela",
    location: "Benguela, Angola",
    year: 2022,
    duration: "12 meses",
    featured: false,
    active: true,
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
    full_description_pt: "A FICHE foi contratada para a reabilitação completa de 45 km da estrada nacional que liga o Huambo ao Bié. O projeto envolveu a remoção de pavimento degradado, compactação de base, novo revestimento asfáltico, sinalização e drenagem lateral. Concluído 3 semanas antes do prazo previsto.",
    full_description_en: "FICHE was contracted for the complete rehabilitation of 45 km of the national road linking Huambo to Bié. The project involved removal of degraded pavement, base compaction, new asphalt coating and drainage. Completed 3 weeks ahead of schedule.",
    full_description_fr: "FICHE a été chargée de la réhabilitation complète de 45 km de la route nationale reliant Huambo au Bié. Le projet a été achevé 3 semaines avant le délai prévu.",
    full_description_zh: "FICHE承包了连接万博和比耶省的45公里国家公路完整修缮工程，包括路面清除、基础压实、新沥青铺设和排水，提前3周完工。",
    cover_image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&q=80&auto=format&fit=crop",
    ],
    client_name: "Ministério das Obras Públicas",
    location: "Huambo, Angola",
    year: 2023,
    duration: "18 meses",
    featured: true,
    active: true,
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
    full_description_pt: "A FICHE realizou a construção completa de um edifício corporativo de 8 andares. O projeto incluiu fundações profundas, estrutura de betão armado, revestimentos, instalações técnicas e acabamentos de alto nível. Área total: 12.000 m².",
    full_description_en: "FICHE completed the full construction of an 8-storey corporate building. The project included deep foundations, reinforced concrete structure, cladding, technical installations and high-end finishes. Total area: 12,000 m².",
    full_description_fr: "FICHE a réalisé la construction complète d'un immeuble de 8 étages. Surface totale: 12 000 m².",
    full_description_zh: "FICHE完成了8层办公楼的完整建设，包括深基础、钢筋混凝土结构和高端装修，总面积12,000平方米。",
    cover_image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80&auto=format&fit=crop",
    ],
    client_name: "Grupo Empresarial",
    location: "Luanda, Angola",
    year: 2022,
    duration: "24 meses",
    featured: false,
    active: true,
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
    full_description_pt: "A FICHE prestou serviços de catering completos para 1.200 delegados durante 3 dias da Cimeira da União Africana em Luanda. O serviço incluiu pequeno-almoço, almoço de trabalho e jantares de gala. A equipa de 80 profissionais garantiu excelência e pontualidade.",
    full_description_en: "FICHE provided complete catering services for 1,200 delegates over 3 days of the African Union Summit. The service included breakfast, working lunches and gala dinners. A team of 80 professionals ensured excellence throughout.",
    full_description_fr: "FICHE a fourni des services de restauration pour 1 200 délégués pendant 3 jours avec une équipe de 80 professionnels.",
    full_description_zh: "FICHE为非洲联盟峰会3天内的1,200名代表团提供完整餐饮服务，80名专业团队确保全程卓越。",
    cover_image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=1200&q=80&auto=format&fit=crop",
    ],
    client_name: "Presidência da República",
    location: "Luanda, Angola",
    year: 2023,
    duration: "3 dias",
    featured: true,
    active: true,
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
    full_description_pt: "A FICHE assumiu a gestão completa do restaurante corporativo da Chevron Angola, servindo 500 colaboradores por dia, com planeamento de menus semanais e controlo de qualidade rigoroso.",
    full_description_en: "FICHE took over complete management of Chevron Angola's corporate restaurant, serving 500 employees per day with weekly menu planning and rigorous quality control.",
    full_description_fr: "FICHE a pris en charge la gestion du restaurant d'entreprise de Chevron Angola, servant 500 employés par jour.",
    full_description_zh: "FICHE接管了雪佛龙安哥拉企业餐厅管理，每天为500名员工提供服务，实施严格质量控制。",
    cover_image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&q=80&auto=format&fit=crop",
    ],
    client_name: "Chevron Angola",
    location: "Luanda, Angola",
    year: 2021,
    duration: "Contrato anual",
    featured: false,
    active: true,
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
    full_description_pt: "A FICHE criou e operacionalizou uma rede de distribuição cobrindo Uíge, Zaire, Cabinda e Bengo. O projeto envolveu 12 veículos, armazéns regionais e formação de 45 logistas.",
    full_description_en: "FICHE created and operationalized a distribution network covering Uíge, Zaire, Cabinda and Bengo with 12 vehicles, regional warehouses and 45 trained logistics staff.",
    full_description_fr: "FICHE a créé un réseau de distribution couvrant 4 provinces avec 12 véhicules et 45 personnels formés.",
    full_description_zh: "FICHE建立了覆盖4个省份的配送网络，包括12辆货车、区域仓库和45名物流人员。",
    cover_image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80&auto=format&fit=crop",
    ],
    client_name: "Unilever Angola",
    location: "Norte de Angola",
    year: 2022,
    duration: "6 meses",
    featured: false,
    active: true,
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
    full_description_pt: "A FICHE assumiu o fornecimento e gestão de stocks de um centro comercial com mais de 80 lojas em Viana, com entregas diárias a mais de 60 retalhistas locais.",
    full_description_en: "FICHE took over supply and stock management for a trade center with over 80 stores in Viana, with daily deliveries to more than 60 local retailers.",
    full_description_fr: "FICHE a pris en charge l'approvisionnement d'un centre commercial de 80 magasins à Viana.",
    full_description_zh: "FICHE接管了维亚纳80多家商店的供货和库存管理，每日向60多家零售商配送。",
    cover_image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=1200&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&q=80&auto=format&fit=crop",
    ],
    client_name: "Grupo Retail Viana",
    location: "Viana, Luanda",
    year: 2023,
    duration: "Contrato bianual",
    featured: false,
    active: true,
    sort_order: 8,
  },
];

type Project = (typeof DEFAULT_PROJECTS)[0];

function getField(project: Project, field: string, locale: string): string {
  const key = `${field}_${locale}` as keyof Project;
  const fallback = `${field}_pt` as keyof Project;
  return (project[key] as string) || (project[fallback] as string) || "";
}

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  pt: {
    agriculture: "Agricultura",
    catering: "Restauração",
    public_works: "Obras Públicas",
    logistics: "Logística",
    trade: "Comércio",
    maintenance: "Manutenção",
  },
  en: {
    agriculture: "Agriculture",
    catering: "Catering",
    public_works: "Public Works",
    logistics: "Logistics",
    trade: "Trade",
    maintenance: "Maintenance",
  },
  fr: {
    agriculture: "Agriculture",
    catering: "Restauration",
    public_works: "Travaux Publics",
    logistics: "Logistique",
    trade: "Commerce",
    maintenance: "Maintenance",
  },
  zh: {
    agriculture: "农业",
    catering: "餐饮",
    public_works: "公共工程",
    logistics: "物流",
    trade: "贸易",
    maintenance: "维护",
  },
};

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  let project: Project | undefined = DEFAULT_PROJECTS.find((p) => p.slug === slug);
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("portfolio_projects")
      .select("*")
      .eq("slug", slug)
      .single();
    if (data) project = data;
  } catch {
    // Use defaults
  }

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${getField(project, "title", locale)} — FICHE Angola`,
    description: getField(project, "description", locale),
    openGraph: {
      images: [project.cover_image],
    },
  };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });

  let allProjects: Project[] = DEFAULT_PROJECTS;
  let project: Project | undefined;

  try {
    const supabase = await createClient();
    const [projRes, allRes] = await Promise.all([
      supabase
        .from("portfolio_projects")
        .select("*")
        .eq("slug", slug)
        .eq("active", true)
        .single(),
      supabase
        .from("portfolio_projects")
        .select("*")
        .eq("active", true)
        .order("sort_order"),
    ]);
    if (projRes.data) project = projRes.data;
    if (allRes.data && allRes.data.length > 0) allProjects = allRes.data;
  } catch {
    // Use defaults
  }

  if (!project) {
    project = DEFAULT_PROJECTS.find((p) => p.slug === slug);
  }

  if (!project) {
    notFound();
  }

  const title = getField(project, "title", locale);
  const fullDescription = getField(project, "full_description", locale) || getField(project, "description", locale);
  const categoryLabel = CATEGORY_LABELS[locale]?.[project.category] ?? project.category;

  const relatedProjects = allProjects
    .filter((p) => p.category === project!.category && p.slug !== slug)
    .slice(0, 3);

  const galleryImages: string[] = Array.isArray(project.images)
    ? (project.images as string[])
    : [];

  type InfoRow = { icon: LucideIcon; label: string; value: string };
  const infoRowsCandidates: (InfoRow | null)[] = [
    project.client_name
      ? { icon: User, label: t("client"), value: project.client_name }
      : null,
    project.location
      ? { icon: MapPin, label: t("location"), value: project.location }
      : null,
    project.year
      ? { icon: Calendar, label: t("year"), value: String(project.year) }
      : null,
    project.duration
      ? { icon: Clock, label: t("duration"), value: project.duration }
      : null,
    { icon: Tag, label: t("category"), value: categoryLabel },
  ];
  const infoRows = infoRowsCandidates.filter((r): r is InfoRow => r !== null);

  return (
    <>
      <Navbar locale={locale} />
      <main>
        {/* Hero */}
        <section className="relative h-[55vh] min-h-[320px] flex items-center justify-center overflow-hidden">
          <Image
            src={project.cover_image}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl mx-auto">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ backgroundColor: "rgb(var(--primary))" }}
            >
              {categoryLabel}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              {title}
            </h1>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-white dark:bg-slate-950 border-b border-[#e9ecef] dark:border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-1.5 text-sm text-[#868e96]">
              <Link href={`/${locale}`} className="hover:text-[#212829] dark:hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              <Link href={`/${locale}/portfolio`} className="hover:text-[#212829] dark:hover:text-white transition-colors">
                {t("title")}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-[#212829] dark:text-white font-medium truncate max-w-[200px]">
                {title}
              </span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <section className="py-16 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left: description + gallery */}
              <div className="lg:col-span-2 space-y-10">
                {/* Full description */}
                <div>
                  <h2 className="text-xl font-bold text-[#212829] dark:text-white mb-4">
                    {t("projectDetails")}
                  </h2>
                  <div className="space-y-4">
                    {fullDescription.split("\n\n").map((para, i) => (
                      <p key={i} className="text-[#495057] dark:text-slate-300 leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Gallery */}
                {galleryImages.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-[#212829] dark:text-white mb-4">
                      {t("gallery")}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {galleryImages.map((img, i) => (
                        <div key={i} className="relative aspect-video rounded-xl overflow-hidden">
                          <Image
                            src={img}
                            alt={`${title} — imagem ${i + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: info card */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-[#e9ecef] dark:border-slate-700 shadow-sm overflow-hidden">
                    <div
                      className="px-6 py-4"
                      style={{ backgroundColor: "rgb(var(--primary))" }}
                    >
                      <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                        {t("projectDetails")}
                      </h3>
                    </div>
                    <div className="p-6 space-y-4">
                      {infoRows.map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-start gap-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: "rgb(var(--primary-light))" }}
                          >
                            <span style={{ color: "rgb(var(--primary))", display: "flex" }}>
                              <Icon className="w-4 h-4" />
                            </span>
                          </div>
                          <div>
                            <p className="text-xs text-[#868e96] mb-0.5">{label}</p>
                            <p className="text-sm font-medium text-[#212829] dark:text-white">
                              {value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="px-6 pb-6">
                      <Link
                        href={`/${locale}/contact`}
                        className="block w-full text-center py-3 rounded-lg text-white text-sm font-semibold transition-all"
                        style={{ backgroundColor: "rgb(var(--primary))" }}
                      >
                        {t("ctaButton")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section
            className="py-16"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-[#212829] dark:text-white mb-8">
                {t("relatedProjects")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProjects.map((related) => (
                  <PortfolioCard
                    key={related.id}
                    title={getField(related, "title", locale)}
                    category={related.category}
                    coverImage={related.cover_image}
                    location={related.location}
                    year={related.year}
                    slug={related.slug}
                    locale={locale}
                    featured={false}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer locale={locale} />
    </>
  );
}
