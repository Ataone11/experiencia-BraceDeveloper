import { INFORMATION } from "../../interfaces";
import Check from "../../src/assets/general/Check";
import Line from "../../src/assets/general/Line";

const EvaluatedInformation = ({
  percentage,
  INFORMATION,
}: {
  percentage: number;
  INFORMATION: INFORMATION[];
}) => {
  return (
    <section className={"rounded-lg bg-white p-4 shadow-md"}>
      <div className="flex flex-col gap-y-5">
        <span className="font-bold text-base flex items-center gap-x-2">
          <span className="text-primary text-base font-bold">
            Información evaluada
          </span>
          <p
            className={`${
              percentage >= 70 && percentage <= 79
                ? "bg-[#94131C]"
                : percentage >= 80 && percentage <= 89
                ? "bg-[#F99E37]"
                : percentage >= 90 && percentage <= 100 && "bg-ClaroDisable"
            } rounded-md px-1 py-[1px] text-white text-xs`}
          >
            {percentage}%
          </p>
        </span>
        <div className="flex flex-col gap-y-7">
          {INFORMATION.map(({ title, items }) => (
            <div key={title} className="flex gap-y-3 flex-col">
              <span className="font-semibold text-sm text-primary">
                {title}
              </span>
              {items.map(({ item, status }) => (
                <span key={item} className="font-normal text-xs flex gap-x-4">
                  <span className="mt-[5px]">
                    {status ? <Check /> : <Line />}
                  </span>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EvaluatedInformation;
