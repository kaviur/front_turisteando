import { TouristPlanReq } from "@/types/touristPlanReq";

const validationsProducts = ({
    form,
    setErrors,
  }: {
    form: TouristPlanReq;
    setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  }) => {
    const newErrors: { [key: string]: string } = {};
  
    // Validación de título
    if (!form.title || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]{3,50}$/.test(form.title)) {
      newErrors.title =
        "El título debe tener entre 3 y 50 caracteres y solo puede contener letras y números.";
    }
  
    // Validación de descripción
    if (!form.description || form.description.length < 10 || form.description.length > 255) {
      newErrors.description =
        "La descripción debe tener entre 10 y 255 caracteres.";
    }
  
    // Validación de precio
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) {
      newErrors.price = "El precio debe ser un número mayor a 0.";
    }
  
    // Validación de fechas
    if (!form.availabilityStartDate || !form.availabilityEndDate) {
      newErrors.availabilityStartDate = "Debes especificar las fechas de disponibilidad.";
    } else if (new Date(form.availabilityStartDate) > new Date(form.availabilityEndDate)) {
      newErrors.availabilityStartDate = "La fecha de inicio no puede ser posterior a la de fin.";
    }

    // Validación de características
    if (!form.characteristicIds || form.characteristicIds.length === 0) {
      newErrors.characteristicIds = "Debes seleccionar al menos una característica.";
    }
  
    // Validación de imágenes
    if (!form.images || form.images.length !== 5) {
      newErrors.images = "Debes subir 5 imágenes para tu plan turístico";
    } else {
      const invalidFiles = form.images.filter(
        (file) => !/\.(jpg|jpeg|png|gif|webp)$/.test(file.name)
      );
      if (invalidFiles.length > 0) {
        newErrors.images =
          "Algunas imágenes no tienen un formato válido (jpg, jpeg, png, gif, webp).";
      }
    }

    // Validación de categoría
    if (!form.categoryId || isNaN(Number(form.categoryId)) || Number(form.categoryId) <= 0) {
      newErrors.categoryId = "Debes seleccionar una categoría.";
    }

    // Validación de ciudad
    if (!form.cityId || isNaN(Number(form.cityId)) || Number(form.cityId) <= 0) {
      newErrors.cityId = "Debes seleccionar una ciudad.";
    }

    // Validación de capacidad
    if (!form.capacity || isNaN(Number(form.capacity)) || Number(form.capacity) <= 0) {
      newErrors.capacity = "La capacidad debe ser un número mayor a 0.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  export default validationsProducts;