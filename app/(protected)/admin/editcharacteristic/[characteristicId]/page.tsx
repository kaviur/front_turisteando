"use client";

import ReusableSmallForm from "@/components/ReusableSmallForm/ReusableSmallForm";
import { useState, useEffect, useCallback } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import handleFrontendError from "@/utils/validators/validatorFrontendErrors";
import handleBackendError from "@/utils/validators/validatorBackendErrors";
import { Characteristics } from "@/types/characteristics";

const EditCharacteristic = () => {
  const router = useRouter(); // Router para el redireccionamiento
  const pathname = usePathname();
  const characteristicId = pathname.split("/").pop(); //  Obtener el ID de la URL dinámicamente
  const { data: session } = useSession(); // Obtener la sesión y el token

  const [form, setForm] = useState<Characteristics>({
    name: "",
    image: undefined,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isPending, setIsPending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Fetch para obtener la categoría por ID
  const fetchCharacteristics = useCallback(async () => {
    if (!characteristicId) {
      console.warn("No characteristic ID provided");
      return;
    }
    if (!session) {
      console.warn("No session available");
      return;
    }

    try {
      /* @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it */
      const token = session?.accessToken;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/characteristics/${characteristicId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching characteristic:", errorData);
        throw new Error(
          errorData.message || "Error al obtener la característica"
        );
      }

      const data = await response.json();
      setForm({
        ...data.data,
      });
    } catch (error) {
      console.error("Error fetching characteristic:", error);
      toast.error("Error al cargar los datos de la característica");
    }
  }, [characteristicId, session]);

  useEffect(() => {
    fetchCharacteristics();
  }, [fetchCharacteristics]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!handleFrontendError({ form, setErrors })) {
      toast.error("Por favor, corrige los errores en el formulario.");
      return;
    }

    setIsPending(true);

    if (!session) {
      toast.error("No se encontró la sesión activa.");
      setIsPending(false);
      return;
    }

    // Estructurar los datos según lo esperado por el servidor
    const characteristic = JSON.stringify({
      ...form,
      image: undefined,
    });
    const formData = new FormData();
    formData.append(
      "characteristic",
      new Blob([characteristic], { type: "application/json" })
    ); // Agregar el JSON en el campo "category"

    if (form.image instanceof File) {
      formData.append("image", form.image);
    } // Agregar el archivo en el campo "image"

    /* @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it */
    const token = session?.accessToken;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/characteristics/update/${characteristicId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        handleBackendError(errorData);
      }

      toast.success("Característica actualizada exitosamente");

      setTimeout(() => {
        setIsPending(false);
        router.push("/admin/characteristics");
      }, 1500);
    } catch (error) {
      if (error instanceof Error && error.message !== "VALIDATION_ERROR") {
        toast.error("Error al actualizar la característica");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="ml-96 flex justify-center">
        <Toaster position="top-center" />
        <ReusableSmallForm
          entityType="característica"
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          handleChange={handleChange}
          errors={errors}
          isPending={isPending}
          isEditing={true}
        />
      </div>
    </>
  );
};

export default EditCharacteristic;
