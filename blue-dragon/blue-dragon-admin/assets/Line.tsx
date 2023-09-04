import { SVGIcon } from "../interfaces";

export default function Line(props: SVGIcon) {
  const { color = "#FF7971" } = props;
  return (
    <svg
      width="17"
      height="2"
      viewBox="0 0 17 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="1"
        y1="1"
        x2="16"
        y2="1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
