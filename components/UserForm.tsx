"use client";

import PrimaryButton from "../ui/PrimaryButton";

interface UserFormProps {
  entityType: "Usuario";
  name: string;
  setName: (value: string) => void;
  lastName?: string;
  setLastName?: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  role: string;
  setRole: (value: string) => void;
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  
  onSubmit: (event: React.FormEvent) => void;
  isPending: boolean; // Pasar el estado isPending al formulario
  isEditing: boolean;
}

const UserForm = ({
  entityType,
  name,
  setName,
  lastName,
  setLastName,
  email,
  setEmail,
  isActive,
  setIsActive,  
  onSubmit,
  isPending,
  isEditing,
}: UserFormProps) => {
  const isUser = entityType === "Usuario"; // Determinamos si es Usuario
  const title = isEditing
    ? `Editar ${isUser? "Usuario" : "Característica"}`
    : `Crear ${isCategory ? "Categoría" : "Característica"}`;

  const placeholderName = `Ingresa el nombre de ${entityType}`;
  const buttonText = isEditing ? "Guardar Cambios" : `Crear ${entityType}`;

  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9 w-[720px]">
        <div className="rounded-sm border border-stroke bg-white shadow">
          <div className="border-b border-stroke px-6 py-5">
            <h3 className="font-medium text-primary text-xl">{title}</h3>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={placeholderName}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                </div>
              </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Apellido
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder={placeholderName}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                </div>
              
                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Descripción
                  </label>
                  <textarea
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription?.(e.target.value)}
                    placeholder="Ingresa la descripción de la categoría"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  ></textarea>
                </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-black mb-2">
                  Ícono
                </label>
                <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                  <label className="bg-gray-100 text-gray-600 px-4 py-2 cursor-pointer hover:bg-gray-200">
                    Selecciona el archivo
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setIcono(e.target.files?.[0] || null)}
                    />
                  </label>
                  <input
                    type="text"
                    value={
                      icono ? icono.name : "Ningún archivo ha sido seleccionado"
                    }
                    className="flex-grow px-4 py-2 border-l border-gray-300 outline-none text-gray-700"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-center mt-2">
          <PrimaryButton
            text={isPending ? "Guardando..." : buttonText} // Condicionamos el texto
            style="px-14"
            onClick={onSubmit} // Mantenemos el controlador de eventos original
          />
        </div>
      </div>
    </div>
  );
};

export default UserForm;
