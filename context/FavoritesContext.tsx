"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import {
  addFavoriteToUser,
  deleteFavoriteToUser,
  getFavoritesByUser,
} from "@/lib/favoriteActions";
import { TouristPlan } from "@/types/touristPlan";
import { fetchTours } from "@/lib/actions";

export interface FavoritesContextType {
  allTouristPlans: TouristPlan[]; // todos los planes
  touristPlans: TouristPlan[]; // Planes filtrados o mostrados
  loading: boolean;
  error: Error | null;
  addFavorite: (planId: number) => void;
  removeFavorite: (planId: number) => void;
  updateTouristPlans: (plans: TouristPlan[]) => void;
}

const FavoritesContext = createContext<FavoritesContextType>({
  allTouristPlans: [],
  touristPlans: [],
  loading: false,
  error: null,
  addFavorite: () => {},
  removeFavorite: () => {},
  updateTouristPlans: () => {},
});

export const useFavorites = () => useContext(FavoritesContext);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({
  children,
}: FavoritesProviderProps): JSX.Element => {
  const [allTouristPlans, setAllTouristPlans] = useState<TouristPlan[]>([]); // Estado para todos los planes
  const [touristPlans, setTouristPlans] = useState<TouristPlan[]>([]); // Estado para los planes filtrados
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const { data: session, status } = useSession();

  // @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it
  const token: string = session?.user?.accessToken;
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchPlans = async () => {
      if (status === "loading") return;

      setLoading(true);
      try {
        let fetchAPI = fetchTours();
        if (token) {
          fetchAPI = getFavoritesByUser(token);
        }
        const response = await fetchAPI;
        if (response) {
          setAllTouristPlans(response);
          setTouristPlans(response);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Unknown error in the context generate")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [token, status]);

  // Función para agregar un favorito
  const addFavorite = async (planId: number) => {
    try {
      await addFavoriteToUser(token, userId, planId);
      setTouristPlans((prevPlans) =>
        prevPlans?.map((plan) =>
          plan.id === planId ? { ...plan, isFavorite: true } : plan
        )
      );
    } catch (error) {
      console.error("Error al agregar favorito:", error);
      setError(error as Error);
    }
  };

  // Función para eliminar un favorito
  const removeFavorite = async (planId: number) => {
    try {
      await deleteFavoriteToUser(token, userId, planId);
      setTouristPlans((prevPlans) =>
        prevPlans?.map((plan) =>
          plan.id === planId ? { ...plan, isFavorite: false } : plan
        )
      );
    } catch (error) {
      console.error("Error al eliminar favorito:", error);
      setError(error as Error);
    }
  };

  // Nueva función para actualizar los planes turísticos sin exponer directamente el setter
  const updateTouristPlans = (plans: TouristPlan[]) => {
    setTouristPlans(plans);
  };

  return (
    <FavoritesContext.Provider
      value={{
        allTouristPlans,
        touristPlans,
        loading,
        error,
        addFavorite,
        removeFavorite,
        updateTouristPlans
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
