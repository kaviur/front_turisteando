"use client";

import ReusableSmallForm from "@/components/ReusableSmallForm/ReusableSmallForm";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function Home() {

  const [name, setName] = useState("");
  const [icono, setIcono] = useState<File | null>(null);  // Para manejar el archivo de ícono
  const [description, setDescription] = useState("");      // Agregamos descripción
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsPending(true);

    const formData = new FormData();
    formData.append("name", name);
    if (icono) formData.append("icono", icono);  // Añadir archivo si existe
    if (description) formData.append("description", description);

    await toast
      .promise(
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/characteristic/create`, {
          method: "POST",
          body: formData,
        }).then((response) => {

          console.log (response);
          if (!response.ok) throw new Error("Error al registrar la característica");
        }),
        {
          loading: "Registrando...",
          success: "Registro exitoso",
          error: "Error al registrar la característica",
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
          entityType="característica"
          name={name}
          setName={setName}
          icono={icono}
          setIcono={setIcono}
          description={description}
          setDescription={setDescription}
          onSubmit={handleSubmit}
          isPending={isPending}  // Pasar isPending al formulario
          isEditing={false}
        />
      </div>
    </>
  );
}