'use client'

import { useState } from "react";
import ProductForm from "@/components/ProductForm/ProductForm";
import { toast, Toaster } from "react-hot-toast";
import { createTouristPlan } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TouristPlanReq } from "@/types/touristPlanReq";
import validationsProducts from "@/utils/validators/validationsProducts";

export default function CreateProductPage() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [form, setForm] = useState<TouristPlanReq>({
    title: "",
    description: "",
    price: "",
    seller: "seller", // TODO: tomar de la sesión
    cityId: "",
    categoryId: "",
    availabilityStartDate: "",
    availabilityEndDate: "",
    capacity: 0,
    duration: "",
    characteristicIds: [],
    images: null, // Las imágenes se manejan como `FileList | null`
  });
  const [isPending, setIsPending] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación del formulario
    if (!validationsProducts({ form, setErrors })) {
      toast.error("Por favor, corrige los errores en el formulario.");
      return;
    }

    setIsPending(true);

    try {
      /* @ts-expect-error: TypeScript no reconoce `accessToken` en `session.user` */
      const token: string = session?.user?.accessToken;
    
      const touristPlanData = {
        ...form,
        price: Number(form.price),
        cityId: Number(form.cityId),
        categoryId: Number(form.categoryId),
        capacity: Number(form.capacity),
        characteristicIds: form.characteristicIds.map((id) => Number(id)),
        images: form.images ? Array.from(form.images) : null,
      };
    
      // Realiza la petición para crear el producto
      const response = await createTouristPlan(token, touristPlanData);
    
      // Si el response es un array, significa que contiene errores del backend
      if (Array.isArray(response)) {
        response.forEach((err: string) => toast.error(err));
        return;
      }
    
      // Si la respuesta es válida, muestra el mensaje de éxito y redirige
      toast.success("Producto creado exitosamente!");
      router.push("/admin/productactions");
    } catch (error) {
      console.error("El error:", error);
    
      // Muestra un error genérico si ocurre un problema inesperado
      toast.error(
        error instanceof Error
          ? error.message
          : "Hubo un problema al crear el producto."
      );
    } finally {
      setIsPending(false);
    }
  };


  return (
    <>
      <div className="ml-96 flex justify-center">
        <Toaster position="top-center" />
        <ProductForm
          form={form}
          setForm={setForm}
          errors={errors}
          setErrors={setErrors}
          onSubmit={handleSubmit}
          isPending={isPending}
          isEditing={false}
        />
      </div>
    </>
  );
}
