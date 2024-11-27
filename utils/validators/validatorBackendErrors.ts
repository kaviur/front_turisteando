import toast from "react-hot-toast";

const handleBackendError = ({ debugMessage }: { debugMessage: string }) => {
  const errorProduction = debugMessage?.includes("violates unique constraint");
  const errorDevelopment = debugMessage?.includes("restricción de unicidad");
  if (errorProduction || errorDevelopment) {
    toast.error("El nombre ya existe. Por favor, elija otro nombre.");
    throw new Error("VALIDATION_ERROR");
  }
  if (debugMessage?.includes ("Ya existe un usuario con ese email")){
    toast.error("Ya existe un usuario con este email, por favor emplee otro email, para poder registrarse");
   }
};

export default handleBackendError;
