"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Card from "@/components/Card";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import ProductDetails from "@/components/ProductDetails";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Testimonial from "@/components/Testimonial";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  seller: string;
  city: {
    id: number;
    name: string;
    country: {
      id: number;
      name: string;
    };
  };
  category: {
    id: number;
    name: string;
    description: string;
    image: string;
  };
  images: {
    id: number;
    imageUrl: string;
  }[];
  availabilityStartDate: string;
  availabilityEndDate: string;
  capacity: number;
  duration: string;
  foodIncluded: boolean;
  wifiIncluded: boolean;
  petsFriendly: boolean;
  disabilityAccess: boolean;
  active: boolean;
}

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const pathname = usePathname();
  const productId = pathname.split("/").pop(); // Asumiendo que el ID está en la última parte de la URL

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tourist-plans/${productId}`);
          const data = await response.json();
          
          if (data.success && data.data) {
            setProduct(data.data);
          } else {
            console.error("Error fetching product", data.errors);
          }
        } catch (error) {
          console.error("Failed to fetch product:", error);
        }
      };

      fetchProduct();
    }
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="mt-28">
      <Navbar />

      <ProductDetails
        title={product.title}
        rating={4} // Puedes ajustar la lógica de rating según tu respuesta o datos adicionales
        imageSrc={product.images[0].imageUrl}
        location={`${product.city.name}, ${product.city.country.name}`}
        description={product.description}
        people={`Capacidad: ${product.capacity}`}
        duration={`Duración: ${product.duration}`}
        peopleOptions={["1-2 personas", "3-4 personas", "5-6 personas"]} // Personaliza según tus necesidades
        scheduleOptions={[
          "10:00 AM - 12:00 PM",
          "2:00 PM - 4:00 PM",
          "6:00 PM - 8:00 PM",
        ]} // Personaliza según tus necesidades
      />

      <section className="px-8 py-12 w-full hidden md:block max-w-7xl mx-auto">
        <div>
          <h2 className="text-3xl font-bold text-gray-500 text-center mb-6">
            Comentarios de nuestros Usuarios
          </h2>
        </div>

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
          {/* Otros testimonios */}
        </Swiper>
      </section>

      <section className="px-8 py-12 w-full hidden md:block max-w-7xl mx-auto">
        <div className="flex justify-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-500 mb-6">
              Descubre más lugares para visitar en tu viaje
            </h2>
          </div>
        </div>

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
          {/* Otras cards */}
        </Swiper>
      </section>

      <button className="btn btn-secondary text-white my-8. btn-wide mx-auto block rounded-3xl ">
        Explora más Opciones
      </button>
      <Footer />
    </div>
  );
}
