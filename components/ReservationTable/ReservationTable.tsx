import { Reservation } from "@/types/reservation";
import { useSession } from "next-auth/react";

import { toast} from "react-hot-toast";
//import { ReservationActions } from "@/lib/user/reservationActions";

type ReservationTableProps = {
  reservations: Reservation[]; // Recibir el arreglo de usuarios directamente

}

const ReservationTable: React.FC<ReservationTableProps> = ({ reservations}) => {
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



  return (

   

  
    <div className="rounded-sm border border-stroke bg-white shadow-default">
      <div className="px-4 py-6 md:px-6 xl:px-7">
        <h4 className="text-2xl font-semibold text-secondary">Detalle de las Reservas</h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4 sm:grid-cols-7 md:px-6 2xl:px-7">
        <div className="col-span-1 flex items-center">
          <p className="font-medium py-2">Producto</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex ml-6">
          <p className="font-medium py-2">Fecha Inicio</p>
        </div>
        <div className="col-span-1 flex items-center ml-6">
          <p className="font-medium py-2">Fecha Fin</p>
        </div>
        <div className="col-span-2 flex items-center ml-6">
          <p className="font-medium">Precio</p>
        </div>
        <div className="col-span-1 flex items-center ml-6">
          <p className="font-medium py-2">Cantidad de Personas</p>
        </div>
        <div className="col-span-1 flex items-center ml-6 justify-end">
          <p className="font-medium py-2"></p>
        </div>
      </div>

  
      {reservations.map((reservation, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4 sm:grid-cols-7 md:px-6 2xl:px-7"
          key={key}
        >
          <div className="col-span-1 flex items-center ">
            <div className="bg-secondary w-10 h-9 rounded-3xl flex justify-center items-center">
              <p className="text-white font-semibold text-base">
                {reservation?.userId}

               {/* {reservation?.lastName?.charAt(0).toUpperCase()}*/}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center ml-6">
            <p className="text-sm text-black italic">{reservation?.peopleCount}</p>
          </div>
          <div className="col-span-1 flex items-center ml-6">
            <p className="text-sm text-black">{reservation?.peopleCount}</p>
          </div>
          <div className="col-span-2 flex items-center ml-6">
            <p className="text-sm text-black">{reservation?.peopleCount}</p>
          </div>

          
         
        </div>
      ))}
    </div>
  );
};

export default ReservationTable;