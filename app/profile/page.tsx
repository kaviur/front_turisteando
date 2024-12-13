import { auth } from "@/auth";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import LogoutButton from "@/components/ui/LogoutButton";
import { redirect } from "next/navigation";
import { FaUser, FaEnvelope, FaUserTag } from "react-icons/fa";

const Profile = async () => {
  const session = await auth();
  const user = session?.user;

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-4 md:mt-24">
        <h1 className="text-4xl font-bold mb-6 text-primary">Perfil</h1>

        <div className="bg-white shadow-lg rounded-xl p-8 space-y-6 transition-transform transform hover:scale-105">
          {/* Avatar de usuario */}
          <div className="flex items-center justify-start gap-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-full flex items-center justify-center text-white text-3xl font-semibold">
              {/* Mostrar iniciales o imagen de usuario */}
              <FaUser />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{user?.name}</h2>
              {/* @ts-expect-error */}
              <p className="text-sm text-gray-600">{user?.role}</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Información adicional */}
            <div className="flex items-center gap-2 text-gray-700">
              <FaUserTag className="text-lg text-primary" />
              {/* @ts-expect-error */}
              <p>{user?.role}</p>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <FaEnvelope className="text-lg text-primary" />
              <p>{user?.email}</p>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              {/* @ts-expect-error */}
              <p>Status: {user?.isActive ? "Activo" : "Inactivo"}</p>
            </div>
          </div>

          {/* Botón de Logout */}
          <div className="text-center mt-6">
            <LogoutButton />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;