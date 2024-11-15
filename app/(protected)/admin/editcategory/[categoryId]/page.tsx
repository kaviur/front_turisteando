"use client";

import ReusableSmallForm from "@/components/ReusableSmallForm/ReusableSmallForm";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function EditCategory() {
  const router = useRouter();
  const { categoryId } = router.query; // Obtener el ID de la URL dinámicamente
  const { data: session } = useSession(); // Obtener la sesión y el token

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icono, setIcono] = useState<File | null>(null);
  const [isPending, setIsPending] = useState(false);

  // Fetch de la categoría
  const fetchCategory = useCallback(async () => {
    if (!categoryId || !session) return;
    try {
      {/* @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it */}
      const token = session.accessToken;
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/categories/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Error al obtener la categoría");
      const data = await response.json();
      setName(data.name);
      setDescription(data.description);
    } catch (error) {
      console.error("Error fetching category:", error);
      toast.error("Error al cargar los datos de la categoría");
    }
  }, [categoryId, session]);
  
  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

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
    const category = JSON.stringify({
      name,
      description,
    });
    formData.append("category", category); // Agregar el JSON en el campo "category"
    if (icono) formData.append("image", icono); // Agregar el archivo en el campo "image"

    {/* @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it */}
    const token = session.accessToken;

    await toast
      .promise(
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/update/${categoryId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }).then((response) => {
          if (!response.ok) throw new Error("Error al actualizar la categoría");
        }),
        {
          loading: "Actualizando...",
          success: "Actualización exitosa",
          error: "Error al actualizar la categoría",
        }
      )
      .finally(() => {
        setIsPending(false);
        router.push("/categories"); // Redirigir al listado tras actualizar
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
          isEditing={true}
        />
      </div>
    </>
  );
}
