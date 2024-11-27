"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { loginSchema } from "@/types/schema";
import { TouristPlan } from "@/types/touristPlan";

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
