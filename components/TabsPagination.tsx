import React, { useState, useEffect } from "react";
import { BiCategoryAlt } from "react-icons/bi";
// import { TouristPlan } from "@/types/touristPlan";
import { useFavorites } from "@/context/FavoritesContext";
import VacationCard from "./VacationCard";
import { fetchCategories } from "@/lib/categories/categoryActions"
import { ResCategory } from "@/types/categories";
import Image from "next/image";

type TabsProps = {
  isMobile?: boolean;
  categoryId?: string;
};

export const TabsPagination: React.FC<TabsProps> = ({ categoryId }) => {
  const [activeTab, setActiveTab] = useState(Number(categoryId));
  const [currentPage, setCurrentPage] = useState(1);
  // const [loading, setLoading] = useState(true); // Para el estado de carga
  const itemsPerPage = 9;
  const { touristPlans, loading } = useFavorites();
  //const tours = touristPlans;
  const [categories, setCategories] = useState<ResCategory[]>([]);


  useEffect(() => {
    setCurrentPage(1); // Resetear la paginación al cambiar de pestaña
  }, [activeTab]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const categories = await fetchCategories();
            setCategories(categories);
            //setActiveTab(Number(categories[0]?.id) || 0); // Inicializar con la primera categoría.
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
          console.error("Error fetching categories:");
        }
    };

      fetchData();
  }, []);

  const filteredTours = activeTab === 0
  ? touristPlans // Muestra todos los planes si activeTab es 0
  : touristPlans.filter((tour) => tour.category.id === activeTab);

  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTours = filteredTours.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderContent = () => (
    <div className="flex gap-4 gap-y-8 flex-wrap justify-center">
      {loading
      ? Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="relative card w-80 h-128 bg-base-100 shadow-md border border-base-200 p-4">
          <div className="skeleton w-full h-64 rounded-t-2xl mb-4"></div>
          <div className="space-y-2">
            <div className="skeleton h-6 w-3/4 rounded"></div>
            <div className="skeleton h-4 w-1/2 rounded"></div>
            <div className="skeleton h-4 w-1/4 rounded"></div>
            <div className="skeleton h-4 w-1/3 rounded"></div>

            {/* Características */}
            <div className="flex gap-2">
              <div className="skeleton h-6 w-6 rounded-full"></div>
              <div className="skeleton h-6 w-6 rounded-full"></div>
              <div className="skeleton h-6 w-6 rounded-full"></div>
            </div>

            {/* Precio */}
            <div className="skeleton h-8 w-2/3 rounded"></div>
          </div>

          {/* LikeButton */}
          <div className="skeleton absolute bottom-4 right-4 h-10 w-10 rounded-full"></div>
        </div>
      ))
      : paginatedTours.map((tour) => (
        <VacationCard key={tour.id} plan={tour} comeForCategories={true}/>
      ))}
    </div>
  );

  const activeTabStyles = {
    "tab-active": "bg-primary text-white",
    "": "text-gray-500 outline outline-2 outline-gray-200 hover:outline-none",
  };

  return (
    <div>
      <div
        role="tablist"
        className="mx-6 flex flex-wrap justify-start items-center gap-4 bg-base-100"
      >
        {/* Botón para "Todos" */}
        <div
          className={`flex items-center cursor-pointer p-3 rounded-md transition-all border-2 ${
            activeTab === 0
              ? activeTabStyles["tab-active"]
              : activeTabStyles[""]
          }`}
          onClick={() => setActiveTab(0)}
        >
          <BiCategoryAlt
            size={24}
            className={`mr-2 ${
              activeTab === 0 ? "text-primary" : "text-black"
            }`}
          />
          <span>Todos</span>
        </div>

        {categories.map((category) => (
          <a
            key={category.id}
            role="tab"
            className={`btn btn-ghost rounded-full h-14 px-6 ${
              activeTab === Number(category.id)
                ? activeTabStyles["tab-active"]
                : activeTabStyles[""]
            }`}
            onClick={() => setActiveTab(Number(category.id))}
          >
            {category.image ? (
                <Image 
                  src={category.image.imageUrl} 
                  alt={category.name} 
                  width={24} 
                  height={24} 
                  className="mr-2"
                />
              ) : (
                <BiCategoryAlt className="mr-2" size={24} />
              )}
              {category.name}
          </a>
        ))}
      </div>
      <div className="p-4 mt-4 bg-gray-100 rounded-lg">{renderContent()}</div>

      {/* Paginación */}
      {!loading && (
        // <div className="flex justify-center gap-4 mt-6">
        //   {Array.from({ length: totalPages }, (_, i) => i + 1).map(
        //     (pageNumber) => (
        //       <button
        //         key={pageNumber}
        //         className={`join-item btn btn-square ${
        //           currentPage === pageNumber
        //             ? "bg-primary text-white"
        //             : "bg-gray-200 text-gray-600"
        //         }`}
        //         onClick={() => handlePageChange(pageNumber)}
        //       >
        //         {pageNumber}
        //       </button>
        //     )
        //   )}
        // </div>
        <div className="flex justify-center items-center gap-2 mt-6">
          {/* Botón de flecha izquierda */}
          <button
            className="btn btn-square"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &lt;
          </button>

          {/* Números de la paginación */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((pageNumber) => {
              if (window.innerWidth < 640) {
                const maxVisiblePages = 1;
                const firstPage = 1;
                const lastPage = totalPages;

                return (
                  pageNumber === firstPage ||
                  pageNumber === lastPage ||
                  Math.abs(pageNumber - currentPage) < maxVisiblePages
                );
              }

              return (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                Math.abs(pageNumber - currentPage) <= 1
              );
            })
            .map((pageNumber, index, filteredPages) => (
              <React.Fragment key={pageNumber}>
                {index > 0 && pageNumber > filteredPages[index - 1] + 1 && (
                  // Agregar puntos suspensivos entre rangos
                  <span className="px-2">...</span>
                )}
                <button
                  className={`btn btn-square ${
                    currentPage === pageNumber
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              </React.Fragment>
            ))}

          {/* Botón de flecha derecha */}
          <button
            className="btn btn-square"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};
