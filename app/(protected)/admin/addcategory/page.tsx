"use client";

import ReusableSmallForm from "@/components/ReusableSmallForm/ReusableSmallForm";
import { useState } from "react";
import { useSession } from "next-auth/react"; // Importar useSession para obtener el token
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreateCategory() {
  const router = useRouter();
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
    const token = session?.user?.accessToken;

    const formData = new FormData();
    const category = JSON.stringify({
      name,
      description,
    });
    formData.append(
      "category",
      new Blob([category], { type: "application/json" })
    );
    if (icono) formData.append("image", icono);

    try {
      // Hacer la solicitud y mostrar el toast de carga
      await toast.promise(
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/create`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }).then(async (response) => {
          if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            throw new Error("Error al crear la categoría");
          }
        }),
        {
          loading: "Creando categoría...",
          success: "Categoría creada exitosamente",
          error: "Error al crear la categoría",
        }
      );

      setTimeout(() => {
        setIsPending(false);
        router.push("/admin/categories");
      }, 1000);
    } catch (error) {
      console.log(error);
      setIsPending(false);
    }
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
          isEditing={false}
        />
      </div>
    </>
  );
}
