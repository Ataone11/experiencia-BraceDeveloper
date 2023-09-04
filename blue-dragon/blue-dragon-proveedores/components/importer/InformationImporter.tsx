import { useTranslation } from "next-i18next";
import Image from "next/image";
import { ImporterModel } from "../../interfaces";
import { S3_BUCKET } from "../../src/utils/constants";
import BasicInformation from "./BasicInformation";
import CompanyInformation from "./CompanyInformation";

const InformationImporter = ({ importer }: { importer: ImporterModel }) => {
  console.log(importer);
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-y-4 w-full">
      <section className={"rounded-lg bg-white shadow-md p-4"}>
        <div className="flex flex-col mx-4 gap-y-5 lg:flex-row lg:mx-0 lg:gap-y-0">
          <div className="lg:w-[20%]">
            <div
              className={`bg-gray-page w-full h-[20vh] lg:h-[20vw] max-h-[140px] rounded-lg overflow-hidden relative ${
                !importer.photo && "grid place-content-center text-center"
              }`}
            >
              {importer.photo ? (
                <Image
                  src={`${S3_BUCKET}${importer.photo}`}
                  quality="100%"
                  layout="fill"
                  objectFit="cover"
                  alt="image_profile"
                />
              ) : (
                <span>{t("importer:image-not-available")}</span>
              )}
            </div>
          </div>
          <div className="lg:pl-5 gap-y-5 lg:gap-y-0 flex flex-col justify-between">
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
                <p className="font-bold text-xs text-Principal">{t("importer:document")}</p>
                <p className="font-normal text-xs">{importer.document}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-Oscuro font-bold text-base">
              {t("importer:contact-information")}
              </p>
              <div className="flex gap-x-10 flex-wrap gap-y-4 lg:gap-y-0">
                <div className="space-y-1">
                  <p className="font-bold text-xs text-Principal">{t("importer:email")}</p>
                  <p className="font-normal text-xs">{importer.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-xs text-Principal">{t("importer:telephone")}</p>
                  <p className="font-normal text-xs">{importer.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CompanyInformation importer={importer} />

      <section className={"rounded-lg bg-white shadow-md p-4"}>
        <BasicInformation title="Información de abastecimiento">
          {importer.importerCompany ? (
            <div className="flex flex-col gap-y-5 lg:gap-y-2">
              <span className="flex">
                <span className="font-bold text-sm lg:flex">
                  <span className="md:min-w-max">
                  {t("importer:annual-purchase-volume")}&nbsp;&nbsp;
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
                    {t("importer:main-sourcing-purpose")}&nbsp;&nbsp;
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
                  {t("importer:average-supply-frequency")}&nbsp;&nbsp;
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
              {t("importer:no-records-of-the-importer's-company")}
            </p>
          )}
        </BasicInformation>
      </section>
    </div>
  );
};

export default InformationImporter;
