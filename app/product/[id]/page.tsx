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
import Card from "@/components/Card";
import { FaArrowRight } from "react-icons/fa";
import { fetchProduct, fetchTours } from "@/lib/actions";
import { fetchReviewsByPlan } from "@/lib/reviews/reviewActions";
import { Review } from "@/types/review";
import { useSession } from "next-auth/react";

export default function ProductPage() {
  const [tours, setTours] = useState<TouristPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<TouristPlan | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const { data: session, status } = useSession();  
  // @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it
  const token = session?.user.accessToken;

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
      if (status === "authenticated" && productId && token) {
        try {
          const reviewsData = await fetchReviewsByPlan(Number(productId), token);
          console.log("Reviews Data:", reviewsData);
          setReviews(reviewsData);
        } catch (error) {
          console.error("Error al cargar las reseñas:", error);
        }
      } else {
        console.error("La sesión no está autenticada o el token es inválido.");
      }
    };
    if (status === "authenticated") {
      loadReviews();  // Carga las reseñas solo si el usuario está autenticado
    }
  }, [productId, token, status]);

  console.log(product);

  if (!product) return;
  
  console.log(product);
  
  return (
    <div className="md:mt-28">
      <Navbar />

      <ProductDetails
        id={product?.id}
        title={product?.title}
        images={product?.images}
        rating={product?.rating}
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
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <Testimonial
                  userImage={""}
                  userName={review.user.name}
                  city={"Medellín"}
                  country={"Colombia"}
                  date={review.date}
                  reviewText={review.comment}
                  rating={review.rating}
                />
              </SwiperSlide>

            ))
          ) : (
            <SwiperSlide>
              <Testimonial
                userImage="/juanuser.jpg"
                userName="Juan Pérez"
                city="Bogotá"
                country="Colombia"
                date="mayo 2024"
                reviewText="Desde Turisteando te informamos que no se han encontrado reseñas."
                rating={5}
              />
            </SwiperSlide>
          )}

        </Swiper>
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
                <Card
                  isPrimary={false}
                  id={tour.id}
                  mobileTitle={tour.title}
                  isMobile={false}
                  imageSrc={tour.images[0]?.imageUrl}
                  title={tour.title}
                  description={tour.description}
                />
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
