const BasicInformation = ({
  title,
  children,
}: {
  title: string;
  children: JSX.Element;
}) => {
  return (
    <div className="flex flex-col gap-y-5">
      <span className="font-bold text-base text-Principal">
        {title || "sin titulo"}
      </span>
      {children}
    </div>
  );
};

export default BasicInformation;
