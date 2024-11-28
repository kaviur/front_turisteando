"use client";

import ReusableSmallForm from "@/components/ReusableSmallForm/ReusableSmallForm";
import { useState, useEffect, useCallback } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ReqCategory } from "@/types/categories";
import handleFrontendError from "@/utils/validators/validatorFrontendErrors";
import handleBackendError from "@/utils/validators/validatorBackendErrors";
import { fetchCategoryById, editCategory } from "@/lib/categories/categoryActions";

const EditCategory = () => {
  const router = useRouter(); // Router para el redireccionamiento
  const pathname = usePathname();
  const categoryId = pathname.split("/").pop(); //  Obtener el ID de la URL dinámicamente
  const { data: session } = useSession(); // Obtener la sesión y el token

  const [form, setForm] = useState<ReqCategory>({
    name: "",
    description: "",
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

  const fetchCategory = useCallback(async () => {
    if (!categoryId || !session) return;

    try {
      const data = await fetchCategoryById(categoryId);
      setForm({ ...data });
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
  
    if (!handleFrontendError({ form, setErrors })) {
      toast.error("Por favor, corrige los errores en el formulario.");
      return;
    }
  
    setIsPending(true);
  
    if (!session) {
      toast.error("No se encontró la sesión activa.");
      setIsPending(false);
      return;
    }
  
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
    } // Agregar el archivo si existe
  
    /* @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it */
    const token = session?.user?.accessToken;
  
    try {
      const response = await editCategory(token, formData, categoryId);
  
      if ("debugMessage" in response) {
        handleBackendError(response);
  
        toast.error(response.message);
        setIsPending(false);
      } else {
        toast.success("Categoría actualizada exitosamente");
  
        setTimeout(() => {
          setIsPending(false);
          router.push("/admin/categories");
        }, 1000);
      }
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
  
      toast.error("Error al actualizar la categoría. Intenta nuevamente.");
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
