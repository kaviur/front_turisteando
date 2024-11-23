import { TouristPlan } from "@/types/touristPlan";
import Image from "next/image";
import { FiEdit, FiTrash } from "react-icons/fi";
import Link from "next/link";
import { TbArrowsExchange } from "react-icons/tb";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type Category = {
    id: number;
    name: string;
    description: string;
    image: {
      id: number;
      imageUrl: string;
    };
};

const ProductsTableActions = ({ products }: { products: TouristPlan[] }) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [currentCategoryId, setCurrentCategoryId] = useState<number | null>(null);

    const router = useRouter();

    const handleCategorySelect = (id: number) => {
        setSelectedCategoryId(id);
    };

    const handleOpenModal = (categoryId: number) => {
        try {
          setCurrentCategoryId(categoryId);
          setSelectedCategoryId(null);
      
          const dialogElement = document.getElementById("my_modal_4") as HTMLDialogElement;
          if (!dialogElement) {
            throw new Error("Modal element not found");
          }
          dialogElement.showModal();
        } catch (error) {
          console.error("Error opening modal:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/all`)
      
            if (!res.ok) {
              setError('Error en la solicitud de categorías.');
            }
      
            const categoriesData = await res.json();
      
            setCategories(categoriesData.data);
    
          } catch (error) {
            console.error("Error fetching categories:", error);
            setError('Error al obtener las categorías.');
          } finally {
            setLoading(false);
          }
        };
      
        fetchData();
    }, []);

    const assignCategory = async (product: TouristPlan) => {
        if (!selectedCategoryId) {
          toast.error("Por favor selecciona una categoría antes de asignar.");
          return;
        }
      
        try {
            const formData = new FormData();
            const touristPlan = JSON.stringify({
              title:product.title,
              description:product.description,
              price: product.price,
              cityId: product.city,
              categoryId: product.category,
              availabilityStartDate: product.availabilityStartDate,
              availabilityEndDate: product.availabilityEndDate,
              capacity: product.capacity,
              duration: product.duration,
              characteristicIds: product.characteristic
            });
        
            formData.append(
              "touristPlan",
              new Blob([touristPlan], { type: "application/json" })
            );
        
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/tourist-plans/update/${product.id}`,
              {
                method: "PUT",
                body: formData,
              }
            );
      
            if (!response.ok) {
              const errorData = await response.json();
              if (errorData.errors && Array.isArray(errorData.errors)) {
                errorData.errors.forEach((err: string) => toast.error(err));
              }
              throw new Error("Error al modificar la categoría.");
            }
      
            toast.success("Categoría modificada exitosamente!");
            router.push("/admin/productactions");
        } catch (error) {
          console.error("Error al asignar la categoría:", error);
          toast.error("Hubo un error. Por favor intenta nuevamente.");
        }
    };
    
       

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default">
            <div className="px-4 py-6 md:px-6 xl:px-7">
                <h4 className="text-2xl font-semibold text-secondary">Productos</h4>
            </div>

            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4 sm:grid-cols-8 md:px-6 2xl:px-7">
                <div className="col-span-2 flex items-center">
                    <p className="font-medium py-2">Producto</p>
                </div>
                <div className="col-span-2 flex items-center ml-6">
                    <p className="font-medium py-2">Descripción</p>
                </div>
                <div className="col-span-1 items-center sm:flex ml-6">
                    <p className="font-medium py-2">Categoría</p>
                </div>
                <div className="col-span-1 flex items-center ml-6">
                    <p className="font-medium">Ciudad</p>
                </div>
                <div className="col-span-1 flex items-center ml-6">
                    <p className="font-medium py-2">Precio</p>
                </div>
                <div className="col-span-1 flex items-center ml-6 justify-end">
                    <p className="font-medium py-2"></p>
                </div>
            </div>

            {products.map((product, key) => (
                <div
                    className="grid grid-cols-6 border-t border-stroke px-4 py-4 sm:grid-cols-8 md:px-6 2xl:px-7"
                    key={key}
                >
                    <div className="col-span-2 flex items-center">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="h-14 w-20 rounded-md flex items-center">
                                {product.images && product.images.length > 0 ? (
                                    <Image
                                        src={product.images[0].imageUrl}
                                        width={60}
                                        height={50}
                                        alt="Product"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <p className="text-sm text-black italic">{product.title}</p>
                        </div>
                    </div>
                    <div className="col-span-2 flex items-center ml-6">
                        <p className="text-sm text-black truncate w-48">{product.description}</p>
                    </div>
                    <div className="col-span-1 hidden items-center sm:flex">
                        <span className="text-success inline-flex items-center rounded-full bg-success bg-opacity-10 px-2 py-1 text-xs font-medium ml-6">
                            {product.category.name}
                        </span>
                        <button 
                            className="bg-red-400 text-white font-bold p-1 rounded-full ml-4" 
                            onClick={() => handleOpenModal(product.category.id)}
                        >
                        <TbArrowsExchange />
                        </button>
                        <dialog id="my_modal_4" className="modal">
                            <Toaster/>
                            <div className="modal-box w-11/12 max-w-5xl p-10">
                                <h3 className="font-bold text-lg text-secondary">Cambia la categoría a la que pertenece este plan</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-8">
                                    {loading ? (
                                        <span className="loading loading-bars loading-lg"></span>
                                    ) : error ? (
                                    <p className="text-red-500">{error}</p>
                                    ) : 
                                    (categories.map((category) => {
                                        const isCurrent = category.id === currentCategoryId;
                                        const isSelected = category.id === selectedCategoryId;
                                    
                                        return (
                                          <div
                                            key={category.id}
                                            className={`relative group rounded-md overflow-hidden shadow-lg cursor-pointer ${
                                              isSelected ? "border-4 border-blue-500" : ""
                                            } ${isCurrent ? "bg-gray-300 cursor-not-allowed" : ""}`}
                                            onClick={() => {
                                              if (!isCurrent) handleCategorySelect(category.id);
                                            }}
                                            style={{ opacity: isCurrent ? 0.6 : 1 }}
                                          >
                                            <div className="relative w-full h-0 pb-[100%]">
                                              <Image
                                                src={category.image.imageUrl}
                                                alt={category.name}
                                                layout="fill"
                                                objectFit="cover"
                                                className={`transition-transform duration-300 ease-in-out group-hover:scale-110 rounded-md ${
                                                  isCurrent ? "grayscale" : ""
                                                }`}
                                              />
                                            </div>
                                            <div
                                              className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
                                                isCurrent ? "opacity-80" : "opacity-0 group-hover:opacity-100"
                                              } transition-opacity duration-300`}
                                            >
                                              <span className="text-white font-semibold text-lg">
                                                {isCurrent ? "Actual: " : ""}
                                                {category.name}
                                              </span>
                                            </div>
                                          </div>
                                        );
                                      }))
                                    }
                                </div>
                                <div className="modal-action flex items-center">
                                    <button className="btn btn-primary" onClick={() => assignCategory(product)}>
                                        Asignar esta categoría
                                    </button>
                                    <form method="dialog">
                                        <button className="btn">Cancelar</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                    <div className="col-span-1 flex items-center ml-6">
                        <p className="text-sm text-black">{product.city.name}</p> 
                    </div>
                    <div className="col-span-1 flex items-center ml-6">
                        <p className="text-sm text-black">$ {product.price}</p>
                    </div>
                    <div className="col-span-1 flex items-center ml-6 justify-end space-x-4">
                    <Link href={`/product/${product.id}`}>
                        <button className="text-[#ff5b03] text-xs border-[1px] border-[#ff5b03] bg-white rounded-[48px] px-2 py-1 hover:bg-orange-600 hover:text-white transition-colors duration-300">Detalles</button>
                    </Link>
                    <Link href={`/admin/editproduct/${product.id}`}>
                        <button
                            className="text-blue-500 hover:text-blue-700"
                            aria-label="Editar producto"
                        >
                            <FiEdit size={18} />
                        </button>
                    </Link>
                        <button
                            className="text-red-500 hover:text-red-700"
                            aria-label="Eliminar producto"
                        >
                            <FiTrash size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductsTableActions;
