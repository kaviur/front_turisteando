"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import ReusableTable from "@/components/ReusableTable/ReusableTable";
import { Category } from "@/types/category";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // Obtener el token de sesión
      {/* @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it */}
      const token = session.accessToken;

      // Fetch para obtener las categorías
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Datos recibidos:", data);
          setCategories(data);
        })
        .catch((error) => console.error("Error fetching categories:", error));
    }
  }, [session]);

  // Método para redirigir al formulario de edición
  const handleEdit = (id: string) => {
    router.push(`/admin/editcategory/${id}`);
  };

  // Método para eliminar una categoría
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar esta categoría?");
    if (confirmed && session) {
      try {
        {/* @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it */}
        const token = session.accessToken;

        await toast.promise(
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            if (!response.ok) throw new Error("Error al eliminar la categoría");
            setCategories(categories.filter((category) => category.id !== id));
          }),
          {
            loading: "Eliminando categoría...",
            success: "Categoría eliminada exitosamente",
            error: "Error al eliminar la categoría",
          }
        );
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Categorías</h1>
      <ReusableTable
        items={categories}
        entityType="categoría"
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CategoriesPage;
