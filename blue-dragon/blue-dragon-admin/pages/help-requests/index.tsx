import { TablaDinamica } from "@brace-developers/react-components";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import TitlePage from "../../components/TitlePage";
import { HelpModel } from "../../interfaces";
import { getRequestHelps } from "../../src/redux/actions/helpActions";
import BasePage from "../../src/screens/general/base/BasePage";
import colores from "../../src/utils/colores";
import { FormatDate } from "../../src/utils/functions";
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["help-request"])),
    },
  };
}

const SolicitudesAyuda: NextPage = () => {
  const { t } = useTranslation("help-request");
  const router = useRouter();
  const [helps, setHelps] = useState<HelpModel[] | null>(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [filterSelected, setFilterSelected] = useState<string>("provider");
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
      key: "id",
      value:  t("help-request:application-no"),
    },
    {
      key: "name",
      value: t("help-request:name"),
    },
    {
      key: "date",
      value: t("help-request:date"),
    },
    {
      key: "solved",
      value: t("help-request:status"),
    },
    {
      key: "category",
      value: t("help-request:category"),
    },
    {
      key: "message",
      value: t("help-request:Reason"),
    },
  ];

  async function functionRow(e: any) {
    if (filterSelected === "provider") {
      router.push(`/help-requests/provider/${e.id}`);
    } else if (filterSelected === "importer") {
      router.push(`/help-requests/importer/${e.id}`);
    }
  }

  const loadRequestHelps = async (
    orderKey: string | null,
    criteria: string | null,
    textInputSearch: string | null,
    filterSelected: string
  ) => {
    setLoading(true);
    const res = await getRequestHelps({
      typeRequest: filterSelected,
      page,
      order: orderKey,
      criteria,
      keyword: textInputSearch,
    });
    setHelps(res.data);
    setLastPage(res.lastPage);
    setLoading(false);
  };

  const changePage = async (newPage: number) => {
    const res = await getRequestHelps({
      typeRequest: filterSelected,
      page: newPage,
    });
    setPage(newPage);
    setHelps(res.data);
  };

  function orderBy(criteria: string, order: string | null) {
    setOrder({
      criteria,
      order,
    });
  }

  async function searchText(e: any) {
    setTextInputSearch(e);
  }

  async function filter(e: any) {
    setFilterSelected(e);
  }

  useEffect(() => {
    loadRequestHelps(
      order.order,
      order.criteria,
      textInputSearch,
      filterSelected
    );
  }, [order.order, order.criteria, textInputSearch, filterSelected]);

  return (
    <Layout>
      <BasePage title={t("help-request:help-requests")}>
        <TitlePage title={t("help-request:help-requests")} />
        <section className="bg-white rounded-lg w-full min-h-[calc(100vh-150px)] lg:min-h-[calc(100vh-202px)] p-5 max-w-7xl mx-auto">
          <TablaDinamica
            currentPage={page}
            lastPage={lastPage}
            columns={Columns}
            rows={helps?.map((help: HelpModel) => ({
              ...help,
              name:
                filterSelected === "provider"
                  ? `${help.provider?.first_name || "-------"} ${
                      help.provider?.last_name || "-------"
                    }`
                  : `${help.importer?.first_name || "-------"} ${
                      help.importer?.last_name || "-------"
                    }`,
              date: FormatDate(help.date),
              solved: {
                value: `${help.solved ? t("help-request:fixed") : t("help-request:no-fixed")}`,
                color: !help.solved && colores.alert,
              },
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
                name: t("help-request:providers"),
                value: "provider",
              },
              {
                name: t("help-request:importers"),
                value: "importer",
              },
            ]}
          />
        </section>
      </BasePage>
    </Layout>
  );
};

export default SolicitudesAyuda;
