"use client";
import Card from "@/components/Card";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import ProductDetails from "@/components/ProductDetails";
import Testimonial from "@/components/Testimonial";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { FreeMode, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

export default function ProductPage() {
  return (
    <div className="mt-28">
      <Navbar />

      <ProductDetails
        title="Explora Machu Picchu"
        rating={4}
        imageSrc="/MACHU_PICCHU.png"
        location="Cusco, Perú"
        description="Visita uno de los lugares más emblemáticos de Sudamérica. Explora la historia y disfruta del paisaje."
        people="Tour Grupal"
        duration="Duración: 2hs"
        peopleOptions={["1-2 personas", "3-4 personas", "5-6 personas"]}
        scheduleOptions={[
          "10:00 AM - 12:00 PM",
          "2:00 PM - 4:00 PM",
          "6:00 PM - 8:00 PM",
        ]}
      />

      <section className="px-8 py-12 w-full hidden md:block max-w-7xl mx-auto">
        {/* Encabezado */}
        <div>
          <h2 className="text-3xl font-bold text-gray-500 text-center mb-6">
            Comentarios de nuestros Usuarios
          </h2>
        </div>

        {/* Grid de Cards */}
        {/*Testimonial Swiper Component*/}
        <Swiper
          slidesPerView={3}
          spaceBetween={12}
          freeMode={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Testimonial
              userImage="/juanuser.jpg"
              userName="Juan Pérez"
              city="Bogotá"
              country="Colombia"
              date="mayo 2024"
              reviewText="Me encantó el servicio, realmente superó mis expectativas y lo recomendaría a cualquiera.Me encantó el servicio, realmente superó mis expectativas y lo recomendaría a cualquiera."
            />
          </SwiperSlide>
          <SwiperSlide>
            <Testimonial
              userImage="/sarauser.jpg"
              userName="Sara User"
              city="Bogotá"
              country="Colombia"
              date="mayo 2024"
              reviewText="Me encantó el servicio, realmente superó mis expectativas y lo recomendaría a cualquiera.Me encantó el servicio, realmente superó mis expectativas y lo recomendaría a cualquiera."
            />
          </SwiperSlide>
          <SwiperSlide>
            <Testimonial
              userImage="/anauser.jpg"
              userName="Ana Susana"
              city="Bogotá"
              country="Colombia"
              date="mayo 2024"
              reviewText="Me encantó el servicio, realmente superó mis expectativas y lo recomendaría a cualquiera.Me encantó el servicio, realmente superó mis expectativas y lo recomendaría a cualquiera."
            />
          </SwiperSlide>
          <SwiperSlide>
            <Testimonial
              userImage="/juanuser.jpg"
              userName="Juan Pérez"
              city="Bogotá"
              country="Colombia"
              date="mayo 2024"
              reviewText="Me encantó el servicio, realmente superó mis expectativas y lo recomendaría a cualquiera.Me encantó el servicio, realmente superó mis expectativas y lo recomendaría a cualquiera."
            />
          </SwiperSlide>
          <SwiperSlide>
            <Testimonial
              userImage="/anauser.jpg"
              userName="Ana Susana"
              city="Bogotá"
              country="Colombia"
              date="mayo 2024"
              reviewText="Me encantó el servicio, realmente superó mis expectativas y lo recomendaría a cualquiera.Me encantó el servicio, realmente superó mis expectativas y lo recomendaría a cualquiera."
            />
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="px-8 py-12 w-full hidden md:block max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="flex justify-center">
          {/* Títulos a la izquierda */}
          <div>
            <h2 className="text-3xl font-bold text-gray-500 mb-6">
              Descubre mas lugares para visitar en tu viaje
            </h2>
          </div>
        </div>

        {/*Cards Swiper Component*/}
        <Swiper
          slidesPerView={3}
          spaceBetween={12}
          freeMode={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Card
              mobileTitle="Canon Colca"
              isMobile={false}
              imageSrc="/CAÑON_DEL_COLCA.jpg"
              title="Tour en el Cañón del Colca"
              isPrimary={true}
              description="Un tour de dos días al Cañón del Colca, uno de los cañones más profundos del mundo. Además de disfrutar de paisajes espectaculares, puedes avistar el majestuoso cóndor andino. El tour suele partir desde Arequipa."
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              mobileTitle="Paracas"
              isMobile={false}
              imageSrc="/RESERVA_NACIONAL_PARACAS.png"
              title="Reserva Nacional de Paracas"
              isPrimary={true}
              description="Explora la hermosa Reserva Nacional de Paracas, ubicada en la costa del Pacífico. Este tour te permite disfrutar de impresionantes paisajes desérticos, playas aisladas y una rica fauna marina. Puedes avistar flamencos, lobos marinos y aves guaneras."
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              mobileTitle="Valle Sagrado"
              isMobile={false}
              imageSrc="/SACRED_VALLEY.png"
              title="Valle Sagrado"
              isPrimary={false}
              description="Un tour de un día completo para explorar el Valle Sagrado de los Incas, que incluye visitas a Pisac, Ollantaytambo y los vibrantes mercados de Chinchero. Conocerás la cultura inca, verás pueblos tradicionales y disfrutarás de paisajes impresionantes."
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              mobileTitle="Paracas"
              isMobile={false}
              imageSrc="/RESERVA_NACIONAL_PARACAS.png"
              title="Reserva Nacional de Paracas"
              isPrimary={true}
              description="Explora la hermosa Reserva Nacional de Paracas, ubicada en la costa del Pacífico. Este tour te permite disfrutar de impresionantes paisajes desérticos, playas aisladas y una rica fauna marina. Puedes avistar flamencos, lobos marinos y aves guaneras. Además, visitarás la famosa Catedral de Paracas, una formación rocosa icónica, y disfrutarás de las vistas del Océano Pacífico desde diversos miradores."
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              mobileTitle="Valle Sagrado"
              isMobile={false}
              imageSrc="/SACRED_VALLEY.png"
              title="Valle Sagrado"
              isPrimary={false}
              description="Un tour de un día completo para explorar el Valle Sagrado de los Incas, que incluye visitas a Pisac, Ollantaytambo y los vibrantes mercados de Chinchero. Conocerás la cultura inca, verás pueblos tradicionales y disfrutarás de paisajes impresionantes."
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              mobileTitle="Paracas"
              isMobile={false}
              imageSrc="/RESERVA_NACIONAL_PARACAS.png"
              title="Reserva Nacional de Paracas"
              isPrimary={true}
              description="Explora la hermosa Reserva Nacional de Paracas, ubicada en la costa del Pacífico. Este tour te permite disfrutar de impresionantes paisajes desérticos, playas aisladas y una rica fauna marina. Puedes avistar flamencos, lobos marinos y aves guaneras. Además, visitarás la famosa Catedral de Paracas, una formación rocosa icónica, y disfrutarás de las vistas del Océano Pacífico desde diversos miradores."
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              mobileTitle="Valle Sagrado"
              isMobile={false}
              imageSrc="/SACRED_VALLEY.png"
              title="Valle Sagrado"
              isPrimary={false}
              description="Un tour de un día completo para explorar el Valle Sagrado de los Incas, que incluye visitas a Pisac, Ollantaytambo y los vibrantes mercados de Chinchero. Conocerás la cultura inca, verás pueblos tradicionales y disfrutarás de paisajes impresionantes."
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              mobileTitle="Paracas"
              isMobile={false}
              imageSrc="/RESERVA_NACIONAL_PARACAS.png"
              title="Reserva Nacional de Paracas"
              isPrimary={true}
              description="Explora la hermosa Reserva Nacional de Paracas, ubicada en la costa del Pacífico. Este tour te permite disfrutar de impresionantes paisajes desérticos, playas aisladas y una rica fauna marina. Puedes avistar flamencos, lobos marinos y aves guaneras. Además, visitarás la famosa Catedral de Paracas, una formación rocosa icónica, y disfrutarás de las vistas del Océano Pacífico desde diversos miradores."
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              mobileTitle="Valle Sagrado"
              isMobile={false}
              imageSrc="/SACRED_VALLEY.png"
              title="Valle Sagrado"
              isPrimary={false}
              description="Un tour de un día completo para explorar el Valle Sagrado de los Incas, que incluye visitas a Pisac, Ollantaytambo y los vibrantes mercados de Chinchero. Conocerás la cultura inca, verás pueblos tradicionales y disfrutarás de paisajes impresionantes."
            />
          </SwiperSlide>
        </Swiper>
      </section>
      <button className="btn btn-secondary text-white my-8. btn-wide mx-auto block rounded-3xl ">
        Explora mas Opciones
      </button>
      <Footer />
    </div>
  );
}
