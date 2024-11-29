"use server";

import { TouristPlan } from "@/types/touristPlan";

export const addFavoriteToUser = async (
  token: string,
  userId: string | undefined,
  planId: number
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tourist-plans/addFavoriteToUser`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          planId,
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Error al agregar favorito: ${res.status}`);
    }

    const response = await res.json();
    console.log("Favorito agregado:", response);
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
  }
};

// Funcion para eliminar favorito de usuario
export const deleteFavoriteToUser = async (
  token: string,
  userId: string | undefined,
  planId: number
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tourist-plans/deleteFavoriteToUser`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          planId,
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Error al eliminar favorito: ${res.status}`);
    }

    const response = await res.json();
    console.log("Favorito eliminado:", response);
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
  }
};

// Obtener todos los favoritos de un usuario
export const getFavoritesByUser = async (
  userId: string | undefined
): Promise<TouristPlan[] | undefined> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tourist-plans/allfavoritesbyuserid/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Error al obtener favoritos: ${res.status}`);
    }

    const response = await res.json();
    return response.data;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
  }
};
