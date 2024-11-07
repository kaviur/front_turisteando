import React, { useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { LiaTreeSolid } from "react-icons/lia";
import { PiMountainsFill } from "react-icons/pi";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { FreeMode, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Card from "./Card";

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  const renderContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <Swiper
            slidesPerView={2}
            spaceBetween={4}
            freeMode={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Card
                isMobile={true}
                imageSrc="/SELVA_AMAZONICA.jpg"
                title="Exploración de la Selva Amazónica"
                mobileTitle="Selva Amazónica"
                isPrimary={false}
                description="Vive la experiencia de explorar la selva amazónica peruana desde Iquitos o Puerto Maldonado. Puedes realizar caminatas por la selva, avistamiento de fauna y paseos en bote por ríos llenos de vida."
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                isMobile={true}
                imageSrc="/SELVA_AMAZONICA.jpg"
                title="Exploración de la Selva Amazónica"
                mobileTitle="Selva Amazónica"
                isPrimary={false}
                description="Vive la experiencia de explorar la selva amazónica peruana desde Iquitos o Puerto Maldonado. Puedes realizar caminatas por la selva, avistamiento de fauna y paseos en bote por ríos llenos de vida."
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                isMobile={true}
                imageSrc="/MONTAÑA_7_COLORES.jpg"
                title="Trekking en la Montaña de 7 Colores"
                mobileTitle="Montaña 7 Colores"
                isPrimary={false}
                description="Realiza una caminata hacia la famosa Montaña de los Siete Colores, cerca de Cusco. Este destino es conocido por sus impresionantes colores naturales debido a los minerales presentes en la tierra."
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                isMobile={true}
                imageSrc="/HUACACHINA.png"
                title="Sandboarding en Huacachina"
                mobileTitle="Huacachina"
                isPrimary={false}
                description="Deslízate por las dunas de arena de Huacachina, cerca de Ica. El sandboarding es una actividad emocionante, y también puedes hacer recorridos en buggies por el desierto."
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                isMobile={true}
                imageSrc="/MONTAÑA_7_COLORES.jpg"
                title="Trekking en la Montaña de 7 Colores"
                mobileTitle="Montaña 7 Colores"
                isPrimary={false}
                description="Realiza una caminata hacia la famosa Montaña de los Siete Colores, cerca de Cusco. Este destino es conocido por sus impresionantes colores naturales debido a los minerales presentes en la tierra."
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                isMobile={true}
                imageSrc="/HUACACHINA.png"
                title="Sandboarding en Huacachina"
                mobileTitle="Huacachina"
                isPrimary={false}
                description="Deslízate por las dunas de arena de Huacachina, cerca de Ica. El sandboarding es una actividad emocionante, y también puedes hacer recorridos en buggies por el desierto."
              />
            </SwiperSlide>
          </Swiper>
        );
      case 2:
        return (
          <Swiper
            slidesPerView={2}
            spaceBetween={4}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper "
          >
            <SwiperSlide>
              <Card
                isMobile={true}
                imageSrc="/HUACACHINA.png"
                title="Sandboarding en Huacachina"
                mobileTitle="Huacachina"
                isPrimary={false}
                description="Deslízate por las dunas de arena de Huacachina, cerca de Ica. El sandboarding es una actividad emocionante, y también puedes hacer recorridos en buggies por el desierto."
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                isMobile={true}
                imageSrc="/HUACACHINA.png"
                title="Sandboarding en Huacachina"
                mobileTitle="Huacachina"
                isPrimary={false}
                description="Deslízate por las dunas de arena de Huacachina, cerca de Ica. El sandboarding es una actividad emocionante, y también puedes hacer recorridos en buggies por el desierto."
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                isMobile={true}
                imageSrc="/MONTAÑA_7_COLORES.jpg"
                title="Trekking en la Montaña de 7 Colores"
                mobileTitle="Montaña 7 Colores"
                isPrimary={false}
                description="Realiza una caminata hacia la famosa Montaña de los Siete Colores, cerca de Cusco. Este destino es conocido por sus impresionantes colores naturales debido a los minerales presentes en la tierra."
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                isMobile={true}
                imageSrc="/HUACACHINA.png"
                title="Sandboarding en Huacachina"
                mobileTitle="Huacachina"
                isPrimary={false}
                description="Deslízate por las dunas de arena de Huacachina, cerca de Ica. El sandboarding es una actividad emocionante, y también puedes hacer recorridos en buggies por el desierto."
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                isMobile={true}
                imageSrc="/MONTAÑA_7_COLORES.jpg"
                title="Trekking en la Montaña de 7 Colores"
                mobileTitle="Montaña 7 Colores"
                isPrimary={false}
                description="Realiza una caminata hacia la famosa Montaña de los Siete Colores, cerca de Cusco. Este destino es conocido por sus impresionantes colores naturales debido a los minerales presentes en la tierra."
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                isMobile={true}
                imageSrc="/HUACACHINA.png"
                title="Sandboarding en Huacachina"
                mobileTitle="Huacachina"
                isPrimary={false}
                description="Deslízate por las dunas de arena de Huacachina, cerca de Ica. El sandboarding es una actividad emocionante, y también puedes hacer recorridos en buggies por el desierto."
              />
            </SwiperSlide>
          </Swiper>
        );
      case 3:
        return (
          //<div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"> </div>
          <Swiper
            slidesPerView={2}
            spaceBetween={4}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper "
          >
            <SwiperSlide>
              <Card
                isMobile={true}
                imageSrc="/MONTAÑA_7_COLORES.jpg"
                title="Trekking en la Montaña de 7 Colores"
                mobileTitle="Montaña 7 Colores"
                isPrimary={false}
                description="Realiza una caminata hacia la famosa Montaña de los Siete Colores, cerca de Cusco. Este destino es conocido por sus impresionantes colores naturales debido a los minerales presentes en la tierra."
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                isMobile={true}
                imageSrc="/MONTAÑA_7_COLORES.jpg"
                title="Trekking en la Montaña de 7 Colores"
                mobileTitle="Montaña 7 Colores"
                isPrimary={false}
                description="Realiza una caminata hacia la famosa Montaña de los Siete Colores, cerca de Cusco. Este destino es conocido por sus impresionantes colores naturales debido a los minerales presentes en la tierra."
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                isMobile={true}
                imageSrc="/MONTAÑA_7_COLORES.jpg"
                title="Trekking en la Montaña de 7 Colores"
                mobileTitle="Montaña 7 Colores"
                isPrimary={false}
                description="Realiza una caminata hacia la famosa Montaña de los Siete Colores, cerca de Cusco. Este destino es conocido por sus impresionantes colores naturales debido a los minerales presentes en la tierra."
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                isMobile={true}
                imageSrc="/HUACACHINA.png"
                title="Sandboarding en Huacachina"
                mobileTitle="Huacachina"
                isPrimary={false}
                description="Deslízate por las dunas de arena de Huacachina, cerca de Ica. El sandboarding es una actividad emocionante, y también puedes hacer recorridos en buggies por el desierto."
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                isMobile={true}
                imageSrc="/MONTAÑA_7_COLORES.jpg"
                title="Trekking en la Montaña de 7 Colores"
                mobileTitle="Montaña 7 Colores"
                isPrimary={false}
                description="Realiza una caminata hacia la famosa Montaña de los Siete Colores, cerca de Cusco. Este destino es conocido por sus impresionantes colores naturales debido a los minerales presentes en la tierra."
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                isMobile={true}
                imageSrc="/HUACACHINA.png"
                title="Sandboarding en Huacachina"
                mobileTitle="Huacachina"
                isPrimary={false}
                description="Deslízate por las dunas de arena de Huacachina, cerca de Ica. El sandboarding es una actividad emocionante, y también puedes hacer recorridos en buggies por el desierto."
              />
            </SwiperSlide>
          </Swiper>
        );
      default:
        return null;
    }
  };

  const activeTabStyles = {
    "tab-active": "bg-primary text-white",
    "": "text-gray-500 outline outline-2 outline-gray-200 hover:outline-none",
  };

  return (
    <div>
      <div
        role="tablist"
        className="flex justify-start items-center gap-4 bg-base-100"
      >
        <a
          role="tab"
          className={`btn btn-ghost rounded-full h-14 px-6 ${
            activeTab === 1
              ? activeTabStyles["tab-active"]
              : activeTabStyles[""]
          }`}
          onClick={() => setActiveTab(1)}
        >
          <BiCategoryAlt className="mr-2" />
          Todo
        </a>
        <a
          role="tab"
          className={`btn btn-ghost rounded-full h-14 px-6 ${
            activeTab === 2
              ? activeTabStyles["tab-active"]
              : activeTabStyles[""]
          }`}
          onClick={() => setActiveTab(2)}
        >
          <PiMountainsFill size={24} className="mr-2" /> Lugares
        </a>
        <a
          role="tab"
          className={`btn btn-ghost rounded-full h-14 px-6  ${
            activeTab === 3
              ? activeTabStyles["tab-active"]
              : activeTabStyles[""]
          }`}
          onClick={() => setActiveTab(3)}
        >
          <LiaTreeSolid size={24} className="mr-2" /> Actividades
        </a>
      </div>
      <div className="p-4 mt-4 bg-gray-100 rounded-lg">{renderContent()}</div>
    </div>
  );
};