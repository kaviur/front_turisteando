import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const AddProductForm = () => {
  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9 w-[720px]">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default">
          <div className="border-b border-stroke px-6 py-4 ">
            <h3 className="font-medium text-primary">Agregar Producto</h3>
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
                  Categoría <span className="text-meta-1">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Selecciona la categoría"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                />
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

              <button className="flex w-full justify-center rounded-full bg-primary p-3 font-medium text-white hover:bg-opacity-90 mt-16">
                Crear Producto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
