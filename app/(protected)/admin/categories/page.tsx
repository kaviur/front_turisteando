import ReusableSmallForm from "@/components/ReusableSmallForm/ReusableSmallForm";
import { useRouter } from "next/router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsPending(true);

    await toast
      .promise(
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, description, image }),
        }).then((response) => {
          if (!response.ok) throw new Error("Error al registrar la categoria");
          router.push("");
        }),
        {
          loading: "Registrando...",
          success: "Registro exitoso",
          error: "Error al registrar la categoria",
        }
      )
      .finally(() => {
        setIsPending(false);
      });
  };

  return (
    <>
      <div className="ml-96 flex justify-center">
        <Toaster position="top-center" />
        <ReusableSmallForm entityType={"categoría"} />
      </div>
    </>
  );
}
