import Link from "next/link";

export const FAQType = ({
  Icon,
  type,
  active = false,
  action,
}: {
  Icon: any;
  type: string;
  active?: boolean;
  action?: (type: string) => void;
}) => {
  return (
    <Link href={`/help/${type}`}>
      <a
        className={`md:w-[118px] md:h-[118px] px-4 py-6 rounded-lg shadow-md hover:shadow-lg border grid place-content-center gap-y-2 transition-all duration-200 ease-in-out hover:bg-Claro ${
          active
            ? "bg-Claro border-transparent"
            : "bg-white border-backgroundPage"
        }`}
      >
        <span className="mx-auto">
          <Icon />
        </span>
        <span className="w-fit mx-auto text-center font-semibold text-sm text-Principal break-all">
          {type}
        </span>
      </a>
    </Link>
  );
};

export default FAQType;
