"use client";
import Card from "@/components/Card";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import ProductDetails from "@/components/ProductDetails";
import Testimonial from "@/components/Testimonial";

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

      <section className="px-8 py-12 bg-white">
        {/* Encabezado */}
        {/* Títulos a la izquierda */}
        <div>
          <h2 className="text-3xl font-bold text-gray-500 text-center">
            Comentarios de nuestros Usuarios
          </h2>
        </div>

        {/* Grid de Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Testimonial
            userImage="/juanuser.jpg"
            userName="Juan Pérez"
            city="Bogotá"
            country="Colombia"
            date="mayo 2024"
            reviewText="Me encantó el servicio, realmente superó mis expectativas y lo recomendaría a cualquiera.Me encantó el servicio, realmente superó mis expectativas y lo recomendaría a cualquiera.Me encantó el servicio, realmente superó mis expectativas y lo recomendaría a cualquiera.Me encantó el servicio, realmente superó mis expectativas y lo recomendaría a cualquiera."
          />
          <Testimonial
            userImage="/anauser.jpg"
            userName="Ana Susana"
            city="Bogotá"
            country="Colombia"
            date="mayo 2024"
            reviewText="Me encantó el servicio, realmente superó mis expectativas y lo recomendaría a cualquiera.Me encantó el servicio, realmente superó mis expectativas y lo recomendaría a cualquiera.Me encantó el servicio, realmente superó mis expectativas y lo recomendaría a cualquiera.Me encantó el servicio, realmente superó mis expectativas y lo recomendaría a cualquiera."
          />
          <Testimonial
            userImage="/sarauser.jpg"
            userName="Sara User"
            city="Bogotá"
            country="Colombia"
            date="mayo 2024"
            reviewText="Me encantó el servicio, realmente superó mis expectativas y lo recomendaría a cualquiera.Me encantó el servicio, realmente superó mis expectativas y lo recomendaría a cualquiera.Me encantó el servicio, realmente superó mis expectativas y lo recomendaría a cualquiera.Me encantó el servicio, realmente superó mis expectativas y lo recomendaría a cualquiera."
          />
        </div>
      </section>

      <section className="px-8 py-12 bg-white">
        {/* Encabezado */}
        <div className="flex justify-center">
          {/* Títulos a la izquierda */}
          <div>
            <h2 className="text-3xl font-bold text-gray-500 ">
              Descubre mas lugares para visitar en tu viaje
            </h2>
          </div>
        </div>

        {/* Grid de Cards */}
        <div className="mt-8 grid gap-20 md:grid-cols-2 lg:grid-cols-3">
          <Card
            isMobile={false}
            mobileTitle="Huacachina"
            imageSrc="/HUACACHINA.png"
            title="Zapatos"
            isPrimary={false}
            description=""
          />
          <Card
            isMobile={false}
            mobileTitle="Huacachina"
            imageSrc="/RESERVA_NACIONAL_PARACAS 1.png"
            title="Zapatos"
            isPrimary={false}
            description=""
          />
          <Card
            isMobile={false}
            mobileTitle="Huacachina"
            imageSrc="/SACRED_VALLEY.png"
            title="Zapatos"
            isPrimary={false}
            description=""
          />
        </div>
      </section>
      <button className="btn btn-secondary text-white my-12 btn-wide mx-auto block rounded-3xl ">
        Explora mas Opciones
      </button>
      <Footer />
    </div>
  );
}
