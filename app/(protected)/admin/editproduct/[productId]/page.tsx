'use client'

import React from "react";
import { useState, useEffect } from "react";
import ProductForm from "@/components/ProductForm/ProductForm";
import { toast, Toaster } from "react-hot-toast";
import { updateTouristPlan } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function EditProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = React.use(params); 

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState(""); 
  const [cityId, setCityId] = useState("");
  const [availabilityStartDate, setAvailabilityStartDate] = useState("");
  const [availabilityEndDate, setAvailabilityEndDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [duration, setDuration] = useState("");
  const [characteristicIds, setCharacteristicIds] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<{ id: number; imageUrl: string }[]>([]);// URLs actuales
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]); // URLs de imágenes eliminadas
  const [remainingImagesToUpload, setRemainingImagesToUpload] = useState(0);

  // Estado adicional
  const [isPending, setIsPending] = useState(false);
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

        console.log(data)

        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
        setCategoryId(data.category.id);
        setCityId(data.city.id);
        setAvailabilityStartDate(data.availabilityStartDate);
        setAvailabilityEndDate(data.availabilityEndDate);
        setCapacity(data.capacity);
        setDuration(data.duration);
        setCharacteristicIds(
          (data.characteristic || []).map((char: { id: number }) => String(char.id))
        );
        setExistingImages(data.images || []);

        setIsPending(false); // Finaliza la carga
      } catch (error) {
        console.error("Error al obtener los datos del plan:", error);
        setIsPending(false); // Finaliza la carga incluso si hay error
      }
    };

    fetchProductData();
  }, [productId]); // Se ejecuta cuando el id cambia

  
  // Manejar la eliminación de imágenes existentes
  const handleDeleteImage = (imageUrl: string) => {
    setImagesToDelete((prev) => [...prev, imageUrl]); // Agrega la URL al array de eliminadas
    setExistingImages((prev) => prev.filter((image) => image.imageUrl !== imageUrl)); // Elimina el objeto correspondiente
    // Incrementa el contador de imágenes faltantes
    setRemainingImagesToUpload((prev) => prev + 1);
  };

  // Función para enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
  
    try {
      /* @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it */
      const token: string = session?.user?.accessToken;
  
      const touristPlanData = {
        title,
        description,
        price: Number(price),
        seller: "SELLER", // TODO: Cambiar por el usuario autenticado
        cityId: Number(cityId),
        categoryId: Number(categoryId),
        availabilityStartDate,
        availabilityEndDate,
        capacity: Number(capacity),
        duration,
        characteristicIds: characteristicIds.map((id) => Number(id)),
        images: images ? Array.from(images) : null,
        imagesToDelete,
      };
  
      await updateTouristPlan(token, productId, touristPlanData);
  
      toast.success("Producto editado exitosamente!");
      // Redirigir a admin/productactions después del éxito
      router.push("/admin/productactions");

    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error instanceof Error ? error.message : "Hubo un problema al editar el producto."
      );
    } finally {
      setIsPending(false);
    }
  };

   // Props para el formulario
   const productFormProps = {
    title,
    setTitle,
    description,
    setDescription,
    price,
    setPrice,
    cityId,
    setCityId,
    categoryId,
    setCategoryId,
    availabilityStartDate,
    setAvailabilityStartDate,
    availabilityEndDate,
    setAvailabilityEndDate,
    capacity,
    setCapacity,
    duration,
    setDuration,
    characteristicIds,
    setCharacteristicIds,
    images,
    setImages,
    existingImages, // Pasa las imágenes actuales al formulario
    handleDeleteImage, // Función para eliminar imágenes
    onSubmit: handleSubmit,
    isPending,
    isEditing: true,
    remainingImagesToUpload,
    setRemainingImagesToUpload
  };

  return (
    <>
      <div className="ml-96 flex justify-center">
        <Toaster position="top-center" />
        <ProductForm {...productFormProps} />;
      </div>
    </>
  );
}
