import { INFORMATION, ProviderModel } from "../../interfaces";
import EvaluatedInformation from "./EvaluatedInformation";
import Picture from "./Picture";

const ColumnLeftInformationProvider = ({
  INFORMATION,
  provider,
}: {
  INFORMATION: INFORMATION[];
  provider: ProviderModel;
}) => {
  return (
    <div className="lg:w-[70%] flex flex-col gap-y-4 w-full">
      {/* INFORMACIÓN BASICA */}
      <section className={"rounded-lg bg-white p-4 shadow-md"}>
        <div className="flex flex-col gap-y-5">
          <span className="font-bold text-base text-primary">
            Información básica
          </span>
          {provider?.company ? (
            <div className="flex flex-col gap-y-5 lg:gap-y-2">
              <span className="flex">
                <span className="font-bold text-sm lg:flex">
                  <span className="md:min-w-max">Ubicación:&nbsp;&nbsp;</span>
                  <span className="font-normal lg:hidden">
                    {`${provider?.city?.name}, ${provider?.city?.country.name}`}
                  </span>
                </span>
                <p className="font-normal text-sm hidden lg:block">
                  {`${provider?.city?.name}, ${provider?.city?.country.name}`}
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
                  <span className="md:min-w-max">
                    Metodos de envio:&nbsp;&nbsp;
                  </span>
                  <span className="font-normal lg:hidden">
                    {provider.company.exw && (
                      <span>{provider.company.exw}</span>
                    )}
                    {provider.company.fob && (
                      <span>{provider.company.fob}</span>
                    )}
                    {!provider.company.exw && !provider.company.fob && (
                      <span>Sin metodo(s) de envio registrado(s)</span>
                    )}
                  </span>
                </span>
                <p className="font-normal text-sm hidden lg:block">
                  {provider.company.exw && <span>{provider.company.exw}</span>}
                  {provider.company.fob && <span>{provider.company.fob}</span>}
                  {!provider.company.exw && !provider.company.fob && (
                    <span>Sin metodo(s) de envio registrado(s)</span>
                  )}
                </p>
              </span>
              <span className="flex">
                <span className="font-bold text-sm lg:flex">
                  <span className="md:min-w-max">NIT:&nbsp;&nbsp;</span>
                  <span className="font-normal lg:hidden">234758903</span>
                </span>
                <p className="font-normal text-sm hidden lg:block">234758903</p>
              </span>
              <span className="flex">
                <span className="font-bold text-sm lg:flex">
                  <span className="md:min-w-max">
                    Sectores de interés:&nbsp;&nbsp;
                  </span>
                  <span className="font-normal lg:hidden">
                    {`${
                      provider?.company.interest_sectors ||
                      "Sin sectores de interes"
                    }`}
                  </span>
                </span>
                <p className="font-normal text-sm hidden lg:block">
                  {`${
                    provider?.company.interest_sectors ||
                    "Sin sectores de interes"
                  }`}
                </p>
              </span>
              <span className="flex">
                <span className="font-bold text-sm lg:flex">
                  <span className="md:min-w-max">URL:&nbsp;&nbsp;</span>
                  <span className="font-normal lg:hidden">
                    {`${provider?.company.website || "Sin pagina"}`}
                  </span>
                </span>
                <p className="font-normal text-sm hidden lg:block">
                  {`${provider?.company.website || "Sin pagina"}`}
                </p>
              </span>
            </div>
          ) : (
            <p className="font-normal text-sm hidden lg:block">
              Sin datos de la compañia
            </p>
          )}
        </div>
      </section>

      {/* CERTIFICACIÓN */}
      <section className={"rounded-lg bg-white p-4 shadow-md"}>
        <div className="flex flex-col gap-y-5">
          <span className="font-bold text-base text-primary">
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
      </section>

      {/* FOTOS */}
      <section className={"rounded-lg bg-white p-4 shadow-md"}>
        <div className="flex flex-col gap-y-5">
          <span className="font-bold text-base text-primary">Fotos</span>
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
      </section>

      {/* PROYECTOS */}
      <section className={"rounded-lg bg-white p-4 shadow-md"}>
        <div className="flex flex-col gap-y-5">
          <span className="font-bold text-base text-primary">Proyectos</span>
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
      </section>

      {/* PROYECTOS */}
      {/* Nota: Quitar el (>= 0) -> solo es (> 0)       ↓↓ */}
      {provider?.company && provider.company.faq.length >= 0 && (
        <section className={"rounded-lg bg-white p-4 shadow-md"}>
          <div className="flex flex-col gap-y-5">
            <span className="font-bold text-base text-primary">
              Preguntas frecuentes
            </span>

            {
              /* provider.company.faq */ [{}].map(() => (
                <div key={Math.random()} className="flex flex-col gap-y-1">
                  <span className="text-sm text-dark-blue font-bold">
                    Cómo recibir el producto
                  </span>
                  <span className="text-sm font-normal">
                    Verás el costo y formas de envío en cada publicación. Tienes
                    envío gratis en millones de productos seleccionados desde $
                    70.000, reconocerás este beneficio con el clásico camión
                    verde que aparece en las publicaciones. Acordar con el
                    vendedor Si la publicación no tiene Mercado Envíos, puedes
                    acordar la entrega directamente con el vendedor.
                  </span>
                </div>
              ))
            }
          </div>
        </section>
      )}

      <section className={"lg:hidden"}>
        <EvaluatedInformation
          percentage={provider?.certification_level}
          INFORMATION={INFORMATION}
        />
      </section>
    </div>
  );
};

export default ColumnLeftInformationProvider;
