import React, { useState, useEffect } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { LiaTreeSolid } from "react-icons/lia";
import { PiMountainsFill } from "react-icons/pi";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Card from "./Card";
import { TouristPlan } from "@/types/touristPlan";

type TabsProps = {
  isMobile?: boolean;
};

export const Tabs: React.FC<TabsProps> = ({isMobile = false }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [tours, setTours] = useState<TouristPlan[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tourist-plans/all`);
        const data = await response.json();
        if (data && Array.isArray(data.data)) {
          setTours(data.data);
        } else {
          console.error("La respuesta de la API no contiene un array de tours:", data);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchTours();
  }, []);

  const renderContent = () => (
    
    <Swiper
      slidesPerView={2}
      spaceBetween={4}
      freeMode={true}
      pagination={{ clickable: true, dynamicBullets: true }}
      modules={[FreeMode, Pagination]}
      className="mySwiper"
    >
      {tours.map((tour) => (
        <SwiperSlide key={tour.id}>
          <Card
            id={tour.id}
            mobileTitle={tour.title}
            isMobile={isMobile}
            imageSrc={tour.images[0]?.imageUrl}
            title={tour.title}
            isPrimary={tour.category?.name === "Tours"}
            description={tour.description}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );

  const activeTabStyles = {
    "tab-active": "bg-primary text-white",
    "": "text-gray-500 outline outline-2 outline-gray-200 hover:outline-none",
  };
  

  return (
    <div>
      <div role="tablist" className="flex flex-wrap justify-start items-center gap-4 bg-base-100">
        <a
          role="tab"
          className={`btn btn-ghost rounded-full h-14 px-6 ${
            activeTab === 1 ? activeTabStyles["tab-active"] : activeTabStyles[""]
          }`}
          onClick={() => setActiveTab(1)}
        >
          <BiCategoryAlt className="mr-2" size={24} />
          Todo
        </a>
        <a
          role="tab"
          className={`btn btn-ghost rounded-full h-14 px-6 ${
            activeTab === 2 ? activeTabStyles["tab-active"] : activeTabStyles[""]
          }`}
          onClick={() => setActiveTab(2)}
        >
          <PiMountainsFill size={24} className="mr-2" /> Lugares
        </a>
        <a
          role="tab"
          className={`btn btn-ghost rounded-full h-14 px-6  ${
            activeTab === 3 ? activeTabStyles["tab-active"] : activeTabStyles[""]
          }`}
          onClick={() => setActiveTab(3)}
        >
          <LiaTreeSolid size={24} className="mr-2" /> Actividades
        </a>
      </div>
      <div className="p-4 mt-4 bg-gray-100 rounded-lg">
        {activeTab === 1 && renderContent()}
        {activeTab === 2 && renderContent()}
        {activeTab === 3 && renderContent()}
      </div>
    </div>
  );
};
