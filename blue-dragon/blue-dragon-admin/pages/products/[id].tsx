import { NextPage } from "next";
import { useEffect, useState } from "react";
import BasePage from "../../src/screens/general/base/BasePage";
import GoBack from "../../components/GoBack";
import { ProductoModel } from "../../interfaces";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { getProductId } from "../../src/redux/actions/productosActions";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["products"])),
    },
  };
}

const Producto: NextPage = () => {
  const { t } = useTranslation("products");
  const router = useRouter();
  const { query } = router;

  const [visibleProduct, setVisibleProduct] = useState<ProductoModel | null>(
    null
  );

  const loadProduct = async () => {
    const res = await getProductId(query.id as string);
    setVisibleProduct(res.data);
  };

  useEffect(() => {
    if (query.id && !visibleProduct) {
      loadProduct();
    }
  }, [query, visibleProduct]);
  console.log(visibleProduct);

  return (
    <Layout>
      <BasePage title="Producto">
        <GoBack route="/products" label={"Volver a listado de productos"} />
        <section className="lg:bg-white flex flex-col rounded-lg w-full min-h-[calc(100vh-150px)] lg:min-h-[calc(100vh-202px)] lg:p-5 gap-y-4 max-w-7xl mx-auto">
          {visibleProduct && <span>{t("products:hello")}</span>}
        </section>
      </BasePage>
    </Layout>
  );
};

export default Producto;
