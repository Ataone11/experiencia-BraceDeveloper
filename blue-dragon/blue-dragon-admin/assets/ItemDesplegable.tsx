import { SVGIcon } from "../interfaces";

export default function ItemDesplegable(props: SVGIcon) {
  const { color = "#005C90" } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="41"
      fill="none"
      viewBox="0 0 30 41"
    >
      <path stroke={color} d="M1 .5V36a4 4 0 004 4h24.5"></path>
    </svg>
  );
}
