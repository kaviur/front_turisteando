"use client";

import ReusableSmallForm from "@/components/ReusableSmallForm/ReusableSmallForm";
import { useState, useEffect, useCallback } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Category } from "@/types/category";

const EditCategory = () => {
  const router = useRouter(); // Router para el redireccionamiento
  const pathname = usePathname();
  const categoryId = pathname.split("/").pop(); //  Obtener el ID de la URL dinámicamente
  const { data: session } = useSession(); // Obtener la sesión y el token

  const [form, setForm] = useState<Category>({
    name: "",
    description: "",
    image: {
      id: "",
      imageUrl: "",
    },
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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚ0-9\s]{3,50}$/.test(form.name)) {
      newErrors.name =
        "El nombre debe tener entre 3 y 50 caracteres y solo puede contener letras y números.";
    }

    if (form.description && !/^.{3,255}$/.test(form.description)) {
      newErrors.description =
        "La descripción debe tener entre 3 y 255 caracteres.";
    }
    
    if (
      form.image instanceof File &&
      !/\.(jpg|jpeg|png|gif|webp)$/.test(form.image.name)
    ) {
      newErrors.image =
        "El archivo debe ser una imagen válida (jpg, jpeg, png, gif, webp).";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fetch para obtener la categoría por ID
  const fetchCategory = useCallback(async () => {
    if (!categoryId) {
      console.warn("No category ID provided");
      return;
    }
    if (!session) {
      console.warn("No session available");
      return;
    }

    try {
      //@ts-ignore
      const token = session?.user?.accessToken;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/categories/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching category:", errorData);
        throw new Error(errorData.message || "Error al obtener la categoría");
      }

      const data = await response.json();
      setForm({
        name: data.data.name,
        description: data.data.description,
        image: data.data.image,
      });
    } catch (error) {
      console.error("Error fetching category:", error);
      toast.error("Error al cargar los datos de la categoría");
    }
  }, [categoryId, session]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error("Por favor, corrige los errores en el formulario.");
      return;
    }

    setIsPending(true);

    if (!session) {
      toast.error("No se encontró la sesión activa.");
      setIsPending(false);
      return;
    }

    const formData = new FormData();

    // Estructurar los datos según lo esperado por el servidor
    const category = JSON.stringify(form);
    const image = form.image;
    delete form.image;
    formData.append(
      "category",
      new Blob([category], { type: "application/json" })
    ); // Agregar el JSON en el campo "category"
    if (image) formData.append("image", image as File); // Agregar el archivo en el campo "image"

    //@ts-ignore
    const token = session?.user?.accessToken;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/categories/update/${categoryId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error("Error al crear la categoría");
      }

      toast.success("Categoría actualizada exitosamente");

      setTimeout(() => {
        setIsPending(false);
        router.push("/admin/categories");
      }, 1500);
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Error al actualizar la categoría");
    } finally {
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
          onSubmit={handleSubmit}
          handleChange={handleChange}
          errors={errors}
          isPending={isPending}
          isEditing={true}
        />
      </div>
    </>
  );
};

export default EditCategory;
