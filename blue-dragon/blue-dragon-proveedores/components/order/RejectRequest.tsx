import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { BeatLoader } from "react-spinners";
import { PopUpContext } from "../../src/context/PopUpContext";
import { statusUpdate } from "../../src/redux/actions/pedidosActions";
import colores from "../../src/utils/colores";
import ButtonPage from "../ButtonPage";

export const RejectRequest = ({
  loadOrder,
  rejectedState,
}: {
  loadOrder: () => Promise<void>;
  rejectedState: number;
}) => {
  const { query } = useRouter();
  const setPopUp = useContext(PopUpContext);
  const [loading, setloading] = useState(false);

  const onSubmit = async () => {
    setloading(true);
    const res = await statusUpdate({
      intermediate: "false",
      date: new Date(Date.now()).toISOString(),
      status: rejectedState.toString(),
      order: query.id as string,
    });
    setPopUp && setPopUp(null);
    loadOrder();
    setloading(false);
  };
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-y-5">
      <span className="text-sm font-normal">
      {t("order:are you sure you want to decline this request?")}
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
            <ButtonPage action={() => setPopUp && setPopUp(null)}>
              <span className="md:px-5">{t("order:cancel")}</span>
            </ButtonPage>
            <ButtonPage
              color={colores["alert-button"]}
              action={() => onSubmit()}
            >
              <span className="md:px-5">{t("order:decline")}</span>
            </ButtonPage>
          </>
        )}
      </div>
    </div>
  );
};

export default RejectRequest;
