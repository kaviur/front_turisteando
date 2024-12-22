import React, { useState, useEffect } from "react";
import { BiCategoryAlt } from "react-icons/bi";
// import { TouristPlan } from "@/types/touristPlan";
import { useFavorites } from "@/context/FavoritesContext";
import VacationCard from "./VacationCard";
import { ResCategory } from "@/types/categories";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { Characteristics } from "@/types/characteristics";

type TabsProps = {
  isMobile?: boolean;
  categoryId?: string;
};

export const TabsPagination: React.FC<TabsProps> = ({ categoryId }) => {
  const [activeCategory, setActiveCategory] = useState<number | null>(Number(categoryId));
  const [activeCharacteristics, setActiveCharacteristics] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [loading, setLoading] = useState(true); // Para el estado de carga
  const itemsPerPage = 12;
  const characteristicsToShow = 6;
  const { allTouristPlans, touristPlans, loading, updateTouristPlans } = useFavorites();
  //const tours = touristPlans;
  const [categories, setCategories] = useState<ResCategory[]>([]);
  const [characteristics, setCharacteristics] = useState<Characteristics[]>([]);

  const [characteristicsStartIndex, setCharacteristicsStartIndex] = useState(0);
  const visibleCharacteristics = characteristics.slice(
    characteristicsStartIndex,
    characteristicsStartIndex + characteristicsToShow
  );

  const handleNextCharacteristics = () => {
    if (characteristicsStartIndex + characteristicsToShow < characteristics.length) {
      setCharacteristicsStartIndex((prev) => prev + characteristicsToShow);
    }
  };
  
  const handlePrevCharacteristics = () => {
    if (characteristicsStartIndex > 0) {
      setCharacteristicsStartIndex((prev) => prev - characteristicsToShow);
    }
  };
  

  const handleCategoryClick = (categoryId: number | null) => {
    setActiveCategory(categoryId);
  };
  
  // Cambiar características activas
  const handleCharacteristicClick = (characteristicId: number) => {
    setActiveCharacteristics((prev) =>
      prev.includes(characteristicId)
        ? prev.filter((id) => id !== characteristicId) // Desactivar si ya está seleccionada
        : [...prev, characteristicId] // Activar si no está seleccionada
    );
  };


  useEffect(() => {
    setCurrentPage(1); // Resetear la paginación al cambiar de pestaña
  }, [activeCategory]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, characteristicsResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/all`),
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/characteristics/all`),
        ]);
  
        if (!categoriesResponse.ok ||  !characteristicsResponse.ok) {
          throw new Error('Error en las solicitudes de categorías o características.');
        }
  
        const categoriesData = await categoriesResponse.json();
        const characteristicsData = await characteristicsResponse.json();
  
        setCategories(categoriesData.data);
        setCharacteristics(
          characteristicsData.data.map((item: Characteristics) => ({
            id: item.id?.toString(),
            name: item.name,
            image: item.image,
          }))
        );

      } catch (error) {
        console.error("Error fetching categories:", error);
      } 
    };
  
    fetchData();
  }, []);
 

  const filteredTours = touristPlans.filter((plan) => {
    const matchesCategory = activeCategory === 0
    ? touristPlans
    : plan.category.id === activeCategory;

    const matchesCharacteristics =
      activeCharacteristics.length === 0 ||
      activeCharacteristics.every((id) => plan.characteristic.some((char) => char.id === id));
  
    return matchesCategory && matchesCharacteristics;
  });

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
      ? Array.from({ length: itemsPerPage }).map((_, index) => (
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
        className="mx-6 flex flex-wrap justify-around tems-center gap-4 bg-base-100"
      >
        <div className="mx-6 flex flex-wrap justify-around tems-center gap-4 bg-base-100">
          {/* Botón para "Todos" */}
          <div
            className={`flex items-center cursor-pointer p-3 rounded-md transition-all border-2 ${
              activeCategory === 0
                ? activeTabStyles["tab-active"]
                : activeTabStyles[""]
            }`}
            onClick={() => handleCategoryClick(0)}
          >
            <BiCategoryAlt
              size={24}
              className={`mr-2 ${
                activeCategory === 0 ? "text-primary" : "text-black"
              }`}
            />
            <span>Todos</span>
          </div>

          {categories.map((category) => (
            <a
              key={category.id}
              role="tab"
              className={`btn btn-ghost rounded-full h-14 px-6 ${
                activeCategory === Number(category.id)
                  ? activeTabStyles["tab-active"]
                  : activeTabStyles[""]
              }`}
              onClick={() => handleCategoryClick(Number(category.id))}
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
        <SearchBar setTours={updateTouristPlans} allTours={allTouristPlans} />
        <div className="flex items-center">
          <button
            onClick={handlePrevCharacteristics}
            disabled={characteristicsStartIndex === 0}
          >
            {"<"}
          </button>
          <div className="flex flex-wrap gap-4 mt-3">
            {visibleCharacteristics.map((characteristic) => {
              const imageUrl =
                typeof characteristic.image === "object" && "imageUrl" in characteristic.image
                  ? characteristic.image.imageUrl
                  : "";

              const isSelected = activeCharacteristics.includes(characteristic.id?Number(characteristic.id):0);

              return (
                imageUrl && (
                  <Image
                    key={characteristic.id}
                    src={imageUrl}
                    alt={characteristic.name || ""}
                    width={24}
                    height={24}
                    className={`cursor-pointer ${
                      isSelected ? "border-2 border-blue-500" : ""
                    }`}
                    onClick={() => handleCharacteristicClick((characteristic.id?Number(characteristic.id):0))}
                  />
                )
              );
            })}
          </div>
          <button
            onClick={handleNextCharacteristics}
            disabled={characteristicsStartIndex + 5 >= characteristics.length}
          >
            {">"}
          </button>
        </div>
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
