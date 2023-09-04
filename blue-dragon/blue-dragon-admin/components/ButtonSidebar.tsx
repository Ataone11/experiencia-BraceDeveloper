import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Flecha from "../assets/Flecha";
import COLORES from "./../src/utils/colores";

const ButtonSidebar = ({
  button,
}: {
  button: {
    Icon: any;
    name: string;
    initialRoute: string;
    rootRoute: string;
    options?: { route: string; name: string }[] | undefined;
  };
}) => {
  const router = useRouter();
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const { Icon, name, initialRoute, rootRoute, options } = button;

  useEffect(() => {
    if (!router.route.includes(rootRoute)) setShowOptions(true);
  }, [router.route]);

  const navigate = (href: string) => {
    options && options.length > 0;

    if (router.route.includes(rootRoute)) {
      setShowOptions(!showOptions);
    } else {
      router.push(href);
    }
  };

  return (
    <Fragment>
      <a
        onClick={() => navigate(initialRoute || "/")}
        className={`flex items-center w-full gap-x-3 py-4 px-3 rounded-xl cursor-pointer ${
          router.route.includes(rootRoute) && "bg-Claro"
        }`}
      >
        <span>
          <Icon
            color={
              router.route.includes(rootRoute)
                ? COLORES.Principal
                : COLORES.Oscuro
            }
          />
        </span>
        <p
          className={`text-base w-full text-left ${
            router.route.includes(rootRoute)
              ? "font-bold text-Principal"
              : "font-normal  text-Oscuro"
          }`}
        >
          {name}
        </p>
        {options && options.length > 0 && (
          <span
            className={`justify-self-end transition-all duration-500 ease-in-out ${
              showOptions && router.route.includes(rootRoute)
                ? "rotate-180"
                : "rotate-0"
            }`}
          >
            <Flecha
              color={
                router.route.includes(rootRoute)
                  ? COLORES.Principal
                  : COLORES.Oscuro
              }
            />
          </span>
        )}
      </a>
      {options &&
        options.length > 0 &&
        showOptions &&
        router.route.includes(rootRoute) && (
          <div className="pt-2 mb-2 flex flex-col">
            {options.map(({ route, name }: { route: string; name: string }) => (
              <Link key={name} href={route}>
                <a
                  className={`font-normal text-base ${
                    router.route.includes(route)
                      ? "font-bold text-Oscuro"
                      : "font-normal text-Principal"
                  } w-full text-left py-2 px-3 border-b-[1px] first:pt-0 last:border-0 last:pb-0`}
                >
                  {name}
                </a>
              </Link>
            ))}
          </div>
        )}
    </Fragment>
  );
};

export default ButtonSidebar;
