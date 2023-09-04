import colores from "../src/utils/colores";

const ButtonPage = ({
  color,
  children,
  action,
  type = "button",
  className = "",
}: {
  color?: string;
  children: JSX.Element;
  action?: () => void;
  type?: "button" | "submit";
  className?: string;
}) => {
  return (
    <button
      type={type}
      onClick={() => (action ? action() : null)}
      style={
        color
          ? { backgroundColor: color }
          : { backgroundColor: colores.Principal }
      }
      className={`rounded-md py-2 px-1 text-Active font-medium text-sm break-words transition-all duration-300 ease-in-out hover:bg-Oscuro ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonPage;
