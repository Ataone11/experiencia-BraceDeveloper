import { ImportadorModel } from "../../interfaces";
import Actions from "./Actions";
import Links from "./Links";

const ColumnRightInformationProvider = ({
  visibleImporter,
}: {
  visibleImporter: ImportadorModel;
}) => {
  return (
    <div className="hidden lg:flex lg:w-[30%] flex-col gap-y-4">
      <Actions visibleImporter={visibleImporter} />
      <Links />
    </div>
  );
};

export default ColumnRightInformationProvider;
