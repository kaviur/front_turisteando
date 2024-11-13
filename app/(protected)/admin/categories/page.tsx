"use client";

import ReusableSmallForm from "@/components/ReusableSmallForm/ReusableSmallForm";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState(""); // Estado para descripción
  const [icono, setIcono] = useState<File | null>(null); // Ícono para categoría
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsPending(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description); // Añadir descripción
    if (icono) formData.append("icono", icono); // Añadir archivo si existe

    await toast
      .promise(
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/create`, { 
          method: "POST",
          body: formData,
        }).then((response) => {
          if (!response.ok) throw new Error("Error al registrar la categoría");
        }),
        {
          loading: "Registrando...",
          success: "Registro exitoso",
          error: "Error al registrar la categoría",
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
          description={description} // Pasar el estado de descripción
          setDescription={setDescription} // Pasar la función para actualizar la descripción
          icono={icono}
          setIcono={setIcono}
          onSubmit={handleSubmit}
          isPending={isPending} 
        />
      </div>
    </>
  );
}