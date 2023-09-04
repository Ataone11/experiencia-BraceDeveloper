import { useTranslation } from "next-i18next";
import { useContext, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { HelpModel, OrderModel } from "../../interfaces";
import Account from "../../src/assets/general/Account";
import Cerrar from "../../src/assets/general/Cerrar";
import Changes from "../../src/assets/general/Changes";
import Flecha from "../../src/assets/general/Flecha";
import Pay from "../../src/assets/general/Pay";
import Providers from "../../src/assets/general/Providers";
import Security from "../../src/assets/general/Security";
import Shipments from "../../src/assets/general/Shipments";
import { PopUpContext } from "../../src/context/PopUpContext";
import { sendRequestHelp } from "../../src/redux/actions/pedidosActions";
import colores from "../../src/utils/colores";
import { FAQ_TYPE } from "../../src/utils/constants";
import ButtonPage from "../ButtonPage";
import FAQType from "./FAQType";

const Help = ({ visibleOrder }: { visibleOrder: OrderModel | null }) => {
  const setPopUp = useContext(PopUpContext);
  const [loading, setloading] = useState(false);
  const [helpActions, setHelpActions] = useState(true);
  const [selectedProblem, setSelectedProblem] = useState<HelpModel>({
    statusSelect: false,
    problem: null,
    message: null,
  });
  const { t } = useTranslation();
  const handleMessage = (e: any) => {
    setSelectedProblem({
      ...selectedProblem,
      message: e.target.value,
    });
  };

  const contactUs = () => {
    setloading(true);
    setHelpActions(false);
    setloading(false);
  };

  const sendRequest = async () => {
    setloading(true);
    if (visibleOrder && selectedProblem.message && selectedProblem.problem) {
      const res = await sendRequestHelp({
        provider_id: visibleOrder?.provider.id,
        message: selectedProblem.message,
        category: selectedProblem.problem,
        order_id: visibleOrder.id,
      });
      setPopUp && setPopUp(null);
      setloading(false);
      toast.success(t("order:help requested"));
    } else {
      if (!selectedProblem.message) {
        toast.warning(t("order:please select a problem"));
        setloading(false);
        return;
      }
      if (!selectedProblem.problem) {
        toast.warning(t("order:please write the message of your request"));
        setloading(false);
        return;
      }
    }
    return;
  };

  return (
    <div className="flex flex-col gap-y-6 relative">
      <button
        onClick={() => setPopUp && setPopUp(null)}
        className="absolute -right-4 -top-[72px] border border-text-opacity p-[6px] rounded-full"
      >
        <Cerrar />
      </button>
      <div className="border border-gray-page flex flex-col gap-y-2 px-6 py-3 rounded-md">
        <p className="font-bold text-base">
          <span>{t("order:order number")} </span>
          <span>{visibleOrder?.id}</span>
        </p>
        <p className="font-normal text-sm max-w-[530px] leading-4">
          <span>{t("order:supplier")} </span>
          <span>{visibleOrder?.provider.company.name}</span>
        </p>
      </div>

      {helpActions && (
        <>
          <span className="mx-auto font-bold text-base text-primary">
          {t("order:see our frequently asked questions")}
          </span>
          <div className="grid grid-cols-3 gap-x-5 md:gap-x-10 gap-y-5 w-fit mx-auto">
            {FAQ_TYPE.map(({ Icon, type }) => (
              <FAQType key={type} Icon={Icon} type={type} />
            ))}
          </div>
          <button className="mx-auto text-xs font-normal mt-5">
          {t("order:didn't find an answer?")}
          </button>
        </>
      )}

      {!helpActions && (
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2 relative">
            <span className="font-normal text-[13px] w-fit">
            {t("order:choose the problem")}
            </span>
            <div
              onClick={() =>
                setSelectedProblem({
                  ...selectedProblem,
                  statusSelect: !selectedProblem.statusSelect,
                })
              }
              className={`rounded-t-md ${
                !selectedProblem.statusSelect
                  ? "border border-gray-page rounded-b-md"
                  : "outline outline-light-blue-intermedio"
              } pl-6 h-9 flex justify-between items-center cursor-pointer`}
            >
              <span
                className={`max-w-[90%] font-normal text-[13px] ${
                  !selectedProblem.problem && "text-text-opacity"
                }`}
              >
                {!selectedProblem.problem
                  ? t("order:select what type your problem is")
                  : selectedProblem.problem}
              </span>
              <button
                className={`py-2 px-3 ${
                  selectedProblem.statusSelect ? "rotate-180" : null
                }`}
              >
                <Flecha
                  color={`${
                    selectedProblem.statusSelect
                      ? colores["primary"]
                      : colores["text-opacity"]
                  }`}
                />
              </button>
            </div>
            {selectedProblem.statusSelect && (
              <div className="absolute -left-[3px] w-[101.25%] top-[65px] rounded-br-md rounded-bl-md border bg-white shadow-sm py-2 px-3 z-[1]">
                {FAQ_TYPE.map(({ type }) => (
                  <p
                    key={type}
                    onClick={() =>
                      setSelectedProblem({
                        ...selectedProblem,
                        problem: type,
                        statusSelect: false,
                      })
                    }
                    className={`${
                      type === selectedProblem.problem
                        ? "bg-light-blue font-bold text-primary"
                        : ""
                    } border-b cursor-pointer last:border-b-0 px-3 text-sm py-2 hover:bg-light-blue hover:border-b-light-blue hover:text-primary hover:font-bold`}
                  >
                    {type}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-2 relative">
            <label htmlFor="message" className="font-normal text-[13px] w-fit">
              {t("order:message")}
            </label>
            <textarea
              name="message"
              id="message"
              placeholder={
                !selectedProblem.message
                  ? t("order:w")
                  : selectedProblem.message
              }
              onChange={handleMessage}
              rows={5}
              className="w-full font-normal text-[13px] focus:outline-light-blue-intermedio resize-none px-6 border py-3 rounded-md"
            />
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row flex-wrap gap-y-3 md:place-content-center gap-x-5">
        {loading ? (
          <ButtonPage>
            <span className="px-2">
              <BeatLoader color={colores.secondary} size={10} />
            </span>
          </ButtonPage>
        ) : helpActions ? (
          <>
            <ButtonPage action={() => {}}>
              <span className="md:px-5">{t("order:start a chat with support")}</span>
            </ButtonPage>
            <ButtonPage action={() => contactUs()}>
              <span className="md:px-5">{t("order:contact us")}</span>
            </ButtonPage>
          </>
        ) : (
          <>
            <ButtonPage
              action={() => {
                setPopUp && setPopUp(null);
              }}
            >
              <span className="md:px-5">{t("order:cancel")}</span>
            </ButtonPage>
            <ButtonPage action={() => sendRequest()}>
              <span className="md:px-5">{t("order:Send")}</span>
            </ButtonPage>
          </>
        )}
      </div>
    </div>
  );
};

export default Help;
