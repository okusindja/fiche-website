import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { ServicesManager } from "./ServicesManager";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const DEFAULT_SERVICES = [
  {
    id: "1",
    slug: "produtos-agricolas",
    icon: "🌾",
    icon_bg: "#f0faf4",
    title_pt: "Produtos Agrícolas",
    title_en: "Agricultural Products",
    title_fr: "Produits Agricoles",
    title_zh: "农业产品",
    description_pt: "Sementes, fertilizantes, equipamentos e insumos para o campo angolano.",
    description_en: "Seeds, fertilizers, equipment and inputs for Angolan farms.",
    description_fr: "Semences, engrais, équipements et intrants.",
    description_zh: "为安哥拉农场提供种子、化肥、设备和农业投入品。",
    sort_order: 1,
    active: true,
  },
  {
    id: "2",
    slug: "restauracao",
    icon: "🍽️",
    icon_bg: "#f0f9ff",
    title_pt: "Restauração",
    title_en: "Catering",
    title_fr: "Restauration",
    title_zh: "餐饮服务",
    description_pt: "Serviços de catering e restauração para eventos corporativos.",
    description_en: "Catering and restaurant services for corporate events.",
    description_fr: "Services de restauration et traiteur.",
    description_zh: "为企业活动、婚礼和日常运营提供餐饮和餐厅服务。",
    sort_order: 2,
    active: true,
  },
  {
    id: "3",
    slug: "obras-publicas",
    icon: "🏗️",
    icon_bg: "#fff9f0",
    title_pt: "Obras Públicas",
    title_en: "Public Works",
    title_fr: "Travaux Publics",
    title_zh: "公共工程",
    description_pt: "Construção civil, reabilitação de infraestruturas.",
    description_en: "Civil construction, infrastructure rehabilitation.",
    description_fr: "Construction civile, réhabilitation d'infrastructures.",
    description_zh: "全国范围内的民用建筑、基础设施修缮和工程服务。",
    sort_order: 3,
    active: true,
  },
  {
    id: "4",
    slug: "comercio-geral",
    icon: "🛒",
    icon_bg: "#f9f0ff",
    title_pt: "Comércio Geral",
    title_en: "General Trade",
    title_fr: "Commerce Général",
    title_zh: "综合贸易",
    description_pt: "Distribuição e venda de produtos de consumo geral.",
    description_en: "Distribution and sale of general consumer products.",
    description_fr: "Distribution et vente de produits de consommation.",
    description_zh: "一般消费品的分销和销售。",
    sort_order: 4,
    active: true,
  },
  {
    id: "5",
    slug: "manutencao",
    icon: "🔧",
    icon_bg: "#fff0f0",
    title_pt: "Manutenção",
    title_en: "Maintenance",
    title_fr: "Maintenance",
    title_zh: "维护服务",
    description_pt: "Serviços de manutenção industrial, predial e de equipamentos.",
    description_en: "Industrial, building and equipment maintenance services.",
    description_fr: "Services de maintenance industrielle.",
    description_zh: "工业、建筑和设备维护服务。",
    sort_order: 5,
    active: true,
  },
  {
    id: "6",
    slug: "logistica",
    icon: "📦",
    icon_bg: "#f0f2ff",
    title_pt: "Logística",
    title_en: "Logistics",
    title_fr: "Logistique",
    title_zh: "物流服务",
    description_pt: "Transporte e distribuição eficiente de mercadorias em Angola.",
    description_en: "Efficient transport and distribution of goods in Angola.",
    description_fr: "Transport et distribution efficaces de marchandises.",
    description_zh: "拥有自有车队和合作伙伴网络，在安哥拉高效运输和分发货物。",
    sort_order: 6,
    active: true,
  },
];

export default async function AdminServicesPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("admin.services");

  let services = DEFAULT_SERVICES;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("sort_order");
    if (data && data.length > 0) services = data;
  } catch {
    // Use defaults
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#212829] dark:text-white">
          {t("title")}
        </h1>
      </div>
      <ServicesManager initialServices={services} locale={locale} />
    </div>
  );
}
