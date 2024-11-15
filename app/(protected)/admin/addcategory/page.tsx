"use client";

import ReusableSmallForm from "@/components/ReusableSmallForm/ReusableSmallForm";
import { useState } from "react";
import { useSession } from "next-auth/react"; // Importar useSession para obtener el token
import { toast, Toaster } from "react-hot-toast";

export default function CreateCategory() {
  const { data: session } = useSession(); // Obtener la sesión y el token
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icono, setIcono] = useState<File | null>(null);
  const [isPending, setIsPending] = useState(false);

  // Función para crear una categoría
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsPending(true);

    if (!session) {
      toast.error("No se encontró la sesión.");
      setIsPending(false);
      return;
    }

    // @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it
    const token = session.accessToken; 

    const formData = new FormData();
    const category = JSON.stringify({
      name,
      description,
    });
    formData.append("category", category); // Agregar el JSON en el campo "category"
    if (icono) formData.append("image", icono); // Agregar el archivo en el campo "image"

    await toast
      .promise(
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/create`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }).then((response) => {
          if (!response.ok) throw new Error("Error al crear la categoría");
        }),
        {
          loading: "Creando categoría...",
          success: "Categoría creada exitosamente",
          error: "Error al crear la categoría",
        }
      )
      .finally(() => {
        setIsPending(false);
      });
  };

  return (
    <>
      <div className="ml-96 flex justify-center">
        <Toaster position="top-center" />
        <ReusableSmallForm
          entityType="categoría"
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          icono={icono}
          setIcono={setIcono}
          onSubmit={handleSubmit}
          isPending={isPending}
        />
      </div>
    </>
  );
}
