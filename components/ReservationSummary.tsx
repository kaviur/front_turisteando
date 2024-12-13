import { IoIosCloseCircle } from "react-icons/io";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import PrimaryButton from "./ui/PrimaryButton";
import { createReservation } from "@/lib/reservation/reservationActions";
import handleBackendError from "@/utils/validators/validatorBackendErrors";
import toast from "react-hot-toast";
import { Reservation } from "@/types/reservation";

interface ReservationSummaryProps {
  onClose: () => void;
  touristPlanId: number;
  touristPlanTitle: string;
  numberOfPeople: number;
  price: number;
  seller: string;
  category: string;
  startDate: Date;
  endDate: Date;
  onReset: () => void;
}

const ReservationSummary: React.FC<ReservationSummaryProps> = ({
  onClose,
  touristPlanId,
  numberOfPeople,
  category,
  startDate,
  endDate,
  touristPlanTitle,
  price,
  seller,
  onReset,
}) => {
  const { data: session } = useSession();
  const [isPending, setIsPending] = useState(false);

  const user = session?.user;
  // @ts-expect-error: session object contains lastName, but TypeScript doesn't recognize it
  const token = session?.user?.accessToken;
  // @ts-expect-error: session object contains lastName, but TypeScript doesn't recognize it
  const lastName = user?.lastName || "Apellido de Usuario";
  const buttonText = "Confirmar Reserva";
  const categoryFormat = category === "Tours" ? "Tour" : "Actividad";
  const startDateFormatted = startDate.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const endDateFormatted = endDate.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const data: Reservation = {
    touristPlanId: touristPlanId,
    userId: Number(user?.id),
    status: true,
    startDate: startDate,
    endDate: endDate,
    peopleCount: numberOfPeople,
    totalPrice: price, 
    touristPlanTitle
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsPending(true);

    try {
      const response = await createReservation(token, data);
      if ("debugMessage" in response) {
        handleBackendError(response, "reservation");
        setIsPending(false);
      } else {
        toast.success("Reserva creada exitosamente, verifica tu email");
        
        setTimeout(() => {
          setIsPending(false);
          onClose();
          onReset();
        }, 1000);
      }
    } catch (error) {
      console.error("Error al crear la reserva:", error);

      toast.error("Error al crear la reserva. Intenta nuevamente.");
      setIsPending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fondo oscuro semiopaco */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Comprobante de reserva */}
      <div className="relative z-20 w-full max-w-md p-8 bg-white rounded-lg shadow-lg space-y-6 overflow-auto">
        <h2 className="text-2xl font-bold text-center">
          Resumen de la Reserva
        </h2>
        <div>
          <IoIosCloseCircle
            className="absolute top-4 right-4 text-primary w-6 h-6 cursor-pointer"
            onClick={onClose}
          />
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Datos del Usuario</h3>
            <p>
              <strong>Nombre:</strong> {user?.name || "Nombre de Usuario"}
            </p>
            <p>
              <strong>Apellido:</strong> {lastName || "Apellido de Usuario"}
            </p>
            <p>
              <strong>Email:</strong> {user?.email || "email@example.com"}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Detalles de la Reserva</h3>
            <p>
              <strong>Desde:</strong> {startDateFormatted}
            </p>
            <p>
              <strong>Hasta:</strong> {endDateFormatted}
            </p>
            <p>
              <strong>Precio por persona:</strong> S/. {price}
            </p>
            <p>
              <strong>Precio total:</strong> S/. {price * numberOfPeople}
            </p>
            <p>
              <strong>Número de personas: </strong>{" "}
              {`${numberOfPeople} ${
                numberOfPeople === 1 ? "persona" : "personas"
              }`}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              Detalles del Plan Turístico
            </h3>
            <p>
              <strong>Plan Turístico:</strong> {touristPlanTitle}
            </p>
            <p>
              <strong>Empresa:</strong> {seller}
            </p>
            <p>
              <strong>Categoría:</strong> {categoryFormat}
            </p>
          </div>
        </div>
        <PrimaryButton
          text={isPending ? "Guardando..." : buttonText}
          style="px-14 mx-auto block"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ReservationSummary;
