"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    // Implementación de toast.promise para manejar éxito y error en una sola promesa
    await toast.promise(
      signIn("credentials", {
        email,
        password,
        redirect: false,
      }).then((result) => {
        setIsPending(false);
        if (result?.error) {
          throw new Error(result.error); // Manejo de error para activar el mensaje de error en el toast
        } else {
          router.push("/"); // Redirige a home en caso de éxito
        }
      }),
      {
        loading: "Iniciando sesión...",
        success: "Inicio de sesión exitoso",
        error: "Error al iniciar sesión",
      }
    ).catch(() => {
      setIsPending(false);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Iniciar Sesión</h2>

        <label className="input input-bordered flex items-center gap-2 mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="grow p-2 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-6">
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            className="grow p-2 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit" disabled={isPending} className="btn btn-primary w-full">
          {isPending ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>
        <p className="mt-4 text-center text-sm">
          ¿Aun no tienes una cuenta?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:underline"
          >
            Registrar
          </a>
        </p>
      </form>
    </div>
  );
}
