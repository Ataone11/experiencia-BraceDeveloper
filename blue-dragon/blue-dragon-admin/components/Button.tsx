import React from "react";

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  color?: "primary" | "secondary" | "alert";
  type?: "button" | "submit" | "reset";
}

const Button = ({
  text,
  className,
  onClick = () => {},
  color = "primary",
  type = "button",
}: ButtonProps) => {
  const getColor = () => {
    if (color === "primary") return "bg-Principal";
    else if (color === "secondary") return "bg-[#C4C4C4]";
    else if (color === "alert") return "bg-alert-button";
    else return "bg-Principal";
  };

  return (
    <button
      onClick={onClick}
      className={`${getColor()} py-[10px] px-[25px] rounded-[8px] text-white self-center text-[14px] ${className}`}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
