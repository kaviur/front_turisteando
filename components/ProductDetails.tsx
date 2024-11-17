import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { LuClock } from "react-icons/lu";
import { TiGroup } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";
import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import { FaArrowLeft } from "react-icons/fa";

interface ProductDetailsProps {
  title: string;
  images: {
    id: number;
    imageUrl: string;
  }[];
  location: string;
  description: string;
  duration: string;
  people: string;
  peopleOptions: string[];
  scheduleOptions: string[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  title,
  images,
  location,
  description,
  duration,
  people,
  scheduleOptions,
}) => {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<string>("");
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);

  const imagesGallery = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
      original: images[0].imageUrl,
      thumbnail: images[0].imageUrl,
    },
  ];

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

      {/* Estrellas de calificación */}
      {/* <div className="flex items-center gap-2 ">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={index < rating ? "currentColor" : "none"}
            className={`w-5 h-5 ${
              index < rating ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div> */}

      {/* Imagen, calendario, selección de horario y cantidad de personas */}

      <div className="pt-12 -z-10 flex flex-row flex-wrap md:justify-between justify-center gap-4">
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

        <div className="flex flex-col bg-white  rounded-lg shadow-lg space-y-4 min-w-60 w-64">
          <DatePicker
            inline
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="p-2 border rounded-md text-gray-600 shadow-inner"
          />

          <div className="px-4 flex gap-2 items-center justify-between">
            <label className="text-lg font-semibold text-secondary">
              <LuClock />
            </label>
            <select
              className="w-full p-2 px-1 border rounded-md text-gray-600"
              value={selectedSchedule}
              onChange={(e) => setSelectedSchedule(e.target.value)}
            >
              <option value="" disabled>
                Selecciona un horario
              </option>
              {scheduleOptions.map((schedule, index) => (
                <option key={index} value={schedule}>
                  {schedule}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 items-center justify-between px-4 pb-4">
            <label className="text-lg font-semibold text-secondary">
              <TiGroup />
            </label>
            <input
              type="number"
              min={1}
              className=" w-full p-2 border rounded-md text-gray-600"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(Number(e.target.value))}
              placeholder="Número de personas"
            />
          </div>
        </div>
      </div>

      {/* Ubicación */}
      <div className="text-secondary text-lg font-medium">
        <FaLocationDot />
        {location}
      </div>

      {/* Descripción */}

      <div className="flex gap-8 ">
        {/* Descripción */}
        <p className="text-gray-700 w-2/3">{description}</p>

        {/* Información adicional: Personas y horarios */}
        <div className="flex flex-col md:flex-row gap-4 ">
          <div className="flex gap-2 items-center">
            <TiGroup color="text-accent" />
            <span className="text-accent">{people}</span>
          </div>
          <div className="flex gap-2 items-center">
            <LuClock color="gray" />
            <span className="text-gray-600">{duration}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
