"use client";

import React from "react";

interface SecondaryButtonProps {
  text?: string;
  onClick?: () => void;
  style?: string;
  children?: React.ReactNode;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  text,
  style,
  onClick,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn rounded-full ${style}`}
    >
      {children || text}
    </button>
  );
};

export default SecondaryButton;