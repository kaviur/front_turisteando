"use client";

import ReusableSmallForm from "@/components/ReusableSmallForm/ReusableSmallForm";
import { useState, useEffect, useCallback } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import UserForm from "@/components/UserForm";

const EditUser = () => {
  const router = useRouter(); // Router para el redireccionamiento
  const pathname = usePathname();
  const userId = pathname.split("/").pop(); //  Obtener el ID de la URL dinámicamente
  const { data: session } = useSession(); // Obtener la sesión y el token

  //Debemos traernos los usuarios y los que no estén activos, permitir que los active  
  const [name, setName] = useState("");
  //const [icono, setIcono] = useState<File | null>(null);
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState("");
  
  
  //const [description, setDescription] = useState("");
  const [isPending, setIsPending] = useState(false);

  // Fetch de Usuario
  const fetchUser = useCallback(async () => {
    if (!userId) {
      console.warn("No se ha provisto ID de usuario");
      return;
    }
    if (!session) {
      console.warn("Sesión no habilitada");
      return;
    }

    try {
      //@ts-ignore
      const token = session?.user?.accessToken;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error haciendo el fetching de Usuarios:", errorData);
        throw new Error(errorData.message || "Error al obtener el usuario");
      }

      const data = await response.json();
      setName(data.data.name);
      setLastName(data.data.lastName);
      setEmail(data.data.email);
      setRole(data.data.role);
      setIsActive(data.data.isActive);
      
      
    } catch (error) {
      console.error("Error haciendo el fetching Usuarios:", error);
      toast.error("Error al cargar los datos de Usuario");
    }
  }, [userId, session]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsPending(true);

    if (!session) {
      toast.error("No se encontró la sesión activa.");
      setIsPending(false);
      return;
    }

    const formData = new FormData();

    // Estructurar los datos según lo esperado por el servidor
    const user = JSON.stringify({
      name,
      lastName,
      email,
      role,
      isActive

    });
    formData.append(
      "category",
      new Blob([user], { type: "application/json" })
    ); // Agregar el JSON en el campo "category"
   
   
    //if (icono) formData.append("image", icono); // Agregar el archivo en el campo "image"

    //@ts-ignore
    const token = session?.user?.accessToken;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/update/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error("Error al actualizar el usuario");
      }

      toast.success("Usuario actualizado exitosamente");

      setTimeout(() => {
        setIsPending(false);
        router.push("/admin/categories");
      }, 1500);
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      toast.error("Error al actualizar el usuario");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="ml-96 flex justify-center">
        <Toaster position="top-center" />

        <UserForm
          entityType="user"
          name={name}
          setName={setName}
          lastName={name}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          role={role}
          setRole={setRole}
          isActive
          //description={description}
          //setDescription={setDescription}
         // icono={icono}
          //setIcono={setIcono}
          onSubmit={handleSubmit}
          isPending={isPending}
          isEditing={true}
        />
      </div>
    </>
  );
};

export default EditUser;
