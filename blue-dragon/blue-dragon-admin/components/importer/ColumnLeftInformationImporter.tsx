import BasicInformation from "../BasicInformation";
import BoxShadow from "../BoxShadow";
import Actions from "./Actions";
import Links from "./Links";
import { ImportadorModel } from "../../interfaces";
import CompanyInformation from "./CompanyInformation";
import Image from "next/image";
import { S3_BUCKET_URL } from "../../src/utils/constants";
import ImageWithFallback from "../general/ImageWithFallback";

const ColumnLeftInformationImporter = ({
  importer,
}: {
  importer: ImportadorModel;
}) => {
  return (
    <div className="lg:w-[70%] flex flex-col gap-y-4 w-full">
      <BoxShadow props={"py-4"} shadow={false}>
        <div className="flex flex-col mx-4 gap-y-5 lg:flex-row lg:mx-0 lg:gap-y-0">
          <div className="lg:w-[30%]">
            <div
              className={`bg-backgroundPage w-full h-[20vh] lg:h-[20vw] max-h-[140px] rounded-lg overflow-hidden relative ${!importer.photo && "grid place-content-center text-center"
                }`}
            >
              <ImageWithFallback
                src={`${importer.photo}`}
                quality="100%"
                layout="fill"
                objectFit="cover"
                alt="image_profile"
              />
            </div>
          </div>
          <div className="lg:pl-5 gap-y-5 lg:gap-y-0 flex flex-col justify-between lg:w-[70%]">
            <div className="flex gap-x-10 items-center">
              <div className="-space-y-1">
                <p className="text-Oscuro font-bold text-xl">
                  {`${importer.first_name} ${importer.last_name}`}
                </p>
                <p className="font-normal text-sm">
                  {importer.company_position}
                </p>
              </div>
              <div className="space-y-1 mt-1">
                <p className="font-bold text-xs text-Principal">Identificación</p>
                <p className="font-normal text-xs">{importer.document}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-Oscuro font-bold text-base">
                Datos de contacto
              </p>
              <div className="flex gap-x-10 flex-wrap gap-y-4 lg:gap-y-0">
                <div className="space-y-1">
                  <p className="font-bold text-xs text-Principal">Correo</p>
                  <p className="font-normal text-xs">{importer.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-xs text-Principal">Teléfono</p>
                  <p className="font-normal text-xs">{importer.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BoxShadow>

      {
        <span className="lg:hidden">
          <Actions visibleImporter={importer} />
        </span>
      }
      {
        <span className="lg:hidden">
          <Links />
        </span>
      }

      <CompanyInformation importer={importer} />

      <BoxShadow props={"p-4"}>
        <BasicInformation title="Información de abastecimiento">
          {importer.importerCompany ? (
            <div className="flex flex-col gap-y-5 lg:gap-y-2">
              <span className="flex">
                <span className="font-bold text-sm lg:flex">
                  <span className="md:min-w-max">
                    Volumen de compras anual:&nbsp;&nbsp;
                  </span>
                  <span className="font-normal lg:hidden">
                    {importer.importerCompany.annual_purchasing_volume}
                  </span>
                </span>
                <p className="font-normal text-sm hidden lg:block">
                  {importer.importerCompany.annual_purchasing_volume}
                </p>
              </span>
              <span className="flex">
                <span className="font-bold text-sm lg:flex">
                  <span className="md:min-w-max">
                    Propósito principal de abastecimiento:&nbsp;&nbsp;
                  </span>
                  <span className="font-normal lg:hidden">
                    {importer.importerCompany.sourcing_purpose}
                  </span>
                </span>
                <p className="font-normal text-sm hidden lg:block">
                  {importer.importerCompany.sourcing_purpose}
                </p>
              </span>
              <span className="flex">
                <span className="font-bold text-sm lg:flex">
                  <span className="md:min-w-max">
                    Frecuencia de abastecimiento promedio:&nbsp;&nbsp;
                  </span>
                  <span className="font-normal lg:hidden">
                    {importer.importerCompany.supply_frequency}
                  </span>
                </span>
                <p className="font-normal text-sm hidden lg:block">
                  {importer.importerCompany.supply_frequency}
                </p>
              </span>
            </div>
          ) : (
            <p className="font-normal text-sm hidden lg:block">
              Sin registros de la compañia del importador
            </p>
          )}
        </BasicInformation>
      </BoxShadow>
    </div>
  );
};

export default ColumnLeftInformationImporter;
