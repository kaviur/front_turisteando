"use client";
import HeaderAdmin from "@/components/HeaderAdmin";
import Sidebar from "@/components/Sidebar";
import React, { useState, useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <div className="flex items-center justify-center h-screen text-center p-4">
        <p>Esta pantalla no esta disponible en dispositivos mobile, Por favor usa una computadora.</p>
      </div>
    );
  }

  return (
    <html>
      <body>
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
      </body>
    </html>
  );
}