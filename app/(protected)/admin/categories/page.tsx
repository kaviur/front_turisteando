"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

import ReusableTable from "@/components/ReusableTable/ReusableTable";
import { ResCategory } from "@/types/categories";
import { fetchCategories, deleteCategory } from "@/lib/categories/categoryActions"; 

const CategoriesPage = () => {
  const [categories, setCategories] = useState<ResCategory[]>([]);
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const confirmDelete = async () => {
    return new Promise<boolean>((resolve) => {
      toast(
        (t) => (
          <div>
            <p>¿Estás seguro de que deseas eliminar esta categoría?</p>
            <div className="flex justify-end gap-2 mt-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(true);
                }}
              >
                Sí, eliminar
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(false);
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        ),
        { duration: Infinity } // Evita que el toast desaparezca automáticamente
      );
    });
  };

  useEffect(() => {
    if (session) {
      const loadCategories = async () => {
        try {
          const categoriesData = await fetchCategories(); // Llama al método importado
          setCategories(categoriesData);
        } catch (error) {
          setError("Error al obtener las categorías");
          console.error("Error fetching categories:", error);
        } finally {
          setLoading(false);
        }
      };

      loadCategories();
    }
  }, [session]);

  // Método para redirigir al formulario de edición
  const handleEdit = (id: string) => {
    router.push(`/admin/editcategory/${id}`);
  };

  // Método para eliminar una categoría existente
  const handleDelete = async (id: string | undefined) => {
    const confirmed = await confirmDelete();
    if (!confirmed || !session) return;
  
    /* @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it */
    const token: string = session?.user.accessToken;
  
    try {
      await toast.promise(
        (async () => {
          const deletedCategoryId = await deleteCategory(token, id); // Llama al método importado
          if (!deletedCategoryId) {
            throw new Error("Error al eliminar la categoría");
          }
          setCategories(categories.filter((category) => category.id !== id));
        })(),
        {
          loading: "Eliminando categoría...",
          success: "Categoría eliminada exitosamente",
          error: (error) => {
            // Personaliza el mensaje del toast basado en el error recibido
            if (error instanceof Error) {
              return error.message; // Mensaje lanzado desde deleteCategory
            }
            return "Error desconocido al eliminar la categoría";
          },
        }
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="ml-60">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-4">Categorías</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ReusableTable
          items={categories}
          entityType="categoría"
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default CategoriesPage;
