import Image from "next/image";
import { ImportadorModel } from "../../interfaces";
import { S3_BUCKET_URL } from "../../src/utils/constants";
import BoxShadow from "../BoxShadow";
import ImageWithFallback from "../general/ImageWithFallback";

const CompanyInformation = ({ importer }: { importer: ImportadorModel }) => {
  return (
    <BoxShadow props={"p-4"}>
      <div className="flex flex-col gap-y-5">
        <span className="font-bold text-base text-Principal">
          Información de la empresa
        </span>
        <div className="flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row w-full">
          <div className="w-[106px] md:w-[200px] lg:w-[15%]">
            <div
              className={`bg-backgroundPage h-[95px] md:h-[130px] lg:w-full lg:h-[20vw] lg:max-h-[70px] rounded-lg overflow-hidden relative ${!importer.importerCompany?.profile_picture &&
                "grid place-content-center text-center"
                }`}
            >
              <ImageWithFallback
                src={`${importer.importerCompany.profile_picture}`}
                quality="100%"
                layout="fill"
                objectFit="cover"
                alt="image_profile"
              />
            </div>
          </div>
          {importer?.importerCompany ? (
            <div className="lg:w-[85%] flex flex-col lg:flex-row flex-wrap gap-y-4 lg:gap-y-2">
              <span className="lg:pl-10 lg:w-1/2 lg:leading-3">
                <span className="text-sm">
                  <span className="font-bold">
                    Nombre de empresa:&nbsp;&nbsp;
                  </span>
                  <span className="font-normal">
                    {importer.importerCompany.company_name}
                  </span>
                </span>
              </span>
              <span className="lg:pl-10 lg:w-1/2 lg:leading-3">
                <span className="text-sm">
                  <span className="font-bold">
                    Plataformas de venta:&nbsp;&nbsp;
                  </span>
                  <span className="font-normal">
                    {importer.importerCompany.sales_platforms}
                  </span>
                </span>
              </span>
              <span className="lg:pl-10 lg:w-1/2 lg:leading-3">
                <span className="text-sm">
                  <span className="font-bold">País:&nbsp;&nbsp;</span>
                  <span className="font-normal">
                    {importer.city?.country.name}
                  </span>
                </span>
              </span>
              <span className="lg:pl-10 lg:w-1/2 lg:leading-3">
                <span className="text-sm">
                  <span className="font-bold">
                    Productos principales:&nbsp;&nbsp;
                  </span>
                  <span className="font-normal">
                    {importer.importerCompany.main_products}
                  </span>
                </span>
              </span>
              <span className="lg:pl-10 lg:w-1/2 lg:leading-3">
                <span className="text-sm">
                  <span className="font-bold">Ciudad:&nbsp;&nbsp;</span>
                  <span className="font-normal">{importer.city?.name}</span>
                </span>
              </span>
              <span className="lg:pl-10 lg:w-1/2 lg:leading-3">
                <span className="text-sm">
                  <span className="font-bold">Sobre nosotros:&nbsp;&nbsp;</span>
                  <span className="font-normal">
                    {importer.importerCompany.about_us}
                  </span>
                </span>
              </span>
              <span className="lg:pl-10 lg:w-1/2 lg:leading-3">
                <span className="text-sm">
                  <span className="font-bold">Página web:&nbsp;&nbsp;</span>
                  <span className="font-normal">
                    {importer.importerCompany.web_page}
                  </span>
                </span>
              </span>
              <span className="lg:pl-10 lg:w-1/2 lg:leading-3">
                <span className="text-sm">
                  <span className="font-bold">
                    Número de valor agregado:&nbsp;&nbsp;
                  </span>
                  <span className="font-normal">
                    {importer.importerCompany.added_value_number}
                  </span>
                </span>
              </span>
              <span className="lg:pl-10 lg:w-1/2 lg:leading-3">
                <span className="text-sm">
                  <span className="font-bold">
                    Sectores de interés:&nbsp;&nbsp;
                  </span>
                  <span className="font-normal">
                    {importer.importerCompany.interest_sector}
                  </span>
                </span>
              </span>
              <span className="lg:pl-10 lg:w-1/2 lg:leading-3">
                <span className="text-sm">
                  <span className="font-bold">
                    Número total de empleados:&nbsp;&nbsp;
                  </span>
                  <span className="font-normal">
                    {importer.importerCompany.number_employees}
                  </span>
                </span>
              </span>
            </div>
          ) : (
            <p className="font-normal text-sm hidden lg:block lg:pl-10 lg:w-1/2 lg:leading-3">
              Sin registros de compañia del importador
            </p>
          )}
        </div>
      </div>
    </BoxShadow>
  );
};

export default CompanyInformation;
