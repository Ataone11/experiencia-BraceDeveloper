import { SVGIcon } from "../interfaces";

export default function Account(props: SVGIcon) {
  const { color = "#005C90" } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="37"
      fill="none"
      viewBox="0 0 38 37"
    >
      <path
        fill={color}
        d="M19 .582C8.88.582.667 8.609.667 18.499c0 9.89 8.213 17.916 18.333 17.916S37.334 28.39 37.334 18.5 29.12.582 19 .582zM9.962 29.75c.788-1.612 5.592-3.189 9.038-3.189 3.447 0 8.269 1.577 9.039 3.19A14.683 14.683 0 0119 32.831c-3.41 0-6.545-1.147-9.038-3.082zm20.698-2.598c-2.621-3.117-8.983-4.174-11.66-4.174-2.676 0-9.038 1.057-11.66 4.174A14.035 14.035 0 014.334 18.5c0-7.902 6.581-14.334 14.666-14.334S33.667 10.597 33.667 18.5c0 3.26-1.137 6.253-3.007 8.653zM19 7.75c-3.556 0-6.416 2.795-6.416 6.27 0 3.476 2.86 6.271 6.416 6.271 3.557 0 6.417-2.795 6.417-6.27 0-3.476-2.86-6.271-6.417-6.271zm0 8.958c-1.521 0-2.75-1.2-2.75-2.688 0-1.487 1.229-2.687 2.75-2.687 1.522 0 2.75 1.2 2.75 2.688 0 1.487-1.228 2.687-2.75 2.687z"
      ></path>
    </svg>
  );
}
