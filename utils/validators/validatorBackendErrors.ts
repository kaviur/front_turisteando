import toast from "react-hot-toast";

const handleBackendError = ({ debugMessage }: { debugMessage: string }, entity: string) => {
  const errorProduction = debugMessage?.includes("violates unique constraint");
  const errorDevelopment = debugMessage?.includes("restricción de unicidad");
  const message = entity==="user"? "Ya existe un usuario con este email, por favor emplee otro email, para poder registrarse": "El nombre ya existe. Por favor, elija otro nombre."
  if (errorProduction || errorDevelopment) {
      toast.error(message);
      return;
  }
  if (debugMessage?.includes ("Ya existe un usuario con ese email")){
    toast.error("Ya existe un usuario con este email, por favor emplee otro email, para poder registrarse");
   }
};

export default handleBackendError;
