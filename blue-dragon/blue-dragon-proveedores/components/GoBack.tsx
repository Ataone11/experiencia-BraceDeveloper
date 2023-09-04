import { useRouter } from "next/router";
import Regresar from "../src/assets/general/Regresar";

const GoBack = ({
  status,
  label,
  optionalLabel,
  routerLink = "",
}: {
  status?: boolean;
  label: string;
  optionalLabel?: string;
  routerLink?: string;
}) => {
  const router = useRouter();
  return (
    <span className="flex items-start lg:items-center lg:h-7 mb-4 lg:mb-7 w-full max-w-7xl mx-auto h-auto">
      <button
        type="button"
        onClick={() => {
          routerLink === "" ? router.back() : router.push(routerLink);
        }}
        className="pr-5"
      >
        <Regresar />
      </button>
      <button
        type="button"
        onClick={() => {
          routerLink === "" ? router.back() : router.push(routerLink);
        }}
        className="font-bold text-xl text-dark-blue text-left"
      >
        {label} {!status && optionalLabel !== undefined && `${optionalLabel}`}
      </button>
    </span>
  );
};

export default GoBack;
