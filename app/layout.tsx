import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { ClientProviders } from "@/components/ClientProviders";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Turisteando",
  description:
    "Turisteando - Encuentra los mejores tours y actividades en tu destino...",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={dmSans.className}>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
