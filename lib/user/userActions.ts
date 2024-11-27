"use server" 

import { FormData } from "@/components/UserForm";
import handleBackendError from "@/utils/validators/validatorBackendErrors";
///Función para actualizar los usuarios
export const updateUsers= async (userId: string | undefined, token: string, form: FormData)=>{

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
  
  if (response.ok) {
   return data.data;
  } else {
    handleBackendError(data);
    console.log("Salió mal la posible Actualización de Users");
    return null;
    
  }

 


}

//Función para traer los usuarios
export const getUsers= async (token: string) =>{
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
    if (responseGet.ok) {
        return data.data;
    } else {
    console.log("Salió mal al Obtener la lista de Usuarios");
    return null;
    
  }

}

//Función para traer los usuarios
export const getUserById= async (token: string, userId: string) =>{
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
    if (responseGet.ok) {
        return data.data;
    } else {
    console.log("Salió mal al Obtener el Usuarios");
    return null;
    
  }

}

//Función para Crear los usuarios
export const createUser= async (token: string, form: FormData) =>{
  const responsePostUser = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })
  
    const data = await responsePostUser.json();
    if (responsePostUser.ok) {
        return data.data;
    } else {
    console.log("Salió mal al Enviar el Usuarios");
    return null;
    
  }

}

//Función para Eliminar los usuarios
export const deleteUser= async (token: string, id: string) =>{
  const responseDelete = await  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  
    const data = await responseDelete.json();
    if (responseDelete.ok) {
        return data.data;
    } else {
    console.log("Salió mal al Enviar el Usuarios");
    return null;
    
  }

}