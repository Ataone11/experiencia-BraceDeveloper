import Image from "next/image"
import Puntos from "../rifas/puntos"
import left from "../../assets/header/LogOutSlider.svg"
import Exit from "../../assets/header/Salida.svg"
import { SetStateAction, useEffect, useState } from "react"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { signOutWithAmazon } from "../../redux/actions/authActions"
import ImageWithFallback from "../ImageWithFallback"

interface state {
    open: boolean,
    setOpen: (value: SetStateAction<boolean>) => void,
    perfil: any
}

const ModalHeader = ({ open, setOpen, perfil }: state) => {

    const dispatch = useDispatch();
    const [show, setShow] = useState(false)
    let openHandle: string
    let bg: string
    let hidden = "w-full h-full"
    const close = () => {
        setOpen(false)
    }
    if (show) {
        openHandle = 'bg-Slider rounded-l-3xl bg-cover bg-no-repeat fixed top-0 right-0 h-screen z-50 w-80 md:w-[411px]  p-6 md:p-[30px] overflow-hidden overflow-y-auto text-white transition-transform no-scrollbar'
        bg = "bg-black/25 w-screen h-screen fixed top-0 left-0 z-10 transition-opacity"
        hidden = "w-full h-full"
    } else {
        openHandle = 'bg-Slider rounded-l-3xl bg-cover bg-no-repeat fixed top-0 right-0 h-screen z-50 w-80 md:w-[411px]  p-6 md:p-[30px] overflow-hidden overflow-y-auto text-white transition-transform no-scrollbar translate-x-80 md:translate-x-[411px]'
        bg = "bg-black/0 w-0 h-screen fixed top-0 right-0 z-10 transition-opacity"
        hidden = "w-full h-full"
    }
    useEffect(() => {
        if (open) {
            setShow(true)
        } else {
            setShow(false)
        }
    }, [open])

    return (
        <div className={bg} onClick={close}>
            <div id="slider" className={openHandle}>
                <div className={hidden}>
                    <div onClick={close} className="w-fit cursor-pointer">
                        <Image src={Exit} alt='Salir'></Image>
                    </div>
                    <div className="flex justify-between items-center my-8 md:my-14">
                        <div>
                            <h1 className="text-rifaSize font-semibold py-1">{perfil.nombre}</h1>
                            <h3 className="text-tittle md:text-points font-medium py-1">{perfil.apellido}</h3>
                        </div>
                        <div className="w-[122px] md:w-[135px] md:h-[135px] h-[122px] bg-white rounded-full drop-shadow-circleCampaing relative overflow-hidden">
                            <ImageWithFallback layout="fill" src={perfil.urlFoto}/>
                        </div>
                    </div>
                    <Puntos color='white' text='tittleM' mdText='tittle' p='2'></Puntos>
                    <nav className="p-[30px] pt-5 md:p-10 md:pt-[30px] border-b-2 border-gray-200/75">
                        <Link href={'/profile'}>
                            <a >
                                <div className="mb-2.5 px-13 py-2 text-center bg-primary rounded-md shadow-points">
                                    <span>Ver perfil</span>
                                </div>
                            </a>
                        </Link>

                        <Link href={'/rifas'}>
                            <a>
                                <div className="px-13 py-2 text-center text-primary bg-white rounded-md shadow-points">
                                    <span>Rifas</span>
                                </div>
                            </a>
                        </Link>
                    </nav>
                    <div className="py-[30px] md:py-[35px] flex justify-end">
                        <button className="underline text-tittleM md:text-tittle font-normal" onClick={() => signOutWithAmazon(dispatch)}>Cerrar sesión</button>
                        <div className="relative w-[15px] md:w-[20px] md:h-[20px] h-[15px] ml-2">
                            <Image src={left} alt='Salir' layout="fill"></Image>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalHeader