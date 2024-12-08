import Image from "next/image";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import LikeButton from "./ui/LikeButton";

interface CardProps {
  id: number; // Añadir el parámetro id
  imageSrc: string;
  title: string;
  isPrimary: boolean;
  description: string;
  isMobile?: boolean;
  mobileTitle: string;
  isFavorite?: boolean;
  styles?: string;
}
const imageStyle = {
  width: "auto",
  height: "auto", // Puedes ajustar ambos valores aquí si es necesario
};
export default function Card({
  id, // Asegurarse de recibir el id aquí
  imageSrc,
  title,
  isPrimary,
  description,
  isMobile = false,
  mobileTitle,
  isFavorite = false,
  styles,
}: CardProps) {
  if (isMobile) {
    return (
      <Link
        href={`/product/${id}`}
        className="rounded-3xl overflow-hidden relative w-44 h-52 max-h-96 shadow-xl mb-6"
      >
        <Image
          loading="lazy"
          style={imageStyle}
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
      </Link>
    );
  }

  // Desktop Version Card
  return (
    <div
      className={`bg-base-100 w-full h-96 max-h-96 mb-12 shadow-md rounded-xl overflow-hidden ${
        styles ? styles : "max-w-full"
      } `}
    >
      <figure className="min-h-52 h-48 max-h-64 relative">
        <Image
          className="rounded-t-xl w-full h-full object-cover"
          src={imageSrc}
          alt={title}
          width={400}
          height={400}
        />
        <div className="absolute bottom-0 right-2">
          <LikeButton planId={id} isFavorite={isFavorite} />
        </div>
      </figure>
      <Link href={`/product/${id}`} className="cursor-pointer">
        <div className="h-72 overflow-hidden px-2 pt-2">
          <h2
            className={`text-xl ${
              isPrimary ? "text-primary" : "text-secondary"
            }`}
          >
            {title} <span className="text-gray-500">Perú</span>
          </h2>
          <p className="text-justify text-gray-600">{description}</p>
        </div>
      </Link>
    </div>
  );
}
