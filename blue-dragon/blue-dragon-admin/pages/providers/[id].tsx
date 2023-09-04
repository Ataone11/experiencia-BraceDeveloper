import { GetStaticPaths, NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import BasePage from "../../src/screens/general/base/BasePage";
import BasicInformationProvider from "../../components/provider/BasicInformationProvider";
import ColumnLeftInformationProvider from "../../components/provider/ColumnLeftInformationProvider";
import ColumnRightInformationProvider from "../../components/provider/ColumnRightInformationProvider";
import CurrentRute from "../../components/provider/CurrentRute";
import GoBack from "../../components/GoBack";
import { ProveedorModel } from "../../interfaces";
import {
  changeStatusProvider,
  getProveedorId,
} from "../../src/redux/actions/proveedoresActions";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import ButtonPage from "../../components/ButtonPage";
import { PopUpContext } from "../../src/context/PopUpContext";
const { t } = useTranslation("providers");
const INFORMATION = [
  
  {
    title: t("providers:documentaries"),
    items: [
      { status: true, item: t("providers:documents-chamber-of-commerce") },
      { status: true, item: t("providers:RUT-documents") },
      { status: true, item: t("providers:financial-statements")  },
      { status: false, item: t("providers:liability-contracts") },
      { status: true, item: t("providers:ISO-certificates") },
      { status: true, item: t("providers:product-certificate")  },
      { status: false, item: t("providers:technical-sheets")  },
      { status: false, item: t("providers:commercial-references") },
      { status: true, item: t("providers:bank-certifications") },
    ],
  },
  {
    title: t("providers:quantitative"),
    items: [
      { status: true, item: t("providers:square-meter") },
      { status: true, item: t("providers:number-of-direct-employees") },
      { status: true, item: t("providers:years-of-existence")},
      { status: false, item: t("providers:delivery-time") },
      { status: true, item:  t("providers:geographic-location") },
      { status: true, item: t("providers:way-to-pay") },
      { status: false, item: t("providers:market-prices") },
      { status: false, item: t("providers:annual-sales") },
      { status: true, item: t("providers:MOQ") },
      { status: true, item: t("providers:maker")  },
    ],
  },
  {
    title: t("providers:qualitative") ,
    items: [
      { status: true, item:  t("providers:quality-department") },
      { status: true, item: t("providers:languages-(Speaking Employees)") },
      { status: true, item: t("providers:new-technologies")  },
      { status: false, item: t("providers:infrastructure Modernity") },
      { status: true, item: t("providers:test-laboratory")  },
      { status: true, item: t("providers:samples-(Shipping)") },
      { status: false, item: t("providers:product-warranty") },
      { status: false, item: t("providers:own-brands")  },
      { status: true, item: t("providers:participation-in-fairs") },
      { status: true, item: t("providers:participation-in-fairs")  },
    ],
  },
];

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["providers"])),
    },
  };
}

const Proveedor: NextPage = () => {
  const setPopUp = useContext(PopUpContext);
  const { t } = useTranslation("providers");
  const router = useRouter();
  const { query } = router;

  const [button, setButton] = useState<string>("");
  const [visibleProvider, setVisibleProvider] = useState<ProveedorModel | null>(
    null
  );

  const loadProvider = async () => {
    const res = await getProveedorId(query.id as string);
    setVisibleProvider(res);
  };

  const changeStatusP = async (status: number) => {
    const res = await changeStatusProvider(query.id as string, status);
    setVisibleProvider && setVisibleProvider(res);
    setPopUp && setPopUp(null);
  };

  const functionButton = (btn: string) => {
    setButton(btn === button ? "" : btn);
    /* setPopUp && setPopUp(popUp); */
  };

  const popUp = {
    title:
      button === "Aprobar"
        ? "Habilitar proveedor"
        : button === "Rechazar"
        ? "Rechazar proveedor"
        : "Inhabilitar proveedor",
    buttonAction:
      button === "Aprobar"
        ? "Aprobar"
        : button === "Rechazar"
        ? "Rechazar"
        : "Inhabilitar",
    action: () =>
      changeStatusP(button === "Aprobar" ? 2 : button === "Rechazar" ? 3 : 5),
    setPopUp: true,
    children:
      button === "Aprobar" ? (
        <p className="text-base">
          {t("providers:pop-up-disable-approved.are-you-sure-you-want-to-disable")} a&nbsp;
          {visibleProvider?.company ? (
            <span className="font-bold">{`${visibleProvider.company.name}`}</span>
          ) : (
            <span>{t("providers:pop-up-disable-approved.rest-of-the-message")}</span>
          )}
          &nbsp;{t("providers:to-post-content-on-Blue-Dragon-Bridge")}
        </p>
      ) : (
        (button === "Rechazar" || button === "Inhabilitar") && (
          <p className="text-base">
            {t("providers:are-you-rigth")}{" "}
            {button === "Rechazar" ? "rechazar" : "Inhabilitar"} a&nbsp;
            {visibleProvider?.company ? (
              <span className="font-bold">{`${visibleProvider.company.name}`}</span>
            ) : (
              <span>{t("providers:pop-up-disable-approved.rest-of-the-message")}</span>
            )}
            &nbsp;{t("providers:to-post-content-on-Blue-Dragon-Bridge")}
          </p>
        )
      ),
  };

  useEffect(() => {
    if (button !== "") setPopUp && setPopUp(popUp);
  }, [button]);

  useEffect(() => {
    if (query.id && !visibleProvider) {
      loadProvider();
    }
  }, [query, visibleProvider]);

  return (
    <Layout>
      <BasePage title={`${t("providers:provider")}`}>
        <GoBack
          route="/providers/approved"
          status={
            visibleProvider?.status === 2 || visibleProvider?.status === 4
          }
          label={`${t(
            "providers:detail-approved-providers.back-to-the-list-of-providers"
          )}`}
          optionalLabel={`${t(
            "providers:detail-approved-providers.pending-approved"
          )}`}
        />
        <section className="lg:bg-white flex flex-col rounded-lg w-full min-h-[calc(100vh-150px)] lg:min-h-[calc(100vh-202px)] lg:p-5 gap-y-4 max-w-7xl mx-auto">
          {(visibleProvider?.status === 1 ||
            visibleProvider?.status === 3 ||
            visibleProvider?.status === 5) && (
            <CurrentRute
              rute={`${t("providers:approved-providers")}`}
              nameRute={
                visibleProvider?.company
                  ? visibleProvider.company.name
                  : `${t("providers:detail-approved-providers.no-company")}`
              }
              /* visibleProvider={visibleProvider}
              setVisibleProvider={setVisibleProvider} */
            >
              <>
                <ButtonPage action={() => functionButton("Aprobar")}>
                  <span className="px-9 lg:px-5">{t("providers:buttons-providers.Approve")}</span>
                </ButtonPage>
                <ButtonPage
                  action={() =>
                    functionButton(
                      visibleProvider?.status !== 3 ? t("providers:buttons-providers.decline") : t("providers:pop-up-disable-approved.button") 
                    )
                  }
                >
                  <span className="px-9 lg:px-5">
                    {visibleProvider?.status !== 3 ? t("providers:buttons-providers.decline") : t("providers:pop-up-disable-approved.button")}
                  </span>
                </ButtonPage>
              </>
            </CurrentRute>
          )}

          {visibleProvider && (
            <BasicInformationProvider provider={visibleProvider} />
          )}

          <div className="flex gap-x-4">
            <ColumnLeftInformationProvider
              state={
                visibleProvider?.status === 2 || visibleProvider?.status === 4
              }
              INFORMATION={INFORMATION}
              provider={visibleProvider && visibleProvider}
              visibleProvider={visibleProvider as ProveedorModel}
              setVisibleProvider={setVisibleProvider}
            />
            <ColumnRightInformationProvider
              state={
                visibleProvider?.status === 2 || visibleProvider?.status === 4
              }
              INFORMATION={INFORMATION}
              visibleProvider={visibleProvider as ProveedorModel}
              setVisibleProvider={setVisibleProvider}
            />
          </div>
        </section>
      </BasePage>
    </Layout>
  );
};

export default Proveedor;
