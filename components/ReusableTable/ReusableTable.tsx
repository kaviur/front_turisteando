import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { ResCategory } from "@/types/categories";
import { Characteristics } from "@/types/characteristics";

type ReusableTableProps = {
  items: ResCategory[] | Characteristics[];
  entityType: "categoría" | "característica";
  onEdit: (id: string) => void;
  onDelete: (id: string | undefined) => void;
};

const ReusableTable = ({
  items,
  entityType,
  onEdit,
  onDelete,
}: ReusableTableProps) => {
  const isCategory = entityType === "categoría";

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default">
      <div className="px-4 py-6 md:px-6 xl:px-7">
        <h4 className="text-2xl font-semibold text-secondary">
          {isCategory ? "Listado de Categorías" : "Listado de Características"}
        </h4>
      </div>

      <div
        className={`grid grid-cols-5 border-t border-stroke px-4 py-4 md:px-6 2xl:px-7`}
      >
        <div className="col-span-1 flex items-center">
          <p className="font-medium py-2">Ícono</p>
        </div>
        <div
          className={`${
            isCategory ? "col-span-1" : "col-span-3"
          } flex "items-center"`}
        >
          <p className="font-medium py-2">
            {isCategory ? "Categorías" : "Características"}
          </p>
        </div>
        {isCategory && (
          <div className="col-span-2 flex items-center flex-grow">
            <p className="font-medium py-2">Descripción</p>
          </div>
        )}
        <div className="col-span-1 flex items-center justify-end">
          <p className="font-medium py-2"></p>
        </div>
      </div>

      {items.map((item, key) => (
        <div
          className={`grid grid-cols-5 border-t border-stroke px-4 py-4 md:px-6 2xl:px-7`}
          key={key}
        >
          <div className="col-span-1 flex items-center">
            {item.image ? (
              <Image
                src={(item.image as { imageUrl: string }).imageUrl}
                width={40}
                height={30}
                alt="Icono"
                className="rounded-md"
              />
            ) : (
              <div className="w-14 h-14 bg-gray-200 flex items-center justify-center">
                No Image
              </div>
            )}
          </div>

          <div
            className={`${
              isCategory ? "col-span-1" : "col-span-3"
            } flex items-center`}
          >
            <p className="text-sm text-black italic">{item.name}</p>
          </div>

          {isCategory && (
            <div className="col-span-2 flex items-center">
              <p className="text-sm text-black">
                {(item as ResCategory).description || "Sin descripción"}
              </p>
            </div>
          )}

          <div className="col-span-1 flex items-center justify-end gap-4">
            <button
              onClick={() => item.id && onEdit(item.id)}
              className="p-2 rounded-md"
              style={{ backgroundColor: "#010971" }}
              disabled={!item.id} // Opcional: deshabilitar el botón si falta id
            >
              <FaRegEdit color="white" size={16} />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-2 rounded-md"
              style={{ backgroundColor: "#FE0707" }}
            >
              <AiOutlineDelete color="white" size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReusableTable;
