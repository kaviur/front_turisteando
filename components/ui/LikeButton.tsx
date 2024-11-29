import "@/app/globals.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  addFavoriteToUser,
  deleteFavoriteToUser,
  getFavoritesByUser,
} from "@/lib/favoriteActions";

interface LikeButtonProps {
  planId: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ planId }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  // Verificar si el plan ya está en los favoritos cuando el componente se monta
  useEffect(() => {
    const checkFavorites = async () => {
      if (session && session.user) {
        try {
          try {
            const response = await getFavoritesByUser(session?.user?.id);
            if (Array.isArray(response)) {
              setIsActive(response.some((fav) => fav.id === planId));
            }
          } catch (error) {
            console.error("Error al cargar favoritos:", error);
          }
        } catch (error) {
          console.error("Error al verificar favoritos:", error);
        }
      }
    };

    checkFavorites();
  }, [session, planId]);

  // Manejar el clic para alternar la clase
  const handleToggle = async () => {
    //setIsActive((prevState) => !prevState);
    // @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it
    const token = session?.user?.accessToken;

    if (!session || !token) {
      console.error("El usuario no está autenticado o falta el token");
      router.push("/login");
    }

    if (!planId) {
      console.error("El planId es inválido:", planId);
      return;
    }

    try {
      const action = isActive
        ? deleteFavoriteToUser(token, session?.user?.id, planId)
        : addFavoriteToUser(token, session?.user?.id, planId);

      setIsActive(!isActive);
      // await action;
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
    }
  };

  return (
    <div className="btn btn-ghost rounded-full h-20 w-20 bg-white relative shadow-lg">
      <div
        className={` heart absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          isActive ? "is-active" : ""
        }`}
        onClick={handleToggle}
      ></div>
    </div>
  );
};

export default LikeButton;
