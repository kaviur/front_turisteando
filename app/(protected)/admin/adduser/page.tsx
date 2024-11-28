"use client";

import UserForm from "@/components/UserForm";
import { useState } from "react";

//import handleBackendError from "@/utils/validators/validatorBackendErrors";
//import handleFrontendError from "@/utils/validators/validatorFrontendErrors";
import { useRouter } from "next/navigation";

import { toast, Toaster } from "react-hot-toast";
import { createUser } from "@/lib/user/userActions";
//import { FaLessThanEqual } from "react-icons/fa";
//import { setConfig } from "next/config";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
    const [form, setForm] = useState({
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    
    const { data: session } = useSession(); // Obtener la sesión y el token
    const [isPending, setIsPending] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      if (form.password.length < 6) {
        newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
      }
      if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden.";
      }
      setErrors(newErrors);
     
      return Object.keys(newErrors).length === 0;
    };
  
         
    const handleSubmit = async (event: React.FormEvent) => {
     // const { email, password, name, lastName } = form;
      event.preventDefault();
      if (!validateForm()) {
        return toast.error("Error en el formulario. Revisa los campos.");
      }
      setIsPending(true);

      
     /* @ts-expect-error: session object contains accessToken, but TypeScript doesn't recognize it */
      const token = session?.accessToken;
  
      try {
          
          console.log(token);
           const response = await createUser(token, form)
          if (response){
            toast.success ("Usuario Creado exitosamente");
            setIsPending(false);
            setTimeout(()=>{
              router.push("/admin/users")
            }, 1200) ;
          }  
      } catch (error) {
        console.log( "Se dio un error ", error);
     
      }finally{
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
          isEditing={false}
        />
      </div>
    </>
  );
}
