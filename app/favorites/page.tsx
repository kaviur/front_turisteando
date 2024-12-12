"use client";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
// import { TouristPlan } from "@/types/touristPlan";
import "swiper/css";
// import { getFavoritesByUser } from "@/lib/favoriteActions";
import { useFavorites } from "@/context/FavoritesContext";
import VacationCard from "@/components/VacationCard";

export default function Favorites() {
  // const [touristPlans, setTouristPlans] = useState<TouristPlan[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  const { touristPlans, loading, error } = useFavorites();
  const favorites = touristPlans.filter((plan) => plan.isFavorite);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 bg-gray-200 p-4 rounded-lg animate-pulse"
              >
                <div className="h-52 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-36 bg-gray-300 rounded"></div>
                <div className="h-4 w-full bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">
            Error occurred while fetching tourist plans
          </p>
        ) : favorites.length === 0 ? ( // Aquí agregamos la validación
          <p className="text-center text-xl font-semibold text-gray-500">
            No tienes favoritos en este momento.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {favorites.map((plan) => (
              <VacationCard key={plan.id} plan={plan} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
