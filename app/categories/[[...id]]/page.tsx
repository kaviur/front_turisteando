"use client";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { TabsPagination } from "@/components/TabsPagination";
import { useParams } from "next/navigation";

export default function Home() {
  // Extraer los parámetros dinámicos desde `useParams`
  const params = useParams();
  const categoryId = params?.id?.[0] || "0"; // Si no hay id, usar "0" como predeterminado

  return (
    <>
      <Navbar />
      <div className="md:mt-28 mt-12 max-w-screen-2xl mx-auto">
        <TabsPagination categoryId={categoryId} />
      </div>
      <Footer />
    </>
  );
}