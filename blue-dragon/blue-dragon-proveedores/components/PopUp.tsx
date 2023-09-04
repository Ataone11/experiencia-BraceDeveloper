import { useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { ModalModel } from "../interfaces";
import ButtonPage from "./ButtonPage";

const PopUp = ({
  popUp,
  setPopUp,
  animate,
  setAnimate,
}: {
  popUp: ModalModel;
  setPopUp: Dispatch<any> | null;
  animate: boolean;
  setAnimate: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 500);
  }, []);

  return (
    <section
      className={`fixed top-0 ${
        animate ? "opacity-100 z-[60]" : "opacity-0 -z-10"
      } left-0 h-full px-5 w-full grid place-content-center bg-black/30 transition-all duration-500 ease-in-out`}
    >
      <div
        className={`${
          popUp.title && popUp.buttonAction ? "p-10" : "px-6 py-8"
        } w-full rounded-lg shadow-lg bg-white transition-all duration-1000 ease-in-out ${
          animate ? "-translate-y-0" : "translate-y-[100vh]"
        }`}
      >
        <div className="max-w-[500px] flex flex-col gap-y-5">
          {popUp.title && (
            <h1 className="text-dark-blue text-xl font-bold text-center">{popUp?.title}</h1>
          )}
          {popUp?.children}
          {popUp.action && (
            <div className="flex flex-col md:flex-row flex-wrap gap-y-3 md:place-content-center gap-x-5">
              <ButtonPage action={() => setPopUp && setPopUp(null)}>
                <span className="md:px-5">Volver</span>
              </ButtonPage>
              <ButtonPage action={() => popUp.action()}>
                <span className="md:px-5">{popUp?.buttonAction}</span>
              </ButtonPage>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopUp;
