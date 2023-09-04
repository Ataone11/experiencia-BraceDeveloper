import { SVGIcon } from "../interfaces";

export default function Order(props: SVGIcon) {
  const { color = "#005C90" } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M11.602 5.037l-.522 1.714H9.747L11.983.086h1.543l2.226 6.665h-1.4l-.524-1.714h-2.226zm1.963-.981L12.75 1.36h-.06l-.814 2.696h1.689z"
        clipRule="evenodd"
      ></path>
      <path
        fill={color}
        d="M15.2 15.5h-4.915v-.864l3.224-4.65V9.92h-3.137V8.835h4.732v.864l-3.21 4.65v.067h3.307V15.5H15.2zM4.625 1.125a.625.625 0 00-1.25 0v12.241l-1.433-1.434a.627.627 0 00-.885.886l2.5 2.498.01.009a.621.621 0 00.874-.007l2.5-2.5a.625.625 0 10-.884-.886l-1.432 1.434V1.125z"
      ></path>
    </svg>
  );
}
