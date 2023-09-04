import Image from "next/image"
import ubication from '../../../src/assets/noCampanias/noUbicacion.svg'
import search from '../../../src/assets/noCampanias/Buscar.svg'

interface Sentence {
    filtered: boolean
}
const NothingCampaigns = ({ filtered }: Sentence) => {

    let sentence: string
    let imgSentence

    if (filtered) {
        sentence = 'Lo sentimos en el momento no tenemos campañas compatibles con estos filtros, esperamos poder ofrecerte campañas pronto.'
        imgSentence = search
    } else {
        sentence = 'Lo sentimos en el momento no tenemos campañas compatibles con tu ubicación, esperamos poder ofrecerte campañas pronto.'
        imgSentence = ubication
    }

    return (
        <div className="flex justify-center items-center w-full h-[80vh]">
            <div className="flex flex-col justify-center items-center text-center w-72 ml:w-[350px] ml:text-[20px] md:w-textNoCampaigns p-2.5 bg-inset bg-clip-text text-transparent text-tittle md:text-points md:font-medium font-semibold">
                <div className="relative w-14 md:w-20 h-14 md:h-20 mb-2.5">
                    <Image src={imgSentence} alt='icono no ubicacion' layout='fill'></Image>
                </div>
                <p>{sentence}
                </p>
            </div>
        </div>

    )
}

export default NothingCampaigns