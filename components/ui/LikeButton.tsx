import React, { useState } from "react";
import "@/app/globals.css";

const LikeButton = () => {
  // Estado para controlar si el corazón está activo
  const [isActive, setIsActive] = useState(false);

  // Manejar el clic para alternar la clase
  const handleToggle = () => {
    setIsActive((prevState) => !prevState);
  };

  return (
    <div className="btn btn-ghost rounded-full h-20 w-20 bg-white relative shadow-lg">

      <div
        className={` heart absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isActive ? "is-active" : ""}`}
        onClick={handleToggle}
      ></div>

    </div>
  );
};

export default LikeButton;
