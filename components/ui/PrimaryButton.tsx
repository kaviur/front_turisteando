"use client";

import React from "react";

interface PrimaryButtonProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: string;
  children?: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  style,
  onClick,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-primary text-white rounded-full ${style}`}
    >
      {children || text}
    </button>
  );
};

export default PrimaryButton;
