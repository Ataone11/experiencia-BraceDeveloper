import Link from "next/link";
import UserRounded from "../../assets/UserRounded";
import { ImportadorModel } from "../../interfaces";
import BoxShadow from "../BoxShadow";
import ButtonPage from "../ButtonPage";

const InformationImporterHelp = ({
  importer,
  applicant,
}: {
  importer: ImportadorModel;
  applicant: boolean;
}) => {
  return (
    <BoxShadow props={"p-4"}>
      <div className="flex flex-col gap-y-2 border-b pb-4 mb-4">
        <span className="font-bold text-base text-Principal">
          Importador{" "}
          {applicant && <span className="font-semibold">(Solicitante)</span>}
        </span>
        <Link href={`/importers/${importer?.id}`}>
          <a className="flex items-center gap-x-2 cursor-pointer font-normal text-sm px-4">
            <UserRounded />
            <span>{`${importer?.first_name} ${importer?.last_name}`}</span>
          </a>
        </Link>
      </div>
      <div className="flex flex-col gap-y-2 text-[13px]">
        <span className="font-bold text-Oscuro px-4">
          Información de contacto
        </span>
        <span className="font-normal px-4">{importer?.email}</span>
        <span className="mb-3 font-normal px-4">{`${importer?.phone_indicative} ${importer?.phone}`}</span>
        <ButtonPage>
          <span>Chat</span>
        </ButtonPage>
      </div>
    </BoxShadow>
  );
};

export default InformationImporterHelp;
