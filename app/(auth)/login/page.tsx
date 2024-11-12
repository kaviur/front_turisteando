"use client"
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setIsError(true);
      } else {
        setIsSuccess(true);
      }
    } catch{
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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

        {isPending && <p>Iniciando sesión...</p>}
        {isError && <p className="text-red-500 mt-2">Error al iniciar sesión</p>}
        {isSuccess && <p className="text-green-500 mt-2">Inicio de sesión exitoso</p>}
      </form>
    </div>
  );
}
