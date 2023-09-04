import Image from "next/image";
import { ProviderModel } from "../../interfaces";
import CheckRounded from "../../src/assets/general/CheckRounded";
import { S3_BUCKET } from "../../src/utils/constants";

const BasicInformationProvider = ({
  provider,
}: {
  provider: ProviderModel;
}) => {
  const typeProvider = (level: number | null | undefined) => {
    let levelProvider: string = "";
    if (level !== null && level !== undefined) {
      if (level >= 70 && level <= 79) levelProvider = "Proveedor Bronce";
      if (level >= 80 && level <= 89) levelProvider = "Proveedor Oro";
      if (level >= 90 && level <= 100) levelProvider = "Proveedor Diamante";
    }
    return levelProvider;
  };

  return (
    <section className={"rounded-lg bg-white p-4 shadow-md"}>
      <div className="flex flex-col gap-x-4 lg:flex-row justify-between">
        <div className="flex gap-x-4 lg:max-w-[70%] xl:max-w-[80%] overflow-hidden">
          {/* Brand company */}
          <div
            className={`bg-backgroundPage w-[78px] h-[70px] min-w-[78px] rounded-lg overflow-hidden relative ${
              !provider.company?.logo && "grid place-content-center text-center"
            }`}
          >
            {provider.company ? (
              <Image
                src={`${S3_BUCKET}${provider.company.logo}`}
                quality="100%"
                layout="fill"
                objectFit="cover"
                alt="image_profile"
              />
            ) : (
              <span>imagen no disponible</span>
            )}
          </div>

          {/* name company */}
          <div className="flex flex-col md:gap-y-2">
            <div className="flex items-center gap-x-2">
              <span className="font-bold text-sm lg:max-w-[70%] xl:max-w-[720px] lg:text-ellipsis lg:overflow-hidden lg:whitespace-nowrap">
                {provider.company?.name || `Sin compañia`}
              </span>
              {provider.company && (
                <span>
                  <CheckRounded />
                </span>
              )}
            </div>
            <span className="font-normal text-xs flex items-center gap-x-2">
              {typeProvider(provider.certification_level)}
              {typeProvider(provider.certification_level) !== "" && (
                <p
                  className={`${
                    provider.certification_level >= 70 &&
                    provider.certification_level <= 79
                      ? "bg-[#94131C]"
                      : provider.certification_level >= 80 &&
                        provider.certification_level <= 89
                      ? "bg-[#F99E37]"
                      : provider.certification_level >= 90 &&
                        provider.certification_level <= 100 &&
                        "bg-ClaroDisable"
                  } rounded-md px-1 py-[1px] text-white text-xs`}
                >
                  {`${provider.certification_level}%`}
                </p>
              )}
            </span>
            {provider.status === 2 && (
              <span className="font-normal text-xs text-text-opacity hidden md:block">
                Suscripción activa hasta (Traerla en el servicio)
              </span>
            )}
          </div>
        </div>

        <div className="border my-4 lg:hidden" />

        <div className="flex flex-col gap-y-2 lg:gap-y-0 lg:max-w-[30%] xl:max-w-[20%] overflow-hidden justify-between">
          <span className="font-bold text-sm">Persona encargada</span>
          <div className="flex items-center gap-x-4">
            <div
              className={`bg-backgroundPage min-w-[54px] w-[54px] h-[48px] rounded-lg overflow-hidden relative ${
                !provider.phone && "grid place-content-center text-center"
              }`}
            >
              {provider.photo ? (
                <Image
                  src={`${S3_BUCKET}${provider.photo}`}
                  quality="100%"
                  layout="fill"
                  objectFit="cover"
                  alt="image_profile"
                />
              ) : (
                <span>imagen no disponible</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-primary">{`${provider.first_name} ${provider.last_name}`}</span>
              <span className="font-normal text-[12px]">
                {provider.company_position || `Sin posición`}
              </span>
              <span className="font-normal text-[10px]">
                {provider.phone_indicative && `+${provider.phone_indicative}`}
                {`${provider.phone}`}
              </span>
              <span className="font-normal text-[10px]">{provider.email}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasicInformationProvider;
