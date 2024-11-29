"use server";

import { TouristPlan } from "@/types/touristPlan";
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
  touristPlanData: {
    title: string;
    description: string;
    price: number;
    seller: string;
    cityId: number;
    categoryId: number;
    availabilityStartDate: string;
    availabilityEndDate: string;
    capacity: number;
    duration: string;
    characteristicIds: number[];
    images: File[] | null;
  }
): Promise<void> => {
  try {
    const formData = new FormData();
    const touristPlan = JSON.stringify({
      title: touristPlanData.title,
      description: touristPlanData.description,
      price: touristPlanData.price,
      seller: touristPlanData.seller,
      cityId: touristPlanData.cityId,
      categoryId: touristPlanData.categoryId,
      availabilityStartDate: touristPlanData.availabilityStartDate,
      availabilityEndDate: touristPlanData.availabilityEndDate,
      capacity: touristPlanData.capacity,
      duration: touristPlanData.duration,
      characteristicIds: touristPlanData.characteristicIds,
    });

    formData.append(
      "touristPlan",
      new Blob([touristPlan], { type: "application/json" })
    );

    if (touristPlanData.images) {
      touristPlanData.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tourist-plans/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Se agrega el token aquí
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.errors && Array.isArray(errorData.errors)) {
        throw new Error(errorData.errors.join(", "));
      }
      throw new Error("Error desconocido al crear el producto.");
    }
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Método para editar un Tourist Plan
export const updateTouristPlan = async (
  token: string,
  productId: string,
  touristPlanData: {
    title: string;
    description: string;
    price: number;
    seller: string;
    cityId: number;
    categoryId: number;
    availabilityStartDate: string;
    availabilityEndDate: string;
    capacity: number;
    duration: string;
    characteristicIds: number[];
    images: File[] | null;
    imagesToDelete: string[];
  }
): Promise<void> => {
  try {
    const formData = new FormData();
    const touristPlan = JSON.stringify({
      title: touristPlanData.title,
      description: touristPlanData.description,
      price: touristPlanData.price,
      seller: touristPlanData.seller,
      cityId: touristPlanData.cityId,
      categoryId: touristPlanData.categoryId,
      availabilityStartDate: touristPlanData.availabilityStartDate,
      availabilityEndDate: touristPlanData.availabilityEndDate,
      capacity: touristPlanData.capacity,
      duration: touristPlanData.duration,
      characteristicIds: touristPlanData.characteristicIds,
      imagesToDelete: touristPlanData.imagesToDelete,
    });

    formData.append(
      "touristPlan",
      new Blob([touristPlan], { type: "application/json" })
    );

    if (touristPlanData.images) {
      touristPlanData.images.forEach((image) => {
        formData.append("images", image);
      });
    }

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

    console.log("response---",response);

    if (!response.ok) {
      const errorData = await response.json();

      console.log("errores---",errorData.errors)
      
      if (errorData.errors && Array.isArray(errorData.errors)) {
        throw new Error(errorData.errors.join(", "));
      }
      throw new Error("Error desconocido al editar el producto.");
    }
  } catch (error) {
    console.error("Error al editar el producto:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

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
