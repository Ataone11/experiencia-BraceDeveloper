import { SVGIcon } from "../interfaces";

export default function PrimerItemDesplegable(props: SVGIcon) {
  const { color = "#005C90" } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="14"
      fill="none"
      viewBox="0 0 30 14"
    >
      <path stroke={color} d="M1 0v9a4 4 0 004 4h24.5"></path>
    </svg>
  );
}
