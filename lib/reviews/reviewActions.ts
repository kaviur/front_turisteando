"use server" 

import { Review } from "@/types/review"; 

interface CreateReviewResponse {
  success: true;
  review: Review;  // Aquí agregas el tipo de reseña que esperas
}

interface CreateReviewError {
  success: false;
  message: string;  // El mensaje de error que devuelve la API
}

type CreateReviewResult =
  | CreateReviewResponse  // Caso de éxito
  | CreateReviewError;    // Caso de error

// Función para obtener todas las reseñas de un plan turístico
export const fetchReviewsByPlan = async (planId: number): Promise<Review[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/plan/${planId}`,  
      //`http://localhost:8080/api/reviews/plan/${planId}`,  

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
        "Error al obtener las reseñas del plan:",
        errorData || "Error desconocido"
      );
      throw new Error(errorData.error?.join(", ") || "Error desconocido");
    }

    const data = await response.json();

    if (data && Array.isArray(data.data)) {
      return data.data; 
    } else {
      console.error( "La respuesta de la API no contiene un array de reseñas:", data );
      return []; 
    }
  } catch (error) {
    console.error("Error al obtener las reseñas:", error);
    return []; 
  }
};

// Función para obtener todas las reseñas 
export const fetchAllReviews = async (): Promise<Review[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/all`,  
      //`http://localhost:8080/api/reviews/all`,  

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
        "Error al obtener las reseñas",
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

//Función para crear una reseña 
export const createReview = async (
  token: string,
  review: { idUser: number; planId: number; rating: number; comment: string }
): Promise<CreateReviewResult> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/create`, {
   // const response = await fetch(`http://localhost:8080/api/reviews/create`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(review), 
    });

    const data = await response.json();
    //console.log('Respuesta de la API:', data);

    if (response.ok) {
      return { success: true, review: data.data };
    } else {
      return { success: false, message: data.message || "Error al crear la reseña" };
    }
  } catch (error) {
    console.error("Error al crear la reseña:", error);
    return { success: false, message: "Error desconocido" };
  }
};

// Función para obtener las reseñas de un plan turístico y verificar si el usuario ya dejó una reseña
export const fetchReviewsByPlanAndCheckUserReview = async (planId: number, userId: number): Promise<{ reviews: Review[], userHasReview: boolean }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/plan/${planId}`,
      //`http://localhost:8080/api/reviews/plan/${planId}`,

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error al obtener las reseñas del plan:", errorData.error || "Error desconocido");
      throw new Error(errorData.error?.join(", ") || "Error desconocido");
    }

    const data = await response.json();

    // Comprobamos que la respuesta contiene las reseñas
    if (data && Array.isArray(data.data)) {
      // Verificamos si el usuario ya dejó una reseña
      const userHasReview = data.data.some((review: Review) => review.user.id === userId);

      return {
        reviews: data.data,
        userHasReview,
      };
    } else {
      console.error("La respuesta de la API no contiene un array de reseñas:", data);
      return {
        reviews: [],
        userHasReview: false,
      };
    }
  } catch (error) {
    console.error("Error al obtener las reseñas:", error);
    return {
      reviews: [],
      userHasReview: false,
    };
  }
};