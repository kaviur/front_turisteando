"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import ReusableTable from "@/components/ReusableTable/ReusableTable";
import { Characteristics } from "@/types/characteristics";

const CharacteristicsPage = () => {
  const [characteristics, setCharacteristics] = useState<Characteristics[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // Obtener el token de sesión
      // {
      //   /* @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it */
      // }
      //@ts-ignore
      const token: string = session?.user?.accessToken;

      const fetchCategories = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/characteristics/all`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          console.log(data);
          setCharacteristics(data.data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };

      fetchCategories();
    }
  }, [session]);

  // Método para redirigir al formulario de edición
  const handleEdit = (id: string) => {
    router.push(`/admin/editcharacteristic/${id}`);
  };

  // Método para eliminar una caracteristica
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar esta característica?");
    if (confirmed && session) {
      try {
        {/* @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it */}
        const token = session.accessToken;

        await toast.promise(
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/characteristics/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            if (!response.ok) throw new Error("Error al eliminar la característica");
            setCharacteristics(characteristics.filter((characteristic) => characteristic.id !== id));
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
    }
  };

  return (
    <div className="ml-60">
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