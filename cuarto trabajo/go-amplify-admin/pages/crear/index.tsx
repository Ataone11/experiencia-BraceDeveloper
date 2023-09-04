import type { NextPage } from "next";
import BasePage from "../../src/screens/general/base/BasePage";
import Link from "next/link";
import CrearCampaña from "./CrearCampaña";

const Campañas: NextPage = () => {
  return (
    <BasePage title="Crear campaña">
      <CrearCampaña />
    </BasePage>
  );
};

export default Campañas;
