import { SVGIcon } from "../interfaces";

export default function Citas(props: SVGIcon) {
  const { color = "#002F50" } = props;
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 4.71999L15.4 0.859985L14.11 2.38999L18.71 6.24999L20 4.71999ZM5.88 2.38999L4.6 0.859985L0 4.70999L1.29 6.23998L5.88 2.38999ZM10.5 6.99999H9V13L13.75 15.85L14.5 14.62L10.5 12.25V6.99999ZM10 2.99999C5.03 2.99999 1 7.02999 1 12C1 16.97 5.02 21 10 21C14.97 21 19 16.97 19 12C19 7.02999 14.97 2.99999 10 2.99999ZM10 19C6.13 19 3 15.87 3 12C3 8.12999 6.13 4.99999 10 4.99999C13.87 4.99999 17 8.12999 17 12C17 15.87 13.87 19 10 19Z"
        fill={color}
      />
    </svg>
  );
}
