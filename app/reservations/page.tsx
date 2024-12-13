"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Reservation } from "@/types/reservation";
import ReservationTable from "@/components/ReservationTable/ReservationTable";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getReservationsByUsers } from "@/lib/reservation/reservationActions";

export default function Home() {
  const [reservation, setReservation] = useState<Reservation[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchReservations = async () => {
      if (!session) return; // Si no hay sesión, no hacemos la solicitud.

      /* @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it */
      const token: string = session?.user?.accessToken;
      const userId: string | undefined = session?.user?.id;

      try {
        const response = await getReservationsByUsers(userId, token);

        // Verificamos la respuesta y actualizamos el estado
        if (response === null) {
          setError("No se encontraron reservas para este usuario.");
          setReservation([]);
        } else if (Array.isArray(response) && response.length > 0) {
          setReservation(response);
        } else {
          if (reservation.length=== 0 ) {
            setError("Aún No tiene reservas."); 
          }else{
          setError("Hubo un problema al obtener las reservas.");
          }
          setReservation([]);
        }
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
        setError("Hubo un error al realizar la solicitud.");
        setReservation([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [session, reservation]);

  return (
    <>
      <Navbar />
      <div className="ml-60">
        <div className="flex justify-between items-center mt-5 mb-14">
          <span className="text-4xl font-bold flex items-center">
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z" />
              <path d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z" />
              <path d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z" />
              <path d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z" />
            </svg>
            <h1 className="pl-2">Reservas por Usuario</h1>
          </span>
        </div>
        <div className="flex justify-center">
          {loading ? (
            <p>Loading...</p>
          )   : reservation.length === 0 ? ( // Aquí agregamos la validación
            <p className="text-center text-xl font-semibold text-gray-500">
              No tiene Reservaciones en este momento.
            </p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ReservationTable reservations={reservation} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}