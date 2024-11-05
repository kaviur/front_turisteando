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
      className={`flex justify-center rounded-full bg-primary py-2 px-10 font-medium text-white hover:bg-opacity-90 text-sm ${style}`}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
