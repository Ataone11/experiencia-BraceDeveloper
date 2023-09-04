import { TablaDinamica } from "@brace-developers/react-components";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import TitlePage from "../../components/TitlePage";
import { ProveedorModel } from "../../interfaces";
import { getProveedores } from "../../src/redux/actions/proveedoresActions";
import BasePage from "../../src/screens/general/base/BasePage";
import { PROVIDER_STATES } from "../../src/utils/constants";
import STATES from "../../src/utils/roles";

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["providers"])),
    },
  };
}

const Proveedores: NextPage = () => {
  const { t } = useTranslation("providers");
  const router = useRouter();
  const [visibleProviders, setVisibleProviders] = useState<
    ProveedorModel[] | null
  >(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [filterSelected, setFilterSelected] = useState<number | null>(null);
  const [textInputSearch, setTextInputSearch] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<{
    order: string | null;
    criteria: string | null;
  }>({
    order: null,
    criteria: null,
  });

  const Columns = [
    {
      key: "companies.name",
      value: `${t("providers:table-providers.headers.company")}`,
    },
    {
      key: "first_name",
      value: `${t("providers:table-providers.headers.name")}`,
    },
    {
      key: "email",
      value: `${t("providers:table-providers.headers.email")}`,
    },
    {
      key: "status",
      value: `${t("providers:table-providers.headers.state")}`,
    },
  ];

  async function functionRow(e: any) {
    router.push(`/providers/${e.id}`);
  }

  const loadProviders = async (
    orderKey: string | null,
    criteria: string | null,
    textInputSearch: string | null,
    filterSelected: number | null
  ) => {
    setLoading(true);
    const res = await getProveedores({
      page,
      order: orderKey,
      criteria,
      keyword: textInputSearch,
      status: filterSelected ? [filterSelected] : [PROVIDER_STATES.ACTIVO, PROVIDER_STATES.APROBADO, PROVIDER_STATES.INHABILITADO],
    });
    setVisibleProviders(res.data);
    setLastPage(res.lastPage);
    setLoading(false);
  };

  const changePage = async (newPage: number) => {
    setPage(newPage);
  };

  function orderBy(criteria: string, order: string | null) {
    setOrder({
      criteria,
      order,
    });
    setPage(1);
  }

  async function searchText(e: any) {
    setTextInputSearch(e);
    setPage(1);
  }

  async function filter(e: any) {
    setPage(1);
    setFilterSelected(e);
  }

  useEffect(() => {
    loadProviders(order.order, order.criteria, textInputSearch, filterSelected);
  }, [order, textInputSearch, filterSelected, page]);

  return (
    <Layout>
      <BasePage title={`${t("providers:approved-providers")}`}>
        <TitlePage title={`${t("providers:approved-providers")}`} />
        <section className="bg-white rounded-lg w-full p-5 max-w-7xl mx-auto">
          <TablaDinamica
            currentPage={page}
            lastPage={lastPage}
            columns={Columns}
            rows={visibleProviders?.map((provider: ProveedorModel) => ({
              ...provider,
              first_name: `${provider.first_name} ${provider.last_name}`,
              "companies.name": provider.company?.name || "Sin nombre",
              status: `${STATES[provider.status] === "Aprobado"
                  ? t("providers:status.approved")
                  : STATES[provider.status] === "Activo"
                    ? t("providers:status.active")
                    : t("providers:status.pending")
                }`,
            }))}
            functionRow={functionRow}
            changePage={changePage}
            searchText={searchText}
            orderByFunction={orderBy}
            order={order}
            filterFunction={filter}
            filterSelected={filterSelected?.toString()}
            loading={loading}
            filters={[
              {
                name: t("providers:buttons-providers.approved"),
                value: PROVIDER_STATES.APROBADO.toString(),
              },
              {
                name: t("providers:buttons-providers.active"),
                value: PROVIDER_STATES.ACTIVO.toString(),
              },
              {
                name: t("providers:buttons-providers.disable"),
                value: PROVIDER_STATES.INHABILITADO.toString(),
              },
            ]}
          />
        </section>
      </BasePage>
    </Layout>
  );
};

export default Proveedores;
