"use server" 

import { ReqCategory, ResCategory } from "@/types/categories";


export const fetchCategories = async (): Promise<ResCategory[]> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/categories/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          "Error en la solicitud para obtener categorías:",
          errorData.error
        );
        throw new Error(
          errorData.error?.join(", ") || "Error desconocido al obtener categorías."
        );
      }
  
      const data = await response.json();
  
      if (data && Array.isArray(data.data)) {
        return data.data;
      } else {
        console.error(
          "La respuesta de la API no contiene un array de categorías:",
          data
        );
        return [];
      }
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
      return [];
    }
  };

export const createCategory = async (
  categoryData: ReqCategory,
  token: string
): Promise<ResCategory | void> => {
  const formData = new FormData();

  // Convertir los datos del formulario en JSON para el campo "category"
  const category = JSON.stringify({
    ...categoryData,
    image: undefined, // La imagen no debe incluirse en el JSON
  });

  formData.append(
    "category", 
    new Blob([category], { type: "application/json" }));

  // Si existe una imagen válida, añadirla al FormData
  if (categoryData.image instanceof File) {
    formData.append("image", categoryData.image);
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/categories/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = Array.isArray(errorData.error)
        ? errorData.error.join(", ")
        : errorData.error || "Error desconocido";

  console.error("Error al crear la categoría:", errorMessage);
  throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.data as ResCategory;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};