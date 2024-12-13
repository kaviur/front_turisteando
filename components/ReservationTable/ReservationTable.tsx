import { Reservation } from "@/types/reservation";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

type ReservationTableProps = {
  reservations: Reservation[]; // Recibir el arreglo de usuarios directamente
};

const ReservationTable: React.FC<ReservationTableProps> = ({ reservations }) => {
  const { data: session } = useSession(); // Obtener la sesión y el token

  if (!session) {
    toast.error("No se encontró la sesión activa.");
    return; // Asegurarte de que no se ejecute nada más si no hay sesión.
  }

  /* @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it */
  const token = session?.user?.accessToken;

  if (!token) {
    toast.error("Token de sesión no disponible.");
    return; // Evitar la ejecución si no hay token
  }

  // Helper para formatear fechas
  const formatDate = (date: string | Date | null | undefined) => {
    if (!date) return "Fecha no válida";
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatPrice = (price: number | undefined): string => {
    if (price === undefined) return "0,00";
    
    // Formato para separar miles con puntos y decimales con coma
    return price.toLocaleString("es-PE", {
      minimumFractionDigits: 2, // Al menos 2 decimales
      maximumFractionDigits: 2, // Máximo 2 decimales
    }).replace(",", ".");
  };

  // Ordenar las reservas por fecha de inicio (descendente)
  const sortedReservations = [...reservations].sort((a, b) => {
    const dateA = new Date(a.startDate).getTime();
    const dateB = new Date(b.startDate).getTime();
    return dateB - dateA;
  });

  return (
    <div className="flex justify-center px-5">
    <div className="rounded-sm border border-stroke bg-white shadow-default w-full max-w-6xl">
      <div className="px-6 py-6">
        <h4 className="text-2xl font-semibold text-secondary text-center">
          Detalle de las Reservas
        </h4>
      </div>
  
      <div className="grid grid-cols-10 gap-4 border-t border-stroke px-4 py-4">
        <div className="col-span-1 flex items-center">
          <p className="font-medium py-2">Producto</p>
        </div>
  
        <div className="col-span-5 flex items-center">
          <p className="font-medium py-2">Nombre del Plan</p>
        </div>
  
        <div className="col-span-1 flex items-center">
          <p className="font-medium py-2">Fecha Inicio</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium py-2">Fecha Fin</p>
        </div>
        <div className="col-span-1 flex items-center ml-4">
          <p className="font-medium py-2">Precio</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium py-2">Personas</p>
        </div>
      </div>
  
      {sortedReservations.map((reservation, key) => (
        <div
          className="grid grid-cols-10 gap-6 border-t border-stroke px-4 py-4" // Ajuste en el gap para más espacio
          key={key}
        >
          <div className="col-span-1 flex items-center">
            <div className="bg-secondary w-10 h-9 rounded-3xl flex justify-center items-center">
              <p className="text-white font-semibold text-base">
                {reservation?.touristPlanId}
              </p>
            </div>
          </div>
  
          <div className="col-span-5 flex items-center">
            <div className="w-full overflow-hidden">
              <p className="text-sm text-black italic whitespace-nowrap overflow-ellipsis">
                {reservation?.touristPlanTitle}
              </p>
            </div>
          </div>
  
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black italic">
              {formatDate(reservation?.startDate)}
            </p>
          </div>
  
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black">{formatDate(reservation?.endDate)}</p>
          </div>
  
          <div className="col-span-1 flex items-center text-center"> {/* Centrado para la columna Precio */}
            <p className="text-sm text-black">s./ {formatPrice(reservation?.totalPrice)}</p>
          </div>
  
          <div className="col-span-1 flex items-center text-center ml-6"> {/* Margin-left agregado para mover el texto a la derecha */}
            <p className="text-sm text-black text-center">{reservation?.peopleCount}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default ReservationTable;