import { NextPage } from "next";
import { useEffect, useState } from "react";
import BasePage from "../../src/screens/general/base/BasePage";
import GoBack from "../../components/GoBack";
import { ImportadorModel } from "../../interfaces";
import { useRouter } from "next/router";
import ColumnRightInformationProvider from "../../components/importer/ColumnRightInformationImporter";
import ColumnLeftInformationImporter from "../../components/importer/ColumnLeftInformationImporter";
import { getImportadorId } from "../../src/redux/actions/importadoresActions";
import Layout from "../../components/Layout";

const Importador: NextPage = () => {
  const router = useRouter();
  const { query } = router;

  const [visibleImporter, setVisibleImporter] =
    useState<ImportadorModel | null>(null);

  const loadImporter = async () => {
    const res = await getImportadorId(query.id as string);
    setVisibleImporter(res.data);
  };

  useEffect(() => {
    if (query.id && !visibleImporter) {
      loadImporter();
    }
  }, [query, visibleImporter]);

  return (
    <Layout>
      <BasePage title="Importador">
        <GoBack route="/importers" label={"Volver a listado de importadores"} />
        <section className="lg:bg-white flex flex-col rounded-lg w-full min-h-[calc(100vh-150px)] lg:min-h-[calc(100vh-202px)] lg:p-5 gap-y-4 max-w-7xl mx-auto">
          {visibleImporter && (
            <div className="flex gap-x-4">
              <ColumnLeftInformationImporter importer={visibleImporter} />
              <ColumnRightInformationProvider
                visibleImporter={visibleImporter}
              />
            </div>
          )}
        </section>
      </BasePage>
    </Layout>
  );
};

export default Importador;
