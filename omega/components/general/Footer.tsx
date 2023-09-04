import Image from 'next/image'
import Link from 'next/link'
import logoOmegaWhite from '../../assets/icons/logoWhite.svg'
import facebookIcon from '../../assets/icons/facebookIcon.svg'
import twitterIcon from '../../assets/icons/twitterIcon.svg'
import InstaIcon from '../../assets/icons/InstaIcon.svg'
import TikTokIcon from '../../assets/icons/tiktokIcon.svg'

const Footer = () => {
  return (
    <div className="bg-redOmega px-10  mt-auto">
      <div className="max-w-[1550px] mx-auto w-full relative flex flex-col lg:flex-row space-y-3 justify-center lg:justify-between items-center py-3">
        <div className="flex flex-col justify-center items-center lg:justify-start md:items-start">
          <div className="relative w-[150px] h-[100px]">
            <Image src={logoOmegaWhite} layout="fill" />
          </div>
          <div className="text-white hidden flex-col justify-center items-center md:justify-start md:items-start lg:flex">
            <span>Copyright ©2021 OMEGA SEGUROS.</span>
            <a href='https://omega-strapi-files.s3.amazonaws.com/POLITICA_DE_TRATAMIENTO_DE_DATOS_PERSONALES_43d3964292.pdf?updated_at=2022-05-24T17:25:44.211Z' target="_blank" rel="noreferrer" className="underline">*Política de privacidad</a>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start gap-3">
          <div className="flex justify-center items-center gap-x-2">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 5C10.7767 5.00197 9.1246 5.66484 7.90606 6.84321C6.68751 8.02159 6.00204 9.61924 6.00001 11.2857C5.99794 12.6476 6.45795 13.9724 7.30946 15.0571C7.30946 15.0571 7.48673 15.2829 7.51569 15.3154L12.5 21L17.4867 15.3126C17.5127 15.2823 17.6905 15.0571 17.6905 15.0571L17.6911 15.0554C18.5422 13.9712 19.002 12.6469 19 11.2857C18.998 9.61924 18.3125 8.02159 17.0939 6.84321C15.8754 5.66484 14.2233 5.00197 12.5 5V5ZM12.5 13.5714C12.0325 13.5714 11.5755 13.4374 11.1868 13.1862C10.7981 12.9351 10.4952 12.5781 10.3163 12.1604C10.1374 11.7428 10.0906 11.2832 10.1818 10.8398C10.273 10.3964 10.4981 9.98913 10.8287 9.66947C11.1592 9.34981 11.5804 9.13211 12.0389 9.04392C12.4974 8.95572 12.9726 9.00099 13.4045 9.17399C13.8364 9.34699 14.2056 9.63996 14.4653 10.0158C14.725 10.3917 14.8636 10.8336 14.8636 11.2857C14.8629 11.8917 14.6136 12.4726 14.1705 12.9011C13.7274 13.3296 13.1266 13.5707 12.5 13.5714V13.5714Z"
                fill="white"
              />
            </svg>
            <Link href="/contacto">
              <a className="text-white text-center hover:underline transition-all duration-300">
                Carrera 30 41A-88 Barrio La Grama, Villavicencio.
              </a>
            </Link>
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
              comercial@grupoomega.co
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
            <span className="text-white">350 657 9596</span>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <a href="https://vm.tiktok.com/ZMLyxRTXo/" target="_blank" rel='noreferrer'>
          <img
              src={TikTokIcon.src}
              className="hover:scale-105 transition-all cursor-pointer"
              alt=""
            />
          </a>
          <a href="https://www.facebook.com/omegasegurosco" target="_blank" rel='noreferrer'>
            <img
              src={facebookIcon.src}
              className="hover:scale-105 transition-all cursor-pointer"
              alt=""
            />
          </a>
          <a href="https://twitter.com/omegasegurosco" target="_blank" rel='noreferrer'>
            <img
              src={twitterIcon.src}
              className="hover:scale-105 transition-all cursor-pointer"
              alt=""
            />
          </a>
          <a href="https://www.instagram.com/omegasegurosco" target="_blank" rel='noreferrer'>
            <img
              src={InstaIcon.src}
              className="hover:scale-105 transition-all cursor-pointer"
              alt=""
            />
          </a>
        </div>
        <div className="flex gap-x-10 lg:hidden">
          <a href='https://omega-strapi-files.s3.amazonaws.com/POLITICA_DE_TRATAMIENTO_DE_DATOS_PERSONALES_43d3964292.pdf?updated_at=2022-05-24T17:25:44.211Z' target="_blank" rel="noreferrer" className="underline text-center text-white text-extraSmall md:text-small">
            Política de privacidad
          </a>
          <span className="text-white text-center font-light text-extraSmall md:text-small">
            Copyright ©2021 OMEGA SEGUROS.
          </span>
        </div>
      </div>
    </div>
  )
}

export default Footer
