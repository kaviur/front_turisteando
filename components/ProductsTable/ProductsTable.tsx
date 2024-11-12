import { TouristPlans } from "@/types/touristPlan";
import Image from "next/image";

const ProductsTable = ({ products }: { products: TouristPlans[] }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default">
      <div className="px-4 py-6 md:px-6 xl:px-7">
        <h4 className="text-2xl font-semibold text-secondary">Productos</h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4 sm:grid-cols-8 md:px-6 2xl:px-7">
        <div className="col-span-4 flex items-center">
          <p className="font-medium py-2">Producto</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex ml-6">
          <p className="font-medium py-2">Categoría</p>
        </div>
        <div className="col-span-1 flex items-center ml-6">
          <p className="font-medium py-2">Precio</p>
        </div>
        <div className="col-span-1 flex items-center ml-6">
          <p className="font-medium">Ciudad</p>
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
          <div className="col-span-4 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-14 w-20 rounded-md flex items-center">
                {product.imagesUrl && product.imagesUrl.length > 0 ? (
                  <Image
                    src={product.imagesUrl[0]}
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
          <div className="col-span-1 hidden items-center sm:flex">
            <span className="text-success inline-flex items-center rounded-full bg-success bg-opacity-10 px-2 py-1 text-xs font-medium ml-6">
              {product.categoryId}
            </span>
          </div>
          <div className="col-span-1 flex items-center ml-6">
            <p className="text-sm text-black">$ {product.price}</p>
          </div>
          <div className="col-span-1 flex items-center ml-6">
            <p className="text-sm text-black">{product.cityId}</p>
          </div>
          <div className="col-span-1 flex items-center ml-6 justify-end">
            <p className="text-xs text-accent">Ver Detalle</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsTable;
