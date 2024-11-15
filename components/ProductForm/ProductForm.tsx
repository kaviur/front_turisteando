import { useState, ChangeEvent } from 'react';

interface TouristPlanRequest {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  price: string;
  setPrice: (price: string) => void;
  startDate: string;
  setStartDate: (startDate: string) => void;
  endDate: string;
  setEndDate: (endDate: string) => void;
  capacity: string;
  setCapacity: (capacity: string) => void;
  duration: string;
  setDuration: (duration: string) => void;
  features: string[];
  setFeatures: (features: string[]) => void;
  images: FileList | null;
  setImages: (images: FileList | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  isEditing: boolean;
}

const ProductForm = ({
  name,
  setName,
  description,
  setDescription,
  price,
  setPrice,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  capacity,
  setCapacity,
  duration,
  setDuration,
  features,
  setFeatures,
  images,
  setImages,
  onSubmit,
  isPending,
  isEditing,
}: TouristPlanRequest) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages(files);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9 w-[720px]">
        <div className="rounded-sm border border-stroke bg-white shadow">
          <div className="border-b border-stroke px-6 py-5">
            <h3 className="font-medium text-primary text-xl">
              {isEditing ? `Tour guiado a ${name}` : 'Agregar Producto'}
            </h3>
          </div>
          <form onSubmit={onSubmit}>
            <div className="p-6">
              <div className="mb-6 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Nombre
                  </label>
                  <input
                    type="text"
                    placeholder="Ingresar Nombre del Producto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-black">
                  Descripción
                </label>
                <textarea
                  rows={6}
                  placeholder="Ingresa la descripción del producto"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-black">
                  Precio
                </label>
                <input
                  type="text"
                  placeholder="Ingresar precio del producto"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Disponibilidad Fecha de Inicio
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Disponibilidad Fecha Fin
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Capacidad
                  </label>
                  <input
                    type="text"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Duración
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  >
                    <option value="" disabled>
                      Seleccionar duración
                    </option>
                    <option value="1 day">1 día</option>
                    <option value="2 days">2 días</option>
                    <option value="3 days">3 días</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-black">
                  Características
                </label>
                <select
                  multiple
                  value={features}
                  onChange={(e) => setFeatures(Array.from(e.target.selectedOptions, option => option.value))}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                >
                  <option value="atributo1">Atributo 1</option>
                  <option value="atributo2">Atributo 2</option>
                  <option value="atributo3">Atributo 3</option>
                  <option value="atributo4">Atributo 4</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-black mb-2">Imágenes</label>
                <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                  <label className="bg-gray-100 text-gray-600 px-4 py-2 cursor-pointer hover:bg-gray-200">
                    Selecciona los archivos
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      onChange={handleFileChange}
                    />
                  </label>
                  <input
                    type="text"
                    id="file-name"
                    placeholder="Ningún archivo ha sido seleccionado"
                    className="flex-grow px-4 py-2 border-l border-gray-300 outline-none text-gray-700"
                    readOnly
                    value={images ? `${images.length} archivo(s) seleccionado(s)` : ''}
                  />
                </div>
              </div>

            </div>
          </form>
        </div>
        <div className="flex justify-center mt-2">
          <button
            type="submit"
            style={{
              background: isEditing ? 'var(--Secondary, #FF5B03)' : 'var(--Primary, #FF0178)',
            }}
            className="px-14 py-3 text-white rounded-md"
            disabled={isPending} // Deshabilitar el botón si está en espera
          >
            {isPending ? (
              <span className="flex justify-center items-center">
                <div className="w-5 h-5 border-4 border-t-4 border-white rounded-full animate-spin mr-2"></div>
                Cargando...
              </span>
            ) : (
              isEditing ? 'Guardar Cambios' : 'Crear Producto'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
