import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { HelpModel } from "../../interfaces";
import { PopUpContext } from "../../src/context/PopUpContext";
import {
  getRequestHelpById,
  postHelpAnswer,
} from "../../src/redux/actions/helpActions";
import BasePage from "../../src/screens/general/base/BasePage";
import { FormatDate } from "../../src/utils/functions";
import BoxShadow from "../BoxShadow";
import ButtonPage from "../ButtonPage";
import GoBack from "../GoBack";
import InformationImporterHelp from "../importer/InformationImporterHelp";
import Layout from "../Layout";
import CurrentRute from "../provider/CurrentRute";
import InformationProviderHelp from "../provider/InformationProviderHelp";

const HelpScreen = () => {
  const setPopUp = useContext(PopUpContext);
  const router = useRouter();
  const { query } = router;

  const [loading, setLoading] = useState(false);
  const [visibleHelp, setVisibleHelp] = useState<HelpModel | null>(null);
  const [typeHelp, setTypeHelp] = useState<string | null>(null);

  const loadRequestHelp = async () => {
    setLoading(true);
    const res = await getRequestHelpById({
      typeRequest: router.pathname.split("/")[2],
      idRequest: query.id as string,
    });
    setVisibleHelp(res.data);
    setLoading(false);
  };

  const sendHelpAnswer = async () => {
    setLoading(true);
    if (typeHelp !== null) {
      const res = await postHelpAnswer({
        typeRequest: router.pathname.split("/")[2],
        id: query.id as string,
      });
      loadRequestHelp();
    }
    setLoading(false);
    setPopUp && setPopUp(null);
  };

  const popUp = {
    title: "Marcar como solucionada",
    buttonAction: "Aceptar",
    action: () => sendHelpAnswer(),
    setPopUp: true,
    children: null,
    // <p className="text-[13px] font-normal">
    //   Escriba una respuesta a la solicitud de ayuda:
    // </p>
  };

  useEffect(() => {
    setPopUp && setPopUp(false);
    setTypeHelp(router.pathname.split("/")[2]);
    if (query.id && !visibleHelp) {
      loadRequestHelp();
    }
  }, [query, query.id, visibleHelp]);

  return (
    <Layout>
      <BasePage title={"Ayuda"}>
        <GoBack
          route="/help-requests"
          label={`Volver al listado de solicitudes de ayuda`}
        />
        <section className="lg:bg-white flex flex-col rounded-lg w-full min-h-[calc(100vh-150px)] lg:min-h-[calc(100vh-202px)] lg:p-5 gap-y-4 max-w-7xl mx-auto">
          {!loading ? (
            <>
              <CurrentRute
                rute={`Solicitudes`}
                nameRute={`Solicitud ${visibleHelp?.id}`}
              >
                {!visibleHelp?.solved ? (
                  <ButtonPage action={() => setPopUp && setPopUp(popUp)}>
                    <span className="px-9 lg:px-5">
                      Marcar como solucionada
                    </span>
                  </ButtonPage>
                ) : (
                  <div className="h-9 w-0 overflow-hidden" />
                )}
              </CurrentRute>

              <div className="flex gap-x-4">
                {/* LEFT */}
                <div className="lg:w-[70%] flex flex-col gap-y-4 w-full">
                  <BoxShadow props={"p-4"}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-4">
                        <span className="font-bold text-base text-Principal">
                          Número de la solicitud:{" "}
                          <span className="text-black">{`${visibleHelp?.id}`}</span>
                        </span>
                        <span
                          className={`${!visibleHelp?.solved
                              ? "bg-alert text-white font-normal"
                              : "bg-success font-bold text-Principal"
                            } text-[11px] px-2 py-[2px] rounded-[4px]`}
                        >
                          {`${!visibleHelp?.solved
                              ? "No solucionada"
                              : "Solucionada"
                            }`}
                        </span>
                      </div>
                      {visibleHelp?.date && (
                        <span className="font-bold text-base">
                          {FormatDate(visibleHelp?.date)}
                        </span>
                      )}
                    </div>
                  </BoxShadow>
                  <BoxShadow props={"p-4"}>
                    <div className="flex flex-col gap-y-2">
                      <span className="font-bold text-base text-Principal">
                        Detalle de la solicitud
                      </span>
                      {visibleHelp?.order && (
                        <span className="font-bold text-sm flex items-center gap-x-2">
                          Pedido:{" "}
                          <span className="font-normal text-[13px]">
                            {visibleHelp?.order.id}
                          </span>{" "}
                          <Link href="">
                            <a className="font-semibold text-sm text-Principal underline">
                              Ver pedido
                            </a>
                          </Link>
                        </span>
                      )}
                      <span className="font-bold text-sm flex items-center gap-x-2">
                        Categoría:{" "}
                        <span className="font-normal text-[13px]">
                          {visibleHelp?.category}
                        </span>
                      </span>
                      <span className="font-bold text-sm">Mensaje:</span>
                      <p className="font-normal text-[13px] leading-[18px]">
                        {visibleHelp?.message}
                      </p>
                    </div>
                  </BoxShadow>
                </div>

                {/* RIGHT */}
                {typeHelp === "provider" && visibleHelp ? (
                  <div className="hidden lg:flex lg:w-[30%] flex-col gap-y-4">
                    <InformationProviderHelp
                      provider={visibleHelp.provider}
                      applicant={true}
                    />
                    {visibleHelp.order && (
                      <InformationImporterHelp
                        importer={visibleHelp.order.importer}
                        applicant={false}
                      />
                    )}
                  </div>
                ) : (
                  typeHelp === "importer" &&
                  visibleHelp && (
                    <div className="hidden lg:flex lg:w-[30%] flex-col gap-y-4">
                      <InformationImporterHelp
                        importer={visibleHelp.importer}
                        applicant={true}
                      />
                      {visibleHelp.order && (
                        <InformationProviderHelp
                          provider={visibleHelp.order.provider}
                          applicant={false}
                        />
                      )}
                    </div>
                  )
                )}
              </div>
            </>
          ) : (
            <span>Cargando...</span>
          )}
        </section>
      </BasePage>
    </Layout>
  );
};

export default HelpScreen;
