import Image from "next/image";
import Card from "../Card";
import Testimonial from "../Testimonial";
import Link from "next/link";

export const Main = () => {
  return (
    <>
    <section className="relative h-screen flex items-center justify-center text-center text-white bg-black bg-opacity-50 ">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 -z-10  ">
        <Image
          src="/MACHU_PICCHU.png" // Cambia esta ruta a la imagen que deseas usar
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="brightness-75"
        />
      </div>

      {/* Contenido central */}
      <div className="space-y-6 max-w-lg px-4">
        <h1 className="text-4xl font-bold md:text-5xl">
          Descubre los mejores lugares para visitar en tus vacaciones
        </h1>
        
        {/* Buscador */}
        <div className="flex items-center gap-2 bg-white rounded-lg shadow-lg p-2">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow p-2 text-gray-700 outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-5 w-5 text-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </section>

      <section className="px-8 py-12 bg-white">
        {/* Encabezado */}
        <div className="flex items-center justify-between">
          {/* Títulos a la izquierda */}
          <div>
            <h2 className="text-3xl font-bold text-primary">
              Descubre nuestros Tours
            </h2>
            <p className="text-lg text-gray-500">
              Encuentra tus próximas{" "}
              <span className="text-primary font-semibold">aventuras</span>
            </p>
          </div>

          {/* Link a la derecha */}
          <Link
            href="/tours"
            className="text-primary font-semibold hover:underline"
          >
            Ver todos
          </Link>
        </div>

        {/* Grid de Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card
            imageSrc="/HUACACHINA.png"
            title="Zapatos"
            isPrimary={true}
            description="Estos son los mejores zapatos para cualquier ocasión."
          />
          <Card
            imageSrc="/RESERVA_NACIONAL_PARACAS 1.png"
            title="Zapatos"
            isPrimary={true}
            description="Estos son los mejores zapatos para cualquier ocasión."
          />
          <Card
            imageSrc="/SACRED_VALLEY.png"
            title="Zapatos"
            isPrimary={false}
            description="Estos son los mejores zapatos para cualquier ocasión."
          />
        </div>
      </section>

      <section className="px-8 py-12 bg-white">
        {/* Encabezado */}
        <div className="flex items-center justify-between">
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
            href="/tours"
            className="text-primary font-semibold hover:underline"
          >
            Ver todos
          </Link>
        </div>

        {/* Grid de Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card
            imageSrc="/HUACACHINA.png"
            title="Zapatos"
            isPrimary={false}
            description="Estos son los mejores zapatos para cualquier ocasión."
          />
          <Card
            imageSrc="/RESERVA_NACIONAL_PARACAS 1.png"
            title="Zapatos"
            isPrimary={false}
            description="Estos son los mejores zapatos para cualquier ocasión."
          />
          <Card
            imageSrc="/SACRED_VALLEY.png"
            title="Zapatos"
            isPrimary={false}
            description="Estos son los mejores zapatos para cualquier ocasión."
          />
        </div>
      </section>

      <button className="btn btn-primary text-white my-12 btn-wide mx-auto block rounded-3xl ">
        Explora mas Opciones
      </button>

      <section className="px-8 py-12 bg-white">
        {/* Encabezado */}
        {/* Títulos a la izquierda */}
        <div>
          <h2 className="text-3xl font-bold text-gray-500 text-center">
            Lo que los usuarios de{" "}
            <span className="text-primary font-semibold">Turisteando </span>
            están diciendo
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
    </>
  );
};
