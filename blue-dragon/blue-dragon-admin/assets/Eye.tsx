import { SVGIcon } from "../interfaces";

const Eye = (props: SVGIcon) => {
  const { color = "#868686" } = props;
  return (
    <svg
      width="19"
      height="14"
      viewBox="0 0 19 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.0909 5.96179C17.4853 6.47778 17.4853 7.17436 17.0909 7.68952C15.8483 9.31155 12.8673 12.6513 9.38685 12.6513C5.90643 12.6513 2.92536 9.31155 1.68283 7.68952C1.4909 7.44245 1.38672 7.13851 1.38672 6.82566C1.38672 6.5128 1.4909 6.20886 1.68283 5.96179C2.92536 4.33977 5.90643 1 9.38685 1C12.8673 1 15.8483 4.33977 17.0909 5.96179V5.96179Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.38733 9.32252C10.7662 9.32252 11.884 8.20471 11.884 6.82581C11.884 5.44692 10.7662 4.3291 9.38733 4.3291C8.00844 4.3291 6.89062 5.44692 6.89062 6.82581C6.89062 8.20471 8.00844 9.32252 9.38733 9.32252Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Eye;
