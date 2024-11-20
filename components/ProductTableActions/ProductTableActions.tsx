import { TouristPlan } from "@/types/touristPlan";
import Image from "next/image";
import { FiEdit, FiTrash } from "react-icons/fi";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useSession } from "next-auth/react";

const ProductsTableActions = ({ products, setTouristPlans }: { products: TouristPlan[]; setTouristPlans: React.Dispatch<React.SetStateAction<TouristPlan[]>> }) => {
    const { data: session } = useSession();

    const confirmDelete = async () => {
        return new Promise<boolean>((resolve) => {
            toast(
                (t) => (
                    <div>
                        <p>¿Estás seguro de que deseas eliminar este producto?</p>
                        <div className="flex justify-end gap-2 mt-2">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => {
                                    toast.dismiss(t.id);
                                    resolve(true);
                                }}
                            >
                                Sí, eliminar
                            </button>
                            <button
                                className="bg-gray-300 text-black px-4 py-2 rounded"
                                onClick={() => {
                                    toast.dismiss(t.id);
                                    resolve(false);
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                ),
                { duration: Infinity } // Evita que el toast desaparezca automáticamente
            );
        });
    };

    // Método para eliminar una categoría existente
    const handleDelete = async (id: number) => {
        const confirmed = await confirmDelete();
        if (!confirmed) return;

        /* @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it */
        const token = session?.accessToken || '';

        try {
            await toast.promise(
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tourist-plans/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }).then(async(response) => {
                    if (!response.ok) throw new Error("Error al eliminar el producto");
                    
                }),
                {
                    loading: "Eliminando producto...",
                    success: "Producto eliminada exitosamente",
                    error: "Error al eliminar el producto",
                }
            );
            // Filtra el producto eliminado de la lista y actualiza el estado
        setTouristPlans((prevProducts) => prevProducts.filter((product) => product.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
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
                            {product.category.name} {/* Correcto acceso a la categoría */}
                        </span>
                    </div>
                    <div className="col-span-1 flex items-center ml-6">
                        <p className="text-sm text-black">{product.city.name}</p> {/* Correcto acceso a la ciudad */}
                    </div>
                    <div className="col-span-1 flex items-center ml-6">
                        <p className="text-sm text-black">$ {product.price}</p>
                    </div>
                    <div className="col-span-1 flex items-center ml-6 justify-end space-x-4">
                        <Link href={`/product/${product.id}`}>
                            <button className="text-[#ff5b03] text-xs border-[1px] border-[#ff5b03] bg-white rounded-[48px] px-2 py-1 hover:bg-orange-600 hover:text-white transition-colors duration-300">Detalles</button>
                        </Link>
                        <button
                            className="text-blue-500 hover:text-blue-700"
                            aria-label="Editar producto"
                        >
                            <FiEdit size={18} />
                        </button>
                        <button
                            onClick={() => handleDelete(product.id)}
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
