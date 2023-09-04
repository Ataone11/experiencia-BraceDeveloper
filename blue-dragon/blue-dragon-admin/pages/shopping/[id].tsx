import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Flecha from "../../assets/Flecha";
import GoBack from "../../components/GoBack";
import Layout from "../../components/Layout";
import SectionLeft from "../../components/order/SectionLeft";
import SectionRight from "../../components/order/SectionRight";
import { OrderModel } from "../../interfaces";
import { getOrderById } from "../../src/redux/actions/shoppingActions";
import BasePage from "../../src/screens/general/base/BasePage";
import colores from "../../src/utils/colores";
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["order"])),
    },
  };
}
export const Order: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { query } = router;

  const [visibleOrder, setVisibleOrder] = useState<OrderModel | null>(null);
  const [loading, setLoading] = useState(false);

  const loadOrder = async () => {
    setLoading(true);
    const res = await getOrderById(query.id as string);
    setVisibleOrder(res.data);
    setLoading(false);
  };

  useEffect(() => {
    if (query.id && !visibleOrder) {
      loadOrder();
    }
  }, [query, visibleOrder]);

  return (
    <Layout>
      <BasePage title={`Pedido ${visibleOrder?.id || ""}`}>
        <div className="flex flex-col-reverse md:flex-row ">
          <div className="w-full md:bg-Claro flex flex-col items-center">
            <span className="w-[85%] max-w-7xl md:w-[90%]">
              <GoBack
                route="/shopping/orders"
                label="Volver a listado de pedidos"
              />
            </span>
            <div className="flex flex-col gap-y-2 bg-white w-full max-w-7xl md:w-[90%] md:rounded-[1rem] p-5">
              {/* Ruta actual y botones */}
              <div className="flex items-center gap-x-3">
                <span className="text-TextOpacity font-normal text-sm">
                  {t("order:orders")}
                </span>
                <span className="-rotate-90">
                  <Flecha color={colores["TextOpacity"]} />
                </span>
                <span className="text-TextOpacity font-normal text-sm">
                {t("order:order")} {visibleOrder?.id}
                </span>
              </div>

              {loading ? (
                <span className="font-bold text-base text-Principal mx-auto my-10">
                  {t("order:charging")}
                </span>
              ) : (
                <div className="flex gap-x-4">
                  <SectionLeft visibleOrder={visibleOrder} />

                  <div className="hidden lg:flex lg:w-[30%] flex-col mt-[34px] lg:mt-0">
                    <SectionRight visibleOrder={visibleOrder} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </BasePage>
    </Layout>
  );
};

export default Order;
