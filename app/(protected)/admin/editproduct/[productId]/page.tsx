'use client'

import React from "react";
import { useState, useEffect } from "react";
import ProductForm from "@/components/ProductForm/ProductForm";
import { toast, Toaster } from "react-hot-toast";

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
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]); // URLs eliminadas
  const [remainingImagesToUpload, setRemainingImagesToUpload] = useState(0);

  // Estado adicional
  const [isPending, setIsPending] = useState(false);
  
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
      const formData = new FormData();
      const touristPlan = JSON.stringify({
        title,
        description,
        price: Number(price),
        seller: "admin", //TODO: CHANGE TO THE USER LOGGED
        cityId: Number(cityId),
        categoryId: Number(categoryId),
        availabilityStartDate,
        availabilityEndDate,
        capacity: Number(capacity),
        duration,
        characteristicIds: characteristicIds.map((id) => Number(id)),
        imagesToDelete,
      });
  
      formData.append(
        "touristPlan",
        new Blob([touristPlan], { type: "application/json" })
      );
  
      if (images) {
        Array.from(images).forEach((image) => {
          formData.append("images", image);
        });
      }
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tourist-plans/update/${productId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors && Array.isArray(errorData.errors)) {
          errorData.errors.forEach((err: string) => toast.error(err));
        }
        throw new Error("Error al editar el plan turístico.");
      }

      toast.success("Producto editado exitosamente!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Hubo un problema al editar el producto.");
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
