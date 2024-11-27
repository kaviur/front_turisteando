"use client";
import UserForm from "@/components/UserForm";
import { useState, useEffect, useCallback } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import handleFrontendError from "@/utils/validators/validatorFrontendErrors";
import handleBackendError from "@/utils/validators/validatorBackendErrors";
import { getUserById, updateUsers } from "@/lib/user/userActions";

const EditUser = () => {
  const router = useRouter(); // Router para el redireccionamiento
  const pathname = usePathname();
  const userId = pathname.split("/").pop(); //  Obtener el ID de la URL dinámicamente
  const { data: session } = useSession(); // Obtener la sesión y el token

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.name.match(/^[a-zA-Z\s]{2,}$/)) {
      newErrors.name = "El nombre debe tener al menos 2 letras y solo letras.";
    }
    if (!form.lastName.match(/^[a-zA-Z\s]{2,}$/)) {
      newErrors.lastName =
        "El apellido debe tener al menos 2 letras y solo letras.";
    }
    if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.email = "Por favor, ingresa un correo electrónico válido.";
    }

    // Validación de contraseñas
    if (form.password && form.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Fetch de Usuario
  const fetchUser = useCallback(async () => {
    console.log("Este es el user Id:" + userId);
    if (!userId) {
      console.warn("No se ha provisto ID de usuario");
      return;
    }
    if (!session) {
      console.warn("Sesión no habilitada");
      return;
    }

    try {
      //@ts-ignore
      const token = session?.accessToken;
      console.log("Este es el token" + token);

      const response = await getUserById(token, userId);
      setForm({
        ...response,
        confirmPassword: "",
        password: "",
      });
    } catch (error) {
      console.error("Error haciendo el fetching Usuarios:", error);
      toast.error("Error al cargar los datos de Usuario");
    }
  }, [userId, session]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return toast.error("Error en el formulario. Revisa los campos.");
    }

    setIsPending(true);

    if (!session) {
      toast.error("No se encontró la sesión activa.");
      setIsPending(false);
      return;
    }

     //@ts-ignore
    const token = session?.accessToken;

    try {
      const response = await updateUsers(userId, token, form);
      if (response) {
        console.log(response);
        toast.success("Usuario actualizado con éxito");
        router.push("/admin/users"); // Redirige a la lista de usuarios
        setIsPending(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <>
      <div className="ml-96 flex justify-center">
        <Toaster position="top-center" />

        <UserForm
          form={form}
          setForm={setForm}
          handleChange={handleChange}
          errors={errors}
          onSubmit={handleSubmit}
          isPending={isPending}
          isEditing={true}
        />
      </div>
    </>
  );
};
export default EditUser;
