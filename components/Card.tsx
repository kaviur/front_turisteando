import Image from "next/image";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";

interface CardProps {
  id: string;  // Añadir el parámetro id
  imageSrc: string;
  title: string;
  isPrimary: boolean;
  description: string;
  isMobile: boolean;
  mobileTitle: string;
}

export default function Card({
  id,  // Asegurarse de recibir el id aquí
  imageSrc,
  title,
  isPrimary,
  description,
  isMobile,
  mobileTitle
}: CardProps) {
  if (isMobile) {
    return (
      <div className="rounded-3xl overflow-hidden relative w-44 h-52 shadow-xl mb-6">
        <Image
          className="w-full h-full object-cover"
          src={imageSrc}
          alt={title}
          width={400}
          height={400}
        />
        <div className="absolute bottom-0 rounded-xl m-2 p-2 bg-base-100 opacity-100">
          <h2>{mobileTitle}</h2>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <FaLocationDot />
              <p>Location, Pais</p>
            </div>
            <div className="flex">
              <p>Rating</p>
              <div className="divider divider-horizontal mx-0"></div>
              <p>No Reviews</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Version Card
  return (
    <Link href={`/product/${id}`} className="cursor-pointer bg-base-100 max-w-xl w-full mb-12 shadow-md rounded-xl">
      <figure className="min-h-52 h-64 max-h-64">
        <Image
          className="rounded-t-xl w-full h-full object-cover"
          src={imageSrc}
          alt={title}
          width={400}
          height={400}
        />
      </figure>
      <div className="h-72 overflow-hidden px-2 pt-2">
        <h2
          className={`text-xl ${isPrimary ? "text-primary" : "text-secondary"}`}
        >
          {title} <span className="text-gray-500">Perú</span>
        </h2>
        <p>{description}</p>
      </div>
    </Link>
  );
}
