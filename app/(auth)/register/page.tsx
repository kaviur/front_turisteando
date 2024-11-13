"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isPending, setIsPending] = useState(false);
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
    if (!form.name.match(/^[a-zA-Z\s]{2,}$/)) {
      newErrors.name = "El nombre debe tener al menos 2 letras y solo letras.";
    }
    if (!form.lastName.match(/^[a-zA-Z\s]{2,}$/)) {
      newErrors.lastName =
        "El apellido debe tener al menos 2 letras y solo letras.";
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

  const handleSubmit = async (event: React.FormEvent) => {
    const { email, password, name, lastName } = form;
    event.preventDefault();
    if (!validateForm()) {
      return toast.error("Error en el formulario. Revisa los campos.");
    }
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
      <div className="absolute top-6 left-6 hidden md:block">
        <Image
          width={200}
          height={200}
          src="/images/logo.svg"
          alt="Logo"
          className="w-32"
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-center text-[30px] text-[#101018]">
          Crea una cuenta
        </h2>
        <p className="text-center text-[14px] text-[#828F9C]">
          Bienvenido! Por favor ingresa tus datos para crear tu cuenta.
        </p>

        {/* Campo de Nombre */}
        <div className="relative">
          <label className={`border border-gray-300 rounded-3xl flex flex-col`}>
            <input
              type="text"
              name="name"
              className="py-3 px-6 focus:outline-none focus:shadow rounded-3xl placeholder:text-gray-400"
              placeholder="Nombre"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          {errors.name && (
            <p className="text-red-500 text-xs px-3 absolute z-20 bottom-0 translate-y-full">
              {errors.name}
            </p>
          )}
        </div>

        {/* Campo de Apellido */}
        <div className="relative">
          <label className={`border border-gray-300 rounded-3xl flex flex-col`}>
            <input
              type="text"
              name="lastName"
              className="py-3 px-6 focus:outline-none focus:shadow rounded-3xl placeholder:text-gray-400"
              placeholder="Apellido"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </label>
          {errors.lastName && (
            <p className="text-red-500 text-xs px-3 absolute bottom-0 translate-y-full">
              {errors.lastName}
            </p>
          )}
        </div>

        {/* Campo de Email */}
        <div className="relative">
          <label className={`border border-gray-300 rounded-3xl flex flex-col`}>
            <input
              type="email"
              name="email"
              className="py-3 px-6 focus:outline-none focus:shadow rounded-3xl placeholder:text-gray-400"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          {errors.email && (
            <p className="text-red-500 text-xs px-3 absolute bottom-0 translate-y-full">
              {errors.email}
            </p>
          )}
        </div>

        {/* Campo de Contraseña */}
        <div className="relative">
          <label className={`border border-gray-300 rounded-3xl flex flex-col`}>
            <input
              type="password"
              name="password"
              className="py-3 px-6 focus:outline-none focus:shadow rounded-3xl placeholder:text-gray-400"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          {errors.password && (
            <p className="text-red-500 text-xs px-3 absolute bottom-0 translate-y-full">
              {errors.password}
            </p>
          )}
        </div>

        {/* Campo de Confirmar Contraseña */}
        <div className="relative">
          <label
            className={`border border-gray-300 rounded-3xl flex flex-col`}
          >
            <input
              type="password"
              name="confirmPassword"
              className="py-3 px-6 focus:outline-none focus:shadow rounded-3xl placeholder:text-gray-400"
              placeholder="Confirmar Contraseña"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs px-3 absolute bottom-0 translate-y-full">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Botón de Registro */}
        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary w-full font-bold text-[16px] text-white"
        >
          {isPending ? "Registrando..." : "Crear cuenta"}
        </button>

        {/* Texto para redirigir a la página de inicio de sesión */}
        <p className="text-center text-sm">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Iniciar Sesión
          </a>
        </p>
      </form>
    </div>
  );
}
