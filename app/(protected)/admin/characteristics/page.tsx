"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import ReusableTable from "@/components/ReusableTable/ReusableTable";
import { Characteristics } from "@/types/characteristics";
import { deleteCharacteristic, fetchCharacteristics } from "@/lib/actions";
import Image from "next/image";
import Hiking from "/public/hiking-converted.gif";

const CharacteristicsPage = () => {
  const [characteristics, setCharacteristics] = useState<Characteristics[]>([]);
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    const fetchData = async () => {
      if (session) {
        /* @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it */
        const token: string = session?.user?.accessToken;

        try {
          const data = await fetchCharacteristics(token);
          setCharacteristics(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching characteristics:", error);
          setError("Error fetching characteristics");
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [session]);

  // Método para redirigir al formulario de edición
  const handleEdit = (id: string) => {
    router.push(`/admin/editcharacteristic/${id}`);
  };

  // Método para eliminar una caracteristica
  const handleDelete = async (id: string | undefined) => {
    const confirmed = await confirmDelete();
    if (!confirmed || !session) return;

    /* @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it */
    const token = session?.user?.accessToken;

    try {
      const response = await deleteCharacteristic(token, id);
      if (response) {
        toast.success(response);
        setCharacteristics(
          characteristics.filter((characteristic) => characteristic.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting characteristic:", error);
    }
  };

  return (
    <div className="ml-60">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-4">Características</h1>
      {loading ? (
        <Image
          src={Hiking}
          alt="Loading..."
          width={150}
          height={150}
          className="mx-auto"
        />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ReusableTable
          items={characteristics}
          entityType="característica"
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default CharacteristicsPage;
