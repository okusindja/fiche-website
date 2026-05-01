import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { ClipboardList } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

interface AuditLog {
  id: string;
  user_email: string;
  action: string;
  entity: string | null;
  entity_id: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
}

export default async function AuditPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("admin.audit");

  let logs: AuditLog[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (data) logs = data;
  } catch {
    // Use empty
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#212829] dark:text-white mb-8">
        {t("title")}
      </h1>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-[#e9ecef] dark:border-slate-700 shadow-sm overflow-hidden">
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: "rgb(var(--primary-light))" }}
            >
              <ClipboardList
                className="w-7 h-7"
                style={{ color: "rgb(var(--primary))" }}
              />
            </div>
            <p className="text-[#868e96] text-sm">{t("noLogs")}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e9ecef] dark:border-slate-700 bg-gray-50 dark:bg-slate-900">
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#868e96]">
                    {t("user")}
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#868e96]">
                    {t("action")}
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#868e96]">
                    {t("entity")}
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#868e96]">
                    {t("date")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e9ecef] dark:divide-slate-700">
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <td className="px-5 py-3 text-[#212829] dark:text-white font-medium">
                      {log.user_email}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: "rgb(var(--primary-light))",
                          color: "rgb(var(--primary))",
                        }}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-[#868e96]">
                      {log.entity ? `${log.entity}${log.entity_id ? ` #${log.entity_id.slice(0, 8)}` : ""}` : "—"}
                    </td>
                    <td className="px-5 py-3 text-[#868e96]">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
