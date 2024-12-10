'use client'

import React from "react";
import { useState, useEffect } from "react";
import ProductForm from "@/components/ProductForm/ProductForm";
import { toast, Toaster } from "react-hot-toast";
import { updateTouristPlan } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TouristPlanReq } from "@/types/touristPlanReq";
import validationsProducts from "@/utils/validators/validationsProducts";

export default function EditProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = React.use(params); 

  const [form, setForm] = useState<TouristPlanReq>({
    title: "",
    description: "",
    price: "",
    seller: "seller",
    cityId: "",
    categoryId: "",
    availabilityStartDate: "",
    availabilityEndDate: "",
    capacity: 0,
    duration: "",
    characteristicIds: [],
    images: null,
  });

  const [existingImages, setExistingImages] = useState<{ id: number; imageUrl: string }[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsPending(true);

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tourist-plans/${productId}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del plan");
        }

        const { data } = await response.json();

        setForm({
          title: data.title,
          description: data.description,
          price: data.price,
          seller: "seller",
          cityId: data.city.id,
          categoryId: data.category.id,
          availabilityStartDate: data.availabilityStartDate,
          availabilityEndDate: data.availabilityEndDate,
          capacity: data.capacity,
          duration: data.duration,
          characteristicIds: (data.characteristic || []).map((char: { id: number }) => char.id),
          images: null,
        });
        setExistingImages(data.images || []);
        setIsPending(false);
      } catch (error) {
        console.error("Error al obtener los datos del plan:", error);
        setIsPending(false);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validación del formulario
    if (!validationsProducts({ form, setErrors })) {
      toast.error("Por favor, corrige los errores en el formulario.");
      return;
    }
  
    setIsPending(true);
  
    try {
      /* @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it */
      const token: string = session?.user?.accessToken;
  
      const touristPlanData = {
        ...form,
        price: Number(form.price),
        cityId: Number(form.cityId),
        categoryId: Number(form.categoryId),
        capacity: Number(form.capacity),
        characteristicIds: form.characteristicIds.map((id) => Number(id)),
        images: form.images ? Array.from(form.images) : null,
        imagesToDelete,  // Añadir las imágenes a eliminar si están presentes
      };
  
      const response = await updateTouristPlan(token, productId, touristPlanData);
  
      // Si la respuesta es un array, significa que contiene errores del backend
      if (Array.isArray(response)) {
        response.forEach((err: string) => toast.error(err));  // Mostrar cada error
        return;
      }
  
      toast.success("Producto editado exitosamente!");
      router.push("/admin/productactions");
    } catch (error) {
      console.error("Error:", error);
  
      toast.error(
        error instanceof Error
          ? error.message
          : "Hubo un problema al editar el producto, inténtalo más tarde"
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
          existingImages={existingImages}
          setExistingImages={setExistingImages}
          setImagesToDelete={setImagesToDelete}
          errors={errors}
          setErrors={setErrors}
          onSubmit={handleSubmit}
          isPending={isPending}
          isEditing={true}
        />
      </div>
    </>
  );
}
