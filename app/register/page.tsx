"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Registro enviado:", form);
    router.push("/"); // Redirige a la página principal después del registro
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="mb-6 text-2xl font-bold text-center">Registro</h2>

        {/* Campo de Nombre */}
        <label className="input input-bordered flex flex-col gap-2 mb-4">
          <input
            type="text"
            name="nombre"
            className="p-2 focus:outline-none"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </label>

        {/* Campo de Apellido */}
        <label className="input input-bordered flex flex-col gap-2 mb-4">
          <input
            type="text"
            name="apellido"
            className="p-2 focus:outline-none"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            required
          />
        </label>

        {/* Campo de Email */}
        <label className="input input-bordered flex flex-col gap-2 mb-4">
          <input
            type="email"
            name="email"
            className="p-2 focus:outline-none"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        {/* Campo de Contraseña */}
        <label className="input input-bordered flex flex-col gap-2 mb-4">
          <input
            type="password"
            name="password"
            className="p-2 focus:outline-none"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        {/* Campo de Confirmar Contraseña */}
        <label className="input input-bordered flex flex-col gap-2 mb-6">
          <input
            type="password"
            name="confirmPassword"
            className="p-2 focus:outline-none"
            placeholder="Confirmar Contraseña"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>

        {/* Botón de Registro */}
        <button type="submit" className="btn btn-primary w-full">
          Registrarse
        </button>

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