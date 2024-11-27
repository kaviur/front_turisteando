import { User } from "@/types/user";
import Image from "next/image";
import { FiEdit, FiTrash } from "react-icons/fi";
import profileImage from "/public/joseuser.jpg";
import Checkbox from "../CheckBox";

type UserTableProps = {
  users: User[]; // Recibir el arreglo de usuarios directamente
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
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
          <div className="col-span-1 flex items-center ">
            <div className="bg-secondary w-10 h-9 rounded-3xl flex justify-center items-center">
              <p className="text-white font-semibold text-base">
                {user?.name?.charAt(0).toUpperCase()}

                {user?.lastName?.charAt(0).toUpperCase()}
              </p>
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
            <Checkbox isChecked={user.role === "ADMIN"} />
          </div>
          
          <div className="col-span-1 flex items-center ml-6 justify-end space-x-4">
            <button
               onClick={() => user.id && onEdit(user.id)}
              className="text-blue-500 hover:text-blue-700"
              aria-label="Editar usuario"
              disabled={!user.id} // Opcional: deshabilitar el botón si falta id
            
            >
              <FiEdit size={18} />
            </button>
            <button
              onClick={() => user.id && onDelete(user.id)}
              className="text-red-500 hover:text-red-700"
              aria-label="Eliminar usuario"
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
