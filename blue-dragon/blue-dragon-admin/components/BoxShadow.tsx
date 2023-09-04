const BoxShadow = ({
  children,
  props,
  shadow = true,
}: {
  children: any;
  props?: any;
  shadow?: boolean;
}) => {
  return (
    <section
      className={`rounded-lg bg-white ${props} ${shadow && "shadow-md"}`}
    >
      {children}
    </section>
  );
};

export default BoxShadow;
