import React from "react";

interface SecondaryButtonProps {
  text: string;
  onClick?: () => void;
  style?: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  text,
  style,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center rounded-full py-2 px-10 font-medium text-black hover:bg-opacity-90 text-sm border-2 border-accent${style}`}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
