import { SVGIcon } from "../interfaces";

export default function Desplegable(props: SVGIcon) {
  const { color = "#005C90" } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="6"
      fill="none"
      viewBox="0 0 12 6"
    >
      <path
        fill={color}
        d="M0 .56L.413 0h11.194L12 .54 6.373 6h-.827L0 .56z"
      ></path>
    </svg>
  );
}
