import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Turisteando",
  description:
    "Turisteando - Encuentra los mejores tours y actividades en tu destino. Ofrecemos una amplia variedad de experiencias guiadas, desde excursiones culturales hasta aventuras al aire libre, adaptadas a todos los viajeros. Planifica y reserva fácilmente tus próximas experiencias con guías locales expertos.",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
