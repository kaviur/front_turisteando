"use server" 

import { Review } from "@/types/review"; 

// Función para obtener todas las reseñas de un plan turístico
export const fetchReviewsByPlan = async (planId: number, token: string): Promise<Review[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/plan/${planId}`,  
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "Error al obtener las reseñas del plan:",
        errorData.error || "Error desconocido"
      );
      throw new Error(errorData.error?.join(", ") || "Error desconocido");
    }

    const data = await response.json();

    if (data && Array.isArray(data.data)) {
      return data.data; 
    } else {
      console.error(
        "La respuesta de la API no contiene un array de reseñas:",
        data
      );
      return []; 
    }
  } catch (error) {
    console.error("Error al obtener las reseñas:", error);
    return []; 
  }
};