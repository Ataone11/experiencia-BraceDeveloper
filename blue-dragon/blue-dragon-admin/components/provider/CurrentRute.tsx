import Flecha from "../../assets/Flecha";
import colores from "../../src/utils/colores";

const CurrentRute = ({
  rute,
  nameRute,
  children,
}: {
  rute: string;
  nameRute: string;
  children?: JSX.Element;
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-3 items-start lg:items-center justify-between">
      <div className="flex items-center gap-x-3">
        <span className="text-TextOpacity font-normal text-sm">{rute}</span>
        <span className="-rotate-90">
          <Flecha color={colores.TextOpacity} />
        </span>
        <span className="text-TextOpacity font-normal text-sm">
          {/* max-w-[300px] text-ellipsis overflow-hidden whitespace-nowrap */}
          {nameRute}
        </span>
      </div>
      <div className="flex gap-x-5">{children}</div>
    </div>
  );
};

export default CurrentRute;
