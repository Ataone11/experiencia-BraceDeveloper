import Image from "next/image";
import Link from "next/link";
import { ProveedorModel } from "../../interfaces";
import { S3_BUCKET_URL } from "../../src/utils/constants";
import BoxShadow from "../BoxShadow";
import ButtonPage from "../ButtonPage";
import ImageWithFallback from "../general/ImageWithFallback";

const InformationProviderHelp = ({
  provider,
  applicant,
}: {
  provider: ProveedorModel;
  applicant: boolean;
}) => {
  return (
    <BoxShadow props={"p-4"}>
      <div className="flex flex-col gap-y-2 border-b pb-4 mb-4">
        <span className="font-bold text-base text-Principal">
          Proveedor{" "}
          {applicant && <span className="font-semibold">(Solicitante)</span>}
        </span>
        {provider?.company && (
          <span className="font-normal text-sm px-4">
            {provider?.company.name}
          </span>
        )}
      </div>
      <div className="flex gap-x-4 text-[13px] mb-5">
        <Link href={`/providers/${provider?.id}`}>
          <a className="w-14 h-14 rounded-md bg-backgroundPage relative overflow-hidden">
            <ImageWithFallback
              src={`${provider?.photo}`}
              objectFit="cover"
              layout="fill"
              alt={`${provider?.first_name} ${provider?.last_name}`}
            />
          </a>
        </Link>
        <div className="flex flex-col justify-center">
          <Link href={`/providers/${provider?.id}`}>
            <a className="font-bold text-[15px]">
              {provider?.first_name} {provider?.last_name}
            </a>
          </Link>
          {provider?.company_position && (
            <span className="font-normal text-[15px]">
              {provider.company_position}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <ButtonPage>
          <span>Chat</span>
        </ButtonPage>
      </div>
    </BoxShadow>
  );
};

export default InformationProviderHelp;
