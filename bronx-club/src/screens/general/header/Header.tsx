import Logo from "../../recursos/prueba daniel/home/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between md:justify-start p-4 absolute top-0 left-0">
      <nav className="flex items-center flex-1 justify-start pl-80">
        <Link to="/">
          <img src={Logo} className="mr-12" alt="" />
        </Link>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            {/*   <a href="#" className="bg-black text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Bronze club</a>*/}

            <a
              href="Classes"
              className=" block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-gray-100 border-b-2 border-transparent  hover:border-white  font-medium"
            >
              classes
            </a>
            <a
              href="Trainer"
              className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-gray-100 border-b-2 border-transparent hover:border-white  font-medium"
            >
              personal Workouts
            </a>
            <a
              href="Plans"
              className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-gray-100 border-b-2 border-transparent hover:border-white  font-medium"
            >
              Prices & Plans
            </a>
            <a
              href="Schedule"
              className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-gray-100 border-b-2 border-transparent  hover:border-white  font-medium"
            >
              Schedule
            </a>
            <a
              href="Singup"
              className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-gray-100 border-b-2 border-transparent  hover:border-white  font-medium"
            >
              Sing up
            </a>
          </div>
        </div>
      </nav>
      <button
        type="button"
        //onClick={handleClick}
        className="md:hidden flex  bg-gray-800  items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        aria-controls="mobile-menu"
        aria-expanded="false"
      >
        <div
          className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden  mt-2 lg:mt-0 bg-gray-900 z-20"
          id="nav-content"
        >
          <ul className="list-reset lg:flex flex-1 items-center px-4 md:px-0">
            <li className="mr-6 my-2 md:my-0">
              <a
                href="#"
                className="block py-1 md:py-3 pl-1 align-middle text-blue-400 no-underline hover:text-gray-100 border-b-2 border-blue-400 hover:border-blue-400"
              >
                <i className="fas fa-home fa-fw mr-3 text-blue-400" />
                <span className="pb-1 md:pb-0 text-sm">Home</span>
              </a>
            </li>
            <li className="mr-6 my-2 md:my-0">
              <a
                href="#"
                className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-100 border-b-2 border-gray-900  hover:border-pink-400"
              >
                <i className="fas fa-tasks fa-fw mr-3" />
                <span className="pb-1 md:pb-0 text-sm">Tasks</span>
              </a>
            </li>
            <li className="mr-6 my-2 md:my-0">
              <a
                href="#"
                className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-100 border-b-2 border-gray-900  hover:border-purple-400"
              >
                <i className="fa fa-envelope fa-fw mr-3" />
                <span className="pb-1 md:pb-0 text-sm">Messages</span>
              </a>
            </li>
            <li className="mr-6 my-2 md:my-0">
              <a
                href="#"
                className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-100 border-b-2 border-gray-900  hover:border-green-400"
              >
                <i className="fas fa-chart-area fa-fw mr-3" />
                <span className="pb-1 md:pb-0 text-sm">Analytics</span>
              </a>
            </li>
            <li className="mr-6 my-2 md:my-0">
              <a
                href="#"
                className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-100 border-b-2 border-gray-900  hover:border-red-400"
              >
                <i className="fa fa-wallet fa-fw mr-3" />
                <span className="pb-1 md:pb-0 text-sm">Payments</span>
              </a>
            </li>
          </ul>
          <div className="relative pull-right pl-4 pr-4 md:pr-0">
            <input
              type="search"
              placeholder="Search"
              className="w-full bg-gray-900 text-sm text-gray-400 transition border border-gray-800 focus:outline-none focus:border-gray-600 rounded py-1 px-2 pl-10 appearance-none leading-normal"
            />
            <div
              className="absolute search-icon"
              style={{ top: "0.375rem", left: "1.75rem" }}
            >
              <svg
                className="fill-current pointer-events-none text-gray-500 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
              </svg>
            </div>
          </div>
        </div>
        <span className="sr-only">Open main menu</span>
        <svg
          className="block h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </header>
  );
};
export default Header;
