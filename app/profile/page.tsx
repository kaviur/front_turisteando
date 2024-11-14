"use client";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaUserTag } from "react-icons/fa";

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  //@ts-expect-error: Error en la validación de tipos
  const user = session?.user?.user;
  // Verificar si la sesión está cargando o si el usuario no está autenticado
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push("/login"); // Redirigir si no hay sesión
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6">Perfil</h1>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center mb-6">
            {/* Icono de usuario y nombre */}
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mr-4">
              <FaUser className="text-white text-3xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-sm text-gray-500">{user?.role}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FaUserTag />
              <p>{user?.role}</p>
            </div>

            <div className="flex items-center gap-2">
              <FaEnvelope />
              <p>{user?.email}</p>
            </div>

            <div className="flex items-center gap-2">
              <p>Status: {user?.isActive ? "Activo" : "Inactivo"}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
