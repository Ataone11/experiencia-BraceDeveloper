import Image from "next/image";
import whatsappIconS from '../../../src/assets/whatsappbutton/whatsapp.svg';

const Whatsapp = () => {

    return (
        <div className="fixed right-5 bottom-20 md:right-11 md:bottom-40 ">
            <a
                href="https://api.whatsapp.com/send?phone=+573112227624&text=Hola+Go+Amplify%2C+tengo+una+pregunta%3F"
                target="_blank"
                rel="noopener noreferrer"
                title="whatsapp"
            >
                <div className="bg-white w-11 md:w-16 md:h-16 h-11 p-2.5 md:p-4 shadow-points rounded-full">
                    <Image src={whatsappIconS} alt="whatsappIcon" height="100%" width="100%" />
                </div>
            </a>
        </div>
    );
}

export default Whatsapp;