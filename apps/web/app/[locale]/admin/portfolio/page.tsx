import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PortfolioManager, type PortfolioProject } from "./PortfolioManager";

interface PageProps {
  params: Promise<{ locale: string }>;
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
    active: true,
    sort_order: 1,
  },
];

export default async function AdminPortfolioPage({ params }: PageProps) {
  const { locale } = await params;

  // Auth check
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      redirect(`/${locale}/admin/login`);
    }
  } catch {
    redirect(`/${locale}/admin/login`);
  }

  let projects: PortfolioProject[] = DEFAULT_PROJECTS;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("portfolio_projects")
      .select("*")
      .order("sort_order");
    if (data && data.length > 0) projects = data;
  } catch {
    // Use defaults
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#212829] dark:text-white">
          Gerir Portfólio
        </h1>
        <span className="text-sm text-[#868e96]">
          {projects.length} projeto{projects.length !== 1 ? "s" : ""}
        </span>
      </div>
      <PortfolioManager initialProjects={projects} locale={locale} />
    </div>
  );
}
