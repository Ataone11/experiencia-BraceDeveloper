import { SVGIcon } from "../interfaces";

export default function Importadores(props: SVGIcon) {
  const { color = "#002F50" } = props;
  return (
    <svg
      width="20"
      height="22"
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.029 1.25153C9.32605 1.08656 9.66022 1 10 1C10.3398 1 10.674 1.08656 10.971 1.25153L18.486 5.42553C18.6418 5.51217 18.7716 5.63888 18.862 5.79255C18.9524 5.94622 19 6.12125 19 6.29953V14.5345C18.9999 14.8912 18.9045 15.2413 18.7235 15.5487C18.5426 15.856 18.2828 16.1094 17.971 16.2825L10.971 20.1725C10.674 20.3375 10.3398 20.4241 10 20.4241C9.66022 20.4241 9.32605 20.3375 9.029 20.1725L2.029 16.2825C1.71736 16.1095 1.45763 15.8562 1.27671 15.5491C1.0958 15.2419 1.00026 14.892 1 14.5355V6.29953C0.999993 6.12125 1.04764 5.94622 1.13802 5.79255C1.22839 5.63888 1.3582 5.51217 1.514 5.42553L9.03 1.25153H9.029Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 3.21143L14.5 8.21143V11.7114M4 11.0394L7 12.7114"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 10.7114V20.7114M1 5.71143L10 10.7114L1 5.71143ZM10 10.7114L19 5.71143L10 10.7114Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
