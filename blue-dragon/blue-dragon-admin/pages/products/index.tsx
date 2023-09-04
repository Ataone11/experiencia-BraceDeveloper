import { TablaDinamica } from "@brace-developers/react-components";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import TitlePage from "../../components/TitlePage";
import { ProductoModel } from "../../interfaces";
import { getProductos } from "../../src/redux/actions/productosActions";
import BasePage from "../../src/screens/general/base/BasePage";
import PRODUCTS_STATUS from "../../src/utils/product_status";
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["products"])),
    },
  };
}
const { t } = useTranslation("products");
const Columns = [
  { key: "product", value: t("products:product") },
  { key: "provider", value: t("products:provider") },
  { key: "price", value: t("products:price") },
  { key: "status", value: t("products:status") },
];

const Productos: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductoModel[] | null>(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [filterSelected, setFilterSelected] = useState<number | null>(null);
  const [textInputSearch, setTextInputSearch] = useState<string | null>(null);
  const [order, setOrder] = useState<{
    order: string | null;
    criteria: string | null;
  }>({
    order: null,
    criteria: null,
  });

  async function functionRow(e: any) {
    router.push(`/products/${e.id}`);
  }

  const loadProducts = async (
    orderKey: string | null,
    criteria: string | null,
    textInputSearch: string | null
  ) => {
    setLoading(true);
    const res = await getProductos({
      page,
      order: orderKey,
      criteria,
      keyword: textInputSearch,
    });
    setProducts(res.data);
    setLastPage(res.lastPage);
    setLoading(false);
  };

  const changePage = async (newPage: number) => {
    const res = await getProductos({ page: newPage });
    setPage(newPage);
    setProducts(res);
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
    loadProducts(order.order, order.criteria, textInputSearch);
  }, [order, textInputSearch]);

  return (
    <Layout>
      <TitlePage title="Productos" />
      <BasePage title="Productos">
        <section className="bg-white rounded-lg w-full min-h-[calc(100vh-150px)] lg:min-h-[calc(100vh-202px)] p-5 max-w-7xl mx-auto">
          <TablaDinamica
            currentPage={page}
            lastPage={lastPage}
            columns={Columns}
            rows={products?.map((product: ProductoModel) => ({
              ...product,
              product: product.name,
              provider: `${product.provider.first_name} ${product.provider.last_name}`,
              price: `${
                product.product_details[0]?.product_incoterms[0].price
                  ? `$${product.product_details[0]?.product_incoterms[0].price} USD`
                  : ""
              }`,
              status: {
                value: PRODUCTS_STATUS[product.status],
                color: product.status !== 1 && "#FF7971",
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

export default Productos;
