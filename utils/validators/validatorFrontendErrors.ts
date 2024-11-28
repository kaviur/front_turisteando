import { ReqCategory } from "@/types/categories";
import { Characteristics } from "@/types/characteristics";

function isCategory(form: ReqCategory | Characteristics): form is ReqCategory {
  return (form as ReqCategory).description !== undefined;
}

const handleFrontendError = ({
  form,
  setErrors,
}: {
  form: ReqCategory | Characteristics;
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}) => {
  const newErrors: { [key: string]: string } = {};
  if(form.name != undefined){
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]{3,50}$/.test(form.name)) {
      newErrors.name =
        "El nombre debe tener entre 3 y 50 caracteres y solo puede contener letras y números.";
    }
  }

  if (isCategory(form)) {
    if (!form.description || !/^.{3,255}$/.test(form.description)) {
      newErrors.description =
        "La descripción debe tener entre 3 y 255 caracteres.";
    }
  }

  if (!form.image) {
    newErrors.image = "La imagen es obligatoria.";
  } else if (
    form.image instanceof File &&
    !/\.(jpg|jpeg|png|gif|webp)$/.test(form.image.name)
  ) {
    newErrors.image =
      "El archivo debe ser una imagen válida (jpg, jpeg, png, gif, webp).";
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export default handleFrontendError;
