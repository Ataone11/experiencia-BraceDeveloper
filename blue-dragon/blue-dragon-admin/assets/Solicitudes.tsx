import { SVGIcon } from "../interfaces";

export default function Solicitudes(props: SVGIcon) {
  const { color = "#002F50" } = props;
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM16 16H2V13H5.56C6.25 14.19 7.53 15 9.01 15C10.49 15 11.76 14.19 12.46 13H16V16ZM16 11H11.01C11.01 12.1 10.11 13 9.01 13C7.91 13 7.01 12.1 7.01 11H2V2H16V11Z"
        fill={color}
      />
    </svg>
  );
}
