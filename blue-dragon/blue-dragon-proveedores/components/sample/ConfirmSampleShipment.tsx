import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { BeatLoader } from "react-spinners";
import { FechaModel, OrderModel, SampleModel } from "../../interfaces";
import { PopUpContext } from "../../src/context/PopUpContext";
import { statusUpdate } from "../../src/redux/actions/pedidosActions";
import { statusSampleUpdate } from "../../src/redux/actions/samplesActions";
import colores from "../../src/utils/colores";
import { SAMPLES_STATUS } from "../../src/utils/sample_status";
import Button from "../Button";
import ButtonPage from "../ButtonPage";

export const ConfirmSampleShipment = ({
  loadSample,
}: {
  loadSample: () => Promise<void>;
}) => {
  const { query } = useRouter();
  const setPopUp = useContext(PopUpContext);
  const [loading, setloading] = useState(false);
  const [dateShipmentOrder, setDateShipmentOrder] = useState<FechaModel>({
    fecha: null,
    hora: null,
  });

  const uploadDate = (e: any) => {
    setDateShipmentOrder({
      ...dateShipmentOrder,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async () => {
    if (!dateShipmentOrder.fecha || !dateShipmentOrder.hora) {
      alert("Sin información de fecha de envío");
      return;
    }
    setloading(true);
    const res = await statusSampleUpdate({
      date: `${dateShipmentOrder.fecha}T${dateShipmentOrder.hora}`,
      status: SAMPLES_STATUS.SEND,
      sample: query.id as string,
    });
    setPopUp && setPopUp(null);
    loadSample();
    setloading(false);
  };
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-y-5">
      <span className="text-sm font-normal">
        {t("samples:click-on-accept-when-you-have-sent-the-sample")}
      </span>
      <div className="flex flex-col gap-y-2">
        <span className="font-normal text-sm">{t("samples:when-you-sent-the-sample")}</span>
        <div className="flex items-center gap-x-3">
          <input
            className="border border-light-blue-intermedio rounded-lg px-2 py-1 font-semibold text-sm text-dark-blue focus:outline-none"
            type="date"
            name="fecha"
            id="fecha"
            required
            onChange={uploadDate}
          />
          <input
            className="border border-light-blue-intermedio rounded-lg px-2 py-1 font-semibold text-sm text-dark-blue focus:outline-none"
            type="time"
            name="hora"
            id="hora"
            required
            onChange={uploadDate}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row flex-wrap gap-y-3 md:place-content-center gap-x-5">
        {loading ? (
          <ButtonPage>
            <span className="px-2">
              <BeatLoader color={colores.secondary} size={10} />
            </span>
          </ButtonPage>
        ) : (
          <>
            <Button
              color="secondary"
              text={t("samples:cancel")}
              onClick={() => setPopUp && setPopUp(null)} />
            <Button
              text={t("samples:confirm")}
              onClick={onSubmit} />
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmSampleShipment;
