import React, { useState, useEffect } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { LiaTreeSolid } from "react-icons/lia";
import { PiMountainsFill } from "react-icons/pi";
import Card from "./Card";
import { TouristPlan } from "@/types/touristPlan";

type TabsProps = {
  isMobile?: boolean;
};

export const TabsPagination: React.FC<TabsProps> = ({ isMobile = false }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [tours, setTours] = useState<TouristPlan[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Para el estado de carga
  const itemsPerPage = 3;

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
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };
    fetchTours();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Resetear la paginación al cambiar de pestaña
  }, [activeTab]);

  const filteredTours = tours.filter((tour) => {
    if (activeTab === 2) {
      return tour.category.name === "Tours";
    }
    if (activeTab === 3) {
      return tour.category.name === "Activity";
    }
    return true;
  });

  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTours = filteredTours.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderContent = () => (
    <div className="flex gap-4 flex-wrap justify-center">
      {loading
        ? Array.from({ length: 3 }).map((_, index) => (
            <div className="flex max-w-xl w-96 max-h-96 flex-col gap-4" key={index}>
              <div className="skeleton h-52 w-full"></div>
              <div className="skeleton h-4 w-36"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          ))
        : paginatedTours.map((tour) => (
            <Card
              key={tour.id}
              id={tour.id}
              mobileTitle={tour.title}
              isMobile={isMobile}
              imageSrc={tour.images[0]?.imageUrl}
              title={tour.title}
              isPrimary={tour.category?.name === "Tours"}
              description={tour.description}
            />
          ))}
    </div>
  );

  const activeTabStyles = {
    "tab-active": "bg-primary text-white",
    "": "text-gray-500 outline outline-2 outline-gray-200 hover:outline-none",
  };

  return (
    <div>
      <div role="tablist" className="mx-6 flex flex-wrap justify-start items-center gap-4 bg-base-100">
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
        {renderContent()}
      </div>

      {/* Paginación */}
      {activeTab === 1 && !loading && (
        <div className="flex justify-center gap-4 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              className={`join-item btn btn-square ${
                currentPage === pageNumber ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
