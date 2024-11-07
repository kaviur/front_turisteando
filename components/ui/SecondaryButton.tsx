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
      className={`btn rounded-full ${style}`}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
