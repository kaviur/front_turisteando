'use client'

import { useState } from "react";
import ProductForm from "@/components/ProductForm/ProductForm";
import { toast, Toaster } from "react-hot-toast";
import { createTouristPlan } from "@/lib/actions";
import { useSession } from "next-auth/react";

export default function CreateProductPage() {
  // Estados para manejar los datos del formulario
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

  const [remainingImagesToUpload, setRemainingImagesToUpload] = useState(5);

  // Estado adicional
  const [isPending, setIsPending] = useState(false);
  const { data: session } = useSession(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
  
    try {
      /* @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it */
      const token: string = session?.user.accessToken;
  
      const touristPlanData = {
        title,
        description,
        price: Number(price),
        seller: "seller", // TODO: Cambiar por el usuario autenticado
        cityId: Number(cityId),
        categoryId: Number(categoryId),
        availabilityStartDate,
        availabilityEndDate,
        capacity: Number(capacity),
        duration,
        characteristicIds: characteristicIds.map((id) => Number(id)),
        images: images ? Array.from(images) : null,
      };
  
      await createTouristPlan(token, touristPlanData);
  
      // Resetea el formulario si la petición fue exitosa
      setTitle("");
      setDescription("");
      setPrice("");
      setCityId("");
      setCategoryId("");
      setAvailabilityStartDate("");
      setAvailabilityEndDate("");
      setCapacity("");
      setDuration("");
      setCharacteristicIds([]);
      setImages([]);
  
      toast.success("Producto creado exitosamente!"); // Mensaje de éxito
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error instanceof Error ? error.message : "Hubo un problema al crear el producto."
      );
    } finally {
      setIsPending(false);
    }
  };

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
    onSubmit: handleSubmit,
    isPending,
    isEditing: false,
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
