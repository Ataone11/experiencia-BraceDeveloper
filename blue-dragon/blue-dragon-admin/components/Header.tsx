import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import Brand from "../assets/Brand";
import Menu from "../assets/Menu";

const RUTES = [
  { rute: "Inicio", ruteURL: "/" },
  { rute: "Chat", ruteURL: "/chat" },
];

const Header = ({
  showMenu,
  setShowMenu,
}: {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { pathname } = router;
  const [tagRute, setTagRute] = useState<string>("/providers/approved");

  return (
    <header className="fixed top-0 z-10 w-full h-header bg-Principal flex items-center justify-between px-5">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={`lg:hidden p-2 rounded-lg ${showMenu && "bg-Oscuro"}`}
      >
        <Menu />
      </button>
      <Link href={"/providers/approved"}>
        <a
          className="lg:min-w-[209px] lg:pl-2"
        >
          <Brand />
        </a>
      </Link>
      <nav className="hidden lg:flex w-full px-10 gap-x-10 h-full">
        {RUTES.map(({ rute, ruteURL }: { rute: string; ruteURL: string }) => (
          <section key={rute} className="relative flex items-center">
            <Link href={ruteURL}>
              <a
                onClick={() => setTagRute(rute)}
                className={`text-white ${
                  tagRute === rute && "font-medium"
                } text-base px-2 h-full flex items-center`}
              >
                {rute}
              </a>
            </Link>
            {tagRute === rute && (
              <div className="absolute bottom-0 left-[-10%] m-auto h-1 w-[120%] bg-Active rounded-t-lg" />
            )}
          </section>
        ))}
      </nav>
      <div className="relative h-full flex items-center">
        {tagRute === "username" && (
          <div className="absolute bottom-0 left-[-10%] m-auto h-1 w-[120%] bg-azuActive rounded-t-lg hidden lg:block" />
        )}
      </div>
    </header>
  );
};

export default Header;
