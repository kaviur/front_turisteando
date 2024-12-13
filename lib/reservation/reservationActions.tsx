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

export const getReservationsByUsers = async (
  userId: string | undefined,
  token: string
) => {
  try {
    if (!userId) {
      throw new Error("El ID de usuario es necesario para obtener reservas.");
    }

    // Construcción de la URL correcta
            
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/reservations/search-by-user?userId=${userId}`;
    console.log("URL de solicitud:", url);

    const responseGet = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!responseGet.ok) {
      const errorData = await responseGet.json();
      console.error("Error de API:", errorData);
      throw new Error(`Error ${responseGet.status}: ${errorData.debugMessage}`);
    }

    const data = await responseGet.json();
    return data.data || [];
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
    return { message: "Hubo un error al realizar la solicitud." };
  }
};

 
   


