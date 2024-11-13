"use client";

import PrimaryButton from "../ui/PrimaryButton";

// Definimos los posibles tipos de entidad que el componente acepta
type EntityType = "categoría" | "característica";

// Definimos la interfaz para las props
interface ReusableSmallFormProps {
  entityType: EntityType;
}

const ReusableSmallForm: React.FC<ReusableSmallFormProps> = ({ entityType }) => {
  // Configuración dinámica basada en el tipo de entidad
  const isCategory = entityType === "categoría";
  const title = isCategory ? "Crear Categoría" : "Crear Característica";
  const placeholderName = isCategory
    ? "Ingresar nombre de la categoría"
    : "Ingresar nombre de la característica";
  const buttonText = isCategory ? "Crear Categoría" : "Crear Característica";

  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9 w-[720px]">
        {/* Contact Form */}
        <div className="rounded-sm border border-stroke bg-white shadow">
          <div className="border-b border-stroke px-6 py-5 ">
            <h3 className="font-medium text-primary text-xl">{title}</h3>
          </div>
          <form action="#">
            <div className="p-6">
              <div className="mb-6 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Nombre
                  </label>
                  <input
                    type="text"
                    placeholder={placeholderName}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                </div>
              </div>

              {/* Condicional para mostrar la descripción solo si es una categoría */}
              {isCategory && (
                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Descripción
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Ingresa la descripción de la categoría"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  ></textarea>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-black mb-2">
                  Ícono
                </label>
                <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                  <label className="bg-gray-100 text-gray-600 px-4 py-2 cursor-pointer hover:bg-gray-200">
                    Selecciona el archivo
                    <input type="file" className="hidden" />
                  </label>
                  <input
                    type="text"
                    id="file-name"
                    placeholder="Ningún archivo ha sido seleccionado"
                    className="flex-grow px-4 py-2 border-l border-gray-300 outline-none text-gray-700"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-center mt-2">
          <PrimaryButton text={buttonText} style="px-14" />
        </div>
      </div>
    </div>
  );
};

export default ReusableSmallForm;
