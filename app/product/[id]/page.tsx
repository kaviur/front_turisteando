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

export default function ProductPage() {
  const [tours, setTours] = useState<TouristPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<TouristPlan | null>(null);

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


  if (!product) return ;
  console.log(product);
  return (
    <div className="md:mt-28">
      <Navbar />

      <ProductDetails
        title={product?.title}
        images={product?.images}
        location={`${product?.city?.name}, ${product?.city?.country?.name}`}
        description={product?.description}
        people={`Capacidad: ${product?.capacity}`}
        duration={`Duración: ${product?.duration}`}
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
          spaceBetween={12}
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

      <Link href={"/categories"} className="my-8 mx-auto block w-fit text-center">
      <button className="btn btn-secondary text-white my-8. btn-wide mx-auto block rounded-3xl ">
        Explora más Opciones
      </button>
      </Link>


      <Footer />
    </div>
  );
}
