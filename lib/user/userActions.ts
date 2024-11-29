"use server" 

import { FormData } from "@/components/UserForm";
import handleBackendError from "@/utils/validators/validatorBackendErrors";


//Función para actualizar los usuarios

export const updateUsers= async (userId: string | undefined, token: string, form: FormData)=>{
try {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/update/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
     }
    
  );
  const data = await response.json();
  
  console.log("Esto devuelve el back", response);
  console.log (data.debugMessage);


 
  if (data.success && data.data) {
    return data.data;
  } else {
    return {
      message: "Error al Actualizar un Usuario",
      debugMessage: data.debugMessage || "Error desconocido",
    };
  }

} catch (error) {
  console.error("Error al editar el usuario:", error);
  throw new Error("Error al editar el usuario");
}
  

}


//Función para traer los usuarios
export const getUsers= async (token: string) =>{

  try {
    const responseGet = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/all`,
      {
          method: "GET",
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          
        },
      });
  
      const data = await responseGet.json();

      if (data.success && data.data) {
        return data.data;
      } else {
        return {
          message: "Error al Obtener Todos los Usuarios",
          debugMessage: data.debugMessage || "Error desconocido",
        };
      
    
      }

  } catch (error) {
    console.log ( "Este es el error al Obtener todos los usuarios", error);
  }

 
   

}

//Función para traer los usuarios por Id
export const getUserById= async (token: string, userId: string) =>{

  try {
    const responseGet = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`,
      {
          method: "GET",
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          
        },
      });
  
      const data = await responseGet.json();
      
      if (data.success && data.data) {
        return data.data;
      } else {
        return {
          message: "Error al Obtener un Usuario por Id",
          debugMessage: data.debugMessage || "Error desconocido",
        };
      
    
      }
  } catch (error) {
    console.log ( "Este es el error al Obtener un Usuario por ID", error);
  }
  

}

//Función para Crear los usuarios
export const createUser= async (token: string, form: FormData) =>{

  try {
  const responsePostUser = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",  
    },
    body: JSON.stringify(form),
  })
  
    const data = await responsePostUser.json();
    if (data.success && data.data) {
      return data.data;
    } else {
      return {
        message: "Error al Crear un Usuario",
        debugMessage: data.debugMessage || "Error desconocido",
      };
    
  }
} catch (error) {
  console.log ( "Este es el error al Crear un usuario", error);
  
}


}

//Función para Actualizar el Rol de los usuarios

export const updateUsersRole = async (userId: string | undefined, token: string) => {

  try {
    if (!userId) {
      console.error("User ID is required.");
      return;
    }
  
    console.log("Entró a actualizar el User Role");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/toggle-role/${userId}`, // Aquí se hace la interpolación correctamente
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        
      }
    );
  
    const data = await response.json();
    if (data.success && data.data) {
      return data.data;
    } else {
      return {
        message: "Error al Actualizar el Rol de un Usuario",
        debugMessage: data.debugMessage || "Error desconocido",
      };
    }

  } catch (error) {
    console.log ( "Este es el error al Actualizar el rol de un usuario", error);
  }
  
};

//Función para Eliminar los usuarios
export const deleteUser= async (token: string, id: string) =>{

  try {
    const responseDelete = await  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    
      const data = await responseDelete.json();
      if (data.success && data.data) {
        return data.data;
      } else {
        return {
          message: "Error al Actualizar el Rol de un Usuario",
          debugMessage: data.debugMessage || "Error desconocido",
        };
      }
     
  } catch (error) {
    console.log ( "Este es el error al borrar un usuario", error);
  }
  

}