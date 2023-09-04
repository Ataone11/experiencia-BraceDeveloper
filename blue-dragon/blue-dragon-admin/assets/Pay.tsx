import { SVGIcon } from "../interfaces";

export default function Pay(props: SVGIcon) {
  const { color = "#005C90" } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="39"
      height="29"
      fill="none"
      viewBox="0 0 39 29"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M1.583 5.541a3.583 3.583 0 013.583-3.583h28.667a3.583 3.583 0 013.583 3.583v17.917a3.583 3.583 0 01-3.583 3.583H5.166a3.583 3.583 0 01-3.583-3.583V5.541z"
      ></path>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M19.5 19.875a5.375 5.375 0 100-10.75 5.375 5.375 0 000 10.75z"
      ></path>
      <path
        fill={color}
        d="M1.583 7.625a1.5 1.5 0 100 3v-3zm8.667-5.667a1.5 1.5 0 00-3 0h3zm18.5 25.083a1.5 1.5 0 103 0h-3zm8.666-5.666a1.5 1.5 0 100-3v3zM1.583 10.625a8.667 8.667 0 006.128-2.539L5.59 5.965a5.667 5.667 0 01-4.007 1.66v3zm6.128-2.539a8.667 8.667 0 002.539-6.128h-3a5.667 5.667 0 01-1.66 4.007l2.121 2.121zM31.75 27.041c0-1.503.597-2.944 1.66-4.007l-2.122-2.12a8.667 8.667 0 00-2.538 6.127h3zm1.66-4.007a5.667 5.667 0 014.006-1.66v-3a8.667 8.667 0 00-6.128 2.54l2.121 2.12z"
      ></path>
    </svg>
  );
}
