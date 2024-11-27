"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleClick = async () => {
    await signOut();
  };

  return <button className="btn" onClick={handleClick}>Cerrar sesión</button>;
};
export default LogoutButton;