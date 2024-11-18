import { User } from "@/types/user";
import Image from "next/image";
import { FiEdit, FiTrash } from "react-icons/fi";
import profileImage from "/public/joseuser.jpg";
import Checkbox from "../CheckBox";

const UserTable = ({ users }: { users: User[] }) => {
  console.log(users);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default">
      <div className="px-4 py-6 md:px-6 xl:px-7">
        <h4 className="text-2xl font-semibold text-secondary">Usuarios</h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4 sm:grid-cols-7 md:px-6 2xl:px-7">
        <div className="col-span-1 flex items-center">
          <p className="font-medium py-2">Ávatar</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex ml-6">
          <p className="font-medium py-2">Nombre</p>
        </div>
        <div className="col-span-1 flex items-center ml-6">
          <p className="font-medium py-2">Apellido</p>
        </div>
        <div className="col-span-2 flex items-center ml-6">
          <p className="font-medium">Email</p>
        </div>
        <div className="col-span-1 flex items-center ml-6">
          <p className="font-medium py-2">Administrador</p>
        </div>
        <div className="col-span-1 flex items-center ml-6 justify-end">
          <p className="font-medium py-2"></p>
        </div>
      </div>

      {users.map((user, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4 sm:grid-cols-7 md:px-6 2xl:px-7"
          key={key}
        >
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-14 w-20 rounded-md flex items-center">
                <Image src={profileImage} width={60} height={50} alt="Avatar" />
              </div>
            </div>
          </div>
          <div className="col-span-1 flex items-center ml-6">
            <p className="text-sm text-black italic">{user.name}</p>
          </div>
          <div className="col-span-1 flex items-center ml-6">
            <p className="text-sm text-black">{user.lastName}</p>
          </div>
          <div className="col-span-2 flex items-center ml-6">
            <p className="text-sm text-black"> {user.email}</p>
          </div>

          <div className="col-span-1 flex items-center ml-6">
               <Checkbox/></div>
          <div className="col-span-1 flex items-center ml-6 justify-end space-x-4">
            
            <button
              className="text-blue-500 hover:text-blue-700"
              aria-label="Editar producto"
            >
              <FiEdit size={18} />
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              aria-label="Eliminar producto"
            >
              <FiTrash size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserTable;
