"use client";

import ReusableSmallForm from "@/components/ReusableSmallForm/ReusableSmallForm";
import { useState, useEffect, useCallback } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const EditCategory = () => {
  const router = useRouter(); // Router para el redireccionamiento
  const pathname = usePathname();
  const categoryId = pathname.split("/").pop(); //  Obtener el ID de la URL dinámicamente
  const { data: session } = useSession(); // Obtener la sesión y el token

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icono, setIcono] = useState<File | null>(null);
  const [isPending, setIsPending] = useState(false);

  // Fetch de la categoría
  const fetchCategory = useCallback(async () => {
    if (!categoryId) {
      console.warn("No category ID provided");
      return;
    }
    if (!session) {
      console.warn("No session available");
      return;
    }

    try {
      // @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it.
      const token = session?.user?.accessToken;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/categories/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching category:", errorData);
        throw new Error(errorData.message || "Error al obtener la categoría");
      }

      const data = await response.json();
      setName(data.data.name);
      setDescription(data.data.description);
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
    formData.append(
      "category",
      new Blob([category], { type: "application/json" })
    ); // Agregar el JSON en el campo "category"
    if (icono) formData.append("image", icono); // Agregar el archivo en el campo "image"

    // @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it.
    const token = session?.user?.accessToken;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/categories/update/${categoryId}`,
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
        throw new Error("Error al crear la categoría");
      }

      toast.success("Categoría actualizada exitosamente");

      setTimeout(() => {
        setIsPending(false);
        router.push("/admin/categories");
      }, 1500);
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Error al actualizar la categoría");
    } finally {
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
          isEditing={true}
        />
      </div>
    </>
  );
};

export default EditCategory;
