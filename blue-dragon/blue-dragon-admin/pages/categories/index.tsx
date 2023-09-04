import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { CategoriaModel } from "../../interfaces";
import { PopUpContext } from "../../src/context/PopUpContext";
import { getCategorias } from "../../src/redux/actions/categoriasActions";
import Lupa from "../../assets/Lupa";
import Plus from "../../assets/Plus";
import BoxShadow from "../../components/BoxShadow";
import ButtonPage from "../../components/ButtonPage";
import ModalCategory from "../../components/category/Modal";
import Layout from "../../components/Layout";
import BasePage from "../../src/screens/general/base/BasePage";
import ItemCategory from "../../components/category/ItemCategory";
import TitlePage from "../../components/TitlePage";
import Order from "../../assets/Order";
import { ORDERS } from "../../src/utils/constants";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["categories"])),
    },
  };
}

const User: NextPage = () => {
  const { t } = useTranslation("categories");
  const setPopUp = useContext(PopUpContext);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<ORDERS>(ORDERS.ASC);
  const [visibleCategories, setVisibleCategories] = useState<
    CategoriaModel[] | any
  >(null);
  const [categoryOptionsOpenId, setCategoryOptionsOpenId] = useState<any>(null);
  const [textSearch, setTextSearch] = useState<string | any>(null);

  function compare(a: CategoriaModel, b: CategoriaModel) {
    if (a.name.text < b.name.text) {
      return order === ORDERS.ASC ? -1 : 1;
    }
    if (a.name.text > b.name.text) {
      return order === ORDERS.ASC ? 1 : -1;
    }
    return 0;
  }

  const loadCategories = async () => {
    setLoading(true);
    const res = await getCategorias();
    setVisibleCategories(res.sort(compare));
    setLoading(false);
  };

  let popUp = {
    setPopUp: true,
    children: (
      <ModalCategory loadCategories={loadCategories} setPopUp={setPopUp} />
    ),
  };

  useEffect(() => {
    if (!visibleCategories) loadCategories();
  }, [visibleCategories]);

  useEffect(() => {
    if (visibleCategories) {
      setVisibleCategories([...visibleCategories].sort(compare));
    }
  }, [order]);

  const changeOrder = () => {
    if (order === ORDERS.DESC) setOrder(ORDERS.ASC);
    else setOrder(ORDERS.DESC);
  };

  return (
    <Layout>
      <BasePage title="Categorías">
        <TitlePage title={"Categorías"} />
        <section className="bg-white rounded-lg w-full min-h-[calc(100vh-150px)] lg:min-h-[calc(100vh-202px)] p-5 max-w-7xl mx-auto">
          {/* ACTIONS */}
          <div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row md:justify-between">
            <ButtonPage action={() => setPopUp && setPopUp(popUp)}>
              <span className="flex items-center gap-x-3 px-3 justify-center">
                <Plus />
                {t("categories:add-category")}
              </span>
            </ButtonPage>
            <div className="flex flex-col gap-x-3 gap-y-2 md:gap-y-0 md:flex-row">
              <div className="flex items-center bg-gray-100 rounded-md sm:w-full md:w-[300px] h-[36px] overflow-hidden">
                <span className="p-2 ml-2">
                  <Lupa />
                </span>
                <input
                  id="textToSearch"
                  type="text"
                  name="search"
                  autoComplete="off"
                  className="h-full w-[85%] px-2 focus:outline-none bg-gray-100 text-sm font-semibold"
                  placeholder={t("categories:search-categori")}
                  onChange={(e) => setTextSearch(e.target.value)}
                />
              </div>
              <button
                onClick={changeOrder}
                className="flex items-center gap-x-2 bg-Claro px-4 py-2 rounded-lg justify-center"
              >
                <span className="text-Principal text-sm font-semibold">
                {t("categories:organize")}
                </span>
                <Order />
              </button>
            </div>
          </div>

          {/* BODY */}
          <BoxShadow
            props={
              "mt-5 min-h-[calc(100vh-290px)] md:min-h-[calc(100vh-246px)] lg:min-h-[calc(100vh-298px)] overflow-hidden"
            }
          >
            {loading ? (
              <p className="py-5 w-fit mx-auto font-bold text-lg text-Principal">
                {t("categories:charging")}
              </p>
            ) : (
              <div className="flex flex-col text-sm">
                {/* CATEGORIES */}
                {!visibleCategories ? (
                  <section className="px-4 py-5">
                    <h1 className="font-bold text-xl text-Oscuro">
                    {t("categories:no-categories")}
                    </h1>
                    <p className="font-normal text-sm mt-6">
                    {t("categories:it-does-not-have-any-categories-yet,-to-edit-them-click-on-Add-categories")}
                    </p>
                  </section>
                ) : (
                  visibleCategories
                    ?.filter((c: any) =>
                      textSearch
                        ? c.name.text
                            ?.toUpperCase()
                            .includes(textSearch.toUpperCase())
                        : true
                    )
                    .map((category: CategoriaModel) => {
                      return (
                        <ItemCategory
                          textSearch={textSearch}
                          key={category.id}
                          loadCategories={loadCategories}
                          category={category}
                          categories={visibleCategories}
                          setVisibleCategories={setVisibleCategories}
                          setLoading={setLoading}
                          depth={0}
                          categoryOptionsOpenId={categoryOptionsOpenId}
                          setCategoryOptionsOpenId={setCategoryOptionsOpenId}
                          compare={compare}
                        />
                      );
                    })
                )}
              </div>
            )}
          </BoxShadow>
        </section>
      </BasePage>
    </Layout>
  );
};

export default User;
