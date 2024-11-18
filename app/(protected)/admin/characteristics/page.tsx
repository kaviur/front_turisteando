"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import ReusableTable from "@/components/ReusableTable/ReusableTable";
import { Characteristics } from "@/types/characteristics";

const CharacteristicsPage = () => {
  const [characteristics, setCharacteristics] = useState<Characteristics[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  const confirmDelete = async () => {
    return new Promise<boolean>((resolve) => {
      toast(
        (t) => (
          <div>
            <p>¿Estás seguro de que deseas eliminar esta característica?</p>
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
      /* @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it */
      const token: string = session?.user?.accessToken;

      const fetchCharacteristic = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/characteristics/all`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          setCharacteristics(data.data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };

      fetchCharacteristic();
    }
  }, [session]);

  // Método para redirigir al formulario de edición
  const handleEdit = (id: string) => {
    router.push(`/admin/editcharacteristic/${id}`);
  };

  // Método para eliminar una caracteristica
  const handleDelete = async (id: string) => {
    const confirmed = await confirmDelete();
    if (!confirmed || !session) return;

    /* @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it */
    const token = session?.user?.accessToken;

    try {
      await toast.promise(
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/characteristics/delete/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          if (!response.ok)
            throw new Error("Error al eliminar la característica");
          setCharacteristics(
            characteristics.filter((characteristic) => characteristic.id !== id)
          );
        }),
        {
          loading: "Eliminando caracteristica...",
          success: "Característica eliminada exitosamente",
          error: "Error al eliminar la caracteristica",
        }
      );
    } catch (error) {
      console.error("Error deleting characteristic:", error);
    }
  };

  return (
    <div className="ml-60">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-4">Características</h1>
      <ReusableTable
        items={characteristics}
        entityType="característica"
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CharacteristicsPage;
