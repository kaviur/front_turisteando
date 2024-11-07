"use client";
import { Footer } from "@/components/layout/Footer";
import { Main } from "@/components/layout/Main";
import { Navbar } from "@/components/layout/Navbar";
import React, { useEffect, useState } from "react";
import Onboarding from "../components/Onboarding";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true); // Controla si se muestra el onboarding

  // Detecta el ancho de la pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Función para omitir el onboarding al hacer clic en "Omitir"
  const handleSkipOnboarding = () => {
    setShowOnboarding(false);
  };

  return (
    <>
      {isMobile && showOnboarding ? (
        <Onboarding onSkip={handleSkipOnboarding} />
      ) : (
        <div className={isMobile ?`` : `mt-20`} >
          <Navbar />
          <Main />
          <Footer />
        </div>
      )}
    </>
  );
}