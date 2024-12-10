  import { useState } from "react";
  import { createReview } from "@/lib/reviews/reviewActions";
  import { useSession } from "next-auth/react";

  const CreateReview = ({
    planId,
    isOpen,
    onClose,
    onReviewCreated,
  }: {
    planId: number;
    isOpen: boolean;
    onClose: () => void;
    onReviewCreated?: () => void;
  }) => {
    const { data: session } = useSession();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("");
    

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

      const review = { idUser: userId, planId, rating, comment };

      try {
        const result: any = await createReview(token, review);
        // Imprime la respuesta de la API para depuración
        console.log("Respuesta de la API:", result);

        // Verificamos si la respuesta fue exitosa
        if (result.success) {
          setMessage("¡Reseña creada exitosamente!");
          if (onReviewCreated) {
            onReviewCreated(); 
          }
          onClose(); 
        } else {
          if (result.errors && Array.isArray(result.errors)) {
            const duplicateReviewError = result.errors.find((error: string) =>
              error.includes('Ya has realizado una reseña')
            );

            if (duplicateReviewError) {
              setMessage("Ya has realizado una reseña para este plan turístico.");
            } else {
              // Si no encontramos el error específico, mostramos todos los errores
              setMessage(result.errors.join(' ') || "Error al crear la reseña");
            }
          } else {
            // Si no hay errores en el array, mostramos el mensaje de la API
            setMessage(result.message || "Error al crear la reseña");
          }
        }
      } catch (error) {
        console.error("Error al crear reseña:", error);
        setMessage("Hubo un error al procesar la reseña. Intenta nuevamente.");
      }
    }

    if (!session) {
      return (
        isOpen && (
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
        )
      );
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
                    <span className="label-text">Calificación (1-5):</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="input input-bordered"
                    required
                  />
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