import { SVGIcon } from "../interfaces";

const UserRounded = (props: SVGIcon) => {
  const { color = "#303030" } = props;
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 6C11 6.79565 10.6839 7.55871 10.1213 8.12132C9.55871 8.68393 8.79565 9 8 9C7.20435 9 6.44129 8.68393 5.87868 8.12132C5.31607 7.55871 5 6.79565 5 6C5 5.20435 5.31607 4.44129 5.87868 3.87868C6.44129 3.31607 7.20435 3 8 3C8.79565 3 9.55871 3.31607 10.1213 3.87868C10.6839 4.44129 11 5.20435 11 6Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8ZM8 1C6.68178 1.00007 5.39037 1.37236 4.2744 2.07403C3.15844 2.77569 2.26328 3.77821 1.69196 4.96619C1.12065 6.15418 0.896386 7.47934 1.045 8.78916C1.19361 10.099 1.70905 11.3402 2.532 12.37C3.242 11.226 4.805 10 8 10C11.195 10 12.757 11.225 13.468 12.37C14.2909 11.3402 14.8064 10.099 14.955 8.78916C15.1036 7.47934 14.8794 6.15418 14.308 4.96619C13.7367 3.77821 12.8416 2.77569 11.7256 2.07403C10.6096 1.37236 9.31822 1.00007 8 1Z"
        fill={color}
      />
    </svg>
  );
};

export default UserRounded;