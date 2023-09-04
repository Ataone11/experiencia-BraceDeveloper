import { useRouter } from "next/router";
import Regresar from "../assets/Regresar";

const GoBack = ({
  status,
  label,
  optionalLabel,
  route,
}: {
  status?: boolean;
  label: string;
  optionalLabel?: string;
  route: string;
}) => {
  const router = useRouter();
  return (
    <span
      onClick={() => router.push(route)}
      className="flex items-start lg:items-center lg:h-7 mb-4 lg:mb-7 w-full max-w-7xl mx-auto h-auto"
    >
      <button className="pr-5">
        <Regresar />
      </button>
      <button className="font-bold text-xl text-Oscuro text-left">
        {label} {!status && optionalLabel !== undefined && `${optionalLabel}`}
      </button>
    </span>
  );
};

export default GoBack;
