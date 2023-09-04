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

export const ConfirmSample = ({
    loadSample,
    confirmSampleInfo
}: {
    loadSample: () => Promise<void>;
    confirmSampleInfo: {
        price_sample: number | null
        price_shipping: number | null
        quantity: number | null
    }
}) => {
    const { query } = useRouter();
    const setPopUp = useContext(PopUpContext);
    const [loading, setloading] = useState(false);

    const confirmSample = async () => {
        setloading(true);
        const res = await statusSampleUpdate({
            date: new Date(Date.now()).toISOString(),
            status: SAMPLES_STATUS.WAITING_PAYMENT,
            sample: query.id as string,
            price_sample: confirmSampleInfo.price_sample as number,
            price_shipping: confirmSampleInfo.price_shipping as number,
            quantity: confirmSampleInfo.quantity as number
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
                            onClick={confirmSample} />
                    </>
                )}
            </div>
        </div>
    );
};

export default ConfirmSample;
