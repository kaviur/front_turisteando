"use server";

import { Reservation } from "@/types/reservation";

// Funcion para crear una reserva
export const createReservation = async (
  token: string,
  reservation: Reservation
): Promise<Reservation | { message: string; debugMessage: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/reservations/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reservation),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData)
      return {
        message: "Error al crear la reserva",
        debugMessage: errorData.debugMessage || "Error desconocido",
      };
    }

    const data = await response.json();

    if (data.success && data.data) {
      return data.data;
    } else {
      return {
        message: "Error al crear la reserva",
        debugMessage: data.debugMessage || "Error desconocido",
      };
    }
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    throw new Error("Error al crear la reserva");
  }
};

export const obtenerReservasDelUsuario = async (
  usuarioId: number,
  token: string
): Promise<Reservation[] | { message: string; debugMessage: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/reservations/search-by-user?userId=${usuarioId}`,
      //`http://localhost:8080/api/reservations/search-by-user?userId=${usuarioId}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // Agregar el token en el encabezado
        },
      }
    );

    // Si la respuesta no es exitosa, maneja el error
    if (!response.ok) {
      const errorData = await response.json();  // Captura la respuesta de error
      console.log(errorData);
      return {
        message: "Error al obtener las reservas",
        debugMessage: errorData.debugMessage || "Error desconocido",
      };
    }

    // Obtener los datos de la respuesta
    const data = await response.json();

    // Verificar si la respuesta contiene un arreglo de reservas
    if (data && Array.isArray(data.data)) {
      return data.data;  // Retorna el arreglo de reservas
    } else {
      console.error("La respuesta no contiene un arreglo de reservas válido");
      return {
        message: "Error al obtener las reservas",
        debugMessage: "La respuesta no contiene un arreglo de reservas válido",
      };
    }

  } catch (error) {
    console.error("Error al obtener las reservas:", error);
    return {
      message: "Error al obtener las reservas",
      debugMessage: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};