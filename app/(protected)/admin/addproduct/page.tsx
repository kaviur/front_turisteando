'use client'

import { useState } from "react";
import ProductForm from "@/components/ProductForm/ProductForm";
import { toast, Toaster } from "react-hot-toast";

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
        `${process.env.NEXT_PUBLIC_BASE_URL}/tourist-plans/create`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json(); // Parseamos la respuesta del backend
        if (errorData.errors && Array.isArray(errorData.errors)) {
          // Iteramos sobre los errores y mostramos un toast por cada uno
          errorData.errors.forEach((err: string) => {
            toast.error(err); // Mostramos cada error como toast
          });
        }
        throw new Error("Error al crear el producto.");
      }
  
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
      toast.error("Hubo un problema al crear el producto.");
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
