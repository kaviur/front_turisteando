"use client";
import Card from "@/components/Card";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { TouristPlan } from "@/types/touristPlan";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Para redirección
import "swiper/css";
import { getFavoritesByUser } from "@/lib/favoriteActions";

export default function Favorites() {
  const { data: session } = useSession();
  const router = useRouter();
  const [touristPlans, setTouristPlans] = useState<TouristPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!session) {
      router.push("/login"); // Redirigir al login si no está autenticado
    }
  }, [session, router]);

  // Obtener userId desde la sesión
  const userId = session?.user?.id;

  // Fetch the tourist plans when the component mounts
  useEffect(() => {
    const fetchTouristPlans = async () => {
      if (!userId) return;

      try {
        //const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tourist-plans/allfavoritesbyuserid/${userId}`);
        const response = await getFavoritesByUser(userId);

        if (response) {
          setTouristPlans(response); // Aquí estamos accediendo a la propiedad 'data' de la respuesta JSON
        } else {
          setError("Failed to fetch tourist plans");
        }
      } catch {
        setError("Error occurred while fetching tourist plans");
      } finally {
        setLoading(false);
      }
    };

    fetchTouristPlans();
  }, [userId]); // Dependemos de `userId` para hacer la solicitud

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
          <p className="text-red-500">{error}</p>
        ) : touristPlans.length === 0 ? ( // Aquí agregamos la validación
          <p className="text-center text-xl font-semibold text-gray-500">
            No tienes favoritos en este momento.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {touristPlans.map((plan) => (
              <Card
                key={plan.id}
                isPrimary={false}
                id={plan.id}
                mobileTitle={plan.title}
                isMobile={false}
                imageSrc={plan.images[0]?.imageUrl}
                title={plan.title}
                description={plan.description}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
