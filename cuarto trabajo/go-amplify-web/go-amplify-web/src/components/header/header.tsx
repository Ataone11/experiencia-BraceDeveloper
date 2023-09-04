import Image from "next/image";
import logo from "../../assets/logotipo/Logotipo.svg"

import ModalHeader from "./modalSlider";
import { SetStateAction, useEffect, useState } from "react";

import { selectUser } from "../../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { loadProfile } from "../../redux/actions/authActions";
import Search from "./buscar";
import Link from "next/link";
import ImageWithFallback from "../ImageWithFallback";

interface Set {
    setTextFilter?: (value: SetStateAction<string | null>) => void,
    setDateFilter?: (value: SetStateAction<string[] | null>) => void,
    setOrderFilter?: (value: SetStateAction<number | null>) => void,
    setTypeDateFilter?: (value: SetStateAction<number | null>) => void
}

const Header = ({ setTextFilter, setDateFilter, setOrderFilter, setTypeDateFilter }: Set) => {
    const profile = useSelector(selectUser)
    const [open, setOpen] = useState(false)
    const [filterDesktop, setFilterDesktop] = useState(null);

    return (
        profile &&
        <>
            <header className="w-full h-fit rounded-b-2xl px-5 py-4 md:py-7 md:px-10 shadow-header mb-2.5 md:mb-5 relative z-30 bg-white">
                <div className="flex justify-between items-center h-10">
                    <Link href={"/"}>
                        <div className="relative w-40 h-5 md:w-60 md:h-8 z-10 cursor-pointer">
                            <Image src={logo} alt='GoAmplifyMe' layout="fill"></Image>
                        </div>
                    </Link>
                    <div className="flex justify-end w-40 md:w-60 relative z-10">
                        <div className="flex items-center cursor-pointer" onClick={() => { setOpen(!open) }}>
                            <h5 className="text-primary text-tittleMinM md:text-rifaDateSize mr-1.5 md:mr-3">{profile.puntos_totales || 0} pts</h5>
                            <div className="w-8 h-8 md:w-10 md:h-10  bg-white rounded-full drop-shadow-circleCampaing relative overflow-hidden">
                                <ImageWithFallback layout="fill" src={profile.urlFoto} />
                            </div>
                        </div>
                    </div>
                    <ModalHeader open={open} setOpen={setOpen} perfil={profile}></ModalHeader>
                </div>
                <Search setFilterDesktop={setFilterDesktop} Text={setTextFilter} SetDateFilter={setDateFilter} setOrderFilter={setOrderFilter} setTypeDateFilter={setTypeDateFilter}></Search>
            </header>
            {
                filterDesktop
            }
        </>
    );
}

export default Header;