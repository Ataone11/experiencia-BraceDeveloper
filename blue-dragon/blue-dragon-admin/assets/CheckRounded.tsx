import { SVGIcon } from "../interfaces";

export default function CheckRounded(props: SVGIcon) {
  const { color = "#BFF2D6" } = props;
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.00016 0.583984C3.45641 0.583984 0.583496 3.4569 0.583496 7.00065C0.583496 10.5444 3.45641 13.4173 7.00016 13.4173C10.5439 13.4173 13.4168 10.5444 13.4168 7.00065C13.4168 3.4569 10.5439 0.583984 7.00016 0.583984ZM9.7815 5.91565C9.83271 5.85711 9.8717 5.78892 9.89617 5.71508C9.92064 5.64125 9.9301 5.56327 9.92399 5.48573C9.91788 5.40818 9.89632 5.33265 9.86058 5.26356C9.82485 5.19447 9.77565 5.13323 9.7159 5.08343C9.65614 5.03364 9.58704 4.9963 9.51264 4.9736C9.43824 4.95091 9.36005 4.94333 9.28268 4.9513C9.20531 4.95927 9.13031 4.98264 9.0621 5.02002C8.99389 5.0574 8.93384 5.10805 8.8855 5.16898L6.37716 8.1784L5.07925 6.8799C4.96923 6.77364 4.82188 6.71485 4.66893 6.71617C4.51598 6.7175 4.36967 6.77885 4.26152 6.88701C4.15336 6.99516 4.09202 7.14147 4.09069 7.29442C4.08936 7.44737 4.14815 7.59472 4.25441 7.70473L6.00441 9.45473C6.06173 9.51202 6.13035 9.55673 6.2059 9.58602C6.28146 9.61531 6.36229 9.62854 6.44324 9.62486C6.52419 9.62119 6.60348 9.60068 6.67607 9.56466C6.74866 9.52864 6.81294 9.47789 6.86483 9.41565L9.7815 5.91565Z"
        fill={color}
      />
    </svg>
  );
}
