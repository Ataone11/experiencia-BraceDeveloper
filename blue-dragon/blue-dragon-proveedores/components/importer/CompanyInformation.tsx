import { useTranslation } from "next-i18next";
import Image from "next/image";
import { ImporterModel } from "../../interfaces";
import { S3_BUCKET } from "../../src/utils/constants";

const CompanyInformation = ({ importer }: { importer: ImporterModel }) => {
  const { t } = useTranslation();
  return (
    <section className={"rounded-lg bg-white shadow-md p-4"}>
      <div className="flex flex-col gap-y-5">
        <span className="font-bold text-base text-Principal">
         {t("importer:company-information")}
        </span>
        <div className="flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row w-full">
          <div
            className={`aspect-video md:w-52 rounded-lg bg-gray-page relative overflow-hidden ${
              !importer.importerCompany?.profile_picture &&
              "grid place-content-center text-center"
            }`}
          >
            {importer.importerCompany?.profile_picture ? (
              <Image
                src={`${S3_BUCKET}${importer.importerCompany.profile_picture}`}
                layout="fill"
                objectFit="cover"
                alt="image_profile"
              />
            ) : (
              <span>{t("importer:image-not-available")}</span>
            )}
          </div>
          {importer?.importerCompany ? (
            <div className="lg:w-[85%] flex flex-col lg:flex-row flex-wrap gap-y-4 lg:gap-y-2">
              <span className="lg:pl-10 lg:w-1/2 lg:leading-3">
                <span className="text-sm">
                  <span className="font-bold">
                  {t("importer:company-Name")}&nbsp;&nbsp;
                  </span>
                  <span className="font-normal">
                    {importer.importerCompany.company_name}
                  </span>
                </span>
              </span>
              <span className="lg:pl-10 lg:w-1/2 lg:leading-3">
                <span className="text-sm">
                  <span className="font-bold">
                  {t("importer:sales-platforms")}&nbsp;&nbsp;
                  </span>
                  <span className="font-normal">
                    {importer.importerCompany.sales_platforms}
                  </span>
                </span>
              </span>
              <span className="lg:pl-10 lg:w-1/2 lg:leading-3">
                <span className="text-sm">
                  <span className="font-bold">{t("importer:country")}&nbsp;&nbsp;</span>
                  <span className="font-normal">
                    {importer?.documentType?.country.name}
                  </span>
                </span>
              </span>
              <span className="lg:pl-10 lg:w-1/2 lg:leading-3">
                <span className="text-sm">
                  <span className="font-bold">
                  {t("importer:main-products")}&nbsp;&nbsp;
                  </span>
                  <span className="font-normal">
                    {importer.importerCompany.main_products}
                  </span>
                </span>
              </span>
              <span className="lg:pl-10 lg:w-1/2 lg:leading-3">
                <span className="text-sm">
                  <span className="font-bold">{t("importer:city")}&nbsp;&nbsp;</span>
                  <span className="font-normal">
                    {importer?.importerCompany.city?.name}
                  </span>
                </span>
              </span>
              <span className="lg:pl-10 lg:w-1/2 lg:leading-3">
                <span className="text-sm">
                  <span className="font-bold">{t("importer:about-us")}&nbsp;&nbsp;</span>
                  <span className="font-normal">
                    {importer.importerCompany.about_us}
                  </span>
                </span>
              </span>
              <span className="lg:pl-10 lg:w-1/2 lg:leading-3">
                <span className="text-sm">
                  <span className="font-bold">{t("importer:web-page")}&nbsp;&nbsp;</span>
                  <span className="font-normal">
                    {importer.importerCompany.web_page}
                  </span>
                </span>
              </span>
              <span className="lg:pl-10 lg:w-1/2 lg:leading-3">
                <span className="text-sm">
                  <span className="font-bold">
                  {t("importer:value-Added-Number")}&nbsp;&nbsp;
                  </span>
                  <span className="font-normal">
                    {importer.importerCompany.added_value_number}
                  </span>
                </span>
              </span>
              <span className="lg:pl-10 lg:w-1/2 lg:leading-3">
                <span className="text-sm">
                  <span className="font-bold">
                  {t("importer:sectors-of-interest")}&nbsp;&nbsp;
                  </span>
                  <span className="font-normal">
                    {importer.importerCompany.interest_sector}
                  </span>
                </span>
              </span>
              <span className="lg:pl-10 lg:w-1/2 lg:leading-3">
                <span className="text-sm">
                  <span className="font-bold">
                   {t("importer:total-number-of-employees")}&nbsp;&nbsp;
                  </span>
                  <span className="font-normal">
                    {importer.importerCompany.number_employees}
                  </span>
                </span>
              </span>
            </div>
          ) : (
            <p className="font-normal text-sm hidden lg:block lg:pl-10 lg:w-1/2 lg:leading-3">
             {t("importer:no-importer-company-records")}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CompanyInformation;
