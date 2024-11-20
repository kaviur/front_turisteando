"use client";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto mt-0 md:mt-24">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 p-6">
        <Image 
          src="/logo.png" 
          alt="Página no encontrada" 
          width={200} 
          height={200} 
          className="w-auto"
        />
        <h1 className="text-4xl font-bold text-gray-800 mt-4">
          404 - Página no encontrada
        </h1>
        <p className="text-gray-600 mt-2 text-center max-w-md">
          La página que buscas no existe o ha sido movida. Por favor, verifica la URL o regresa al inicio.
        </p>
        <Link
          href="/"
          className="mt-8 btn btn-primary text-white rounded-full px-8"
        >
          Volver al Inicio
        </Link>
      </div>
      <Footer />
    </div>
  );
}
