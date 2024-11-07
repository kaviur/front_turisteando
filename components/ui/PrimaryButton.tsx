import React from "react";

interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
  style?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  style,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-primary text-white rounded-full ${style}`}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
