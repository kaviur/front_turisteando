"use client";


import {Dispatch, SetStateAction } from "react";
import PrimaryButton from "./ui/PrimaryButton";


/// Interfaz para los datos del formulario
export interface FormData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Interfaz para las props de UserForm
interface UserFormProps {
  form: FormData;
  setForm: Dispatch<SetStateAction<FormData>>; // setState del formulario
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  errors: { [key: string]: string }; // Errores de validación, clave es el campo y el valor es el mensaje de error
  onSubmit: (e: React.FormEvent) => void; // Función para manejar el envío del formulario
  isPending: boolean; // Si está en proceso de envío
  isEditing: boolean; // Si el formulario está en modo de edición (true o false)
}



const UserForm = ({
  form,
  handleChange,
  errors,
  onSubmit,
  isPending,
  isEditing,
}: UserFormProps) => {

 

  const title = isEditing
    ? "Editar Usuario"
    : "Agregar Usuario";

  const buttonText = isEditing ? "Guardar Cambios" : `Crear Usuario`;

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
                    name = "name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ingresar Nombre"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  /> 
                   {errors.name && (
                    <div className="text-red-500 text-sm">{errors.name}</div>
                  )}
                </div>
              </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name = "lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Ingresar Apellido"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                   {errors.lastName && (
                    <div className="text-red-500 text-sm">
                      {errors.lastName}
                    </div>
                  )}
                </div>
              
                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Email
                  </label>
                  <input
                    type="text"
                    name = "email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Ingresa el email"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                    {errors.email && (
                    <div className="text-red-500 text-sm">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name= "password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Ingresa la contraseña"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                    {errors.password && (
                    <div className="text-red-500 text-sm">
                      {errors.password}
                    </div>
                  )}
                </div>
                
                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black">
                   Repetir Contraseña
                  </label>
                  <input
                    type="password"
                    name = "confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Vuelva a ingresar la contraseña"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                    {errors.confirmPassword && (
                    <div className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </div>
                  )}
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
