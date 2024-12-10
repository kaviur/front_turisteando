"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchReviewsByPlan } from "@/lib/reviews/reviewActions";
import { obtenerReservasDelUsuario } from "@/lib/reservation/reservationActions";

interface ButtonReviewProps {
  planId: number;
  onClick: () => void; // Acción a realizar cuando el botón es clickeado
  isReviewCreated: boolean;
}

const ButtonReview = ({ planId, onClick, isReviewCreated }: ButtonReviewProps) => {
  const { data: session } = useSession();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkConditions = async () => {
      if (!session || !session.user) {
        setIsButtonDisabled(true);
        setLoading(false);
        return;
      }

      //@ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it
      const token = session.user.accessToken;
      const userId = Number(session.user.id);

      if (isNaN(userId)) {
        setIsButtonDisabled(true);
        setLoading(false);
        return;
      }

      try {
        // Verificar si el usuario tiene reservas para el plan
        const reservas = await obtenerReservasDelUsuario(userId, token);
        console.log("Reservas del usuario:", reservas);
        console.log(reservas);
        const tieneReserva =
          Array.isArray(reservas) &&
          reservas.some((reserva) => reserva.touristPlanId === planId);
          console.log(tieneReserva);

       // Verificar si el usuario ya dejó una reseña para el plan
       const reviews = await fetchReviewsByPlan(planId);
       const userHasReview = reviews.some((review) => review.user.id === userId);

       // Deshabilitar el botón si no tiene reservas o ya dejó una reseña
       setIsButtonDisabled(!tieneReserva || userHasReview || isReviewCreated) ;
     } catch (error) {
       console.error("Error al verificar condiciones:", error);
       setIsButtonDisabled(true);
     } finally {
       setLoading(false);
     }
   };

   checkConditions();
 }, [planId, session, isReviewCreated]);

 if (loading) {
   return <button className="btn btn-disabled">Cargando...</button>;
 }

 return (
   <button
     className={`btn ${isButtonDisabled ? "btn-disabled" : "btn-primary"}`}
     onClick={onClick}
     disabled={isButtonDisabled}
   >
     Crear Reseña
   </button>
 );
};

export default ButtonReview;