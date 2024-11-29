import "@/app/globals.css";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { addFavoriteToUser, deleteFavoriteToUser, getFavoritesByUser } from "@/lib/favoriteActions";

interface LikeButtonProps {
  planId: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ planId }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  // Cargar favoritos sólo si el usuario está logueado
  const fetchFavorites = useCallback(async () => {
    if (session?.user?.id) {
      try {
        const response = await getFavoritesByUser(session.user.id);
        if (Array.isArray(response)) {
          setIsActive(response.some((fav) => fav.id === planId));
        }
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
      }
    }
  }, [planId, session?.user?.id]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleToggle = async () => {

    if (!session) {
      router.push("/login");
      return;
    }

    // @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it
    const token = session.user.accessToken;

    try {
      const action = isActive
        ? deleteFavoriteToUser(token, session.user?.id, planId)
        : addFavoriteToUser(token, session.user?.id, planId);

      await action;
      setIsActive((prev) => !prev);
    } catch (error) {
      console.error("Error al modificar el favorito:", error);
    }
  };

  return (
    <div className="btn btn-ghost rounded-full h-20 w-20 bg-white relative shadow-lg">

      <div
        className={` heart absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isActive ? "is-active" : ""}`}
        onClick={handleToggle}
      ></div>

    </div>
  );
};

export default LikeButton;