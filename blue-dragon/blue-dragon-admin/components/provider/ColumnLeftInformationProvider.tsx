import { Dispatch, SetStateAction } from "react";
import { INFORMATION, ProveedorModel } from "../../interfaces";
import BasicInformation from "../BasicInformation";
import BoxShadow from "../BoxShadow";
import Picture from "../Picture";
import Actions from "./Actions";
import EvaluatedInformation from "./EvaluatedInformation";
import Links from "./Links";

const ColumnLeftInformationProvider = ({
  state,
  INFORMATION,
  provider,
  visibleProvider,
  setVisibleProvider,
}: {
  state: boolean;
  INFORMATION: INFORMATION[];
  provider: ProveedorModel | null;
  visibleProvider: ProveedorModel;
  setVisibleProvider: Dispatch<SetStateAction<ProveedorModel | null>>;
}) => {
  return (
    <div className="lg:w-[70%] flex flex-col gap-y-4 w-full">
      {state && (
        <span className="lg:hidden">
          <Actions
            visibleProvider={visibleProvider}
            setVisibleProvider={setVisibleProvider}
          />
        </span>
      )}
      {state && (
        <span className="lg:hidden">
          <Links />
        </span>
      )}
      <BoxShadow props={"p-4"}>
        <BasicInformation title={"Información básica"}>
          {provider?.company ? (
            <div className="flex flex-col gap-y-5 lg:gap-y-2">
              <span className="flex">
                <span className="font-bold text-sm lg:flex">
                  <span className="md:min-w-max">Ubicación:&nbsp;&nbsp;</span>
                  <span className="font-normal lg:hidden">
                    {provider?.city ? `${provider?.city?.name}, ${provider?.city?.country.name}` : "-"}
                  </span>
                </span>
                <p className="font-normal text-sm hidden lg:block">
                  {provider?.city ? `${provider?.city?.name}, ${provider?.city?.country.name}` : "-"}
                </p>
              </span>
              <span className="flex">
                <span className="font-bold text-sm lg:flex">
                  <span className="md:min-w-max">Dirección:&nbsp;&nbsp;</span>
                  <span className="font-normal lg:hidden">
                    {`${provider?.company.address || "Sin dirección"}`}
                  </span>
                </span>
                <p className="font-normal text-sm hidden lg:block">
                  {`${provider?.company.address || "Sin dirección"}`}
                </p>
              </span>
              <span className="flex">
                <span className="font-bold text-sm lg:flex">
                  <span className="md:min-w-max">NIT:&nbsp;&nbsp;</span>
                  <span className="font-normal lg:hidden">
                    {`(${provider.document_type.document_type}) ${provider?.document_type.description}`}
                  </span>
                </span>
                <p className="font-normal text-sm hidden lg:block">
                  {`(${provider.document_type.document_type}) ${provider?.document_type.description}`}
                </p>
              </span>
              <span className="flex">
                <span className="font-bold text-sm lg:flex">
                  <span className="md:min-w-max">
                    Sectores de interés:&nbsp;&nbsp;
                  </span>
                  <span className="font-normal lg:hidden">
                    {`${provider?.company.interest_sectors ||
                      "Sin sectores de interes"
                      }`}
                  </span>
                </span>
                <p className="font-normal text-sm hidden lg:block">
                  {`${provider?.company.interest_sectors ||
                    "Sin sectores de interes"
                    }`}
                </p>
              </span>
            </div>
          ) : (
            <p className="font-normal text-sm hidden lg:block">
              Sin datos de la compañia
            </p>
          )}
        </BasicInformation>
      </BoxShadow>

      {/* Información documental (QUEMADA POR EL MOMENTO) */}
      <BoxShadow props={"p-4"}>
        <BasicInformation title={"Información documental"}>
          <div className="flex flex-col gap-y-5 lg:gap-y-2">
            <span className="flex">
              <span className="font-bold text-sm lg:flex">
                <span className="md:min-w-max">
                  Términos comerciales internacionales (Incoterms):&nbsp;&nbsp;
                </span>
                <span className="font-normal lg:hidden">Llavero, CIF, CFR</span>
              </span>
              <p className="font-normal text-sm hidden lg:block">
                Llavero, CIF, CFR
              </p>
            </span>
            <span className="flex">
              <span className="font-bold text-sm lg:flex">
                <span className="md:min-w-max">
                  Condiciones de pago:&nbsp;&nbsp;
                </span>
                <span className="font-normal lg:hidden">
                  LC, T / T, D / P, PayPal, Western Union, pago de pequeña
                  cantidad
                </span>
              </span>
              <p className="font-normal text-sm hidden lg:block">
                LC, T / T, D / P, PayPal, Western Union, pago de pequeña
                cantidad
              </p>
            </span>
            <span className="flex">
              <span className="font-bold text-sm lg:flex">
                <span className="md:min-w-max">
                  Plazo de ejecución medio:&nbsp;&nbsp;
                </span>
                <span className="font-normal lg:hidden">
                  Plazo de entrega de temporada alta: un mes.
                </span>
              </span>
              <p className="font-normal text-sm hidden lg:block">
                Plazo de entrega de temporada alta: un mes.
              </p>
            </span>
            <span className="flex">
              <span className="font-bold text-sm lg:flex">
                <span className="md:min-w-max">
                  Número de personal de comercio exterior:&nbsp;&nbsp;
                </span>
                <span className="font-normal lg:hidden">10</span>
              </span>
              <p className="font-normal text-sm hidden lg:block">10</p>
            </span>
            <span className="flex">
              <span className="font-bold text-sm lg:flex">
                <span className="md:min-w-max">
                  Certificación del sistema de gestión:&nbsp;&nbsp;
                </span>
                <span className="font-normal lg:hidden"> ISO9001: 2015</span>
              </span>
              <p className="font-normal text-sm hidden lg:block">
                ISO9001: 2015
              </p>
            </span>
            <span className="flex">
              <span className="font-bold text-sm lg:flex">
                <span className="md:min-w-max">
                  Año de exportación:&nbsp;&nbsp;
                </span>
                <span className="font-normal lg:hidden">2007-09-01</span>
              </span>
              <p className="font-normal text-sm hidden lg:block">2007-09-01</p>
            </span>
            <span className="flex">
              <span className="font-bold text-sm lg:flex">
                <span className="md:min-w-max">
                  Número de serie SGS:&nbsp;&nbsp;
                </span>
                <span className="font-normal lg:hidden">QIP-ASR218052</span>
              </span>
              <p className="font-normal text-sm hidden lg:block">
                QIP-ASR218052
              </p>
            </span>
            <span className="flex">
              <span className="font-bold text-sm lg:flex">
                <span className="md:min-w-max">
                  Porcentaje de exportación:&nbsp;&nbsp;
                </span>
                <span className="font-normal lg:hidden">31% ~ 40%</span>
              </span>
              <p className="font-normal text-sm hidden lg:block">31% ~ 40%</p>
            </span>
            <span className="flex">
              <span className="font-bold text-sm lg:flex">
                <span className="md:min-w-max">
                  Mercados principales:&nbsp;&nbsp;
                </span>
                <span className="font-normal lg:hidden">
                  América del Norte, América del Sur, Europa, Sudeste de Asia /
                  Medio Oriente, África, Este de Asia (Japón / Corea del Sur),
                  Australia, Nacional
                </span>
              </span>
              <p className="font-normal text-sm hidden lg:block">
                América del Norte, América del Sur, Europa, Sudeste de Asia /
                Medio Oriente, África, Este de Asia (Japón / Corea del Sur),
                Australia, Nacional
              </p>
            </span>
          </div>
        </BasicInformation>
      </BoxShadow>

      {/* Información cuantitativa (QUEMADA POR EL MOMENTO) */}
      <BoxShadow props={"p-4"}>
        <BasicInformation title={"Información cuantitativa"}>
          <div className="flex flex-col gap-y-5 lg:gap-y-2">
            <span className="flex">
              <span className="font-bold text-sm lg:flex">
                <span className="md:min-w-max">
                  Dirección de fábrica:&nbsp;&nbsp;
                </span>
                <span className="font-normal lg:hidden">
                  Parque Huagai Industrail, área de Anzhou, ciudad de Mianyang,
                  provincia de Sichuan, China
                </span>
              </span>
              <p className="font-normal text-sm hidden lg:block">
                Parque Huagai Industrail, área de Anzhou, ciudad de Mianyang,
                provincia de Sichuan, China
              </p>
            </span>
            <span className="flex">
              <span className="font-bold text-sm lg:flex">
                <span className="md:min-w-max">
                  Capacidad de I + D:&nbsp;&nbsp;
                </span>
                <span className="font-normal lg:hidden">
                  Propia marca, ODM, OEM
                </span>
              </span>
              <p className="font-normal text-sm hidden lg:block">
                Propia marca, ODM, OEM
              </p>
            </span>
            <span className="flex">
              <span className="font-bold text-sm lg:flex">
                <span className="md:min-w-max">
                  No. de personal de I + D:&nbsp;&nbsp;
                </span>
                <span className="font-normal lg:hidden">7</span>
              </span>
              <p className="font-normal text-sm hidden lg:block">7</p>
            </span>
            <span className="flex">
              <span className="font-bold text-sm lg:flex">
                <span className="md:min-w-max">
                  No. de líneas de producción:&nbsp;&nbsp;
                </span>
                <span className="font-normal lg:hidden">6</span>
              </span>
              <p className="font-normal text-sm hidden lg:block">6</p>
            </span>
            <span className="flex">
              <span className="font-bold text-sm lg:flex">
                <span className="md:min-w-max">
                  Valor de producción anual:&nbsp;&nbsp;
                </span>
                <span className="font-normal lg:hidden">
                  {" "}
                  US $ 10 millones - US $ 50 millones
                </span>
              </span>
              <p className="font-normal text-sm hidden lg:block">
                US $ 10 millones - US $ 50 millones
              </p>
            </span>
          </div>
        </BasicInformation>
      </BoxShadow>

      <BoxShadow props={"p-4"}>
        <div className="flex flex-col gap-y-5">
          <span className="font-bold text-base text-Principal">
            Certificación
          </span>
          {provider?.company && provider.company.certificates.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-3 lg:gap-x-3">
              {provider?.company.certificates.map(
                ({ id, certificate, title }) => (
                  <Picture key={id} picture={certificate} description={title} />
                )
              )}
            </div>
          ) : (
            <p className="font-normal text-sm block">
              Sin registros de centificaciones
            </p>
          )}
        </div>
      </BoxShadow>
      <BoxShadow props={"p-4"}>
        <div className="flex flex-col gap-y-5">
          <span className="font-bold text-base text-Principal">Fotos</span>
          {provider?.company && provider.company.photos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-3 lg:gap-x-3">
              {provider?.company.photos.map(({ id, photo }) => (
                <Picture key={id} picture={photo} />
              ))}
            </div>
          ) : (
            <p className="font-normal text-sm block">Sin registros de fotos</p>
          )}
        </div>
      </BoxShadow>
      <BoxShadow props={"p-4"}>
        <div className="flex flex-col gap-y-5">
          <span className="font-bold text-base text-Principal">Proyectos</span>
          {provider?.company && provider.company.projects.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-3 lg:gap-x-3">
              {provider?.company.projects.map(({ id, project, title }) => (
                <Picture key={id} description={title} picture={project} />
              ))}
            </div>
          ) : (
            <p className="font-normal text-sm block">
              Sin registros de proyectos
            </p>
          )}
        </div>
      </BoxShadow>
      <section className={"lg:hidden"}>
        <EvaluatedInformation
          percentage={visibleProvider?.certification_level}
          INFORMATION={INFORMATION}
        />
      </section>
    </div>
  );
};

export default ColumnLeftInformationProvider;
