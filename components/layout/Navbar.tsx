"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";

export const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detecta el ancho de la pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`z-10 bg-opacity-0 backdrop-blur-md ${
        isMobile
          ? "fixed bottom-0 left-0 w-full"
          : "fixed top-0 left-0 w-full bg-base-100 "
      }`}
    >
      {isMobile ? (
        // Navegación en móvil
        <div className="flex justify-around py-2 border-t border-base-200 bg-base-100 shadow opacity-80">
          <button className="btn btn-ghost flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2L2 7h20L12 2zm0 0v20"
              />
            </svg>
            <span className="text-sm">Home</span>
          </button>
          <button className="btn btn-ghost flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4h16v16H4z"
              />
            </svg>
            <span className="text-sm">Likes</span>
          </button>
          <button className="btn btn-ghost flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 4h.01"
              />
            </svg>
            <span className="text-sm">Notifications</span>
          </button>
          <button className="btn btn-ghost flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4h16v16H4z"
              />
            </svg>
            <span className="text-sm">Config</span>
          </button>
        </div>
      ) : (
        // Navegación en escritorio
        <div className="flex justify-between items-center bg-base-100 bg-opacity-80 backdrop-blur-lg shadow-lg p-4">
          <div className=" ">
            <Link className="btn btn-ghost text-xl" href="/">
              <Image src="/logo.png" alt="Logo" width={120} height={120} />
            </Link>
          </div>
          <div className="">
            <ul className="menu menu-horizontal ">
              <li>
                <Link href={"/tours"} className="px-2">Tours</Link>
              </li>
              <li>
                <Link href={"/activities"} className="px-2">Actividades</Link>
              </li>
              <li>
                <Link href={"/news"} className="px-2">Novedades</Link>
              </li>
              <li>
                <Link href={"/favorites"}
                className="px-2">Favoritos</Link>
              </li>
            </ul>
          </div>
          <div className="">
            <PrimaryButton 
              text="Iniciar Sesión" 
              style="mr-3 "
            />
            <SecondaryButton
              text="Crear Cuenta"
              style="btn-ghost border border-gray-200"
            />
          </div>
        </div>
      )}
    </div>
  );
};
