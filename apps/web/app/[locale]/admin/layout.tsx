import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/AdminSidebar";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

interface AdminLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function AdminLayout({
  children,
  params,
}: AdminLayoutProps) {
  const { locale } = await params;

  let userEmail: string | undefined;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect(`/${locale}/admin/login`);
    }

    userEmail = user.email;
  } catch {
    redirect(`/${locale}/admin/login`);
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
        <AdminSidebar locale={locale} userEmail={userEmail} />
        <main className="flex-1 overflow-auto">
          <div className="p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </NextIntlClientProvider>
  );
}
