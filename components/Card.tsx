import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";

interface CardProps {
  imageSrc: string;
  title: string;
  isPrimary: boolean;
  description: string;
  isMobile: boolean;
  mobileTitle: string;
}

export default function Card({
  imageSrc,
  title,
  isPrimary,
  description,
  isMobile,
  mobileTitle
}: CardProps) {
  if (isMobile) {
    return (
      <div className="rounded-3xl overflow-hidden relative w-44 h-52 shadow-xl">
          <Image
          className="w-full h-full image-full object-cover"
            src={imageSrc}
            alt={title}
            width={400}
            height={400}
          />
        <div className="absolute bottom-0 rounded-xl m-2 p-2 bg-base-100 opacity-100">
          <h2 className="">{mobileTitle}</h2>
          <div className="flex flex-col ">
            <div className="flex items-center gap-1">
            <FaLocationDot />
            <p>Location, Pais</p>
            </div>
            <div className="flex ">
              <p>Rating</p>
              <div className="divider divider-horizontal mx-0"></div>
              <p>No Reviews</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="h-52">
        <Image src={imageSrc} alt={title} width={400} height={400} />
      </figure>
      <div className="card-body">
        <h2
          className={`card-title ${
            isPrimary ? "text-primary" : "text-secondary"
          }`}
        >
          {title} <span className="text-gray-500">Perú</span>
        </h2>
        <p>{description}</p>
      </div>
    </div>
  );
}