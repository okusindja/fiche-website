import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FICHE - Soluções Completas para O Seu Negócio",
  description:
    "Empresa Angolana de Confiança. Da agricultura à restauração, das obras públicas ao comércio — a FICHE oferece serviços integrados com qualidade.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
