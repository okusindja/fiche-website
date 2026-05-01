import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";
import { ArrowRight, CheckCircle } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
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
    description_zh: "为安哥拉农场提供种子、化肥、设备和农业投入品。与认证供应商合作。",
    full_pt:
      "A FICHE oferece uma gama completa de produtos agrícolas para apoiar a produção rural em Angola. Trabalhamos com sementes de alta qualidade, fertilizantes orgânicos e químicos, equipamentos modernos de irrigação e maquinaria agrícola. A nossa rede de fornecedores certificados garante produtos de confiança para o agricultor angolano.",
    full_en:
      "FICHE offers a complete range of agricultural products to support rural production in Angola. We work with high-quality seeds, organic and chemical fertilizers, modern irrigation equipment and agricultural machinery.",
    full_fr:
      "FICHE offre une gamme complète de produits agricoles pour soutenir la production rurale en Angola. Nous travaillons avec des semences de haute qualité et des équipements modernes.",
    full_zh:
      "FICHE提供一系列完整的农业产品，支持安哥拉的农村生产。我们提供优质种子、有机和化学肥料、现代灌溉设备和农业机械。",
    features_pt: [
      "Sementes certificadas de alta qualidade",
      "Fertilizantes orgânicos e químicos",
      "Equipamentos de irrigação modernos",
      "Maquinaria agrícola",
      "Suporte técnico especializado",
      "Parceiros certificados internacionais",
    ],
    features_en: [
      "Certified high-quality seeds",
      "Organic and chemical fertilizers",
      "Modern irrigation equipment",
      "Agricultural machinery",
      "Specialized technical support",
      "Certified international partners",
    ],
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
    full_pt:
      "O nosso serviço de restauração cobre desde pequenos eventos corporativos até grandes celebrações. Com uma equipa de chefs experientes e ingredientes frescos de produção local, garantimos uma experiência gastronómica autêntica.",
    full_en:
      "Our catering service covers everything from small corporate events to large celebrations. With experienced chefs and fresh locally-sourced ingredients, we guarantee authentic culinary experiences.",
    full_fr:
      "Notre service de restauration couvre tout, des petits événements d'entreprise aux grandes célébrations.",
    full_zh:
      "我们的餐饮服务涵盖从小型企业活动到大型庆典的一切。凭借经验丰富的厨师团队和新鲜的本地食材。",
    features_pt: [
      "Catering para eventos corporativos",
      "Serviço de casamentos e celebrações",
      "Menu de cozinha angolana e internacional",
      "Equipas de serviço profissionais",
      "Decoração e apresentação",
      "Serviço de buffet e à la carte",
    ],
    features_en: [
      "Corporate event catering",
      "Wedding and celebration service",
      "Angolan and international cuisine menu",
      "Professional service teams",
      "Decoration and presentation",
      "Buffet and à la carte service",
    ],
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
      "Construção civil, reabilitação de infraestruturas e prestação de serviços de engenharia em todo o território.",
    description_en:
      "Civil construction, infrastructure rehabilitation and engineering services throughout the country.",
    description_fr:
      "Construction civile, réhabilitation d'infrastructures et services d'ingénierie.",
    description_zh: "全国范围内的民用建筑、基础设施修缮和工程服务。",
    full_pt:
      "A divisão de obras públicas da FICHE executa projetos de construção civil, reabilitação de estradas, pontes e infraestruturas urbanas. Contamos com engenheiros qualificados e equipamentos modernos.",
    full_en:
      "FICHE's public works division executes civil construction projects, road rehabilitation, bridges and urban infrastructure. We have qualified engineers and modern equipment.",
    full_fr:
      "La division travaux publics de FICHE exécute des projets de construction civile et de réhabilitation d'infrastructures.",
    full_zh:
      "FICHE的公共工程部门执行民用建筑项目、道路修缮、桥梁和城市基础设施工程。",
    features_pt: [
      "Construção civil residencial e comercial",
      "Reabilitação de estradas e pontes",
      "Infraestruturas urbanas",
      "Projetos de saneamento básico",
      "Engenheiros qualificados e certificados",
      "Equipamentos modernos de construção",
    ],
    features_en: [
      "Residential and commercial civil construction",
      "Road and bridge rehabilitation",
      "Urban infrastructure",
      "Basic sanitation projects",
      "Qualified and certified engineers",
      "Modern construction equipment",
    ],
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
      "Distribution and sale of general consumer products — reliable partners for retailers and wholesalers.",
    description_fr:
      "Distribution et vente de produits de consommation générale.",
    description_zh: "一般消费品的分销和销售——零售商和批发商的可靠合作伙伴。",
    full_pt:
      "A nossa divisão de comércio geral oferece um catálogo amplo de produtos de consumo, desde géneros alimentares a artigos domésticos. Servimos retalhistas, grossistas e empresas em todo o país.",
    full_en:
      "Our general trade division offers a wide catalog of consumer products, from food items to household goods. We serve retailers, wholesalers and companies throughout the country.",
    full_fr:
      "Notre division de commerce général offre un large catalogue de produits de consommation.",
    full_zh:
      "我们的综合贸易部门提供从食品到家居用品的广泛消费品目录。",
    features_pt: [
      "Géneros alimentares e bebidas",
      "Artigos domésticos e de higiene",
      "Produtos electrónicos de consumo",
      "Material de escritório",
      "Distribuição para todo o território",
      "Preços competitivos para grossistas",
    ],
    features_en: [
      "Food and beverages",
      "Household and hygiene items",
      "Consumer electronics",
      "Office supplies",
      "Distribution throughout the country",
      "Competitive wholesale prices",
    ],
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
    full_pt:
      "Os nossos técnicos especializados prestam serviços de manutenção preventiva e corretiva para instalações industriais, edifícios comerciais e equipamentos.",
    full_en:
      "Our specialized technicians provide preventive and corrective maintenance services for industrial facilities, commercial buildings and equipment.",
    full_fr:
      "Nos techniciens spécialisés fournissent des services de maintenance préventive et corrective.",
    full_zh:
      "我们的专业技术人员为工业设施、商业建筑和设备提供预防性和纠正性维护服务。",
    features_pt: [
      "Manutenção preventiva programada",
      "Manutenção corretiva de emergência",
      "Instalações eléctricas e mecânicas",
      "Climatização e refrigeração",
      "Elevadores e equipamentos industriais",
      "Contratos de manutenção anual",
    ],
    features_en: [
      "Scheduled preventive maintenance",
      "Emergency corrective maintenance",
      "Electrical and mechanical installations",
      "Air conditioning and refrigeration",
      "Elevators and industrial equipment",
      "Annual maintenance contracts",
    ],
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
    full_pt:
      "A FICHE dispõe de uma frota de veículos para transporte de carga em todo o território angolano. Com rotas estabelecidas entre as principais cidades e parceiros regionais, garantimos entregas eficientes e pontuais.",
    full_en:
      "FICHE has a fleet of vehicles for cargo transport throughout Angola. With established routes between major cities and regional partners, we ensure efficient and timely deliveries.",
    full_fr:
      "FICHE dispose d'une flotte de véhicules pour le transport de marchandises dans toute l'Angola.",
    full_zh:
      "FICHE拥有一支车队，可在安哥拉全境进行货物运输。凭借在主要城市之间建立的路线和区域合作伙伴。",
    features_pt: [
      "Transporte rodoviário de mercadorias",
      "Frota própria de veículos pesados e ligeiros",
      "Cobertura nacional — todas as províncias",
      "Rastreamento GPS de entregas",
      "Armazéns e centros de distribuição",
      "Soluções de logística personalizada",
    ],
    features_en: [
      "Road freight transport",
      "Own fleet of heavy and light vehicles",
      "National coverage — all provinces",
      "GPS delivery tracking",
      "Warehouses and distribution centers",
      "Custom logistics solutions",
    ],
  },
];

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("services");
  const tn = await getTranslations("nav");

  let services = DEFAULT_SERVICES;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("active", true)
      .order("sort_order");
    if (data && data.length > 0) {
      services = data.map((s: Record<string, unknown>) => ({
        ...DEFAULT_SERVICES.find((d) => d.slug === s.slug),
        ...s,
      })) as typeof DEFAULT_SERVICES;
    }
  } catch {
    // Use defaults
  }

  const getTitle = (s: typeof DEFAULT_SERVICES[0]) => {
    if (locale === "en") return s.title_en;
    if (locale === "fr") return s.title_fr;
    if (locale === "zh") return s.title_zh;
    return s.title_pt;
  };

  const getDesc = (s: typeof DEFAULT_SERVICES[0]) => {
    if (locale === "en") return s.description_en;
    if (locale === "fr") return s.description_fr;
    if (locale === "zh") return s.description_zh;
    return s.description_pt;
  };

  const getFull = (s: typeof DEFAULT_SERVICES[0]) => {
    if (locale === "en") return s.full_en;
    if (locale === "fr") return s.full_fr;
    if (locale === "zh") return s.full_zh;
    return s.full_pt;
  };

  const getFeatures = (s: typeof DEFAULT_SERVICES[0]) => {
    if (locale === "en") return s.features_en;
    return s.features_pt;
  };

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
              <span>{tn("services")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {t("title")}
            </h1>
            <p className="text-lg opacity-80 max-w-xl">{t("subtitle")}</p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {services.map((service, index) => (
                <div
                  key={service.slug}
                  id={service.slug}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image Placeholder */}
                  <div
                    className={`rounded-2xl h-72 flex items-center justify-center ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                    style={{ backgroundColor: service.icon_bg }}
                  >
                    <div className="text-center">
                      <div className="text-7xl mb-4">{service.icon}</div>
                      <div
                        className="text-lg font-semibold"
                        style={{ color: "rgb(var(--primary))" }}
                      >
                        {getTitle(service)}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4"
                      style={{
                        backgroundColor: "rgb(var(--primary-light))",
                        color: "rgb(var(--primary))",
                      }}
                    >
                      {service.icon} {getTitle(service)}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#212829] dark:text-white mb-4">
                      {getTitle(service)}
                    </h2>
                    <p className="text-[#868e96] leading-relaxed mb-6">
                      {getFull(service)}
                    </p>
                    <ul className="space-y-2 mb-8">
                      {getFeatures(service).map((feature: string, i: number) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <CheckCircle
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: "rgb(var(--primary))" }}
                          />
                          <span className="text-sm text-[#495057] dark:text-slate-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/${locale}/contact`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold text-sm"
                      style={{ backgroundColor: "rgb(var(--primary))" }}
                    >
                      {t("learnMore")}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
