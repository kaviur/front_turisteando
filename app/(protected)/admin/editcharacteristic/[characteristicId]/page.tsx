"use client";

import ReusableSmallForm from "@/components/ReusableSmallForm/ReusableSmallForm";
import { useState, useEffect, useCallback } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import handleFrontendError from "@/utils/validators/validatorFrontendErrors";
// import handleBackendError from "@/utils/validators/validatorBackendErrors";
import { Characteristics } from "@/types/characteristics";
import { editCharacteristic, fetchCharacteristicById } from "@/lib/actions";
import handleBackendError from "@/utils/validators/validatorBackendErrors";

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

      const response = await fetchCharacteristicById(characteristicId);
      if (response) {
        setForm({
          ...response,
        });
      } else {
        toast.error("Error al cargar los datos de la característica");
      }
    } catch (error) {
      console.error("Error al cargar los datos de la característica:", error);
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
    const token = session?.user?.accessToken;

    try {
      const response = await editCharacteristic(
        token,
        formData,
        characteristicId
      );

      if ("debugMessage" in response) {
        handleBackendError(response);

        toast.error(response.message);
        setIsPending(false);
      } else {
        toast.success("Característica actualizada exitosamente");

        setTimeout(() => {
          setIsPending(false);
          router.push("/admin/characteristics");
        }, 1000);
      }
    } catch (error) {
      console.error("Error al actualizar la característica:", error);
      
      toast.error("Error al actualizar la característica. Intenta nuevamente.");
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
