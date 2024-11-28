"use client";

import ReusableSmallForm from "@/components/ReusableSmallForm/ReusableSmallForm";
import { useState } from "react";
import { useSession } from "next-auth/react"; // Importar useSession para obtener el token
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ReqCategory } from "@/types/categories";
import handleFrontendError from "@/utils/validators/validatorFrontendErrors";
import { createCategory } from "@/lib/categories/categoryActions";

export default function CreateCategory() {
  const router = useRouter();
  const { data: session } = useSession(); // Obtener la sesión y el token
  const [form, setForm] = useState<ReqCategory>({
    name: "",
    description: undefined,
    image: undefined,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isPending, setIsPending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
    
  // Función para crear una categoría
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!handleFrontendError({ form, setErrors })) {
      toast.error("Por favor, corrige los errores en el formulario.");
      return;
    }
  
    setIsPending(true);
  
    if (!session) {
      toast.error("No se encontró la sesión.");
      setIsPending(false);
      return;
    }
  
    // @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it
    const token = session?.user.accessToken;
    console.log("token---"+token)
  
    try {
      // Mostrar un toast mientras se crea la categoría
      await toast.promise(
        createCategory(form, token),
        {
          loading: "Creando categoría...",
          success: "Categoría creada exitosamente.",
          error: "Error al crear la categoría.",
        }
      );
  
      // Redirigir después de un pequeño retraso
      setTimeout(() => {
        setIsPending(false);
        router.push("/admin/categories");
      }, 1000);
    } catch (error) {
      console.error("Error al crear la categoría:", error);
      toast.error("Hubo un problema al crear la categoría.");
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="ml-96 flex justify-center">
        <Toaster position="top-center" />
        <ReusableSmallForm
          entityType="categoría"
          form={form}
          setForm={setForm}
          handleChange={handleChange}
          errors={errors}
          onSubmit={handleSubmit}
          isPending={isPending}
          isEditing={false}
        />
      </div>
    </>
  );
}
