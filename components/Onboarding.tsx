import Image from "next/image";
import React from "react";
import PrimaryButton from "./ui/PrimaryButton";
import SecondaryButton from "./ui/SecondaryButton";
import Link from "next/link";

interface OnboardingProps {
  onSkip: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onSkip }) => {
  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-base-100 gap-4">
      <Image
        width={600}
        height={600}
        src="/onboarding.png"
        alt="Onboarding"
        className="w-full  mb-6"
      />
      <h2 className="text-4xl 2 font-bold">
        Descubre los mejores lugares para visitar en tus vacaciones 😍
      </h2>
      <p className="text-gray-500 text-lg mb-4">
        Visitas guiadas, actividades y excursiones para que tu viaje sea aún más
        increíble.
      </p>
      <PrimaryButton
        onClick={onSkip}
        style="btn btn-lg btn-primary w-full rounded-full text-xl"
        text="Ir a la pagina principal"
      />
      {/* A revisar - Mejorar Funcionalidad */}
      <Link href={"/login"} className="w-full">
        <SecondaryButton
          style="btn-lg btn-ghost border border-gray-200 w-full rounded-full text-xl mb-2"
          text="Iniciar Sesión"
        />
      </Link>

      <p className="text-gray-500 text-sm">
        No tienes una cuenta?{" "}
        <Link className="font-bold text-black" href="/register">
          Regístrate
        </Link>
      </p>
    </div>
  );
};

export default Onboarding;
