import toast from "react-hot-toast";

const handleBackendError = (
  { debugMessage }: { debugMessage: string },
  entity: string
) => {
  let message = "Error desconocido";

  // Manejar errores de entidad Característica
  const errorProduction = debugMessage?.includes("violates unique constraint");
  const errorDevelopment = debugMessage?.includes("restricción de unicidad");
  if (errorProduction || (errorDevelopment && entity === "characteristic"))
    message = "El nombre ya existe. Por favor, elija otro nombre.";

  // Manejar errores de entidad User
  if (
    debugMessage?.includes("Ya existe un usuario con ese email") &&
    entity === "user"
  ) {
    message =
      "Ya existe un usuario con este email, por favor emplee otro email, para poder registrarse";
  }

  // Manejar errores de entidad Reservation
  if (entity === "reservation") {
    message = debugMessage;
  }

  toast.error(message);
  return;
};

export default handleBackendError;
