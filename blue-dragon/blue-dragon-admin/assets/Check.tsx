import { SVGIcon } from "../interfaces";

export default function Check(props: SVGIcon) {
  const { color = "#BFF2D6" } = props;
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.66699 5L5.66699 9L12.3337 1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
