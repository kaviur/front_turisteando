"use client";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { login } from "@/lib/actions";
import { loginInitialState } from "@/lib/state";



export default function Login() {
  //@ts-expect-error: Use form actions on this login page
  const [errorMessage, formAction, isPending] = useActionState(login, loginInitialState);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  // const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

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

  const handleGoogleLogin = () => {
    const loadingToast = toast.loading("Iniciando sesión con Google...");
    setTimeout(() => {
      toast.success("Iniciado sesión con Google", { id: loadingToast });
      router.push("/");
    }, 2000);
  };
  console.log(errorMessage);  

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
        action={formAction}
        onSubmit={validateForm}
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
          onClick={handleGoogleLogin}
          className="w-full py-3 px-4 bg-white border-2 border-gray-300 text-gray-700 rounded-3xl flex items-center justify-center gap-4 hover:bg-gray-100"
        >
          {/* Logo de Google con los colores */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20"
            height="20" // Tamaño ajustado
            className="h-5 w-5"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          Continuar con Google
        </button>

        <p className="mt-12 text-center text-sm ">
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Regístrate
          </a>
        </p>
      </form>
    </div>
  );
}
