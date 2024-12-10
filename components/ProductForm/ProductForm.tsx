import { useState, useEffect } from 'react';
import PrimaryButton from '../ui/PrimaryButton';
import CurrencyInput from 'react-currency-input-field';
import { FaXmark } from "react-icons/fa6";
import Dropzone from '../ui/Dropzone';
import Image from 'next/image';
import { TouristPlanReq } from "@/types/touristPlanReq";
import { Characteristics } from "@/types/characteristics";
import { toast } from "react-hot-toast";
import DurationInput from "./DurationInput";


interface ProductFormProps {
  form: TouristPlanReq;
  setForm: React.Dispatch<React.SetStateAction<TouristPlanReq>>;
  existingImages?: { id: number; imageUrl: string }[];
  setExistingImages?: React.Dispatch<React.SetStateAction<Array<{ id: number; imageUrl: string }>>>; // Opcional
  setImagesToDelete?: React.Dispatch<React.SetStateAction<string[]>>; // Opcional
  errors: { [key: string]: string }; // Opcional
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>; // Opcional
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  isEditing: boolean;
}

const ProductForm = ({
  form,
  setForm,
  existingImages, // Opcional
  setExistingImages, // Opcional
  setImagesToDelete, // Opcional
  errors,
  setErrors,
  onSubmit,
  isPending,
  isEditing
}: ProductFormProps) => {
  
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [characteristics, setCharacteristics] = useState<Characteristics[]>([]);
  const [loading, setLoading] = useState(true);
  const maxImages = 5;
  const [remainingImagesToUpload, setRemainingImagesToUpload] = useState(
    isEditing
      ? maxImages - (existingImages?.length || 0) 
      : maxImages 
  );
  const [previewImages, setPreviewImages] = useState<string[]>([]); // Imágenes cargadas desde el input


  /**
   * Agrega la URL de la imagen eliminada al array de eliminadas,
   * elimina el objeto correspondiente del array de imágenes existentes,
   * e incrementa el contador de imágenes faltantes.
   * @param {string} imageUrl URL de la imagen a eliminar
   */
  const handleDeleteImage = (imageUrl: string) => {
    if (setImagesToDelete) {
      setImagesToDelete((prev) => [...prev, imageUrl]); // Agrega la URL al array de eliminadas
    } else {
      console.warn('setImagesToDelete no está definido.');
    }

    if (setExistingImages) {
      // Actualizar las imágenes existentes
      setExistingImages((prev) =>
        prev.filter((image) => image.imageUrl !== imageUrl)
      );
    } else {
      console.warn('setExistingImages no está definido.');
    }
  
    // Incrementar el contador de imágenes faltantes
    setRemainingImagesToUpload((prev) => prev + 1);
  };

  //Handle multipart images
  const handleDrop = (acceptedFiles: File[]) => {
    const mbByImage = 10;
    const maxFileSize = mbByImage * 1024 * 1024; // 10 MB
    const validFiles: File[] = [];
    const previewUrls: string[] = [];
  
    // Verifica cuántas imágenes quedan por subir
    if (remainingImagesToUpload <= 0) {
      toast.error("No puedes subir más imágenes. Has alcanzado el límite.");
      return;
    }
  
    // Filtrar y validar archivos
    acceptedFiles.forEach((file) => {
      if (file.size > maxFileSize) {
        toast.error(`El archivo "${file.name}" excede el tamaño máximo de "${mbByImage} MB.`);
      } else if (!file.type.startsWith("image/")) {
        toast.error(`El archivo "${file.name}" no es una imagen válida.`);
      } else {
        validFiles.push(file);
        previewUrls.push(URL.createObjectURL(file));
      }
    });
  
    // Verifica que no exceda el número máximo de imágenes permitidas
    const remainingSpace = remainingImagesToUpload;
    if (validFiles.length > remainingSpace) {
      toast.error(
        `Solo puedes subir ${remainingSpace} ${remainingSpace === 1 ? "imagen" : "imágenes"} más.`
      );
      validFiles.splice(remainingSpace); // Limita la cantidad de archivos a subir
      previewUrls.splice(remainingSpace); // Asegura que las URLs coincidan
    }
  
    // Actualiza los estados
    setForm((prevForm) => ({
      ...prevForm,
      images: prevForm.images ? [...prevForm.images, ...validFiles] : [...validFiles],
    }));
    setPreviewImages((prevPreviewImages) => [...prevPreviewImages, ...previewUrls]);
    setRemainingImagesToUpload((prev) => Math.max(prev - validFiles.length, 0));
  };
  

  const handleRemovePreviewImage = (index: number) => {
    setForm((prevForm) => {
      if (prevForm.images) {
        // Eliminar la imagen en el índice especificado
        const updatedImages = Array.from(prevForm.images).filter((_, i) => i !== index);
  
        // Revocar la URL del objeto eliminada
        URL.revokeObjectURL(previewImages[index]);
  
        // Actualizar el estado de previewImages
        setPreviewImages((prevPreviewImages) =>
          prevPreviewImages.filter((_, i) => i !== index)
        );
  
        // Incrementar el contador de imágenes restantes
        setRemainingImagesToUpload((prev) => prev + 1);
  
        return {
          ...prevForm,
          images: updatedImages.length > 0 ? updatedImages : null,
        };
      }
      return prevForm;
    });
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    type?: "durationValue" | "durationUnit"
  ) => {
    const { name, value } = e.target;
  
    if (name === "duration" || type) {
      // Si es un cambio en duration (desde un input compuesto)
      setForm((prevForm) => {
        const newDuration = type
          ? type === "durationValue"
            ? `${value} ${prevForm.duration.split(" ")[1] || ""}`.trim()
            : `${prevForm.duration.split(" ")[0] || ""} ${value}`.trim()
          : value;
  
        return {
          ...prevForm,
          duration: newDuration,
        };
      });
  
      // Limpiar errores para `duration`
      setErrors((prevErrors) => ({
        ...prevErrors,
        duration: "",
      }));
      return;
    }
  
    const updatedValue =
      name === "price" || name === "capacity" || name === "cityId" || name === "categoryId"
        ? value === ""
          ? 0
          : Number(value)
        : value;
  
    // Actualizamos el estado
    setForm((prevForm) => ({
      ...prevForm,
      [name]: updatedValue,
    }));
  
    // Limpiamos cualquier mensaje de error asociado
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleArrayChange = (values: string[] | number[], fieldName: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [fieldName]: values,
    }));
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
        setCharacteristics(
          characteristicsData.data.map((item: Characteristics) => ({
            id: item.id?.toString(),
            name: item.name,
            image: item.image,
          }))
        );

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
              {isEditing ? `Tour guiado a ${form.title}` : 'Agregar Producto'}
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
                    value={form.title}
                    name="title"
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-accent active:border-accent disabled:cursor-default disabled:bg-whiter"
                  />
                  {errors.title && 
                  <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-black">
                  Descripción
                </label>
                <textarea
                  rows={6}
                  placeholder="Ingresa la descripción del producto"
                  value={form.description}
                  name="description"
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-accent active:border-accent disabled:cursor-default disabled:bg-whiter"
                ></textarea>
                {errors.description && 
                  <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-black">
                  Categoría
                </label>
                <select
                  id="categoryId"
                  value={form.categoryId} // Controlado por el estado
                  name="categoryId"
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-accent active:border-accent disabled:cursor-default disabled:bg-whiter"
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
                {errors.categoryId && 
                  <div className="text-red-500 text-sm mt-1">{errors.categoryId}</div>}
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-black">
                  Ciudad
                </label>
                <select
                  id="city"
                  name="cityId"
                  value={form.cityId} // Controlado por el estado
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-accent active:border-accent disabled:cursor-default disabled:bg-whiter"
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
                {errors.cityId && 
                  <div className="text-red-500 text-sm mt-1">{errors.cityId}</div>}
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-black">
                  Precio
                </label>
                <CurrencyInput
                  placeholder="Ingresar precio del plan turístico"
                  value={form.price}
                  onValueChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      price: value || "",
                    }))
                  }
                  decimalsLimit={2} // Máximo 2 decimales
                  prefix="S/ " // Símbolo de moneda peruana
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-accent active:border-accent disabled:cursor-default disabled:bg-whiter"
                />
                {errors.price && 
              <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Disponibilidad Fecha de Inicio
                  </label>
                  <input
                    type="date"
                    value={form.availabilityStartDate}
                    name="availabilityStartDate"
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-accent active:border-accent disabled:cursor-default disabled:bg-whiter"
                  />
                  {errors.availabilityStartDate && 
                  <div className="text-red-500 text-sm mt-1">{errors.availabilityStartDate}</div>}
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Disponibilidad Fecha Fin
                  </label>
                  <input
                    type="date"
                    value={form.availabilityEndDate}
                    name="availabilityEndDate"
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-accent active:border-accent disabled:cursor-default disabled:bg-whiter"
                  />
                  {errors.availabilityEndDate && 
                  <div className="text-red-500 text-sm mt-1">{errors.availabilityEndDate}</div>}
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Capacidad
                  </label>
                  <input
                    type="text"
                    value={form.capacity}
                    name="capacity"
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-accent active:border-accent disabled:cursor-default disabled:bg-whiter"
                  />
                  {errors.capacity && 
                  <div className="text-red-500 text-sm mt-1">{errors.capacity}</div>}
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Duración
                  </label>
                  <DurationInput
                    value={form.duration}
                    onChange={handleChange}
                  />
                  {errors.duration && 
                  <div className="text-red-500 text-sm mt-1">{errors.duration}</div>}
                </div>
              </div>

              <div>
  <fieldset className="w-full">
    <legend className="text-black font-bold">Selecciona los atributos</legend>
    {loading ? (
      <p>Cargando características...</p>
    ) : (
      <div className="flex flex-wrap gap-4 mt-3">
        {characteristics.map((characteristic) => {
          const isChecked = form.characteristicIds.includes(Number(characteristic.id)!);

          // Obtener la URL de la imagen
          const imageUrl = 
            typeof characteristic.image === "object" && "imageUrl" in characteristic.image
              ? characteristic.image.imageUrl
              : "";

          return (
            <label
              key={characteristic.id}
              htmlFor={`characteristic-${characteristic.id}`}
              className={`relative flex items-center space-x-2 rounded-full border-2 px-4 py-2 transition-all cursor-pointer ${
                isChecked 
                  ? "bg-primary text-white border-primary" 
                  : "border-primary text-primary"
              }`}
            >
              <input
                type="checkbox"
                id={`characteristic-${characteristic.id}`}
                value={characteristic.id}
                checked={isChecked}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const updatedIds = e.target.checked
                    ? [...form.characteristicIds, Number(selectedId)]
                    : form.characteristicIds.filter((id) => id !== Number(selectedId));
                  handleArrayChange(updatedIds, "characteristicIds");
                }}
                className="hidden" // Ocultar el input
              />
              {imageUrl && (
                <Image
                src={imageUrl}
                alt={characteristic.name?characteristic.name:""}
                width={24}  // Puedes ajustar estos valores según el tamaño que desees
                height={24} // Ajusta según sea necesario
                className={`transition-all ${isChecked ? "opacity-50 invert" : ""}`}
              />
              )}
              <span>{characteristic.name}</span>
            </label>
          );
        })}
      </div>
    )}
  </fieldset>
  {errors.characteristicIds && (
    <div className="text-red-500 text-sm mt-1">{errors.characteristicIds}</div>
  )}
</div>

              <div className="mb-6">
                  <Dropzone className = "p-16 mt-10 border border-neutral-200" onDrop={handleDrop} remainingImagesToUpload={remainingImagesToUpload} />
              </div>

              <div className="flex gap-4 flex-wrap items-center justify-center pb-6">
              {/* Mostrar imágenes existentes solo si están definidas */}
              {isEditing && existingImages && existingImages.length > 0 && (
                <div>
                  <div className="flex gap-4 flex-wrap">
                    {existingImages.map((image) => (
                      <div key={image.id} className="relative w-28 h-28"> 
                      <Image
                        src={image.imageUrl}
                        alt={`Imagen ${image.id + 1}`}
                        layout="fill" 
                        objectFit="cover" 
                        className="rounded-md shadow-slate-400 shadow-lg"
                      />
                      {handleDeleteImage && (
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(image.imageUrl)}
                          className="absolute -top-2 -right-2 bg-red-400 text-white font-bold p-1 rounded-full"
                        >
                          <FaXmark />
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
                    <div key={index} className="relative w-28 h-28"> 
                      <Image
                        src={imageUrl}
                        alt={`Previsualización ${index + 1}`}
                        layout="fill" 
                        objectFit="cover" 
                        className="rounded-md shadow-slate-400 shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePreviewImage(index)}
                        className="absolute -top-2 -right-2 bg-red-400 text-white font-bold p-1 rounded-full"
                      >
                        <FaXmark />
                      </button>
                    </div>
                  ))}
                  </div>
                </div>
              )}
              {errors.images && 
                  <div className="text-red-500 text-sm mt-1">{errors.images}</div>}
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
