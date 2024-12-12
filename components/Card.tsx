import Image from "next/image";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import LikeButton from "./ui/LikeButton";
import { TouristPlan } from "@/types/touristPlan";
import { Tooltip } from 'react-tooltip';

interface CardProps {
  plan: TouristPlan;
  isPrimary: boolean;
  isMobile?: boolean;
  styles?: string;
}

const imageStyle = {
  width: "auto",
  height: "auto",
};

export default function Card({
  plan,
  isPrimary,
  isMobile = false,
  styles,
}: CardProps) {
  const {
    id,
    title,
    description,
    city,
    rating = 0,
    totalReviews = 0,
    images,
    isFavorite = false,
  } = plan;

  const imageSrc = images[0]?.imageUrl || "/placeholder.jpg"; // Imagen por defecto si no hay imágenes

  const truncatedDescription = description.length > 98 ? `${description.slice(0, 98)} ...` : description;

  if (isMobile) {
    return (
      <Link
        href={`/product/${id}`}
        className="rounded-3xl overflow-hidden relative w-44 h-52 max-h-96 max-w-96 shadow-xl mb-6"
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
          <h2 className="text-sm font-semibold truncate">{title}</h2>
          <div className="flex flex-col text-xs">
            <div className="flex items-center gap-1">
              <FaLocationDot />
              <p className="truncate">{city.name}, {city.country.name}</p>
            </div>
            <div className="flex">
              <p>{rating.toFixed(1)} ★</p>
              <div className="divider divider-horizontal mx-0"></div>
              <p>{totalReviews} Reviews</p>
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
        <div className="h-72 overflow-hidden px-4 pt-3">
          <h2
            className={`text-xl ${
              isPrimary ? "text-primary" : "text-secondary"
            }`}
          >
            {title} <span className="text-gray-500">Perú</span>
          </h2>
          <p
            className="text-justify text-gray-600 m-4"
            data-tooltip-id={`tooltip-${id}`}
          >
            {truncatedDescription}
          </p>
        </div>
      </Link>
       <Tooltip id={`tooltip-${id}`} place="top" className="max-w-xs text-base break-words" style={{ zIndex: 9999 }}>
        {description}
      </Tooltip>
    </div>
  );
}
