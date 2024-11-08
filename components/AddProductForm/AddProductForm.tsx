import PrimaryButton from "../ui/PrimaryButton";

const AddProductForm = () => {
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
              <div className="mb-4 flex flex-col gap-6 xl:flex-row">
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

              <div className="mb-4">
                <label className="mb-3 block text-sm font-medium text-black">
                  Categoría
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
                  Descripción
                </label>
                <textarea
                  rows={6}
                  placeholder="Ingresa la descripción del producto"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="mb-3 block text-sm font-medium text-black">
                  Precio
                </label>
                <input
                  type="text"
                  placeholder="Ingresar precio del producto"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                />
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
