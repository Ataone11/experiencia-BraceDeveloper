import Image from "next/image";
import Link from "next/link";
import User from "../../assets/User";
import { OrderModel } from "../../interfaces";
import { S3_BUCKET_URL } from "../../src/utils/constants";
import ButtonPage from "../ButtonPage";
import ThruLogo from "../../assets/logo_blue.svg";
import ImageWithFallback from "../general/ImageWithFallback";

export const SectionRight = ({
  visibleOrder,
}: {
  visibleOrder: OrderModel | null;
}) => {
  return (
    <div className="flex flex-col gap-y-4">
      <section className="rounded-lg bg-white p-4 shadow-md flex flex-col gap-y-2">
        <span className="font-bold text-sm text-Principal">Proveedor</span>
        <Link href={`/providers/${visibleOrder?.provider.id}`}>
          <a className="flex items-center gap-x-3 text-sm font-normal">
            <span>{visibleOrder?.provider?.company?.name}</span>
          </a>
        </Link>
        <div className="border my-2" />
        <span className="font-semibold text-sm text-Principal">Dirección</span>

        <span className="font-normal text-xs">
          {visibleOrder?.provider?.company?.address || "--- Sin dirección ---"}
        </span>

        <div className="flex gap-x-4">
          <Link href={`/providers/${visibleOrder?.provider.id}`}>
            <a className="w-14 h-14 rounded-md bg-backgroundPage overflow-hidden relative">
              <ImageWithFallback
                src={
                  visibleOrder?.provider.photo
                }
                layout="fill"
                objectFit="cover"
                alt={`${visibleOrder?.provider.first_name} ${visibleOrder?.provider.last_name}`}
              />
            </a>
          </Link>
          <div>
            <Link href={`/providers/${visibleOrder?.provider.id}`}>
              <a className="font-bold text-[15px]">
                {visibleOrder?.provider.first_name}&nbsp;
                {visibleOrder?.provider.last_name}
              </a>
            </Link>
            {visibleOrder?.provider?.company_position && (
              <span className="font-normal text-[15px]">
                {visibleOrder.provider.company_position}
              </span>
            )}
          </div>
        </div>
        <span className="mx-auto">
          <ButtonPage>
            <span className="px-5">Chat</span>
          </ButtonPage>
        </span>
      </section>

      <section className="rounded-lg bg-white p-4 shadow-md flex flex-col gap-y-2">
        <span className="font-bold text-sm text-Principal">Comprador</span>
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
        <span className="font-semibold text-sm text-Principal">
          Información de contacto
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
        <span className="mx-auto">
          <ButtonPage>
            <span className="px-5">Chat</span>
          </ButtonPage>
        </span>
      </section>
    </div>
  );
};

export default SectionRight;
