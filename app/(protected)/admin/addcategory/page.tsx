"use client";

import ReusableSmallForm from "@/components/ReusableSmallForm/ReusableSmallForm";
import { useState } from "react";
import { useSession } from "next-auth/react"; // Importar useSession para obtener el token
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Category } from "@/types/category";
import handleFrontendError from "@/utils/validators/validatorFrontendErrors";
import handleBackendError from "@/utils/validators/validatorBackendErrors";

export default function CreateCategory() {
  const router = useRouter();
  const { data: session } = useSession(); // Obtener la sesión y el token
  const [form, setForm] = useState<Category>({
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
    const token = session?.accessToken;

    // Estructurar los datos según lo esperado por el servidor
    const category = JSON.stringify({
      ...form,
      image: undefined,
    });
    const formData = new FormData();
    formData.append(
      "category",
      new Blob([category], { type: "application/json" })
    ); // Agregar el JSON en el campo "category"

    if (form.image instanceof File) {
      formData.append("image", form.image);
    } // Agregar el archivo en el campo "image"

    try {
      // Hacer la solicitud y mostrar el toast de carga
      await toast.promise(
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/create`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }).then(async (response) => {
          if (!response.ok) {
            const errorData = await response.json();
            handleBackendError(errorData);
          }
        }),
        {
          loading: "Creando categoría...",
          success: "Categoría creada exitosamente",
          error: "Error al crear la categoría",
        }
      );

      setTimeout(() => {
        setIsPending(false);
        router.push("/admin/categories");
      }, 1000);
    } catch (error) {
      console.log(error);
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
