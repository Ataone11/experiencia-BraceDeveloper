import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TablaDinamica } from "@brace-developers/react-components";
import { ImportadorModel } from "../../interfaces";
import { getImportadores } from "../../src/redux/actions/importadoresActions";
import BasePage from "../../src/screens/general/base/BasePage";
import STATES from "../../src/utils/roles";
import Layout from "../../components/Layout";
import TitlePage from "../../components/TitlePage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["importers"])),
    },
  };
}
const { t } = useTranslation("importers");
const Columns = [
  { key: "first_name", value: t("importers:name") },
  { key: "email", value: t("importers:email")  },
  { key: "importerCompany.company_name", value: t("importers:business") },
  { key: "phone", value: t("importers:telephone") },
  { key: "status", value:  t("importers:status") },
];

const Importadores: NextPage = () => {
  const router = useRouter();
  const [visibleImporters, setVisibleImporters] = useState<
    ImportadorModel[] | null
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

  async function functionRow(e: any) {
    router.push(`/importers/${e.id}`);
  }

  const loadImporters = async (
    orderKey: string | null,
    criteria: string | null,
    textInputSearch: string | null
  ) => {
    setLoading(true);
    const res = await getImportadores({
      page,
      order: orderKey,
      criteria,
      keyword: textInputSearch,
    });
    setVisibleImporters(res.data);
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
    setFilterSelected(e);
    setPage(1);
  }

  useEffect(() => {
    loadImporters(order.order, order.criteria, textInputSearch);
  }, [router, order.order, order.criteria, textInputSearch, page]);

  return (
    <Layout>
      <BasePage title="Importadores">
        <TitlePage title="Importadores" />
        <section className="bg-white rounded-lg w-full min-h-[calc(100vh-150px)] lg:min-h-[calc(100vh-202px)] p-5 max-w-7xl mx-auto">
          <TablaDinamica
            currentPage={page}
            lastPage={lastPage}
            columns={Columns}
            rows={visibleImporters?.map((importer: ImportadorModel) => ({
              ...importer,
              first_name: `${importer.first_name} ${importer.last_name}`,
              "importerCompany.company_name": importer.importerCompany?.company_name || "Sin nombre",
              status: {
                value: STATES[importer.status],
                color: importer.status === 1 && "#FF7971",
              },
            }))}
            functionRow={(e) => functionRow(e)}
            changePage={changePage}
            searchText={searchText}
            orderByFunction={orderBy}
            order={order}
            filterFunction={filter}
            filterSelected={filterSelected?.toString()}
            loading={loading}
          />
        </section>
      </BasePage>
    </Layout>
  );
};

export default Importadores;
