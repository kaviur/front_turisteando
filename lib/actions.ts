"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { loginSchema } from "@/types/schema";
import { TouristPlan } from "@/types/touristPlan";
import { Characteristics } from "@/types/characteristics";

type FormState = {
  email: string;
  password: string;
};

export async function login(prevState: FormState, formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const validatedFields = loginSchema.safeParse({
      email: email,
      password: password,
    });
    if (!validatedFields.success) {
      return {
        message: "validation error",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
      redirectTo: "/",
    });
    // @ts-expect-error: error for result, but TypeScript doesn't recognize it.
    if (result?.error) {
      // @ts-expect-error: error for result, but TypeScript doesn't recognize it.
      throw new Error(result.error);
    }

    return {
      message: "success",
      errors: {},
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "credentials error",
            errors: {
              credentials: "incorrect email or password",
            },
          };
        default:
          return {
            message: "unknown error",
            errors: {
              unknown: "unknown error",
            },
          };
      }
    }
    throw error;
  }
}

export async function register(prevState: FormState, formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    // const name = formData.get("name");
    // const lastName = formData.get("lastName");

    const validatedFields = loginSchema.safeParse({
      email: email,
      password: password,
    });
    if (!validatedFields.success) {
      return {
        message: "validation error",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirectTo: "/",
    });
    // @ts-expect-error: error for result, but TypeScript doesn't recognize it.
    if (result?.error) {
      // @ts-expect-error: error for result, but TypeScript doesn't recognize it.
      throw new Error(result.error);
    }

    return {
      message: "success",
      errors: {},
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "credentials error",
            errors: {
              credentials: "incorrect email or password",
            },
          };
        default:
          return {
            message: "unknown error",
            errors: {
              unknown: "unknown error",
            },
          };
      }
    }
    console.log(error);
    throw error;
  }
}

export async function logout() {
  await signOut({ redirect: false });
}

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
  token: string,
  id: string | undefined
): Promise<Characteristics | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/characteristics/${id}`,
      {
        method: "GET",
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
