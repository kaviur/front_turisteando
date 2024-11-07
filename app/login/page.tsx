"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaHandPaper, FaGoogle } from "react-icons/fa";

export default function Login() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para autenticar al usuario
    console.log("Inicio de sesión enviado");
    router.push("/"); // Redirige a la página de inicio después del login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <form
      onSubmit={handleLogin}
      className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md text-center"
    >
      {/* Logo en la esquina superior izquierda */}
      <div className="flex justify-start">
        <img src="/logo.png" alt="Logo" className="h-10 w-auto mb-4" />
      </div>

      {/* Mensaje de Bienvenida */}
      <h2 className="text-2xl font-bold mb-2">Bienvenido <FaHandPaper className="inline-block text-xl" /></h2>
      <p className="text-gray-500 mb-6">
        Estamos felices de verte de nuevo! Por favor ingresa tu mail y contraseña para Iniciar Sesión en tu cuenta.
      </p>

      {/* Campo de Email */}
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-4 border border-gray-300 rounded-full text-center focus:outline-none"
        required
      />

      {/* Campo de Contraseña */}
      <input
        type="password"
        placeholder="Contraseña"
        className="w-full p-2 mb-6 border border-gray-300 rounded-full text-center focus:outline-none"
        required
      />

      {/* Botón de Inicio de Sesión */}
      <button
        type="submit"
        className="w-full py-2 mb-4 bg-fuchsia-400 text-white rounded-full font-bold hover:bg-fuchsia-700"
      >
        Iniciar Sesión
      </button>

      {/* Separador */}
      <p className="text-gray-400 mb-4">o</p>

      {/* Botón de Continuar con Google (inactivo) */}
      <button
        type="button"
        className="w-full py-2 flex items-center justify-center bg-white text-black border border-gray-300 rounded-full font-semibold cursor-not-allowed"
        disabled
      >
        <FaGoogle className="mr-2 text-lg" />
        Continuar con Google
      </button>
    </form>
  </div>
  );
}
