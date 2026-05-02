"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import {
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Save,
  X,
  Plus,
  Star,
  StarOff,
} from "lucide-react";

export interface PortfolioProject {
  id: string;
  slug: string;
  category: string;
  title_pt: string;
  title_en: string;
  title_fr: string;
  title_zh: string;
  description_pt: string;
  description_en: string;
  description_fr: string;
  description_zh: string;
  full_description_pt?: string;
  full_description_en?: string;
  full_description_fr?: string;
  full_description_zh?: string;
  cover_image: string;
  images?: string[];
  client_name?: string;
  location?: string;
  year?: number;
  duration?: string;
  featured: boolean;
  active: boolean;
  sort_order: number;
}

const EMPTY_PROJECT: Omit<PortfolioProject, "id"> = {
  slug: "",
  category: "public_works",
  title_pt: "",
  title_en: "",
  title_fr: "",
  title_zh: "",
  description_pt: "",
  description_en: "",
  description_fr: "",
  description_zh: "",
  full_description_pt: "",
  full_description_en: "",
  full_description_fr: "",
  full_description_zh: "",
  cover_image: "",
  images: [],
  client_name: "",
  location: "",
  year: new Date().getFullYear(),
  duration: "",
  featured: false,
  active: true,
  sort_order: 0,
};

const CATEGORIES = [
  { value: "public_works", label: "Obras Públicas" },
  { value: "agriculture", label: "Agricultura" },
  { value: "catering", label: "Restauração" },
  { value: "logistics", label: "Logística" },
  { value: "trade", label: "Comércio" },
  { value: "maintenance", label: "Manutenção" },
];

const CATEGORY_COLORS: Record<string, string> = {
  public_works: "bg-orange-100 text-orange-700",
  agriculture: "bg-green-100 text-green-700",
  catering: "bg-blue-100 text-blue-700",
  logistics: "bg-purple-100 text-purple-700",
  trade: "bg-pink-100 text-pink-700",
  maintenance: "bg-yellow-100 text-yellow-700",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

interface PortfolioManagerProps {
  initialProjects: PortfolioProject[];
  locale: string;
}

export function PortfolioManager({ initialProjects, locale }: PortfolioManagerProps) {
  const [projects, setProjects] = useState<PortfolioProject[]>(initialProjects);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<PortfolioProject>>({});
  const [saving, setSaving] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newForm, setNewForm] = useState<Omit<PortfolioProject, "id">>(EMPTY_PROJECT);
  const [newSaving, setNewSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTitle = (p: PortfolioProject) => {
    if (locale === "en") return p.title_en;
    if (locale === "fr") return p.title_fr;
    if (locale === "zh") return p.title_zh;
    return p.title_pt;
  };

  const getCategoryLabel = (cat: string) =>
    CATEGORIES.find((c) => c.value === cat)?.label ?? cat;

  // ── Edit ──────────────────────────────────────────────────────────────────
  const startEdit = (project: PortfolioProject) => {
    setEditingId(project.id);
    setEditForm({
      ...project,
      images: Array.isArray(project.images) ? project.images : [],
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
    setError(null);
  };

  const saveEdit = async () => {
    if (!editingId || !editForm) return;
    setSaving(true);
    setError(null);
    try {
      const supabase = createClient();
      const imagesValue = typeof editForm.images === "string"
        ? (editForm.images as string).split(",").map((u: string) => u.trim()).filter(Boolean)
        : editForm.images ?? [];

      const { error: err } = await supabase
        .from("portfolio_projects")
        .update({
          slug: editForm.slug,
          category: editForm.category,
          title_pt: editForm.title_pt,
          title_en: editForm.title_en,
          title_fr: editForm.title_fr,
          title_zh: editForm.title_zh,
          description_pt: editForm.description_pt,
          description_en: editForm.description_en,
          description_fr: editForm.description_fr,
          description_zh: editForm.description_zh,
          full_description_pt: editForm.full_description_pt,
          full_description_en: editForm.full_description_en,
          full_description_fr: editForm.full_description_fr,
          full_description_zh: editForm.full_description_zh,
          cover_image: editForm.cover_image,
          images: imagesValue,
          client_name: editForm.client_name,
          location: editForm.location,
          year: editForm.year ? Number(editForm.year) : null,
          duration: editForm.duration,
          featured: editForm.featured,
          active: editForm.active,
          sort_order: editForm.sort_order ? Number(editForm.sort_order) : 0,
        })
        .eq("id", editingId);

      if (err) throw err;
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? ({ ...p, ...editForm, images: imagesValue } as PortfolioProject)
            : p
        )
      );
      cancelEdit();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao guardar");
    } finally {
      setSaving(false);
    }
  };

  // ── Toggle active ─────────────────────────────────────────────────────────
  const toggleActive = async (project: PortfolioProject) => {
    try {
      const supabase = createClient();
      await supabase
        .from("portfolio_projects")
        .update({ active: !project.active })
        .eq("id", project.id);
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, active: !p.active } : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ── Toggle featured ───────────────────────────────────────────────────────
  const toggleFeatured = async (project: PortfolioProject) => {
    try {
      const supabase = createClient();
      await supabase
        .from("portfolio_projects")
        .update({ featured: !project.featured })
        .eq("id", project.id);
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, featured: !p.featured } : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const deleteProject = async (project: PortfolioProject) => {
    if (!confirm(`Tem a certeza que deseja eliminar "${getTitle(project)}"?`)) return;
    try {
      const supabase = createClient();
      await supabase.from("portfolio_projects").delete().eq("id", project.id);
      setProjects((prev) => prev.filter((p) => p.id !== project.id));
    } catch (err) {
      console.error(err);
    }
  };

  // ── Create new ────────────────────────────────────────────────────────────
  const saveNew = async () => {
    if (!newForm.title_pt || !newForm.cover_image) {
      setError("Título (PT) e imagem de capa são obrigatórios.");
      return;
    }
    setNewSaving(true);
    setError(null);
    try {
      const supabase = createClient();
      const imagesValue = typeof newForm.images === "string"
        ? (newForm.images as unknown as string).split(",").map((u: string) => u.trim()).filter(Boolean)
        : newForm.images ?? [];

      const payload = {
        ...newForm,
        images: imagesValue,
        year: newForm.year ? Number(newForm.year) : null,
        sort_order: newForm.sort_order ? Number(newForm.sort_order) : 0,
        slug: newForm.slug || slugify(newForm.title_pt),
      };

      const { data, error: err } = await supabase
        .from("portfolio_projects")
        .insert(payload)
        .select()
        .single();

      if (err) throw err;
      if (data) setProjects((prev) => [data, ...prev]);
      setShowNewForm(false);
      setNewForm(EMPTY_PROJECT);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao criar projeto");
    } finally {
      setNewSaving(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-[#dee2e6] dark:border-slate-600 text-sm bg-white dark:bg-slate-900 text-[#212829] dark:text-white focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]";

  const renderForm = (
    form: Partial<PortfolioProject>,
    setForm: (fn: (prev: Partial<PortfolioProject>) => Partial<PortfolioProject>) => void,
    onSave: () => void,
    onCancel: () => void,
    isSaving: boolean,
    isNew = false
  ) => (
    <div className="space-y-5">
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Row 1: slug + category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#868e96] mb-1">Slug</label>
          <input
            type="text"
            value={form.slug || ""}
            onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
            placeholder={isNew ? "gerado-automaticamente" : ""}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#868e96] mb-1">Categoria</label>
          <select
            value={form.category || "public_works"}
            onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 2: titles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(
          [
            { key: "title_pt", label: "Título (PT) *" },
            { key: "title_en", label: "Title (EN)" },
            { key: "title_fr", label: "Titre (FR)" },
            { key: "title_zh", label: "标题 (ZH)" },
          ] as { key: keyof PortfolioProject; label: string }[]
        ).map(({ key, label }) => (
          <div key={key}>
            <label className="block text-xs font-medium text-[#868e96] mb-1">{label}</label>
            <input
              type="text"
              value={(form[key] as string) || ""}
              onChange={(e) => {
                const val = e.target.value;
                setForm((p) => {
                  const next: Partial<PortfolioProject> = { ...p, [key]: val };
                  if (key === "title_pt" && isNew && !p.slug) {
                    next.slug = slugify(val);
                  }
                  return next;
                });
              }}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      {/* Row 3: descriptions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(
          [
            { key: "description_pt", label: "Descrição (PT) *" },
            { key: "description_en", label: "Description (EN)" },
            { key: "description_fr", label: "Description (FR)" },
            { key: "description_zh", label: "描述 (ZH)" },
          ] as { key: keyof PortfolioProject; label: string }[]
        ).map(({ key, label }) => (
          <div key={key}>
            <label className="block text-xs font-medium text-[#868e96] mb-1">{label}</label>
            <textarea
              rows={2}
              value={(form[key] as string) || ""}
              onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
              className={inputClass + " resize-none"}
            />
          </div>
        ))}
      </div>

      {/* Row 4: full descriptions */}
      <div>
        <label className="block text-xs font-medium text-[#868e96] mb-1">Descrição Completa (PT)</label>
        <textarea
          rows={4}
          value={(form.full_description_pt as string) || ""}
          onChange={(e) => setForm((p) => ({ ...p, full_description_pt: e.target.value }))}
          className={inputClass + " resize-y"}
        />
      </div>

      {/* Row 5: images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#868e96] mb-1">
            Imagem de Capa (URL) *
          </label>
          <input
            type="url"
            value={(form.cover_image as string) || ""}
            onChange={(e) => setForm((p) => ({ ...p, cover_image: e.target.value }))}
            placeholder="https://images.unsplash.com/..."
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#868e96] mb-1">
            Galeria (URLs separadas por vírgula)
          </label>
          <input
            type="text"
            value={
              Array.isArray(form.images)
                ? (form.images as string[]).join(", ")
                : (form.images as unknown as string) || ""
            }
            onChange={(e) => setForm((p) => ({ ...p, images: e.target.value as unknown as string[] }))}
            placeholder="https://..., https://..."
            className={inputClass}
          />
        </div>
      </div>

      {/* Row 6: meta */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#868e96] mb-1">Cliente</label>
          <input
            type="text"
            value={(form.client_name as string) || ""}
            onChange={(e) => setForm((p) => ({ ...p, client_name: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#868e96] mb-1">Localização</label>
          <input
            type="text"
            value={(form.location as string) || ""}
            onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#868e96] mb-1">Ano</label>
          <input
            type="number"
            value={form.year || ""}
            onChange={(e) => setForm((p) => ({ ...p, year: Number(e.target.value) }))}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#868e96] mb-1">Duração</label>
          <input
            type="text"
            value={(form.duration as string) || ""}
            onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))}
            placeholder="ex: 6 meses"
            className={inputClass}
          />
        </div>
      </div>

      {/* Row 7: flags + sort */}
      <div className="flex items-center flex-wrap gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={!!form.featured}
            onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
            className="rounded"
          />
          <span className="text-sm text-[#212829] dark:text-white">Em destaque</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.active !== false}
            onChange={(e) => setForm((p) => ({ ...p, active: e.target.checked }))}
            className="rounded"
          />
          <span className="text-sm text-[#212829] dark:text-white">Activo</span>
        </label>
        <div className="flex items-center gap-2">
          <label className="text-sm text-[#868e96]">Ordem:</label>
          <input
            type="number"
            value={form.sort_order ?? 0}
            onChange={(e) => setForm((p) => ({ ...p, sort_order: Number(e.target.value) }))}
            className={inputClass + " w-20"}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold disabled:opacity-60"
          style={{ backgroundColor: "rgb(var(--primary))" }}
        >
          <Save className="w-4 h-4" />
          {isSaving ? "A guardar..." : "Guardar"}
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#868e96] text-sm font-medium border border-[#dee2e6] hover:bg-gray-50 dark:hover:bg-slate-700"
        >
          <X className="w-4 h-4" />
          Cancelar
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Add New Button */}
      {!showNewForm && (
        <button
          onClick={() => {
            setShowNewForm(true);
            setError(null);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold"
          style={{ backgroundColor: "rgb(var(--primary))" }}
        >
          <Plus className="w-4 h-4" />
          Adicionar Projeto
        </button>
      )}

      {/* New Project Form */}
      {showNewForm && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-[#e9ecef] dark:border-slate-700 p-5 shadow-sm">
          <h3 className="font-semibold text-[#212829] dark:text-white mb-4">Novo Projeto</h3>
          {renderForm(
            newForm,
            (fn) => setNewForm((prev) => fn(prev) as Omit<PortfolioProject, "id">),
            saveNew,
            () => {
              setShowNewForm(false);
              setNewForm(EMPTY_PROJECT);
              setError(null);
            },
            newSaving,
            true
          )}
        </div>
      )}

      {/* Project List */}
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white dark:bg-slate-800 rounded-xl border border-[#e9ecef] dark:border-slate-700 p-5 shadow-sm"
        >
          {editingId === project.id ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-[#212829] dark:text-white">
                  Editar: {getTitle(project)}
                </h3>
              </div>
              {renderForm(
                editForm,
                (fn) => setEditForm((prev) => fn(prev)),
                saveEdit,
                cancelEdit,
                saving
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* Cover thumbnail */}
              <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-slate-700">
                {project.cover_image ? (
                  <Image
                    src={project.cover_image}
                    alt={getTitle(project)}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#868e96] text-xs">
                    No img
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-[#212829] dark:text-white text-sm truncate">
                    {getTitle(project)}
                  </span>
                  {project.featured && (
                    <Star className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      CATEGORY_COLORS[project.category] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {getCategoryLabel(project.category)}
                  </span>
                  {project.year && (
                    <span className="text-xs text-[#868e96]">{project.year}</span>
                  )}
                  <span className="text-xs text-[#868e96]">{project.slug}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {/* Sort order input */}
                <input
                  type="number"
                  value={project.sort_order}
                  onChange={async (e) => {
                    const val = Number(e.target.value);
                    try {
                      const supabase = createClient();
                      await supabase
                        .from("portfolio_projects")
                        .update({ sort_order: val })
                        .eq("id", project.id);
                      setProjects((prev) =>
                        prev.map((p) => (p.id === project.id ? { ...p, sort_order: val } : p))
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  className="w-14 px-2 py-1 rounded border border-[#dee2e6] dark:border-slate-600 text-xs text-center bg-white dark:bg-slate-900 text-[#212829] dark:text-white"
                  title="Ordem"
                />

                {/* Status badge */}
                <span
                  className={`hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    project.active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {project.active ? "Activo" : "Inactivo"}
                </span>

                {/* Featured toggle */}
                <button
                  onClick={() => toggleFeatured(project)}
                  className="p-1.5 rounded text-[#868e96] hover:text-yellow-500 transition-colors"
                  title={project.featured ? "Remover destaque" : "Destacar"}
                >
                  {project.featured ? (
                    <Star className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <StarOff className="w-4 h-4" />
                  )}
                </button>

                {/* Active toggle */}
                <button
                  onClick={() => toggleActive(project)}
                  className="text-[#868e96] hover:text-[#212829] dark:hover:text-white transition-colors p-1"
                  title={project.active ? "Desactivar" : "Activar"}
                >
                  {project.active ? (
                    <ToggleRight
                      className="w-5 h-5"
                      style={{ color: "rgb(var(--primary))" }}
                    />
                  ) : (
                    <ToggleLeft className="w-5 h-5" />
                  )}
                </button>

                {/* Edit */}
                <button
                  onClick={() => startEdit(project)}
                  className="text-[#868e96] hover:text-[#212829] dark:hover:text-white transition-colors p-1"
                  title="Editar"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                {/* Delete */}
                <button
                  onClick={() => deleteProject(project)}
                  className="text-[#868e96] hover:text-red-600 transition-colors p-1"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {projects.length === 0 && !showNewForm && (
        <div className="text-center py-16 text-[#868e96]">
          Sem projetos no portfólio. Adicione o primeiro projeto acima.
        </div>
      )}
    </div>
  );
}
