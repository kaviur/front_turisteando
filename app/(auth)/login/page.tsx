"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react"; // Importar la función de signIn de NextAuth

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isPending, setIsPending] = useState(false); // Estado para controlar el botón de carga
  const router = useRouter();
  const { update } = useSession();
  const session = useSession();

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
    if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.email = "Por favor, ingresa un correo electrónico válido.";
    }
    if (form.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir el envío del formulario

    if (!validateForm()) {
      return; // Si la validación falla, no hacer nada
    }

    setIsPending(true); // Activar el estado de carga

    toast
      .promise(
        signIn("credentials", {
          email: form.email,
          password: form.password,
          redirect: false, // No redirigir automáticamente
        }).then((response) => {
          if (response?.error) {
            throw new Error(response.error); // Si hay error, lanzamos una excepción
          }
          const redirectPath = localStorage.getItem("redirectPath") || "/";
          localStorage.removeItem("redirectPath");
          
          router.replace(redirectPath);
          update();
          return "Sesión iniciada con éxito!";
        }),
        {
          loading: "Iniciando sesión...",
          success: (message) => message, // El mensaje de éxito será el que retorna la promesa
          error: "Error en el correo o contraseña", // El mensaje de error será el que retorna la promesa
        }
      )
      .finally(() => {
        setIsPending(false); // Desactivar el estado de carga después de la promesa
      });
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Link href={"/"} className="absolute top-6 left-6 hidden md:block">
        <Image
          width={200}
          height={200}
          src="/images/logo.svg"
          alt="Logo"
          className="w-32"
        />
      </Link>
      <form
        onSubmit={handleLogin} // Asignamos la función handleLogin al submit
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md mt-14"
      >
        <h2 className="text-3xl font-bold mt-2 mb-4 text-start">
          Bienvenido! 👋
        </h2>
        <p className="text-[14px] text-[#828F9C] mt-2 mb-8 text-star">
          Estamos felices de verte de nuevo! Por favor ingresa tu mail y
          contraseña para iniciar sesión en tu cuenta.
        </p>

        {/* Campo de Email */}
        <div className="mb-4">
          <label className="input input-bordered rounded-3xl flex items-center gap-2 mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              name="email"
              className="grow p-2 focus:outline-none"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          {errors.email && (
            <p className="text-red-500 text-sm pl-3">{errors.email}</p>
          )}
        </div>

        {/* Campo de Contraseña */}
        <div className="mb-4">
          <label className="input input-bordered rounded-3xl flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="password"
              className="grow p-2 focus:outline-none"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          {errors.password && (
            <p className="text-red-500 text-sm pl-3">{errors.password}</p>
          )}
        </div>

        {/* Botón de Inicio de Sesión */}
        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary w-full rounded-3xl font-bold text-[16px] text-white mt-4"
        >
          {isPending ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>

        <div className="divider">O</div>

        {/* Botón de Iniciar sesión con Google */}
        <button
          type="button"
          onClick={() => signIn("google", {
            redirect: true,
            redirectTo: "/",
          })}
          className="w-full py-3 px-4 bg-white border-2 border-gray-300 text-gray-700 rounded-3xl flex items-center justify-center gap-4 hover:bg-gray-100"
        >
          Iniciar sesión con Google
        </button>

        <div className="mt-4 text-center">
          <p>
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-blue-600">
              Regístrate
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
