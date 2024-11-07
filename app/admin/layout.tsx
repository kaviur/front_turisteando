"use client";
import HeaderAdmin from "@/components/HeaderAdmin";
import Sidebar from "@/components/Sidebar";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaExclamationCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Definimos como "mobile" si el ancho es menor o igual a 768px
    };

    handleResize(); // Comprobar en el primer render
    window.addEventListener("resize", handleResize); // Agregar el evento al redimensionar la pantalla
    return () => window.removeEventListener("resize", handleResize); // Limpiar el evento al desmontar
  }, []);

  if (isMobile) {
    return (
      <div className="flex flex-col items-center p-4 min-h-screen bg-base-100 gap-4 h-screen">
        <div className="h-1/4">
        <Image
          width={600}
          height={600}
          src="/logo.png"
          alt="Logo Turisteando"
          className="w-full max-w-sm my-2 "
        />
        </div>
        
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-4xl 2 font-bold mb-6">
            <FaExclamationCircle />
            Esta página no esta disponible para ver desde el móvil, por favor
            ingresar desde una computadora{" "}
          </h2>

          <Link href={"/"} className="w-full">
            <PrimaryButton
              style="btn btn-lg btn-primary w-full rounded-full text-xl"
              text="Ir a la pagina principal"
            />
          </Link>

          <Link href={"/"} className="w-full ">
            <SecondaryButton
              onClick={() => router.back()}
              style="btn-lg btn-ghost border border-gray-200 border-2 text-gray-500 hover:text-gray-700 w-full rounded-full text-xl mb-2"
            >
              <FaArrowLeft /> Volver atrás
            </SecondaryButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-1 flex-col lg:ml-72.5">
        <HeaderAdmin
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}