import Image from "next/image";

const Footer = (props: any) => {

    const logo = require('../../../src/assets/logotipo/Logotipo.svg');
    const whatsappIconS = require('../../../src/assets/Icons/whatsapp.svg');
    const facebookIconS = require('../../../src/assets/Icons/facebook.svg');
    const instagramIconS = require('../../../src/assets/Icons/Instagram.svg');
    const twitterIconS = require('../../../src/assets/Icons/twitter.svg');
    const correo = require('../../../src/assets/Icons/correo.svg');

    return (
        <footer className="mt-auto lg:flex lg:justify-between lg:px-10 lg:h-28 grid place-items-center mx-auto w-full lg:w-full text-text">
            <div className="flex items-center lg:justify-start justify-center h-full pb-2.5 w-full lg:pb-0 lg:w-2/3 border-b-0.5 lg:border-b-0 lg:border-r-0.5 border-border">
                <div className="relative w-40 h-5 md:w-60 md:h-8">
                    <Image src={logo} alt="logotipo" layout="fill" />
                </div>
            </div>
            <div className="flex flex-col justify-center  h-full w-full border-b-0.5 lg:border-b-0 lg:border-r-0.5 border-border lg:w-3/4">
                <div className="py-2.5 lg:pt-0 text-center text-tittleM lg:text-tittle">
                    <span>Contacto</span>
                </div>
                <div className="pb-2.5 text-center text-tittleM text-footerGrey lg:text-rifaDateSize">
                    <a href="https://api.whatsapp.com/send?phone=+573112227624&text=Hola+Go+Amplify%2C+tengo+una+pregunta%3F"
                        target="_blank" rel="noreferrer" className="flex justify-center h-4 mb-1 w-fit mx-auto"><Image src={whatsappIconS} alt="whatsappIcon" height="11.78px" width="11.78px" /><span className="mx-1">+57 311 222 7624</span></a>
                    <p className="flex justify-center h-4"><Image src={correo} alt="whatsappIcon" height="10.67px" width="13.64px" /><span className="mx-1">contacto@goamplify.me</span></p>
                </div>
            </div>
            <div className="flex flex-col justify-center h-full w-full border-b-0.5 lg:border-b-0 lg:border-r-0.5 border-border lg:w-1/2">
                <div className="py-2.5 lg:pb-8 lg:pt-0 text-center text-tittleM lg:text-tittle">
                    <span>Instragram</span>
                </div>
                <div className="pb-2.5 text-center text-tittleM">
                    <div className="flex justify-center items-center">
                        <div className="">
                            <a href="https://www.instagram.com/goamplifyme" target="_blank" rel="noopener noreferrer" title="instagram">
                                <div className="relative w-4 h-4  md:w-5 md:h-5">
                                    <Image src={instagramIconS} alt="whatsappIcon" layout="fill" />
                                </div>
                            </a>
                        </div>
                        {/* <div className="px-4" >
                            <a href="#" target="_blank" rel="noopener noreferrer" title="facebook">
                            <div className="relative w-4 h-4  md:w-5 md:h-5">
                                <Image src={facebookIconS} alt="whatsappIcon" layout="fill"/>
                            </div>
                            </a>
                        </div>
                        <div >
                            <a href="#" target="_blank" rel="noopener noreferrer" title="twitter">
                            <div className="relative w-4 h-4  md:w-5 md:h-5">
                                <Image src={twitterIconS} alt="whatsappIcon" layout="fill"/>
                            </div>
                            </a>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="lg:w-1/2 lg:flex lg:justify-end">
                <div className="pt-2.5 lg:pt-0 text-center text-tittleMinM lg:text-rifaDateSize text-footerGrey">
                    <p className="mb-1"><a href="#" rel="noopener noreferrer"><span>Terminos y Condiciones</span></a></p>
                    <p><a href="#" rel="noopener noreferrer"><span>Politica de privacidad</span></a></p>
                </div>
            </div>
        </footer>
    )

}

export default Footer;