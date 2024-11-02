"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
        <div className="navbar bg-base-100 bg-opacity-80 backdrop-blur-lg shadow-lg p-4">
          <div className="navbar-start">
            <Link className="btn btn-ghost text-xl" href="/">
              <Image src="/logo.png" alt="Logo" width={120} height={120} />
            </Link>
          </div>
          <div className="navbar-center">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a>Tours</a>
              </li>
              <li>
                <a>Actividades</a>
              </li>
              <li>
                <a>Novedades</a>
              </li>
              <li>
                <a>Favoritos</a>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <a className="btn btn-primary rounded-full px-10 text-white">
              Iniciar Sesión
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
