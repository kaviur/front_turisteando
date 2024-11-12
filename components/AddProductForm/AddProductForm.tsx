"use client";

import PrimaryButton from "../ui/PrimaryButton";
import { useState } from "react";

const AddProductForm = () => {

  // Estado para almacenar el nombre del archivo seleccionado
  const [fileName, setFileName] = useState("Machu Picchu");

  // Método que actualiza el nombre del archivo
  const updateFileName = (event) => {
    const input = event.target;
    const name = input.files.length > 0 ? input.files[0].name : "Machu Picchu";
    setFileName(name);
  };  


  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9 w-[720px]">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow">
          <div className="border-b border-stroke px-6 py-5 ">
            <h3 className="font-medium text-primary text-xl">
              Agregar Producto
            </h3>
          </div>
          <form action="#">
            <div className="p-6">
              <div className=" mb-6 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Nombre
                  </label>
                  <input
                    type="text"
                    placeholder="Ingresar Nombre del Producto"
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
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-black">
                  Categoría
                </label>
                <select
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecciona la ciudad
                  </option>
                  <option value="lima">Lima</option>
                  <option value="cusco">Cusco</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-black">
                  Ciudad
                </label>
                <select
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecciona la categoría
                  </option>
                  <option value="tour">Tour</option>
                  <option value="actividad">Actividad</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-black">
                  Precio
                </label>
                <input
                  type="text"
                  placeholder="Ingresar precio del producto"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black">
                  Disponibilidad Fecha de Inicio
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Seleccionar fecha
                    </option>
                    <option value="lima">12/11/2024</option>
                    <option value="cusco">12/11/2024</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black">
                  Disponibilidad Fecha Fin
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    defaultValue=""
                  >
                    <option value="" disabled>
                    Seleccionar fecha
                    </option>
                    <option value="lima">12/11/2024</option>
                    <option value="cusco">12/11/2024</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black">
                    Capacidad
                  </label>
                  <input
                    placeholder="Ingresar capacidad"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  ></input>
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black">
                  Duración
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    defaultValue=""
                  >
                    <option value="" disabled className="text-gray-400">
                      Seleccionar duración
                    </option>
                    <option value="lima">12/11/2024</option>
                    <option value="cusco">12/11/2024</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-black">
                Características
                </label>
                <select
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  defaultValue=""
                  multiple
                >
                  <option value="" disabled className="text-gray-400">
                    Selecciona las características
                  </option>
                  <option value="atributo1">Atributo 1</option>
                  <option value="atributo2">Atributo 2</option>
                  <option value="atributo3">Atributo 3</option>
                  <option value="atributo4">Atributo 4</option>
                </select>
              </div>

              <div class="mb-6">
                <label class="block text-sm font-medium text-black mb-2">Imágenes</label>
                <div class="flex items-center border border-gray-300 rounded overflow-hidden">
                  <label class="bg-gray-100 text-gray-600 px-4 py-2 cursor-pointer hover:bg-gray-200">
                    Selecciona el archivo
                    <input type="file" class="hidden" onchange="updateFileName(this)" />
                  </label>
                  <input
                    type="text"
                    id="file-name"
                    placeholder="Machu Picchu"
                    class="flex-grow px-4 py-2 border-l border-gray-300 outline-none text-gray-700"
                    readonly
                  />
                </div>
              </div>

            </div>
          </form>
        </div>
        <div className="flex justify-center mt-2">
          <PrimaryButton text="Crear Producto" style="px-14" />
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
