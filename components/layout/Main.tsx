'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Card from "../Card";
//import FavouriteCard from "../FavouriteCard";
import Testimonial from "../Testimonial";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
//import { CgSearch } from "react-icons/cg";
//import { Tabs } from "../Tabs";
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
import VacationCard from "../VacationCard";
import { fetchCategories } from "@/lib/categories/categoryActions"
import { ResCategory } from "@/types/categories";

export const Main = () => {
  const { touristPlans, loading } = useFavorites();

  const [allTours, setAllTours] = useState<TouristPlan[]>(touristPlans);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tours, setTours] = useState<TouristPlan[]>(touristPlans);
  const [categories, setCategories] = useState<ResCategory[]>([]);

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


  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        console.error('Error loading categories');
      }
    };

    loadCategories();
  }, []);


   // Renderizar el esqueleto mientras se cargan los datos
   const renderSkeleton = () => (
    <div className="flex min-w-56 max-h-96 flex-col gap-4">
      <div className="skeleton h-52 w-full"></div>
      <div className="skeleton h-4 w-36"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );

  const categoryPhrases = [
    { regex: /senderismo|tour|experiencia/i, phrases: ["Elige tu próximo recorrido", "Encuentra tu siguiente experiencia", "Explora nuevos lugares"] },
    { regex: /hotel|alojamiento|hospedaje/i, phrases: ["Encuentra tu próximo hogar lejos de casa", "Reserva tu alojamiento ideal", "Tu próximo destino te espera"] },
    { regex: /restaurante|comida|sabores/i, phrases: ["Disfruta de tu próxima comida", "Prueba algo nuevo en tu próxima salida", "Explora nuevos sabores"] },
    { regex: /evento|concierto|fiesta/i, phrases: ["Elige tu próximo evento", "Participa en lo que está por venir", "Tu próxima gran experiencia está aquí"] },
    { regex: /aventura|deporte|actividades|Activity/i, phrases: ["Prepárate para tu próxima aventura", "Desafía tus límites con nuevas actividades", "Haz algo emocionante hoy"] },
  ];

  const getCategoryPhrase = (categoryName: string) => {
    // Busca una coincidencia en las expresiones regulares
    const match = categoryPhrases.find((item) => item.regex.test(categoryName.toLowerCase()));
  
    // Si encuentra una coincidencia, selecciona una frase aleatoria
    if (match) {
      const randomPhrase = match.phrases[Math.floor(Math.random() * match.phrases.length)];
      return randomPhrase;
    }
  
    // Si no encuentra ninguna coincidencia, devuelve un mensaje predeterminado
    return `Navega por ${categoryName}`;
  };

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

      {/* Sección dinámica para versiones móviles */}
      {categories.length > 0 && categories.map((category) => {
        // Filtrar los tours de esta categoría
        const categoryTours = tours.filter((tour) => tour.category.id === Number(category.id));

        // Solo renderizar la sección si la categoría tiene al menos un producto asociado
        if (categoryTours.length > 0) {
          return (
            <section
              key={category.id}
              className="px-4 md:hidden py-8 max-w-screen-sm mx-auto"
            >
              {/* Títulos de categoría */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-primary">
                  {getCategoryPhrase(category.name)}
                </h2>
                <Link
                  href={`/categories/${category.id}`}
                  className="text-primary flex items-center gap-2 btn btn-ghost rounded-full hover:bg-primary hover:text-white"
                >
                  Ver todos
                  <FaArrowRight size={20} />
                </Link>
              </div>

              {/* Renderizar las tarjetas */}
              <div className="flex flex-wrap justify-center sm:grid sm:grid-cols-2 gap-4">
                {loading ? (
                  // Renderizar esqueleto mientras se cargan los datos
                  Array.from({ length: 2 }).map((_, index) => (
                    <div
                      key={index}
                      className="w-72 sm:w-full mx-auto"
                    >
                      {renderSkeleton()}
                    </div>
                  ))
                ) : (
                  // Renderizar las tarjetas correspondientes a la categoría
                  categoryTours.slice(0, 2).map((tour) => (
                    <div
                      key={tour.id}
                      className="w-72 sm:w-full mx-auto"
                    >
                      <VacationCard plan={tour} /> 
                    </div>
                  ))
                )}
              </div>
            </section>
          );
        }
        return null; // No renderizar nada si no hay productos en la categoría
      })}

      
      {/* Sección dinámica para cada categoría a partir de md*/}
      {categories.length > 0 && categories.map((category) => {
        // Filtrar los tours de esta categoría
        const categoryTours = tours.filter((tour) => tour.category.id === Number(category.id));

        // Solo renderizar la sección si la categoría tiene al menos un producto asociado
        if (categoryTours.length > 0) {
          return (
            <section
              key={category.id}
              className="px-8 hidden md:block py-12 max-w-screen-2xl mx-auto"
            >
              {/* Títulos de categoría */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-primary">
                {getCategoryPhrase(category.name)}
                </h2>
                <Link
                  href={`/categories/${category.id}`}
                  className="text-primary flex items-center gap-2 btn btn-ghost rounded-full hover:bg-primary hover:text-white"
                >
                  Ver todos
                  <FaArrowRight size={24} />
                </Link>
              </div>

              {/* Swiper de tarjetas */}
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
                      </div>
                    </SwiperSlide>
                  ))
                ) : (
                  // Renderizar las tarjetas correspondientes a la categoría
                  categoryTours.map((tour) => (
                    <SwiperSlide key={tour.id}>
                      <VacationCard plan={tour} />  {/* Pasar el plan turístico al componente VacationCard */}
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
            </section>
          );
        }
        return null; // No renderizar nada si no hay productos en la categoría
      })}
      
      {/* Desktop Section */}
      <section className="px-8 py-12 hidden md:block max-w-screen-2xl	 mx-auto ">
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-4">
          {/* Títulos a la izquierda */}
          <div>
            <h2 className="text-3xl font-bold text-secondary">
              Descubre los mejores planes
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
                    plan={tour} // Pasa el objeto completo del plan
                    isPrimary={false}
                    isMobile={false} // Cambiar a true si es versión móvil
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

      {/* Sección para versiones móviles */}
      <section className="px-4 py-8 md:hidden max-w-screen-sm mx-auto">
        {/* Encabezado */}
        <div className="flex flex-col items-start mb-4">
          {/* Títulos centrados */}
          <h2 className="text-2xl font-bold text-secondary">
            Descubre los mejores planes
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Explora{" "}
            <span className="text-secondary font-semibold">
              experiencias increíbles
            </span>
          </p>
        </div>

        {/* Link para ver todos */}
        <Link
          href="/categories"
          className="text-secondary flex items-center gap-2 btn btn-ghost rounded-full hover:bg-secondary hover:text-white mb-4"
        >
          Ver todos <FaArrowRight size={20} />
        </Link>

        {/* Cards Swiper Component */}
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 }, // En sm muestra 2 cards
          }}
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
            Array.from({ length: 2 }).map((_, index) => (
              <SwiperSlide key={index}>
                <div className="flex min-w-56 max-h-96 flex-col gap-4">
                  <div className="skeleton h-52 w-full"></div>
                  <div className="skeleton h-4 w-36"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              </SwiperSlide>
            ))
          ) : tours.length > 0 ? (
            // Renderizar los planes con categoría "Actividad"
            tours
              .filter((tour) => tour.category.name === "Activity")
              .map((tour) => (
                <SwiperSlide key={tour.id}>
                  <Card
                    plan={tour} // Pasa el objeto completo del plan
                    isPrimary={false}
                    isMobile={true} // Cambiar a true si es versión móvil
                  />
                </SwiperSlide>
              ))
          ) : (
            <div className="text-center text-gray-500 text-sm">
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
