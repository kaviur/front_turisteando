import { useState, useEffect, ChangeEvent } from 'react';
import PrimaryButton from '../ui/PrimaryButton';
import CurrencyInput from 'react-currency-input-field';
import { FaXmark } from "react-icons/fa6";

interface TouristPlanRequest {
  title: string;
  setTitle: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  price: string;
  setPrice: (price: string) => void;
  cityId: string;
  setCityId: (cityId: string) => void;
  categoryId: string;
  setCategoryId: (categoryId: string) => void;
  availabilityStartDate: string;
  setAvailabilityStartDate: (availabilityStartDate: string) => void;
  availabilityEndDate: string;
  setAvailabilityEndDate: (availabilityEndDate: string) => void;
  capacity: string;
  setCapacity: (capacity: string) => void;
  duration: string;
  setDuration: (duration: string) => void;
  characteristicIds: string[];
  setCharacteristicIds: (characteristicIds: string[]) => void;
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>
  existingImages?: { id: number; imageUrl: string }[];
  handleDeleteImage?: (imageUrl: string) => void; // Opcional
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  isEditing: boolean;
  remainingImagesToUpload: number;
  setRemainingImagesToUpload: React.Dispatch<React.SetStateAction<number>>;
}

const ProductForm = ({
  title,
  setTitle,
  description,
  setDescription,
  price,
  setPrice,
  cityId,
  setCityId,
  categoryId,
  setCategoryId,
  availabilityStartDate,
  setAvailabilityStartDate,
  availabilityEndDate,
  setAvailabilityEndDate,
  capacity,
  setCapacity,
  duration,
  setDuration,
  characteristicIds,
  setCharacteristicIds,
  images,
  setImages,
  existingImages, // Opcional
  handleDeleteImage, // Opcional
  onSubmit,
  isPending,
  isEditing,
  remainingImagesToUpload,
  setRemainingImagesToUpload
}: TouristPlanRequest) => {
  
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [characteristics, setCharacteristics] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  //Handle multipart images
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
  
    if (files) {
      // Convertir FileList a un array de File
      const fileArray = Array.from(files);
  
      // Generar URLs temporales para previsualización
      const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
  
      // Actualizar el estado de las imágenes (multipart) con los archivos previos y nuevos
      setImages((prevImages: File[]) => [...prevImages, ...fileArray]);
  
      // Actualizar el estado de las URLs de previsualización, acumulando las previas y las nuevas
      setPreviewImages((prevPreviewImages) => [...prevPreviewImages, ...previewUrls]);
  
      // Calcular la cantidad de imágenes a subir y actualizar remainingImagesToUpload
      setRemainingImagesToUpload((prevRemaining) => Math.max(prevRemaining - fileArray.length, 0));
    }
  };
  

  const handleRemovePreviewImage = (index: number) => {
    if (images) {
      // Eliminar el archivo en la posición especificada
      const updatedImages = images.filter((_, i) => i !== index);
  
      // Actualizar el estado de images y previewImages
      setImages(updatedImages);  // Ahora `images` es un array de File[]
      setPreviewImages((prev) => prev.filter((_, i) => i !== index)); // Actualizar previsualizaciones
  
      // Aumentar la cantidad de imágenes restantes para subir
      setRemainingImagesToUpload((prev) => prev + 1);
    }
  };

  // Función para obtener categorías y ciudades
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, citiesResponse, characteristicsResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/all`),
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cities/all`),
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/characteristics/all`),
        ]);
  
        if (!categoriesResponse.ok || !citiesResponse.ok || !characteristicsResponse.ok) {
          throw new Error('Error en las solicitudes de categorías, ciudades o características.');
        }
  
        const categoriesData = await categoriesResponse.json();
        const citiesData = await citiesResponse.json();
        const characteristicsData = await characteristicsResponse.json();
  
        setCategories(categoriesData.data);
        setCities(citiesData.data);
        setCharacteristics(characteristicsData.data);

      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);


  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9 w-[720px]">
        <div className="rounded-sm border border-stroke bg-white shadow">
          <div className="border-b border-stroke px-6 py-5">
            <h3 className="font-medium text-primary text-xl">
              {isEditing ? `Tour guiado a ${title}` : 'Agregar Producto'}
            </h3>
          </div>
          <form id="product-form" onSubmit={onSubmit}>
            <div className="p-6">
              <div className="mb-6 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Nombre
                  </label>
                  <input
                    type="text"
                    placeholder="Ingresar Nombre del Producto"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                  Categoría
                </label>
                <select
                  id="category"
                  name="category"
                  value={categoryId} // Controlado por el estado
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  disabled={loading} // Deshabilitamos el select mientras carga
                >
                  <option value="" disabled>
                    {loading ? "Cargando categorías..." : "Seleccione una categoría"}
                  </option>
                  {!loading &&
                    categories?.map((category: { id: number; name: string }) => (
                      <option key={category.id} value={String(category.id)}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-black">
                  Ciudad
                </label>
                <select
                  id="city"
                  name="city"
                  value={cityId} // Controlado por el estado
                  onChange={(e) => setCityId(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  disabled={loading}
                >
                  <option value="" disabled>
                    {loading ? "Cargando ciudades..." : "Selecciona la ciudad"}
                  </option>
                  {!loading &&
                    cities?.map((city: { id: number; name: string }) => (
                      <option key={city.id} value={String(city.id)}>
                        {city.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-black">
                  Precio
                </label>
                <CurrencyInput
                  placeholder="Ingresar precio del plan turístico"
                  value={price}
                  onValueChange={(value) => setPrice(value || "")}
                  decimalsLimit={2} // Máximo 2 decimales
                  prefix="S/ " // Símbolo de moneda peruana
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
                    value={availabilityStartDate}
                    onChange={(e) => setAvailabilityStartDate(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Disponibilidad Fecha Fin
                  </label>
                  <input
                    type="date"
                    value={availabilityEndDate}
                    onChange={(e) => setAvailabilityEndDate(e.target.value)}
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
                  value={characteristicIds}
                  onChange={(e) => {setCharacteristicIds(Array.from(e.target.selectedOptions, option => option.value))}}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  disabled={loading} 
                >
                  <option disabled>{loading ? "Cargando características..." : "Selecciona los atributos"}</option>
                  {!loading &&
                    characteristics.map((characteristic: { id: number; name: string }) => (
                      <option key={characteristic.id} value={characteristic.id}>
                        {characteristic.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-black">Características</label>
                <div className="flex flex-wrap gap-4">
                  {characteristics.map((char) => (
                    <label key={char.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked 
                        className="checkbox checkbox-primary"
                        value={String(char.id)}
                        checked={characteristicIds.includes(String(char.id))}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (e.target.checked) {
                            setCharacteristicIds([...characteristicIds, value]);
                          } else {
                            setCharacteristicIds(characteristicIds.filter((id) => id !== value));
                          }
                        }}
                      />
                      {char.name}
                    </label>
                  ))}
                </div>
              </div> */}

              <div className="flex gap-4 flex-wrap items-center justify-center pb-6">
                {/* Mostrar imágenes existentes solo si están definidas */}
                {isEditing && existingImages && existingImages.length > 0 && (
                  <div>
                    <div className="flex gap-4 flex-wrap">  
                      {existingImages.map((image) => (
                        <div key={image.id} className="relative">
                          <img
                            src={image.imageUrl}
                            alt={`Imagen ${image.id + 1}`}
                            className="w-28 h-28 object-cover rounded-md shadow-slate-500 shadow-lg"
                          />
                          {handleDeleteImage && (
                            <button
                              type="button"
                              onClick={() => handleDeleteImage(image.imageUrl)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white font-bold px-2 rounded-full"
                            >
                              x
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Renderizar imágenes cargadas desde el input */}
                {previewImages.length > 0 && (
                  <div>
                    <div className="flex gap-4 flex-wrap">
                      {previewImages.map((imageUrl, index) => (
                        <div key={index} className="relative">
                          <img
                            src={imageUrl}
                            alt={`Previsualización ${index + 1}`}
                            className="w-28 h-28 object-cover rounded-md shadow-slate-400 shadow-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemovePreviewImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white font-bold p-1 rounded-full"
                          >
                            <FaXmark />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-black mb-2">Imágenes</label>
                <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                  <label className="bg-gray-100 text-gray-600 px-4 py-2 cursor-pointer hover:bg-gray-200">
                    Selecciona los archivos 
                    <p>
                    {
                      remainingImagesToUpload === 0
                        ? "Ya has seleccionado las 5 imágenes permitidas."
                        : remainingImagesToUpload === 1
                        ? "Agrega otra imagen."
                        : remainingImagesToUpload === 5
                        ? "Agrega 5 imágenes."
                        : `Agrega ${remainingImagesToUpload} imágenes más.`
                    }
                    </p>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      onChange={handleFileChange}
                      disabled={remainingImagesToUpload === 0}
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
          <PrimaryButton
            text={isPending ? "Guardando..." : isEditing ? 'Guardar Cambios' : 'Crear Producto'} 
            style={{
              background: isEditing ? 'var(--Secondary, #FF5B03)' : 'var(--Primary, #FF0178)',
            }}
            onClick={onSubmit} 
          />
        </div>        
      </div>
    </div>
  );
};

export default ProductForm;
