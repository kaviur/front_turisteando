"use server";

import { TouristPlan } from "@/types/touristPlan";
import { TouristPlanReq } from "@/types/touristPlanReq";
import { Characteristics } from "@/types/characteristics";


/**
 * *****************************************
 * FUNCIONES CRUD PARA PLANES **************
 */
export const fetchTours = async (): Promise<TouristPlan[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tourist-plans/all`
    );
    const data = await response.json();

    if (data && Array.isArray(data.data)) {
      return data.data;
    } else {
      console.error(
        "La respuesta de la API no contiene un array de tours:",
        data
      );
      return [];
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
};

// Función para obtener un producto específico
export const fetchProduct = async (
  productId: string
): Promise<TouristPlan | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tourist-plans/${productId}`
    );
    const data = await response.json();

    if (data.success && data.data) {
      return data.data;
    } else {
      console.error("Error al obtener el producto:", data.errors);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return null;
  }
};

// Método para crear un Tourist Plan
export const createTouristPlan = async (
  token: string,
  form: TouristPlanReq
): Promise<TouristPlan | string[]> => {
  try {
    const formData = new FormData();
    const touristPlan = JSON.stringify({
      ...form,
      characteristicIds: form.characteristicIds,
    });

    formData.append(
      "touristPlan",
      new Blob([touristPlan], { type: "application/json" })
    );

    if (form.images) {
      form.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tourist-plans/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const responseJson = await response.json(); 

    if (!response.ok) {
      console.log("Errordata: ", responseJson);
      if (responseJson.errors && Array.isArray(responseJson.errors)) {
        return responseJson.errors;
      }
      throw new Error("Hubo un problema en la creación");
    }

    if (responseJson.success && responseJson.data) {
      return responseJson.data;
    } else {
      return responseJson.errors || [];
    }
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw error; 
  }
};


// Método para editar un Tourist Plan
export const updateTouristPlan = async (
  token: string,
  productId: string,
  form: TouristPlanReq
): Promise<TouristPlan | string[]> => {
  try {
    // Crear FormData para la solicitud
    const formData = new FormData();
    
    // Convertir el objeto form en JSON y adjuntarlo a FormData
    const touristPlan = JSON.stringify({
      ...form,
      characteristicIds: form.characteristicIds,
      imagesToDelete: form.imagesToDelete || [],  // Asegurarse de que esté presente, incluso si es un array vacío
    });

    formData.append(
      "touristPlan",
      new Blob([touristPlan], { type: "application/json" })
    );

    // Adjuntar las imágenes si están presentes
    if (form.images && form.images.length > 0) {
      form.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    // Realizar la solicitud PUT
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tourist-plans/update/${productId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const responseJson = await response.json();  // Obtener la respuesta en JSON

    // Validar si la respuesta fue exitosa
    if (!response.ok) {
      console.log("Errordata: ", responseJson);
      if (responseJson.errors && Array.isArray(responseJson.errors)) {
        return responseJson.errors;  // Retornar los errores si existen
      }
      throw new Error("Hubo un problema al actualizar el plan turístico.");
    }

    if (responseJson.success && responseJson.data) {
      return responseJson.data;  // Retornar los datos si la respuesta es exitosa
    } else {
      return responseJson.errors || [];  // Retornar los errores si existen
    }
  } catch (error) {
    console.error("Error al actualizar el plan turístico:", error);
    throw error;  // Lanzar error para que pueda ser manejado en el frontend
  }
};


// Método para eliminar (o cambiar el estado de) un plan turístico

export const deleteTouristPlan= async (token: string, id: number) =>{

  try {
     const responseDelete = await  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tourist-plans/delete/${id}`, {
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
           message: "Error al Actualizar el estado del plan turistico",
           debugMessage: data.debugMessage || "Error desconocido",
         };
       }
     
   } catch (error) {
     console.log ( "Este es el error al borrar un plan turistico", error);
   }
 }


/**
 * ***********************************
 * FUNCIONES CRUD PARA CARACTERISTICAS
 * ***********************************
 */

// Funcion para obtener caracteristicas
export const fetchCharacteristics = async (
  token: string
): Promise<Characteristics[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/characteristics/all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();

    if (data && Array.isArray(data.data)) {
      return data.data;
    } else {
      console.error(
        "La respuesta de la API no contiene un array de caracteristicas:",
        data
      );
      return [];
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
};

// Funcion para obtener caracteristica por id
export const fetchCharacteristicById = async (
  id: string | undefined
): Promise<Characteristics | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/characteristics/${id}`);
    const data = await response.json();

    if (data.success && data.data) {
      return data.data;
    } else {
      console.error("Error al obtener la caracteristica:", data.errors);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener la caracteristica:", error);
    return null;
  }
};

// Funcion para crear una caracteristica
export const createCharacteristic = async (
  token: string,
  characteristic: FormData
): Promise<Characteristics | { message: string; debugMessage: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/characteristics/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: characteristic,
      }
    );
    if (!response.ok) {
      const errorData = await response.json(); // Parsear los errores del backend
      return {
        message: "Error al crear la característica",
        debugMessage: errorData.debugMessage || "Error desconocido",
      };
    }

    const data = await response.json();

    if (data.success && data.data) {
      return data.data;
    } else {
      return {
        message: "Error al crear la característica",
        debugMessage: data.debugMessage || "Error desconocido",
      };
    }
  } catch (error) {
    console.error("Error al crear la caracteristica:", error);
    throw new Error("Error al crear la caracteristica");
  }
};

// Funcion para editar una caracteristica
export const editCharacteristic = async (
  token: string,
  characteristic: FormData,
  id: string | undefined
): Promise<Characteristics | { message: string; debugMessage: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/characteristics/update/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: characteristic,
      }
    );

    if (!response.ok) {
      const errorData = await response.json(); // Parsear los errores del backend
      return {
        message: "Error al editar la característica",
        debugMessage: errorData.debugMessage || "Error desconocido",
      };
    }

    const data = await response.json();

    if (data.success && data.data) {
      return data.data;
    } else {
      return {
        message: "Error al editar la característica",
        debugMessage: data.debugMessage || "Error desconocido",
      };
    }
  } catch (error) {
    console.error("Error al editar la característica:", error);
    return {
      message: "Error al editar la característica",
      debugMessage: "Error en la conexión o servidor",
    };
  }
};

// Funcion para eliminar caracteristica
export const deleteCharacteristic = async (
  token: string,
  id: string | undefined
): Promise<string | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/characteristics/delete/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!data.success) {
      console.error("Error al eliminar la caracteristica:", data.errors);
      throw new Error(data.errors);
    }
    return data.data;
  } catch (error) {
    console.error("Error al eliminar la caracteristica:", error);
  }
};
