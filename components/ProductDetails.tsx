import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { LuClock } from "react-icons/lu";
import { TiGroup } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

interface ProductDetailsProps {
  title: string;
  rating: number;
  imageSrc: string;
  location: string;
  description: string;
  duration: string;
  people: string;
  peopleOptions: string[];
  scheduleOptions: string[];
}
const CustomPrevArrow = () => (
  <div className="custom-prev-arrow">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  </div>
);

const CustomNextArrow = () => (
  <div className="custom-next-arrow">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  </div>
);

const ProductDetails: React.FC<ProductDetailsProps> = ({
  title,
  rating,
  imageSrc,
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

  return (
    <section className="max-w-7xl mx-auto p-4 space-y-4">
      {/* Título y enlace de regreso */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-primary">{title}</h1>
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-primary cursor-pointer"
        >
          Volver atrás
        </button>
      </div>

      {/* Estrellas de calificación */}
      <div className="flex items-center gap-1">
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
      </div>

      {/* Imagen, calendario, selección de horario y cantidad de personas */}

      
      <div className="flex flex-row justify-between gap-4">
        <div className="max-w-xl mr-auto">
        {/* <div className="relative"> */}
      {/* Flechas de navegación personalizadas */}

      {/* <Swiper
        slidesPerView={1}
        spaceBetween={2}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          enabled: true,
          prevEl: ".custom-prev-arrow",
          nextEl: ".custom-next-arrow",
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image
            src={imageSrc}
            alt={title}
            width={500}
            height={400}
            className="rounded-lg shadow-lg bg-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={imageSrc}
            alt={title}
            width={500}
            height={400}
            className="rounded-lg shadow-lg bg-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={imageSrc}
            alt={title}
            width={500}
            height={400}
            className="rounded-lg shadow-lg bg-cover"
          />
        </SwiperSlide>
      </Swiper>

    </div> */}
          <Swiper
            slidesPerView={1}
            spaceBetween={2}
            loop={true}
                // autoplay={{
                //   delay: 5000,
                //   disableOnInteraction: false,
                // }}
            // pagination={{
            //   clickable: true,
            // }}
            navigation={{
              enabled: true,
              // prevEl: ".custom-prev-arrow",
              // nextEl: ".custom-next-arrow",
            }}
            modules={[Autoplay, Navigation, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Image
                src={imageSrc}
                alt={title}
                width={100}
                height={400}
                className="rounded-lg shadow-lg bg-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={imageSrc}
                alt={title}
                width={500}
                height={400}
                className="rounded-lg shadow-lg bg-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={imageSrc}
                alt={title}
                width={500}
                height={400}
                className="rounded-lg shadow-lg bg-cover"
              />
            </SwiperSlide>
          </Swiper>
          <CustomPrevArrow />
          <CustomNextArrow />
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
