"use client";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";
const imageStyle = {
  width: "auto",
};
export default function Home() {
  return (
    <div className={`mx-auto mt-0 md:mt-24`}>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 p-6">
        <Image style={imageStyle} src="/logo.png" alt="Logo" width={120} height={120} />

        <h1 className="text-3xl font-bold text-gray-800 mt-4">
          Acceso Denegado
        </h1>
        <p className="text-gray-600 mt-2 text-center max-w-md">
          Lo sentimos, no tienes permiso para acceder a esta sección. Esta área
          es solo para administradores.
        </p>

        <Link
          href="/"
          className="mt-8 btn btn-primary text-white rounded-full px-8"
        >
          Volver al Inicio
        </Link>

        {/* Redes Sociales */}
        <div className="flex justify-center gap-6 mt-8 text-gray-600"></div>
      </div>
      <Footer />
    </div>
  );
}
