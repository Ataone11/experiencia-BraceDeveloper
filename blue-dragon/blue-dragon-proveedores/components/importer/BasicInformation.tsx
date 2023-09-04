import { useTranslation } from "next-i18next";

const BasicInformation = ({
  title,
  children,
}: {
  title: string;
  children: JSX.Element;
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-y-5">
      <span className="font-bold text-base text-Principal">
        {title || t("importer:no-title")}
      </span>
      {children}
    </div>
  );
};

export default BasicInformation;
