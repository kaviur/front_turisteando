"use client";
import Image from "next/image";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsPending(true);
    setIsError(false);
    setIsSuccess(false);

    // sdsdsdsd@lineacr.com
    try {
      // Aquí haces el llamado a la API para registrar al usuario
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, lastName }),
      });

      // const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setIsError(true);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="absolute top-6 left-6 hidden md:block">
        <Image width={200} height={200} src="/images/logo.svg" alt="Logo" className="w-32" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-[30px] text-[#101018]">Crea una cuenta</h2>
        <p className="mb-6 text-center text-[14px] text-[#828F9C]">Bienvenido! Por favor ingresa tus datos para crear tu cuenta.</p>

        {/* Campo de Nombre */}
        <label className="input input-bordered flex flex-col gap-2">
          <input
            type="text"
            name="nombre"
            className="p-2 focus:outline-none"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        {/* Campo de Apellido */}
        <label className="input input-bordered flex flex-col gap-2 ">
          <input
            type="text"
            name="apellido"
            className="p-2 focus:outline-none"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>

        {/* Campo de Email */}
        <label className="input input-bordered flex flex-col gap-2">
          <input
            type="email"
            name="email"
            className="p-2 focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        {/* Campo de Contraseña */}
        <label className="input input-bordered flex flex-col gap-2">
          <input
            type="password"
            name="password"
            className="p-2 focus:outline-none"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {/* Botón de Registro */}
        <button type="submit" disabled={isPending} className="btn btn-primary w-full font-bold text-[16px] text-white">
          {isPending ? "Registrando..." : "Crear cuenta"}
        </button>

        {/* Mensajes de estado */}
        {isPending && <p>Registrando...</p>}
        {isError && <p className="text-red-500 mt-2">Error al registrar la cuenta</p>}
        {isSuccess && <p className="text-green-500 mt-2">Registro exitoso</p>}

        {/* Texto para redirigir a la página de inicio de sesión */}
        <p className="mt-4 text-center text-sm">
          ¿Ya tienes una cuenta?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:underline"
          >
            Iniciar Sesión
          </a>
        </p>
      </form>
    </div>
  );
}
