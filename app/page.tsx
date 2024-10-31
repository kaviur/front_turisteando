"use client";
import { Footer } from "@/components/layout/Footer";
import { Main } from "@/components/layout/Main";
import { Navbar } from "@/components/layout/Navbar";
import React, { useEffect, useState } from "react";
import Onboarding from "../components/Onboarding";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true); // Controla si se muestra el onboarding
  const onboardingTimeout = 5000; // Tiempo de espera en milisegundos (5 segundos)

  // Detecta el ancho de la pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Temporizador para ocultar el onboarding después del tiempo establecido
  useEffect(() => {
    if (isMobile && showOnboarding) {
      const timer = setTimeout(() => {
        setShowOnboarding(false);
      }, onboardingTimeout);

      return () => clearTimeout(timer); // Limpia el temporizador al desmontar
    }
  }, [isMobile, showOnboarding]);

  // Función para omitir el onboarding al hacer clic en "Omitir"
  const handleSkipOnboarding = () => {
    setShowOnboarding(false);
  };

  return (
    <>
      {isMobile && showOnboarding ? (
        <Onboarding onSkip={handleSkipOnboarding} />
      ) : (
        <div className={isMobile ?`mb-16` : ``} >
          <Navbar />
          <Main />
          <Footer />
        </div>
      )}
    </>
  );
}