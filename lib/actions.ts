"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { loginSchema } from "@/types/schema";

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
      redirectTo: "/",
    });

    if (result?.error) {
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

export async function logout() {
  await signOut({redirect: false});
}
