import "@/app/globals.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useFavorites } from "@/context/FavoritesContext";

interface LikeButtonProps {
  planId: number;
  isFavorite: boolean;
  isCard?: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ planId, isFavorite, isCard = true }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isActive, setIsActive] = useState(isFavorite);
  const { addFavorite, removeFavorite } = useFavorites();

  const handleToggle = async () => {
    // @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it
    const token = session?.user?.accessToken;

    if (!session || !token) {
      router.push("/login");
      return;
    }

    if (!planId) {
      console.error("El planId es inválido:", planId);
      return;
    }

    if (isActive) {
      removeFavorite(planId);
    } else {
      addFavorite(planId);
    }
    setIsActive(!isActive);
  };

  return (
    <div className={`btn btn-ghost rounded-full h-16 w-16 bg-white shadow-lg ${
      isCard ? "absolute bottom-4 right-4" : "relative"}`}>
      <div
        className={`heart text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          isActive ? "is-active" : ""
        }`}
        onClick={handleToggle}
      ></div>
    </div>
  );
};

export default LikeButton;
