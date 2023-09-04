import { SVGIcon } from "../interfaces";

export default function Changes(props: SVGIcon) {
  const { color = "#005C90" } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="37"
      height="37"
      fill="none"
      viewBox="0 0 37 37"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M5.958 32.835a3.583 3.583 0 100-7.167 3.583 3.583 0 000 7.167zM31.041 11.335a3.583 3.583 0 100-7.167 3.583 3.583 0 000 7.167z"
      ></path>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M31.041 11.333v8.959a8.958 8.958 0 01-8.958 8.958h-5.375m0 0l5.375-5.375m-5.375 5.375l5.375 5.375M5.958 25.667v-8.959a8.958 8.958 0 018.958-8.958h5.375m0 0l-5.375-5.375m5.375 5.375l-5.375 5.375"
      ></path>
    </svg>
  );
}
