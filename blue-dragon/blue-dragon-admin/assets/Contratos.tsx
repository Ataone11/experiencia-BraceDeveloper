import { SVGIcon } from "../interfaces";

export default function Contratos(props: SVGIcon) {
  const { color = "#002F50" } = props;
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 14H11V16H4V14ZM4 10H14V12H4V10ZM4 6H14V8H4V6ZM16 2H11.82C11.4 0.84 10.3 0 9 0C7.7 0 6.6 0.84 6.18 2H2C1.86 2 1.73 2.01 1.6 2.04C1.21 2.12 0.86 2.32 0.59 2.59C0.41 2.77 0.26 2.99 0.16 3.23C0.0600001 3.46 0 3.72 0 4V18C0 18.27 0.0600001 18.54 0.16 18.78C0.26 19.02 0.41 19.23 0.59 19.42C0.86 19.69 1.21 19.89 1.6 19.97C1.73 19.99 1.86 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM9 1.75C9.41 1.75 9.75 2.09 9.75 2.5C9.75 2.91 9.41 3.25 9 3.25C8.59 3.25 8.25 2.91 8.25 2.5C8.25 2.09 8.59 1.75 9 1.75ZM16 18H2V4H16V18Z"
        fill={color}
      />
    </svg>
  );
}
