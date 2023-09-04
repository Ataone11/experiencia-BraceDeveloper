import { Dispatch, SetStateAction } from "react";
import { INFORMATION, ProveedorModel } from "../../interfaces";
import Actions from "./Actions";
import EvaluatedInformation from "./EvaluatedInformation";
import Links from "./Links";

const ColumnRightInformationProvider = ({
  state,
  INFORMATION,
  visibleProvider,
  setVisibleProvider,
}: {
  state: boolean;
  INFORMATION: INFORMATION[];
  visibleProvider: ProveedorModel;
  setVisibleProvider: Dispatch<SetStateAction<ProveedorModel | null>>;
}) => {
  return (
    <div className="hidden lg:flex lg:w-[30%] flex-col gap-y-4">
      {state && (
        <Actions
          visibleProvider={visibleProvider}
          setVisibleProvider={setVisibleProvider}
        />
      )}
      {/* {state && <Links />} */}
      <EvaluatedInformation
        percentage={visibleProvider?.certification_level}
        INFORMATION={INFORMATION}
      />
    </div>
  );
};

export default ColumnRightInformationProvider;
