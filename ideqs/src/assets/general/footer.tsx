import Image from 'next/image'

import logo from '../../../../src/assets/ID Mobile.svg'
import whatsappIconS from '../../../../src/assets/whtsp.svg'
import facebookIconS from '../../../../src/assets/facebook.svg'
import instagramIconS from '../../../../src/assets/instagram.svg'
import twitterIconS from '../../../../src/assets/twiter.svg'
import link from '../../../../src/assets/Linkedin.svg'
import instrucciones from '../../../../src/assets/instrucciones.svg'

const Footer = () => {
  return (
    <footer className="mt-auto z-50 lg:flex lg:justify-between lg:px-10 lg:h-[65px] bg-complementar place-items-center mx-auto w-full  bottom-0 fixed">
      <div className="flex items-center lg:justify-start justify-center h-full pb-2.5 w-full lg:pb-0 lg:w-2/3 border-b-0.5 lg:border-b-0 lg:border-r-0.5 border-border">
        <div className="relative w-40 h-5 lg:w-60 lg:h-8">
          <Image
            src={logo}
            alt="logotipo"
            width={132}
            height={26}
            layout="fixed"
          />
        </div>
      </div>
      <div className="flex  justify-center h-full w-full items-center ">
        <Image
          src={instrucciones}
          alt="logotipo"
          width={171}
          height={40}
          layout="fixed"
        />
      </div>

      <div className="flex  justify-end h-full w-full items-center gap-5">
        <Image
          src={instagramIconS}
          alt="whatsappIcon"
          width={28}
          height={28}
          layout="fixed"
        />
        <Image
          src={facebookIconS}
          alt="whatsappIcon"
          width={21}
          height={21}
          layout="fixed"
        />
        <Image
          src={twitterIconS}
          alt="whatsappIcon"
          width={25}
          height={21}
          layout="fixed"
        />
        <Image
          src={link}
          alt="whatsappIcon"
          width={28}
          height={28}
          layout="fixed"
        />
        <Image
          src={whatsappIconS}
          alt="whatsappIcon"
          width={21}
          height={21}
          layout="fixed"
        />
      </div>
    </footer>
  )
}

export default Footer
