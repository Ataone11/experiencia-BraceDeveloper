const VisualIcon = ({ color }: { color: string }) => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.1719 12.9531C4.04688 15.3281 1.07812 8.5 1.07812 8.5C1.07812 8.5 1.67188 6.42188 4.64062 4.64062M9.39062 3.45312C13.5469 4.04688 15.9219 8.5 15.9219 8.5C15.9219 8.5 15.3281 9.98438 14.1406 11.1719L9.39062 3.45312Z"
        stroke={color ?? "black"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.24271 9.78599C8.9211 9.9716 8.5416 10.0299 8.1791 9.94948C7.81659 9.86902 7.49741 9.65561 7.28452 9.35137C7.07134 9.04725 6.9799 8.67426 7.02827 8.30602C7.07663 7.93779 7.26129 7.60106 7.54577 7.3623L8.50052 8.49993L9.24271 9.78599Z"
        stroke={color ?? "black"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.45312 1.07812L13.5469 15.9219"
        stroke={color ?? "black"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default VisualIcon;
