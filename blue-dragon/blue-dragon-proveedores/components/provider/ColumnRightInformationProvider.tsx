import { INFORMATION, ProviderModel } from "../../interfaces";
import EvaluatedInformation from "./EvaluatedInformation";

const ColumnRightInformationProvider = ({
  INFORMATION,
  visibleProvider,
}: {
  INFORMATION: INFORMATION[];
  visibleProvider: ProviderModel;
}) => {
  return (
    <div className="hidden lg:flex lg:w-[30%] flex-col gap-y-4">
      <EvaluatedInformation
        percentage={visibleProvider?.certification_level}
        INFORMATION={INFORMATION}
      />
    </div>
  );
};

export default ColumnRightInformationProvider;
