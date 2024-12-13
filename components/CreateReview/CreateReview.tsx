  import { useState } from "react";
  import { createReview } from "@/lib/reviews/reviewActions";
  import { useSession } from "next-auth/react";
  import { Review } from "@/types/review"; 
  import { TouristPlan } from "@/types/touristPlan";
  import { TouristPlanReq } from "@/types/touristPlanReq";
  import { updateTouristPlan } from "@/lib/actions";
  import { toast } from "react-hot-toast";

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

  const CreateReview = ({ plan, isOpen, onClose, onReviewCreated }: {
    plan: TouristPlan;
    isOpen: boolean;
    onClose: () => void;
    onReviewCreated?: (() => void | null) | undefined;
}): JSX.Element | null => {
    const { data: session } = useSession();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("");
    const [hoveredStar, setHoveredStar] = useState<number>(0);  // Para manejar la estrella resaltada al pasar el mouse
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!session || !session.user) {
        setMessage("Debes estar autenticado para dejar una reseña.");
        return;
      }
      //@ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it
      const token = session?.user.accessToken;
      const userId = Number(session.user.id);

      if (isNaN(userId)) {
        setMessage("ID de usuario no válido.");
        return;
      }

      const review = { idUser: userId, planId: plan.id, rating, comment };

      try {
        const result: CreateReviewResult = await createReview(token, review);
        // Imprime la respuesta de la API para depuración
        console.log("Respuesta de la API:", result);

        // Verificamos si la respuesta fue exitosa
        if (result.success) {
          toast.success("¡Reseña creada exitosamente!");
          // Aquí actualizamos el plan
          if (plan) {  // Aseguramos que tenemos el plan para actualizar
            const updatedRating = ((plan.rating ?? 0) * (plan.totalReviews ?? 0) + rating) / ((plan.totalReviews ?? 0) + 1);
            const updatedTotalReviews = (plan.totalReviews ?? 0) + 1;
            const updatedTotalStars = updatedRating * updatedTotalReviews;

            // Transformamos el objeto plan a TouristPlanReq
            const updatedPlanReq: TouristPlanReq = {
              title: plan.title,
              description: plan.description,
              price: plan.price,
              seller: plan.seller,
              cityId: plan.city.id,  // Extraemos el ID de la ciudad
              categoryId: plan.category.id,  // Extraemos el ID de la categoría
              availabilityStartDate: plan.availabilityStartDate,
              availabilityEndDate: plan.availabilityEndDate,
              capacity: plan.capacity,
              duration: plan.duration,
              characteristicIds: plan.characteristic.map((char) => char.id),  // Extraemos los IDs de las características
              images: null,  // Si no se van a actualizar imágenes, podemos enviar null
              rating: updatedRating,  // El nuevo rating calculado
              totalReviews: updatedTotalReviews,  // Total de reseñas actualizado
              totalStars: updatedTotalStars,  // Total de estrellas actualizado
            };

            // Ahora hacemos el update del plan con los nuevos valores
            await updateTouristPlan(token, plan.id.toString(), updatedPlanReq);

            console.log("Plan actualizado exitosamente!");

            if (onReviewCreated) {
              onReviewCreated();
            }
            onClose();
          }
        } else {
          // Manejo de errores de la respuesta
          setMessage(result.message || "Error al crear la reseña");
        }
      } catch (error) {
        console.error("Error al crear reseña:", error);
        setMessage("Hubo un error al procesar la reseña. Intenta nuevamente.");
      }
    };

    if (!session) {
      return isOpen ? (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="font-bold text-lg">Deja tu Reseña</h2>
            <p className="text-sm text-red-500 mt-2">
              Debes iniciar sesión para dejar una reseña.
            </p>
            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      ) : null;
    }

    return (
      <>
        {isOpen && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="font-bold text-lg">Deja tu Reseña</h2>
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Calificación:</span>
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        onClick={() => setRating(star)} // Actualiza el rating cuando se hace clic
                        onMouseEnter={() => setHoveredStar(star)} // Cambia el estado de hover al pasar el ratón
                        onMouseLeave={() => setHoveredStar(0)} // Restablece el hover cuando el ratón se va
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-8 h-8 cursor-pointer ${rating >= star || hoveredStar >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 15.27l4.18 2.73-1.64-5.44 4.5-3.79-5.5-.42L10 0 7.46 8.35l-5.5.42 4.5 3.79L5.82 18z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
                
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Comentario:</span>
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="textarea textarea-bordered"
                    maxLength={200}
                    required
                  />
                </div>
                
                {message && <p className="text-sm text-red-500 mt-2">{message}</p>}
                
                <div className="modal-action">
                  <button type="submit" className="btn btn-primary">
                    Enviar Reseña
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={onClose} 
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  };

  export default CreateReview;  