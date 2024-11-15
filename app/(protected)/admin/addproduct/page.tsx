'use client'

import { useState } from "react";
import ProductForm from "@/components/ProductForm/ProductForm";

export default function CreateProductPage() {
  // Estados para manejar los datos del formulario
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [duration, setDuration] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [images, setImages] = useState<FileList | null>(null);

  // Estado adicional
  const [isPending, setIsPending] = useState(false);

  // Función para enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("capacity", capacity);
      formData.append("duration", duration);

      features.forEach((feature, index) => {
        formData.append(`features[${index}]`, feature);
      });

      if (images) {
        Array.from(images).forEach((image) => {
          formData.append("images", image);
        });
      }

      const response = await fetch("/tourist-plans/create", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al crear el producto");
      }

      // Resetea el formulario si la petición fue exitosa
      setName("");
      setDescription("");
      setPrice("");
      setStartDate("");
      setEndDate("");
      setCapacity("");
      setDuration("");
      setFeatures([]);
      setImages(null);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="ml-96 flex justify-center">
        <ProductForm
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          price={price}
          setPrice={setPrice}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          capacity={capacity}
          setCapacity={setCapacity}
          duration={duration}
          setDuration={setDuration}
          features={features}
          setFeatures={setFeatures}
          images={images}
          setImages={setImages}
          onSubmit={handleSubmit}
          isPending={isPending}
          isEditing={false} // Siempre es falso, ya que es solo para crear
        />
      </div>
    </>
  );
}
