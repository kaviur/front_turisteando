"use client";

import ReusableSmallForm from "@/components/ReusableSmallForm/ReusableSmallForm";
import { useState } from "react";
import { useSession } from "next-auth/react"; // Importar useSession para obtener el token
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Category } from "@/types/category";

export default function CreateCategory() {
  const router = useRouter();
  const { data: session } = useSession(); // Obtener la sesión y el token
  const [form, setForm] = useState<Category>({
    name: "",
    description: undefined,
    image: undefined,
  });
  console.log(form);
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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name || !/^[a-zA-ZáéíóúÁÉÍÓÚ0-9]{3,50}$/.test(form.name)) {
      newErrors.name =
        "El nombre debe tener entre 3 y 50 caracteres y solo puede contener letras y números.";
    }
    if (!form.description || !/^.{3,255}$/.test(form.description)) {
      newErrors.description =
        "La descripción debe tener entre 3 y 255 caracteres.";
    }
    if (
      !(form.image instanceof File) ||
      !/\.(jpg|jpeg|png|gif|webp)$/.test(form.image.name)
    ) {
      newErrors.image =
        "El archivo debe ser una imagen válida (jpg, jpeg, png, gif, webp).";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Función para crear una categoría
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
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
    const token = session?.user?.accessToken;

    const formToSend = { ...form };
    const image = formToSend.image as File;
    delete formToSend.image;

    const formData = new FormData();
    const category = JSON.stringify(formToSend);
    formData.append(
      "category",
      new Blob([category], { type: "application/json" })
    );
    if (image) formData.append("image", image as File); // Agregar el archivo en el campo "image"

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
            console.log(errorData);
            throw new Error("Error al crear la categoría");
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
