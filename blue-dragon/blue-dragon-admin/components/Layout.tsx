import { useRouter } from "next/router";
import { useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";

const Layout = ({ children }: any) => {
  const route = useRouter();

  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <section className="relative">
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      <section className="flex mt-[66px]">
        <SideBar showMenu={showMenu} />
        <section className="w-screen lg:w-[calc(100vw-229px)] min-h-[calc(100vh-66px)] py-5 lg:py-10 px-5 md:px-7 lg:px-8 lg:absolute lg:right-0 bg-backgroundPage">
          {children}
        </section>
      </section>
    </section>
  );
};

export default Layout;
