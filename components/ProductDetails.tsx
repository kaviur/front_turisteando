import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { LuClock } from "react-icons/lu";
import { TiGroup } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {
  FaArrowLeft,
  FaHotel,
  FaStar,
  FaWalking,
  FaWifi,
} from "react-icons/fa";
import { TouristPlan } from "@/types/touristPlan";
import { SiWalkman } from "react-icons/si"; 
import { IoAccessibility, IoFastFood } from "react-icons/io5";
import { TbMoodKid } from "react-icons/tb";
import { PiStarDuotone, PiTreeEvergreenDuotone } from "react-icons/pi";
import { MdPets } from "react-icons/md";
import ShareProduct from "./ui/ShareButton";
import LikeButton from "./ui/LikeButton";

const ProductDetails: React.FC<TouristPlan> = ({
  id,
  title,
  description,
  price,
  seller,
  city: {
    name,
    country: { name: country },
  },
  category: { name: category, description: categoryDescription },
  rating,
  images,
  availabilityStartDate,
  availabilityEndDate,
  capacity,
  duration,
  characteristic,
  active,
}) => {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);

  const characteristicIcons: Record<string, JSX.Element> = {
    Caminata: <FaWalking />,
    Hotel: <FaHotel />,
    "Comida incluida": <IoFastFood />,
    "Wifi incluido": <FaWifi />,
    Accesibilidad: <IoAccessibility />,
    Niños: <TbMoodKid />,
    Parque: <PiTreeEvergreenDuotone />,
    "Pets Friendly": <MdPets />,
  };

  const imagesGallery = images.map((img) => ({
    original: img.imageUrl,
    thumbnail: img.imageUrl,
  }));

  return (
    <section className="max-w-7xl mx-auto p-4 space-y-4">
      {/* Título y enlace de regreso */}
      <div className="pt-12 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-primary">{title}</h1>

        <button
          onClick={() => router.back()}
          className="text-primary text-lg font-semibold flex justify-center items-center gap-2 btn btn-ghost rounded-full hover:bg-primary hover:text-white"
        >
          <FaArrowLeft />
          Volver atrás
        </button>
      </div>
      <div className="flex justify-between">
        {/* Estrellas de calificación */}
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, index) => (
            <span key={index} className="text-2xl">
              {index < rating ? (
                <FaStar className="text-yellow-500" />
              ) : (
                <PiStarDuotone className="text-gray-500" />
              )}
            </span>
          ))}
        </div>
        <div></div>
      </div>

      {/* Imagen, calendario y cantidad de personas */}
      <div className="pt-12 -z-10 flex flex-wrap md:justify-between justify-center gap-4">
        <div className="md:max-w-lg lg:max-w-2xl xl:max-w-4xl max-w-md mx-auto space-y-4">
          <ImageGallery
            additionalClass="z-10"
            showBullets={false}
            showPlayButton={false}
            showNav={false}
            thumbnailPosition="right"
            lazyLoad={true}
            items={imagesGallery}
          />
        </div>
        <div className="flex flex-col min-w-60 w-64">
          <div className="bg-white rounded-lg shadow-lg  ">
            <DatePicker
              inline
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="p-2 border rounded-md text-gray-600 shadow-inner"
              minDate={new Date(availabilityStartDate)}
              maxDate={new Date(availabilityEndDate)}
            />

            <div className="flex gap-2 items-center justify-between px-4 pb-4">
              <label className="text-lg font-semibold text-secondary">
                <TiGroup />
              </label>
              <input
                type="number"
                disabled
                min={1}
                max={capacity}
                className="w-full p-2 border rounded-md text-gray-600"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(Number(e.target.value))}
                placeholder="Número de personas"
              />
            </div>
          </div>
          <div className="flex gap-2 items-center justify-end mt-4">
            {/* Botón de compartir */}
            <ShareProduct
              product={{
                id: id,
                title,
                description,
                image: images[0].imageUrl,
              }}
            />
            {/* Like button */}

            <LikeButton />
          </div>
        </div>
      </div>

      {/* Ubicación */}
      <div className="text-secondary text-lg font-medium flex items-center gap-2">
        <FaLocationDot />
        {`${name}, ${country}`}
      </div>

      <div className="flex gap-8 ">
        {/* Descripción */}
        <p className="text-gray-700 w-2/3">{description}</p>

        {/* Información adicional */}
        <div className="flex flex-col md:flex-row gap-4 ">
          <div className="flex gap-2 items-center">
            <TiGroup size={24} />
            <span className="text-accent">{`Capacidad: ${capacity} personas`}</span>
          </div>
          <div className="flex gap-2 items-center">
            <LuClock size={24} />
            <span className="text-gray-600">{`Duración: ${duration}`}</span>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      {active ? (
        <>
          <div className="text-center text-gray-500 text-sm">Disponible</div>
          <div className="text-center text-gray-500 text-sm">{price} €</div>
          <div className="text-center text-gray-500 text-sm">{seller} vendedor</div>
          <div className="text-center text-gray-500 text-sm">{category}, {categoryDescription} </div>


        </>
      ) : (
        <div className="text-center text-red-500 text-sm">No disponible</div>
      )}
      <div className="divider"></div>
      {/* Características */}
      <div className="flex flex-wrap gap-8 ">
        {characteristic.map((char) => (
          <div key={char.id} className="flex gap-2 items-center">
            <div className="text-xl text-primary">
              {characteristicIcons[char.name] || <SiWalkman />}
            </div>
            <span className="text-gray-600">{char.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductDetails;
