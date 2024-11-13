"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsPending(true);

    await toast
      .promise(
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, name, lastName }),
        }).then((response) => {
          if (!response.ok) throw new Error("Error al registrar la cuenta");
          router.push("/login"); // Redirige a home en caso de éxito
        }),
        {
          loading: "Registrando...",
          success: "Registro exitoso",
          error: "Error al registrar la cuenta",
        }
      )
      .finally(() => {
        setIsPending(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Toaster position="top-center" />
      <div className="absolute top-6 left-6 hidden md:block">
        <Image width={200} height={200} src="/images/logo.svg" alt="Logo" className="w-32" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md flex flex-col gap-3"
      >
        <h2 className="text-2xl font-bold text-center text-[30px] text-[#101018]">Crea una cuenta</h2>
        <p className="mb-2 text-center text-[14px] text-[#828F9C]">
          Bienvenido! Por favor ingresa tus datos para crear tu cuenta.
        </p>

        {/* Campo de Nombre */}
        <label className="input input-bordered flex flex-col gap-2">
          <input
            type="text"
            name="nombre"
            className="grow p-2 focus:outline-none"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        {/* Campo de Apellido */}
        <label className="input input-bordered flex flex-col gap-2">
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

        {/* Texto para redirigir a la página de inicio de sesión */}
        <p className="mt-4 text-center text-sm">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Iniciar Sesión
          </a>
        </p>
      </form>
    </div>
  );
}
