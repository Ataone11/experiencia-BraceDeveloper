import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext } from "react";
import { ModalModel, ProveedorModel } from "../../interfaces";
import { PopUpContext } from "../../src/context/PopUpContext";
import { changeStatusProvider } from "../../src/redux/actions/proveedoresActions";
import BoxShadow from "../BoxShadow";
import ButtonPage from "../ButtonPage";

const Actions = ({
  visibleProvider,
  setVisibleProvider,
}: {
  visibleProvider?: ProveedorModel;
  setVisibleProvider?: Dispatch<SetStateAction<ProveedorModel | null>>;
}) => {
  const { t } = useTranslation("providers");
  const { query } = useRouter();
  const setPopUp = useContext(PopUpContext);

  const changeStatusP = async (status: number) => {
    const res = await changeStatusProvider(query.id as string, status);
    setVisibleProvider && setVisibleProvider(res);
    setPopUp && setPopUp(null);
  };

  const popUp = {
    title: `${t("providers:pop-up-disable-approved.title")}`,
    buttonAction: `${t("providers:pop-up-disable-approved.button")}`,
    action: () => changeStatusP(1),
    setPopUp: true,
    children: (
      <p className="text-base">
        ¿
        {`${t(
          "providers:pop-up-disable-approved.are-you-sure-you-want-to-disable"
        )}`}
        &nbsp;
        {visibleProvider?.company ? (
          <span className="font-bold">{`${visibleProvider?.company.name}`}</span>
        ) : (
          <span>{`${t(
            "providers:pop-up-disable-approved.rest-of-the-message"
          )}`}</span>
        )}
        ?
      </p>
    ),
  };

  return (
    <BoxShadow props={"p-4"}>
      <div className="flex flex-col gap-y-4">
        <span className="font-bold text-base">{`${t(
          "providers:detail-approved-providers.section-actions.actions"
        )}`}</span>
        <div className="flex flex-col gap-y-3">
          <ButtonPage>
            <span>{`${t(
              "providers:detail-approved-providers.section-actions.start-a-chat"
            )}`}</span>
          </ButtonPage>
          <ButtonPage action={() => setPopUp && setPopUp(popUp)}>
            <span>{`${t(
              "providers:detail-approved-providers.section-actions.disable"
            )}`}</span>
          </ButtonPage>
        </div>
      </div>
    </BoxShadow>
  );
};

export default Actions;
