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

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center mb-6">
            {/* Icono de usuario y nombre */}
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mr-4">
              <FaUser className="text-white text-3xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              {/* @ts-expect-error: Error en la validación de tipos */}
              <p className="text-sm text-gray-500">{user?.role}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FaUserTag />
              {/* @ts-expect-error: Error en la validación de tipos */}
              <p>{user?.role}</p>
            </div>

            <div className="flex items-center gap-2">
              <FaEnvelope />
              <p>{user?.email}</p>
            </div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <div className="flex items-center gap-2">
              {/* @ts-expect-error: Error en la validación de tipos */}
              <p>Status: {user?.isActive ? "Activo" : "Inactivo"}</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
