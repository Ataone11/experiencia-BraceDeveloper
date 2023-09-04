import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { BeatLoader } from "react-spinners";
import { PopUpContext } from "../../src/context/PopUpContext";
import { statusUpdate } from "../../src/redux/actions/pedidosActions";
import { statusSampleUpdate } from "../../src/redux/actions/samplesActions";
import colores from "../../src/utils/colores";
import { SAMPLES_STATUS } from "../../src/utils/sample_status";
import Button from "../Button";
import ButtonPage from "../ButtonPage";

export const RejectSample = ({
  loadSample,
}: {
  loadSample: () => Promise<void>;
}) => {
  const { query } = useRouter();
  const setPopUp = useContext(PopUpContext);
  const [loading, setloading] = useState(false);

  const onSubmit = async () => {
    setloading(true);
    const res = await statusSampleUpdate({
      date: new Date(Date.now()).toISOString(),
      status: SAMPLES_STATUS.REJECTED,
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
        {t("samples:are-you-sur-you-want-to-confirm-this-sample?")}
      </span>
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
              color="alert"
              onClick={onSubmit} />
          </>
        )}
      </div>
    </div>
  );
};

export default RejectSample;
