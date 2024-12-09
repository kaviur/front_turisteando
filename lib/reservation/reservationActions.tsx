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
