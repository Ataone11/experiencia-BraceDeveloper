import Image from "next/image";

interface Params {
  color: string;
  label: string;
  action?: () => void;
  type?: "button" | "submit";
  className?: string | null;
  icon?: string | null | any;
  textColor?: string | null;
}

const ButtonSec = ({
  color,
  label,
  action,
  type = "button",
  className = "",
  icon,
  textColor,
}:Params) => {
  return (
    <button
      type={type}
      onClick={() => (action ? action() : null)}
      className={`items-center  snap-center font-bold rounded-lg py-2 px-4 flex  text-sm my-5  ${textColor} ${color}${className}`}
    >
      <h1 className="mx-2">{label}</h1>

      {icon && <Image src={icon} alt="" />}
    </button>
  );
};

export default ButtonSec;
