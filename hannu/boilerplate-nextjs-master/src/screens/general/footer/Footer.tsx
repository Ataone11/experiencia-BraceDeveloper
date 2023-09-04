import facebookIcon from "../../../assets/icons/facebook.svg";
import logo from "../../../assets/icons/Logo Hannulog.svg";
import Insta from "../../../assets/icons/insta.svg";

const Footer = () => {
  return (
    <div className="bg-blueHannu px-10  mt-auto bottom-0">
      <div className="max-w-[1750px] mx-auto w-full relative flex flex-col lg:flex-row space-y-3 justify-center lg:justify-between items-center py-3">
        <div className="flex flex-col justify-center items-center lg:justify-start md:items-start">
          <div className="text-white hidden flex-col justify-center items-center md:justify-start md:items-start lg:flex">
            <a href="www.facebook.com" target="_blank">
              <img
                src={logo.src}
                className="hover:scale-105 transition-all cursor-pointer"
                alt=""
              />
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start gap-3 lg:pr-[40%] xl:pr-[60%]">
          <div className="flex justify-center items-center gap-x-2 lg:hidden ">
            <a href="www.facebook.com" target="_blank">
              <img
                src={logo.src}
                className="hover:scale-105 transition-all cursor-pointer"
                alt=""
              />
            </a>
          </div>
          <div className="flex justify-center items-center gap-x-2">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.16667 7C7.59203 7 7.04093 7.22827 6.6346 7.6346C6.22827 8.04093 6 8.59203 6 9.16667V9.38442L12.5 12.8847L19 9.3855V9.16667C19 8.59203 18.7717 8.04093 18.3654 7.6346C17.9591 7.22827 17.408 7 16.8333 7H8.16667Z"
                fill="white"
              />
              <path
                d="M19 10.6152L12.7568 13.9768C12.6778 14.0193 12.5896 14.0415 12.5 14.0415C12.4104 14.0415 12.3222 14.0193 12.2433 13.9768L6 10.6152V15.6668C6 16.2415 6.22827 16.7926 6.6346 17.1989C7.04093 17.6052 7.59203 17.8335 8.16667 17.8335H16.8333C17.408 17.8335 17.9591 17.6052 18.3654 17.1989C18.7717 16.7926 19 16.2415 19 15.6668V10.6152Z"
                fill="white"
              />
            </svg>
            <a
              href="mailto:comercial@grupoomega.co"
              className="text-white hover:underline transition-all duration-300"
            >
              correohannu@gmail.com
            </a>
          </div>
          <div className="flex justify-center items-center gap-x-2">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6672 15.239L15.7866 14.1191C15.9374 13.9702 16.1282 13.8682 16.3358 13.8256C16.5433 13.783 16.7588 13.8016 16.956 13.8792L18.3203 14.4241C18.5196 14.505 18.6905 14.6432 18.8115 14.8211C18.9324 14.999 18.998 15.2088 19 15.424V17.9237C18.9988 18.0701 18.9681 18.2147 18.9096 18.3489C18.8511 18.4831 18.766 18.604 18.6596 18.7044C18.5531 18.8048 18.4275 18.8827 18.2901 18.9332C18.1528 18.9838 18.0067 19.006 17.8606 18.9986C8.30048 18.4037 6.37147 10.3046 6.00666 7.20489C5.98972 7.05267 6.00519 6.8986 6.05206 6.75279C6.09892 6.60699 6.17611 6.47277 6.27855 6.35895C6.38099 6.24513 6.50636 6.15431 6.64641 6.09244C6.78645 6.03058 6.93801 5.99908 7.0911 6.00002H9.50486C9.72026 6.00066 9.93054 6.06575 10.1087 6.18691C10.2868 6.30808 10.4246 6.47979 10.5044 6.67995L11.0491 8.0448C11.1292 8.24131 11.1496 8.45707 11.1078 8.66514C11.066 8.8732 10.9639 9.06433 10.8142 9.21467L9.69477 10.3345C9.69477 10.3345 10.3394 14.6991 14.6672 15.239Z"
                fill="white"
              />
            </svg>
            <span className="text-white">320 - 303 -7321</span>
          </div>
        </div>
        <div className="flex gap-10">
          <a href="www.facebook.com" target="_blank">
            <img
              src={facebookIcon.src}
              className="hover:scale-105 transition-all cursor-pointer"
              alt=""
            />
          </a>
          <a href="www.facebook.com" target="_blank">
            <img
              src={Insta.src}
              className="hover:scale-105 transition-all cursor-pointer"
              alt=""
            />
          </a>
        </div>
      </div>

      <div className="pt-20 md:hidden"></div>
    </div>
  );
};

export default Footer;
