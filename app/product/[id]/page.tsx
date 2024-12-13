"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import ProductDetails from "@/components/ProductDetails";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Testimonial from "@/components/Testimonial";
import Link from "next/link";
import { TouristPlan } from "@/types/touristPlan";
import { FaArrowRight } from "react-icons/fa";
import { fetchProduct, fetchTours } from "@/lib/actions";
import { fetchReviewsByPlan } from "@/lib/reviews/reviewActions";
import { Review } from "@/types/review";
import VacationCard from "@/components/VacationCard";

export default function ProductPage() {
  const [tours, setTours] = useState<TouristPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<TouristPlan | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [ratingFilter, setRatingFilter] = useState(0); // Filtro por estrellas

  const pathname = usePathname();
  const productId = pathname.split("/").pop(); // Asumiendo que el ID está en la última parte de la URL

  // Cargar el producto específico
  useEffect(() => {
    const loadProduct = async () => {
      if (productId) {
        const productData = await fetchProduct(productId);
        setProduct(productData);
      }
    };

    loadProduct();
  }, [productId]);

  // Cargar todos los tours
  useEffect(() => {
    const loadTours = async () => {
      setLoading(true);
      const data = await fetchTours();
      setTours(data);
      setLoading(false);
    };

    loadTours();
  }, []);

  // Cargar las reseñas del producto
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const reviewsData = await fetchReviewsByPlan(Number(productId));
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error al cargar las reseñas:", error);
      }
    };

    loadReviews();
  }, [productId]);

  // Actualizar las reseñas filtradas según el filtro seleccionado
  useEffect(() => {
    if (ratingFilter > 0) {
      setFilteredReviews(reviews.filter((review) => review.rating === ratingFilter));
    } else {
      setFilteredReviews(reviews); // Mostrar todas las reseñas si el filtro es 0
    }
  }, [ratingFilter, reviews]);

  // Calcular el total y el promedio de reseñas
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
    : 0;

  const citiesInPeru = [
    "Lima",
    "Cusco",
    "Arequipa",
    "Trujillo",
    "Chiclayo",
    "Piura",
    "Iquitos",
    "Huancayo",
    "Tacna",
    "Pucallpa",
  ];

  function getRandomCity() {
    const randomIndex = Math.floor(Math.random() * citiesInPeru.length);
    return citiesInPeru[randomIndex];
  }

  if (!product) return;

  return (
    <div className="md:mt-28">
      <Navbar />

      <ProductDetails
        id={product?.id}
        title={product?.title}
        images={product?.images}
        rating={Number(averageRating)}
        reviews={product?.reviews}
        description={product?.description}
        capacity={product?.capacity}
        duration={product?.duration}
        city={product?.city}
        category={product?.category}
        availabilityStartDate={product?.availabilityStartDate}
        availabilityEndDate={product?.availabilityEndDate}
        characteristic={product?.characteristic}
        price={product?.price}
        seller={product?.seller}
        active={product?.active}
      />

      <section className="px-8 py-12 w-full hidden md:block max-w-7xl mx-auto">
        <div>
          <h2 className="text-3xl font-bold text-gray-500 text-center mb-6">
            Comentarios de nuestros Usuarios
          </h2>
        </div>
        <div className="w-full mx-auto p-4">
          {/* Mostrar el total de reseñas y el promedio */}
          <div className="flex flex-col items-center mb-6">
            <p className="text-lg font-semibold text-gray-800">
              Total de reseñas: {totalReviews}
            </p>
            {totalReviews > 0 && (
              <p className="text-lg text-yellow-500 font-medium">
                Calificación promedio: {averageRating} ★
              </p>
            )}
          </div>

          {/* Filtro por estrellas */}
          <div className="flex justify-center items-center mb-6">
            <label
              htmlFor="ratingFilter"
              className="text-gray-700 font-medium mr-4"
            >
              Filtrar por estrellas:
            </label>
            <select
              id="ratingFilter"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(parseInt(e.target.value))}
              className="select select-bordered select-sm w-40 bg-white text-gray-700"
            >
              <option value="0">Todas</option>
              <option value="5">5 Estrellas</option>
              <option value="4">4 Estrellas</option>
              <option value="3">3 Estrellas</option>
              <option value="2">2 Estrellas</option>
              <option value="1">1 Estrella</option>
            </select>
          </div>

          {/* Swiper para mostrar las reseñas */}
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review, index) => (
                <SwiperSlide key={index}>
                  <Testimonial
                  userImage={""}
                  userName={review.user.name}
                  city={getRandomCity()}
                  country={"Perú"}
                  date={review.date}
                  reviewText={review.comment}
                  rating={review.rating}
                />
                </SwiperSlide>
              ))
            ) : (
              <div className="no-reviews-message">
                <p>No hay reseñas disponibles para mostrar.</p>
              </div>
            )}
          </Swiper>
        </div>        
      </section>
      {/* Desktop Section */}
      <section className="px-8 py-12 hidden md:block max-w-screen-2xl	 mx-auto ">
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-4">
          {/* Títulos a la izquierda */}
          <div>
            <h2 className="text-3xl font-bold text-secondary">
              Descubre nuestras actividades
            </h2>
            <p className="text-lg text-gray-500">
              Explora{" "}
              <span className="text-secondary font-semibold">
                experiencias increíbles
              </span>
            </p>
          </div>

          {/* Link a la derecha */}
          <Link
            href="/categories"
            className="text-secondary flex justify-center items-center gap-2 btn btn-ghost rounded-full hover:bg-secondary hover:text-white "
          >
            Ver todos <FaArrowRight size={24} />
          </Link>
        </div>

        {/*Cards Swiper Component*/}
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {loading
            ? // Renderizar esqueleto mientras se cargan los datos
              Array.from({ length: 3 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="flex min-w-56 max-h-96 flex-col gap-4">
                    <div className="skeleton h-52 w-full"></div>
                    <div className="skeleton h-4 w-36"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                  </div>
                </SwiperSlide>
              ))
            : // Renderizar tours cuando la carga haya terminado
              tours.map((tour) => (
                <SwiperSlide key={tour.id}>
                  <VacationCard key={tour.id} plan={tour} />
                </SwiperSlide>
              ))}
        </Swiper>
      </section>

      <Link
        href={"/categories"}
        className="my-8 mx-auto block w-fit text-center"
      >
        <button className="btn btn-secondary text-white my-8. btn-wide mx-auto block rounded-3xl ">
          Explora más Opciones
        </button>
      </Link>

      <Footer />
    </div>
  );
}
