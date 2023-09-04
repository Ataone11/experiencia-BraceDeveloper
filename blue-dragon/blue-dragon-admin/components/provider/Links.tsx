import { useTranslation } from "next-i18next";
import BoxShadow from "../BoxShadow";
import ButtonPage from "../ButtonPage";

const Links = () => {
  const { t } = useTranslation("providers");

  return (
    <BoxShadow props={"p-4"}>
      <div className="flex flex-col gap-y-4">
        <span className="font-bold text-base">{`${t(
          "providers:detail-approved-providers.sections-links.links"
        )}`}</span>
        <div className="flex flex-col gap-y-3">
          <ButtonPage>
            <span>{`${t(
              "providers:detail-approved-providers.sections-links.help-requested"
            )}`}</span>
          </ButtonPage>
          <ButtonPage>
            <span>{`${t(
              "providers:detail-approved-providers.sections-links.orders"
            )}`}</span>
          </ButtonPage>
          <ButtonPage>
            <span>{`${t(
              "providers:detail-approved-providers.sections-links.samples"
            )}`}</span>
          </ButtonPage>
        </div>
      </div>
    </BoxShadow>
  );
};

export default Links;
