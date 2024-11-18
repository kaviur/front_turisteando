'use client'

import { useState } from "react";
import ProductForm from "@/components/ProductForm/ProductForm";

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
  const [images, setImages] = useState<FileList | null>(null);

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
        price,
        seller: "admin", //TODO: CHANGE TO THE USER LOGGED
        cityId,
        categoryId,
        availabilityStartDate,
        availabilityEndDate,
        capacity,
        duration,
        characteristicIds
      })

      // const characteristicIds = features.map((feature) => Number(feature)); // Convertir a números si es necesario
      // formData.append("characteristicIds", JSON.stringify(characteristicIds)); // Campo único con JSON

      // characteristicIds.forEach((feature, index) => {
      //   formData.append(`characteristicIds[${index}]`, feature);
      // });

      formData.append(
        "touristPlan",
        new Blob([touristPlan], {type: "application/json"})
      ); 

      if (images) {
        Array.from(images).forEach((image) => {
          formData.append("images", image);
        });
      }

      console.log(formData)
      console.log("algo")
      console.log(touristPlan)

      const response = await fetch("/tourist-plans/create", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al crear el producto");
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
      setImages(null);
    } catch (error) {
      console.error("Error:", error);
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
  };

  return (
    <>
      <div className="ml-96 flex justify-center">
        <ProductForm {...productFormProps} />;
      </div>
    </>
  );
}
