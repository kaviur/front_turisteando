import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LuClock } from "react-icons/lu";
import { TiGroup } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
// import "../app/calendario.css"

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { TouristPlan } from "@/types/touristPlan";
import { PiStarDuotone } from "react-icons/pi";
import ShareProduct from "./ui/ShareButton";
import LikeButton from "./ui/LikeButton";
import { DateRange } from "react-date-range";
import { useFavorites } from "@/context/FavoritesContext";
import ReservationSummary from "./ReservationSummary";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { convertDurationToDays } from "@/utils/dateUtils";
import { FaStarHalfAlt } from "react-icons/fa";
import { useEffect } from "react";

interface CustomRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

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
  availabilityEndDate,
  capacity,
  duration,
  characteristic,
  active,
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [thumbnailPosition, setThumbnailPosition] = useState<
    "right" | "bottom" | "top" | "left"
  >("right");

  // Cambiar la posición de las miniaturas según el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      setThumbnailPosition(window.innerWidth < 768 ? "bottom" : "right");
    };

    handleResize(); // Aplicar en el primer renderizado
    window.addEventListener("resize", handleResize); // Escuchar cambios en el tamaño

    return () => window.removeEventListener("resize", handleResize); // Limpiar evento
  }, []);



  const handleClick = () => {
    if (!session) {
      localStorage.setItem("redirectPath", window.location.href);
      router.push("/login");
      return;
    }
    setShowReservationForm(true);
  };

  const imagesGallery = images.map((img) => ({
    original: img.imageUrl,
    thumbnail: img.imageUrl,
  }));

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const { touristPlans } = useFavorites();
  const isFavorite = touristPlans?.some(
    (plan) => plan.id === id && plan.isFavorite
  );

  const handleClose = () => {
    setShowReservationForm(false);
  };

  const handleRange = (range: CustomRange) => {
    const startDate = new Date(range.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + convertDurationToDays(duration));

    const rangeUpdate = {
      ...range,
      endDate,
    };

    setState([rangeUpdate]);
  };

  const handleResetValues = () => {
    setNumberOfPeople(1);
    setState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  };

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
          {[...Array(5)].map((_, index) => {
            if (index < Math.floor(rating)) {
              // Estrella llena
              return (
                <span key={index} className="text-2xl">
                  <FaStar className="text-yellow-500" />
                </span>
              );
            } else if (index === Math.floor(rating) && rating % 1 >= 0.5) {
              // Estrella media llena
              return (
                <span key={index} className="text-2xl">
                  <FaStarHalfAlt className="text-yellow-500" />
                </span>
              );
            } else {
              // Estrella vacía
              return (
                <span key={index} className="text-2xl">
                  <PiStarDuotone className="text-gray-500" />
                </span>
              );
            }
          })}
        </div>
      </div>

      {/* Imagen, calendario y cantidad de personas */}
      <div className="pt-12 -z-10 flex xl:flex-nowrap flex-wrap xl:justify-between justify-center gap-4">
        <div className="max-w-3xl w-3/4 mx-auto space-y-4 ">
          <ImageGallery
            additionalClass="z-10 w-full"
            showBullets={false}
            showPlayButton={false}
            showNav={false}
            thumbnailPosition={thumbnailPosition}
            lazyLoad={true}
            items={imagesGallery}
          />
        </div>

        <div className="flex flex-col min-w-max max-w-max w-2/5 ">
          <div className="bg-white rounded-lg shadow-lg  ">
            <div className="flex items-center justify-between p-4   ">
              {/* Indicador de disponibilidad */}
              <div
                className={`px-4 py-2 rounded-lg text-white font-bold cursor-default ${
                  active ? "bg-primary" : "bg-gray-400"
                }`}
              >
                {active ? "Disponible" : "No Disponible"}
              </div>

              {/* Radio Buttons */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="tour"
                    disabled={category !== "Tours"}
                    defaultChecked={category === "Tours"}
                    className="radio radio-primary"
                  />
                  Tour
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="activity"
                    disabled={category !== "Activity"}
                    defaultChecked={category === "Activity"}
                    className="radio radio-primary"
                  />
                  Activity
                </label>
              </div>
            </div>
            <DateRange
              showMonthArrow
              showMonthAndYearPickers={false}
              // showPreview={false}
              //@ts-expect-error: Ignorando error por ahora
              onChange={(item) => handleRange(item.selection)}
              direction="horizontal"
              ranges={state}
              moveRangeOnFirstSelection={false}
              weekdayDisplayFormat="EEEEE"
              rangeColors={["#ff0178"]}
              showDateDisplay={false}
              months={2}
              className="rounded-lg "
              minDate={new Date()}
              maxDate={new Date(availabilityEndDate)}
            />
            <div className="flex gap-5 items-center justify-between px-4 pb-4">
              <div className="flex justify-between items-center gap-2 flex-1">
                <label className="text-lg font-semibold text-secondary">
                  <TiGroup />
                </label>
                <input
                  type="number"
                  min={1}
                  max={capacity}
                  className="w-full p-2.5 border rounded-md text-gray-600 outline-gray-500"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(Number(e.target.value))}
                  placeholder="Número de personas"
                />
              </div>
              <div className="flex flex-1 justify-between items-center">
                <button
                  className="btn bg-primary text-white hover:bg-primary w-full"
                  onClick={handleClick}
                >
                  Reservar
                </button>
              </div>
            </div>
          </div>
          <div className={`mt-4 ${showReservationForm ? "" : "hidden"}`}>
            <ReservationSummary
              onClose={handleClose}
              touristPlanId={id}
              touristPlanTitle={title}
              numberOfPeople={numberOfPeople}
              startDate={state[0].startDate}
              endDate={state[0].endDate}
              onReset={handleResetValues}
              price={price}
              seller={seller}
              category={category}
            />
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
            <LikeButton planId={id} isFavorite={isFavorite} isCard={false}/>
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
            <TiGroup size={24} className="text-secondary" />
            <span className="text-accent">{`Capacidad: ${capacity} personas`}</span>
          </div>
          <div className="flex gap-2 items-center">
            <LuClock size={24} className="text-secondary" />
            <span className="text-gray-600">{`Duración: ${duration}`}</span>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      {active ? (
        <>
          <div className="text-center text-gray-500 text-sm">Disponible</div>
          <div className="text-center text-gray-500 text-sm">S/. {price}</div>
          <div className="text-center text-gray-500 text-sm">
            Empresa {seller}
          </div>
          <div className="text-center text-gray-500 text-sm">
            {category}, {categoryDescription}{" "}
          </div>
        </>
      ) : (
        <div className="text-center text-red-500 text-sm">No disponible</div>
      )}
      <div className="divider"></div>
      {/* Características */}
      <div className="flex flex-wrap gap-8 ">
        {characteristic.map((char) => (
          <div key={char.id} className="flex gap-2 items-center">
            <Image
              src={char.image.imageUrl}
              alt={char.name}
              width={16}
              height={16}
            ></Image>
            <span className="text-gray-600">{char.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductDetails;
