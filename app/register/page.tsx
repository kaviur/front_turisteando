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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.nombre.match(/^[a-zA-Z\s]{2,}$/)) {
      newErrors.nombre = "El nombre debe tener al menos 2 letras y solo letras.";
    }
    if (!form.apellido.match(/^[a-zA-Z\s]{2,}$/)) {
      newErrors.apellido = "El apellido debe tener al menos 2 letras y solo letras.";
    }
    if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.email = "Por favor, ingresa un correo electrónico válido.";
    }
    if (form.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Registro enviado:", form);
      router.push("/");// Redirige a la página principal después del registro
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="absolute top-6 left-6 hidden md:block">
        <img src="/images/logo.svg" alt="Logo" className="w-32" />
      </div>
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-[30px] text-[#101018]">Crea una cuenta</h2>
        <p className="mb-6 text-center text-[14px] text-[#828F9C]">Bienvenido! Por favor ingresa tus datos para crear tu cuenta.</p>

        {/* Campo de Nombre */}
        <label className={`input input-bordered flex flex-col gap-2 ${errors.nombre ? "mb-6" : "mb-4"}`}>
          <input
            type="text"
            name="nombre"
            className="p-2 focus:outline-none"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
        </label>

        {/* Campo de Apellido */}
        <label className={`input input-bordered flex flex-col gap-2 ${errors.apellido ? "mb-6" : "mb-4"}`}>
          <input
            type="text"
            name="apellido"
            className="p-2 focus:outline-none"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            required
          />
          {errors.apellido && <p className="text-red-500 text-xs mt-1">{errors.apellido}</p>}
        </label>

        {/* Campo de Email */}
        <label className={`input input-bordered flex flex-col gap-2 ${errors.email ? "mb-6" : "mb-4"}`}>
          <input
            type="email"
            name="email"
            className="p-2 focus:outline-none"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </label>

        {/* Campo de Contraseña */}
        <label className={`input input-bordered flex flex-col gap-2 ${errors.password ? "mb-6" : "mb-4"}`}>
          <input
            type="password"
            name="password"
            className="p-2 focus:outline-none"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </label>

        {/* Campo de Confirmar Contraseña */}
        <label className={`input input-bordered flex flex-col gap-2 ${errors.confirmPassword ? "mb-6" : "mb-4"}`}>
          <input
            type="password"
            name="confirmPassword"
            className="p-2 focus:outline-none"
            placeholder="Confirmar Contraseña"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
        </label>

        {/* Botón de Registro */}
        <button type="submit" className="btn btn-primary w-full font-bold text-[16px] text-white">
          Crear cuenta
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