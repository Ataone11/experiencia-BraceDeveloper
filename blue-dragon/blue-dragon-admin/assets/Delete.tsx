import { SVGIcon } from "../interfaces";

const Delete = (props: SVGIcon) => {
  const { color = "#DAFFFF" } = props;
  return (
    <svg
      width="16"
      height="15"
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.2848 15H3.9515C3.50947 15 3.08555 14.842 2.77299 14.5607C2.46043 14.2794 2.28483 13.8978 2.28483 13.5V3.75H0.618164V2.25H3.9515V1.5C3.9515 1.10218 4.12709 0.720644 4.43965 0.43934C4.75221 0.158035 5.17614 0 5.61816 0H10.6182C11.0602 0 11.4841 0.158035 11.7967 0.43934C12.1092 0.720644 12.2848 1.10218 12.2848 1.5V2.25H15.6182V3.75H13.9515V13.5C13.9515 13.8978 13.7759 14.2794 13.4633 14.5607C13.1508 14.842 12.7269 15 12.2848 15ZM3.9515 3.75V13.5H12.2848V3.75H3.9515ZM5.61816 1.5V2.25H10.6182V1.5H5.61816ZM10.6182 12H8.9515V5.25H10.6182V12ZM7.28483 12H5.61816V5.25H7.28483V12Z"
        fill={color}
      />
    </svg>
  );
};

export default Delete;