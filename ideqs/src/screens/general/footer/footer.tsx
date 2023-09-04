import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../../src/assets/general/ID Mobile.svg'
import whatsappIconS from '../../../../src/assets/general/whtsp.svg'
import facebookIconS from '../../../../src/assets/general/facebook.svg'
import instagramIconS from '../../../../src/assets/general/instagram.svg'
import twitterIconS from '../../../../src/assets/general/twiter.svg'
import link from '../../../../src/assets/general/Linkedin.svg'
import instrucciones from '../../../../src/assets/general/instrucciones.svg'
import idqsm from '../../../../src/assets/general/idqsm.png'

const Footer = () => {
  return (
    <footer className="mt-auto md:flex md:px-10 md:h-[65px] bg-azulPrimaryDark place-items-center mx-auto w-full  bottom-0 fixed ">
      <div className="flex items-center md:justify-start justify-center h-full py-[0.312rem] w-full md:pb-0 md:w-[132px] border-b-0.5 md:border-b-0 md:border-r-0.5 border-border">
        <div className="hidden md:flex relative w-40 h-5 md:w-30 md:h-8">
          <Image
            src={logo}
            alt="logotipo"
            width={132}
            height={26}
            layout="fixed"
          />
        </div>
        <div className="md:hidden flex relative items-center h-full">
          <Image src={idqsm} alt="logotipo" layout="fixed" />
        </div>
      </div>
      <div className="hidden md:container md:flex md:mx-auto  justify-center h-full w-[175px] items-center ">
        <Image
          src={instrucciones}
          alt="logotipo"
          width={171}
          height={40}
          layout="fixed"
        />
      </div>

      <div className="hidden md:flex justify-center md:justify-end h-full w-[200px] items-center gap-5">
        <Link
          target={'_blank'}
          shallow
          href={'https://www.instagram.com/ideqs_sas/'}
        >
          <a target="_blank">
            <Image
              src={instagramIconS}
              alt="whatsappIcon"
              width={28}
              height={28}
              layout="fixed"
              className=" cursor-pointer"
            />
          </a>
        </Link>
        <Link
          target={'_blank'}
          shallow
          href={'https://www.facebook.com/IDEQS/'}
        >
          <a target="_blank">
            <Image
              src={facebookIconS}
              alt="whatsappIcon"
              width={21}
              height={21}
              className=" cursor-pointer"
              layout="fixed"
            />
          </a>
        </Link>

        <Link target={'_blank'} shallow href={'https://twitter.com/Ideqs_sas'}>
          <a target="_blank">
            <Image
              src={twitterIconS}
              alt="whatsappIcon"
              width={25}
              height={21}
              className=" cursor-pointer"
              layout="fixed"
            />
          </a>
        </Link>

        <Link
          target={'_blank'}
          href={'https://www.linkedin.com/company/ideqssas/'}
          shallow
        >
          <a target="_blank">
            <Image
              src={link}
              alt="whatsappIcon"
              width={28}
              height={28}
              className=" cursor-pointer"
              layout="fixed"
            />
          </a>
        </Link>

        <Link
          href={
            'https://api.whatsapp.com/send/?phone=573102332112&text&type=phone_number&app_absent=0'
          }
          target={'_blank'}
          shallow
        >
          <a target="_blank">
            <Image
              src={whatsappIconS}
              alt="whatsappIcon"
              width={21}
              height={21}
              className=" cursor-pointer"
              layout="fixed"
            />
          </a>
        </Link>
      </div>
    </footer>
  )
}

export default Footer
