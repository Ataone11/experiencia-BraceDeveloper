import Logo from "../../recursos/prueba daniel/home/logo.png";
import { Link } from "react-router-dom";
const Header2 = () => {
    return (
      <nav className="bg-black shadow-lg p-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
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
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button">
              <svg
                className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* mobile menu */}
      <div className="hidden mobile-menu">
        <ul >
          <li className="active">
            <a
              href="index.html"
              className="block text-sm px-2 py-4 text-white bg-green-500 font-semibold"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
    );
  };
  export default Header2;