// ejemplo de uso en un componente
"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  // revisar si hay un error en el uso de user
  //@ts-expect-error: Error en la validación de tipos
  const user = session?.user?.user || {};
  console.log(user);
  if (session) {
    return (
      <>
        {/* @ts-expect-error
         */}
        <p>Bienvenido, {`${user?.name} ${user?.lastName}`}</p>
        {/* @ts-expect-error*/}
        {session?.user?.user?.role}
        <p>mail, {user?.email}</p>
        {/* @ts-expect-error: test comment*/}
        <p>token, {session?.user?.accessToken}</p>
        <button onClick={() => signOut()}>Cerrar sesión</button>
      </>
    );
  }

  return (
    <>
      <p>No estás autenticado</p>
      <button onClick={() => signIn()}>Iniciar sesión</button>
    </>
  );
}
