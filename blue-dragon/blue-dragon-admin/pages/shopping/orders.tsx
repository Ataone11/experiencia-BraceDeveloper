import { TablaDinamica } from "@brace-developers/react-components";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import TitlePage from "../../components/TitlePage";
import { OrderModel } from "../../interfaces";
import { getOrders } from "../../src/redux/actions/shoppingActions";
import BasePage from "../../src/screens/general/base/BasePage";
import colores from "../../src/utils/colores";
import {
  FOB_ORDER_STATES,
  ORDER_STATES,
  STATES_ORDER,
} from "../../src/utils/constants";
import { FormatDate } from "../../src/utils/functions";
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["order"])),
    },
  };
}
const Orders: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState(null);
  const [textInputSearch, setTextInputSearch] = useState<string | null>(null);
  const [order, setOrder] = useState<{
    order: string | null;
    criteria: string | null;
  }>({
    order: null,
    criteria: null,
  });
  const [filterSelected, setFilterSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [visibleOrders, setVisibleOrders] = useState<OrderModel[] | null>(null);

  const Columns = [
    {
      key: "id",
      value: `order:order`,
    },
    {
      key: "client",
      value: `order:client`,
    },
    {
      key: "provider",
      value: `order:provider`,
    },
    {
      key: "total_price",
      value: `order:price`,
    },
    {
      key: "status",
      value: `order:status`,
    },
    {
      key: "created_date",
      value: `order:date`,
    },
  ];

  const loadProviders = async (
    orderKey: string | null,
    criteria: string | null,
    textInputSearch: string | null,
    filterSelected: number | null
  ) => {
    setLoading(true);
    const res = await getOrders({
      page,
      order: orderKey,
      criteria,
      keyword: textInputSearch,
      status: filterSelected,
    });
    setVisibleOrders(res.data);
    setLastPage(res.lastPage);
    setLoading(false);
  };

  async function functionRow(e: any) {
    router.push(`/shopping/${e.id}`);
  }

  const changePage = async (newPage: number) => {
    setLoading(true);
    const res = await getOrders({ page: newPage });
    setPage(newPage);
    setVisibleOrders(res.data);
    setLoading(false);
  };

  async function searchText(e: any) {
    setTextInputSearch(e);
  }

  function orderBy(criteria: string, order: string | null) {
    setOrder({
      criteria,
      order,
    });
  }

  async function filter(e: any) {
    setFilterSelected(e);
  }

  useEffect(() => {
    loadProviders(order.order, order.criteria, textInputSearch, filterSelected);
  }, [order, textInputSearch, filterSelected]);

  return (
    <Layout>
      <BasePage title="Pedidos">
        <TitlePage title="Pedidos" />
        <section className="bg-white rounded-lg w-full min-h-[calc(100vh-150px)] lg:min-h-[calc(100vh-202px)] p-5 max-w-7xl mx-auto">
          <TablaDinamica
            currentPage={page}
            lastPage={lastPage}
            columns={Columns}
            rows={visibleOrders?.map((order: OrderModel) => ({
              ...order,
              client: `${order.importer.first_name} ${order.importer.last_name}`,
              provider: `${order.provider.first_name} ${order.provider.last_name}`,
              total_price: order.total_price
                ? `$${order.total_price} USD`
                : t("order:priceless"),
              status: {
                value: STATES_ORDER[order.status.id],
                color:
                  ORDER_STATES[order.product.incoterm.id].FINALIZADO ===
                  order.status.id
                    ? colores["success"]
                    : order.status.id ===
                      ORDER_STATES[order.product.incoterm.id].RECHAZADO
                    ? colores["alert"]
                    : colores.Principal,
              },
              created_date: FormatDate(order.created_date),
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
                name: t("order:waiting-confirmation"),
                value: FOB_ORDER_STATES.ESPERANDO_CONFIRMACION.toString(),
              },
              {
                name: t("order:waiting-for payment"),
                value: FOB_ORDER_STATES.ESPERANDO_PAGO.toString(),
              },
              {
                name: t("order:waiting-shipping"),
                value: FOB_ORDER_STATES.ESPERANDO_ENVIO.toString(),
              },
              {
                name: t("order:send"),
                value: FOB_ORDER_STATES.ENVIADO.toString(),
              },
              {
                name: t("order:finalized"),
                value: FOB_ORDER_STATES.FINALIZADO.toString(),
              },
            ]}
          />
        </section>
      </BasePage>
    </Layout>
  );
};

export default Orders;
