import React, { useEffect, useState } from "react";
import header from "../../assets/home/background_header.png";
import Cardio from "../../assets/classes/cardio/cardio.png";
import Airyoga from "../../assets/classes/yoga/yoga1.jpg";
import Lifting from "../../assets/classes/ligting/ligting.png";
import Back from "../../assets/classes/press_back/press_back.png";
import About from "../../assets/home/background_about.png";
import classes from "../../assets/home/background_classes.png";

import { Link } from "react-router-dom";

const Home = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  {
    /* Contentasdasd*/
  }
  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-black w-full text-white flex justify-end items-center">
        <div className="w-[20%]"></div>
        <img src={header} className="w-[100%]" alt="" />
        <div className="flex flex-col justify-center items-start w-[80%] xl:w-[80%] absolute md:top-32 left-12">
          <div className=" text-white text-3xl font-bold  w-[90%] sm:p-12 sm:w-[90%] md:w-[80%] md:text-5xl md:p-9 lg:p-20  xl:p-56 lg:w-full lg:text-7xl xl:text-8xl">
            IT’S ALL ABOUT WHAT YOU CAN ACHIEVE
            <div className=" text-white text-sm md:text-lg font-bold w-full pt-5">
              Empower yourself to make the changes you need to make
            </div>
            <a
              href="/mas"
              className=" bg-primary bg-opacity-80 hover:bg-opacity-100 text-sm text-white transition duration-200 group md:text-lg lg:text-base my-4 inline-block py-3 px-12"
            >
              LET´S GEY STARTED
            </a>
          </div>
          <div></div>
        </div>
      </div>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Content*/}
          <div className="px-4 py-6 sm:px-0 flex flex-col ">
            <div className="font-serif font-extrabold text-black flex flex-row " />
            <h1 className="object-none object-left p-4 md:pt-10 text-5xl font-bold my-9">
              POPULAR CLASSES
            </h1>
            <div className="grid grid-cols-1 pt-8 md:grid-cols-2 gap-x-52 gap-y-14 md:pt-16">
              <div>
                <Link to="/Cardio">
                  <img src={Cardio} className="w-auto h-auto " alt="" />
                  <h1 className="object-none object-left pt-4 text-3xl font-bold">
                    Cardio
                  </h1>
                </Link>
              </div>
              <div>
                <Link to="/Classes">
                  <img src={Airyoga} className="w-auto h-auto" alt="" />
                  <h1 className="object-none object-left pt-4 text-3xl font-bold">
                    AirYoga
                  </h1>
                </Link>
              </div>

              <div>
                <Link to="/Classes">
                  <img
                    src={Lifting}
                    className="w-auto h-auto md:pt-20  "
                    alt=""
                  />
                  <h1 className="object-none object-left pt-4 text-3xl font-bold">
                    Lifting
                  </h1>
                </Link>
                <a href="Lifting"></a>
              </div>
              <div>
                <Link to="/Classes">
                  <img src={Back} className="w-auto h-auto md:pt-20" alt="" />
                  <h1 className="object-none object-left pt-4 text-3xl font-bold">
                    Press & Back
                  </h1>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-center font-bold">
            <a
              href="/"
              className=" bg-red-600  hover:bg-opacity-80 text-white transition duration-200 group text-lg my-4 inline-block py-3 px-8 font-bold"
            >
              CHECK ALL CLASSES
            </a>
          </div>
          {/* /End replace */}
        </div>
      </main>
      <div className="bg-black w-[100%] text-white flex justify-start items-start md:justify-end md:items-center relative">
        {/*   <div className="  max-w-8xl mx-auto  sm:px-6 lg:px-18 bg-About">*/}
        <div className="w-[46%] md:h-[75%] md:w-[20%]"></div>
        <img src={About} className="w-full md:w-[80%] md:h-[60%]" alt="" />
        <div className="flex flex-col justify-start items-start w-max pl-3  md:w-[90%] absolute inset-y-0 left-0  md:p-56 sm:p-20">
          <div className="text-white  font-bold container w-[80%] h-max md:w-[50%] md:h-[50%]">
            <h1 className="text-xl md:text-4xl">ABOUT BRONX</h1>
            <h2 className="object-none object-left pt-10 text-sm md:text-base font-black text-white">
              We’re not here to carry you to fitness, we’re here to motivate you
              to carry yourself to your goals.If
            </h2>
            <h2 className="object-none object-left pt-5 text-sm md:text-base font-black text-white">
              you’re not sure what your goals are, or don’t know where to start
              on your fitness journey, come in and speak to one of our qualified
              trainers who can help you develop a plan.
            </h2>
            <div className="w-[20%]"></div>
            <a
              href="/mas"
              className=" bg-primary bg-opacity-80 hover:bg-opacity-100 text-white transition duration-200 group text-lg my-4 inline-block py-2 px-16"
            >
              Shedule
            </a>
          </div>
          <div></div>
        </div>
      </div>

      <div className="w-full text-white bg-gris h-[30%] md:h-[70%]  md:flex md:justify-between md:items-center relative">
        <div className="w-[46%] md:h-[75%] md:w-[20%]"></div>
        <img src={classes} className="w-[90%] h-full" alt="" />
        <div className="text-white font-bold w-[90%]  md:mr-[15%] md:w-[55%] md:h-[50%] md:p-14">
          <h1 className="text-xl md:text-4xl">CLASSES</h1>
          <h2 className="object-none object-left pt-10 text-base font-black text-white">
            We host dozens of classes every day, from deadlifting and HIIT to
            yoga and pilates. We also have different classes for varying levels
            of ability.
          </h2>
          <h2 className="object-none object-left pt-5 text-base font-black text-white">
            Check out our individual class pages to see what’s on when, and stop
            on by for a chat if you want to see how we do things.
          </h2>
          <div className="w-[20%]"></div>
          <a
            href="/mas"
            className=" bg-primary bg-opacity-80 hover:bg-opacity-100 text-white transition duration-200 group text-lg my-4 inline-block py-2 px-16"
          >
            Classes
          </a>
        </div>
      </div>
      <div className="bg-white  h-[25%] md:h-[45%] w-[60%]">
        <h2 className="font-bold text-black text-4xl pt-24">
          ARE YOU READY FOR CHANGES?
        </h2>
        <a
          href="/mas"
          className="bg-primary  hover:bg-opacity-100 text-white transition duration-200 group text-xl my-8 inline-block py-4 px-7"
        >
          Make it happen
        </a>
        <div className="pt-12"></div>
      </div>
    </div>
  );
};

export default Home;
