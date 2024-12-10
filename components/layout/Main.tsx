import React, { useEffect, useState } from "react";
import Image from "next/image";
import Card from "../Card";
import FavouriteCard from "../FavouriteCard";
import Testimonial from "../Testimonial";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { CgSearch } from "react-icons/cg";
import { Tabs } from "../Tabs";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import SearchBar from "../SearchBar";
import { TouristPlan } from "@/types/touristPlan";
import { Review } from "@/types/review";
import { fetchAllReviews } from "@/lib/reviews/reviewActions";
import { useFavorites } from "@/context/FavoritesContext";

export const Main = () => {
  const { touristPlans, loading } = useFavorites();

  const [allTours, setAllTours] = useState<TouristPlan[]>(touristPlans);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tours, setTours] = useState<TouristPlan[]>(touristPlans);

  useEffect(() => {
    setTours(touristPlans);
    setAllTours(touristPlans);
  }, [touristPlans]);

  // Cargar las reseñas del producto
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const reviewsData = await fetchAllReviews();
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error al cargar las reseñas:", error);
      }
    };

    loadReviews();
  }, []);

  return (
    <>
      <section className="relative h-screen items-center justify-center text-center text-white bg-black bg-opacity-50 hidden md:flex">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/MACHU_PICCHU.png"
            alt="Background Image"
            fill={true}
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="brightness-75"
          />
        </div>

        {/* Contenido central */}
        <div className="space-y-6 max-w-xl px-4">
          <h1 className="font-bold md:text-5xl">
            Descubre los mejores lugares para visitar en tus vacaciones 😍
          </h1>

          {/* Buscador */}
          <SearchBar setTours={setTours} allTours={allTours} />
        </div>
      </section>

      {/* Responsive mobile section  */}
      <section className="flex items-center justify-center text-white md:hidden mt-18 w-full max-w-3xl">
        {/* Contenido central */}
        <div className="px-6 w-full">
          {/* Buscador */}
          <div className="flex justify-center items-center gap-2 bg-white rounded-full shadow-lg p-2 py-3 w-full min-w-72 my-6 ">
            <CgSearch className="ml-2" size={22} color="oklch(var(--p))" />

            <input
              type="text"
              placeholder="Comienza tu búsqueda aquí..."
              className="mr-2 flex-grow p-2 text-gray-700 outline-none"
            />
          </div>
        </div>
      </section>

      {/* Tours desktop */}
      <section className="px-8 py-12 hidden md:block max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          {/* Títulos */}
          <h2 className="text-3xl font-bold text-primary">
            Descubre nuestros Tours
          </h2>
          <Link
            href="/categories"
            className="text-primary flex items-center gap-2 btn btn-ghost rounded-full hover:bg-primary hover:text-white"
          >
            Ver todos
          </Link>
        </div>

        {/* Swiper con Condición de Carga */}
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {loading ? (
            // Renderizar esqueleto mientras se cargan los datos
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
          ) : // Renderizar tours cuando la carga haya terminado
          tours.length > 0 ? (
            tours
              .filter((tour) => tour.category.name === "Tours")
              .map((tour) => (
                <SwiperSlide key={tour.id}>
                  <Card
                    isPrimary={true}
                    id={tour.id}
                    mobileTitle={tour.title}
                    isMobile={false}
                    imageSrc={tour.images[0]?.imageUrl}
                    title={tour.title}
                    description={tour.description}
                    isFavorite={tour.isFavorite}
                  />
                </SwiperSlide>
              ))
          ) : (
            <div className="text-center text-gray-500 text-xl">
              No se encontraron tours disponibles
            </div>
          )}
        </Swiper>
      </section>

      {/* Responsive mobile section  */}
      <section className="px-8 py-12 md:hidden mt-18 w-full max-w-3xl">
        {/* Encabezado */}
        {/* Títulos a la izquierda */}
        <h2 className="text-3xl font-bold  mb-6">Descubre Lugares</h2>
        {/* //@ts-expect-error Ignorando error*/}
        <Tabs isMobile={true} />
      </section>

      {/* Responsive mobile section  */}
      <section className="px-8 py-12 md:hidden ">
        {/* Encabezado */}
        <div className="flex items-center justify-between ">
          {/* Títulos a la izquierda */}
          <h2 className="text-3xl font-bold">Favoritos</h2>
          {/* Link a la derecha */}
          <Link
            href="/tours"
            className="text-secondary text-lg font-semibold flex justify-center items-center gap-2 btn btn-ghost rounded-full hover:bg-secondary hover:text-white"
          >
            Ver todos
            <FaArrowRight />
          </Link>
        </div>
        <FavouriteCard
          imageSrc="/CAÑON_DEL_COLCA.jpg"
          title="Tour en el Cañón del Colca"
        />
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
          {loading ? (
            // Renderizar esqueleto mientras se cargan los datos
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
          ) : // Renderizar los planes con categoría "Actividad" cuando la carga haya terminado
          tours.length > 0 ? (
            tours
              .filter((tour) => tour.category.name === "Activity")
              .map((tour) => (
                <SwiperSlide key={tour.id}>
                  <Card
                    isPrimary={false}
                    id={tour.id}
                    mobileTitle={tour.title}
                    isMobile={false}
                    imageSrc={tour.images[0]?.imageUrl}
                    title={tour.title}
                    description={tour.description}
                    isFavorite={tour.isFavorite}
                  />
                </SwiperSlide>
              ))
          ) : (
            <div className="text-center text-gray-500 text-xl">
              No se encontraron actividades disponibles
            </div>
          )}
        </Swiper>
      </section>

      <Link
        href={"/categories"}
        className="my-8 mx-auto block w-fit text-center"
      >
        <button className="btn btn-primary text-white btn-wide rounded-3xl hidden md:block">
          Explora mas Opciones
        </button>
      </Link>

      <section className="px-8 py-12 hidden md:block max-w-screen-2xl	 mx-auto">
        {/* Encabezado */}
        {/* Títulos a la izquierda */}
        <div>
          <h2 className="text-3xl font-bold text-gray-500 text-center mb-6">
            Lo que los usuarios de{" "}
            <span className="text-primary font-semibold">Turisteando </span>
            están diciendo
          </h2>
        </div>

        {/*Testimonial Swiper Component*/}
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
                reviewText="No se han encontrado reseñas aún."
                rating={5}
              />
            </SwiperSlide>
          )}
        </Swiper>
      </section>
    </>
  );
};
