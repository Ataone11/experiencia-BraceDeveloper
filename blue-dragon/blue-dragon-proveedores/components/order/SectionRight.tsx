import { useTranslation } from "next-i18next";
import Link from "next/link";
import { OrderModel } from "../../interfaces";
import User from "../../src/assets/general/User";
import ButtonPage from "../ButtonPage";

export const SectionRight = ({
  visibleOrder,
}: {
  visibleOrder: OrderModel | null;
}) => {
  const { t } = useTranslation();
  return (
    <section className="rounded-lg bg-white p-4 shadow-md flex flex-col gap-y-2">
      <span className="font-bold text-sm text-primary">Comprador</span>
      <Link href={`/importers/${visibleOrder?.importer.id}`}>
        <a className="flex items-center gap-x-3 text-sm font-normal">
          <User />
          <span>
            {visibleOrder?.importer.first_name}&nbsp;
            {visibleOrder?.importer.last_name}
          </span>
        </a>
      </Link>
      <div className="border my-2" />
      <span className="font-semibold text-sm text-primary">
        
        {t("order:contact information")}
      </span>
      <span className="font-normal text-xs">
        {visibleOrder?.importer.email}
      </span>
      <span className="font-normal text-xs">
        {visibleOrder?.importer.phone_indicative &&
          `+${visibleOrder.importer.phone_indicative}`}
        &nbsp;
        {visibleOrder?.importer.phone}
      </span>
      <ButtonPage>
        <span>Chat</span>
      </ButtonPage>
    </section>
  );
};

export default SectionRight;
