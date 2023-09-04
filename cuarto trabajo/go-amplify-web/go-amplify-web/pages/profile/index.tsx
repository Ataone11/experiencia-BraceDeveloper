import React from 'react';
import Link from "next/link";
import Image from "next/image";
import arrow_blue from "../../src/screens/general/login/arrow-blue.svg";
import instagram from "../../src/screens/general/icons/instagram.svg";
import documento from "../../src/screens/general/icons/identifiicacion.svg";
import ubicacion from "../../src/screens/general/icons/ubicacion.svg";
import mail from "../../src/screens/general/icons/mail.svg";
import Location from "../../src/screens/general/icons/Location.svg";
import edit from "../../src/screens/general/icons/Edit.svg";
import left from "../../src/screens/general/icons/left.svg";
import right from "../../src/screens/general/icons/rigth.svg";
import { useSelector } from "react-redux";
import MoonLoader from "react-spinners/MoonLoader";
import { S3_BUCKET_URL } from "../../src/utils/constants";
import moment from "moment";
import { selectUser } from '../../src/redux/reducers/authReducer';
import BasePage from '../../src/screens/general/base/BasePage';
import Logo from "../../src/assets/logotipo/Logotipo.png"

const Profile = () => {

    moment.locale('es');
    require('moment/locale/es');

    const date = new Date();

    const user = useSelector(selectUser);

    function completed_move(sentido: string) {
        const completas = document.getElementById('completas');
        if (sentido == "D") {
            completas ? completas.scrollLeft -= 200 : null;
        }
        if (sentido == "I") {
            completas ? completas.scrollLeft += 200 : null;
        }
    }

    function active_move(sentido: string) {
        const activas = document.getElementById('activas');
        if (sentido == "D") {
            activas ? activas.scrollLeft -= 200 : null;
        }
        if (sentido == "I") {
            activas ? activas.scrollLeft += 200 : null;
        }
    }

    //Lista para mostrar nombre del mes en lugar de su numeracion
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    //retorna el semestre en el que estamos enviandoles el mes
    function semester(mes: number) {
        if (mes <= 6) {
            return 1
        }
        return 2
    }

    //cambia el formato de los Amplifer con mas de mil seguidores
    function followersFormat(followers: number) {
        if (followers > 999) {
            return (followers / 1000).toFixed(1) + "k"
        }
        return followers
    }

    return (
        <BasePage>
            {
                !user ?
                    <div className="flex justify-center items-center h-screen">
                        <MoonLoader color="#425AC5" />
                    </div> :
                    <div className="flex flex-col items-center min-w-[300px]">
                        <div className="flex flex-row justify-center lg:absolute lg:justify-start lg:w-11/12 lg:max-w-full w-full max-w-lg items-center pt-3">
                            <Link href='/'>
                                <div className="cursor-pointer relative z-10 top-1 right-1/3 lg:left-0 lg:top-2">
                                    <Image src={arrow_blue} />
                                </div>
                            </Link>
                            <div className="absolute z-10 text-primary text-[25px] lg:hidden">
                                <h1>Perfil</h1>
                            </div>
                        </div>
                        <div className="relative rounded-2xl lg:flex lg:flex-row lg:justify-around p-4 mt-5 w-11/12 max-w-md lg:max-w-4xl shadow-[0_5px_15px_0_rgba(0,0,0,0.2)]">
                            <div className="absolute right-4 lg:right-0 lg:flex lg:flex-col lg:items-center lg:relative">
                                {
                                    !user.URLfoto
                                        ? <div style={{ backgroundImage: `url('${S3_BUCKET_URL}${user.urlFoto}')` }} className="min-w-[62px] min-h-[62px] lg:w-[122px] lg:h-[122px] rounded-full bg-cover bg-center shadow-[0_0_5px_0_rgba(0,0,0,0.2)]" />
                                        : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#425AC5"
                                            className="w-[122px] h-[122px] rounded-full bg-cover bg-center shadow-[0_0_5px_0_rgba(0,0,0,0.2)]">
                                            <path d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                        </svg>

                                }
                                <div className="text-center text-transparent bg-clip-text bg-gradient-to-r from-[#9955D4] to-[#425AC5] font-bold">{followersFormat(user.seguidores)}</div>
                                <div className="text-primary text-[25px] font-[600] hidden lg:flex">{user.nombres}</div>
                                <div className="text-[#9955D4] text-[15px] mb-1 hidden lg:flex">{user.apellidos}</div>
                            </div>
                            <div className="w-[2px] h-[274] bg-gray-300" />
                            <div>
                                <div className="flex flex-col">
                                    <div className="text-primary text-[25px] font-[600] lg:hidden">{user.nombres}</div>
                                    <div className="text-[#9955D4] text-[15px] mb-1 lg:hidden">{user.apellidos}</div>
                                    <div className="flex flex-row lg:my-[1px]">
                                        <div className="relative -top-[2px]"><Image src={instagram} /></div>
                                        <div className="ml-2 text-[12px] mb-1">@{user.instagram}</div>
                                    </div>
                                    <div className="flex flex-row lg:my-[1px]">
                                        <div className="relative -top-[2px]"><Image src={documento} /></div>
                                        <div className="ml-2 text-[12px] mb-1">{user.tipoDocumento.nombre} {user.documento}</div>
                                    </div>
                                    <div className="flex flex-row lg:my-[1px]">
                                        <div className="relative -top-[2px]"><Image src={ubicacion} /></div>
                                        <div className="ml-2 text-[12px] mb-1">{user.ciudad.nombre}</div>
                                    </div>
                                    <div className="flex flex-row lg:my-[1px]">
                                        <div className="relative -top-[2px]"><Image src={Location} /></div>
                                        <div className="ml-2 text-[12px] mb-1">{user.direccion}</div>
                                    </div>
                                    <div className="flex flex-row lg:my-[1px]">
                                        <div className="relative -top-[2px]"><Image src={mail} /></div>
                                        <div className="ml-2 text-[12px] mb-1">{user.correo}</div>
                                    </div>
                                    <Link href={"/profile-edit"}>
                                        <div className="cursor-pointer lg:hidden flex flex-row justify-between text-[10px] h-7  items-center px-2 text-white rounded-md bg-gradient-to-r from-[#9955D4] to-[#425AC5]">
                                            <div>Editar perfil</div>
                                            <div className="relative top-[1px]"><Image src={edit} /></div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="lg:hidden bg-gray-300 h-[1px] rounded-full my-2" />
                                <div className="flex flex-col lg:flex-row lg:items-center lg:mt-2">
                                    <div className="text-[12px] lg:mr-4 text-transparent bg-clip-text bg-gradient-to-r from-[#9955D4] to-[#425AC5]">Tus puntos</div>
                                    <div className="flex flex-row justify-between lg:w-52 px-3">
                                        <div className="text-center">
                                            <div className="text-[15px] text-transparent bg-clip-text bg-gradient-to-r from-[#9955D4] to-[#425AC5] font-bold">{user.puntosMes == null ? 0 : user.puntosMes}</div>
                                            <div className="text-[12px] text-gray-500">{monthNames[date.getMonth()]}</div>
                                            <div className="text-[10px] text-gray-500">Mes</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-[15px] text-transparent bg-clip-text bg-gradient-to-r from-[#9955D4] to-[#425AC5] font-bold">{user.puntosSemestre == null ? 0 : user.puntosSemestre}</div>
                                            <div className="text-[12px] text-gray-500">{date.getFullYear()}-{semester(date.getMonth())}</div>
                                            <div className="text-[10px] text-gray-500">Semestre</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-[15px] text-transparent bg-clip-text bg-gradient-to-r from-[#9955D4] to-[#425AC5] font-bold">{user.puntosAnio == null ? 0 : user.puntosAnio}</div>
                                            <div className="text-[12px] text-gray-500">{date.getFullYear()}</div>
                                            <div className="text-[10px] text-gray-500">Año</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link href={"/profile-edit"}>
                                <div className="cursor-pointer hidden lg:flex lg:justify-center text-[10px] h-7 w-9  items-center px-2 text-white rounded-md bg-gradient-to-r from-[#9955D4] to-[#425AC5]">
                                    <div className="relative top-[1px]"><Image src={edit} /></div>
                                </div>
                            </Link>
                        </div>
                        <div className="pt-4 lg:max-w-4xl w-full">
                            <div className="text-[15px] text-primary ml-4 font-[500]">Activas ({user.campañasActivas.length})</div>
                            {
                                user.campañasActivas.length != 0 ?
                                    <div>
                                        <div id="activas" className="flex flex-row w-screen overflow-x-scroll lg:scroll-smooth lg:overflow-x-hidden lg:w-full pl-2 min-w-[300px]">
                                            {user.campañasActivas.map((campaing: any) => {
                                                return (
                                                    <Link href={{
                                                        pathname: `/campaigns/${campaing['campaña']['id']}`
                                                    }} key={campaing['campaña']['id']}>
                                                        <div className="w-[142px] h-[113px] min-w-[142px] lg:w-[190px] lg:h-[152px] lg:min-w-[190px] m-2 rounded-md shadow-[0_0_5px_0_rgba(0,0,0,0.2)] cursor-pointer" key={campaing['campaña']['titulo']}>
                                                            <div className="whitespace-nowrap rounded-md shadow-[0_2px_5px_0_rgba(0,0,0,0.2)]">
                                                                <div style={{ backgroundImage: `url('${S3_BUCKET_URL}${campaing['campaña']['imgCampania']}'), url(${Logo.src})` }} className={"h-[90px] lg:h-[120px] rounded-md flex flex-col-reverse text-center text-white bg-cover bg-center shadow-[inset_0_-20px_5px_0_rgba(0,0,0,0.2)]"}>{campaing['campaña']['titulo']}</div>
                                                            </div>
                                                            <div className="w-full flex justify-center pt-1 text-[14px] text-[#9955D4] truncate">
                                                                {campaing['campaña']['instrucciones']}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                        {user.campañasActivas.length > 4 || user.campañasTerminadas.length > 4 ?
                                            <div className="hidden lg:flex lg:justify-between h-1">
                                                <button className="relative -top-24" onClick={() => active_move("D")}><Image src={left} /></button>
                                                <button className="relative -top-24" onClick={() => active_move("I")}><Image src={right} /></button>
                                            </div> : null
                                        }
                                    </div>
                                    : <div className="h-20 text-center flex items-center justify-center text-gray-400 px-8">Actualmente no tienes ninguna campaña activa</div>
                            }
                            <div className="text-[15px] text-primary ml-4 font-[500] pt-3">Completadas ({user.campañasTerminadas.length})</div>
                            {
                                user.campañasTerminadas.length != 0 ?
                                    <div>
                                        <div id="completas" className=" my-5 flex flex-row w-screen lg:min-w-[1000px] lg:overflow-x-scroll lg:scroll-smooth lg:overflow-x-hidden lg:w-full pl-2 min-w-[300px]">
                                            {user.campañasTerminadas.map((campaing: any) => {
                                                return (
                                                    <Link href={{
                                                        pathname: `/campaigns/${campaing['campaña']['id']}`
                                                    }} key={campaing['campaña']['id']}>
                                                        <div className="w-[142px] h-[113px] min-w-[142px] lg:w-[190px] lg:h-[152px] lg:min-w-[190px] m-2 rounded-md shadow-[0_0_5px_0_rgba(0,0,0,0.2)] cursor-pointer" key={campaing['campaña']['titulo']}>
                                                            <div className="whitespace-nowrap rounded-md shadow-[0_2px_5px_0_rgba(0,0,0,0.2)]">
                                                                <div style={{ backgroundImage: `url('${S3_BUCKET_URL}${campaing['campaña']['imgCampania']}'), url(${Logo.src})` }} className={"h-[90px] lg:h-[120px] rounded-md flex flex-col-reverse text-center text-white bg-cover bg-center shadow-[inset_0_-20px_5px_0_rgba(0,0,0,0.2)]"}>{campaing['campaña']['titulo']}</div>
                                                            </div>
                                                            <div className="w-full flex justify-center pt-1 text-[14px] text-[#9955D4]">
                                                                {moment(campaing['fecha_finalizacion']).format("L")}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                        {user.campañasActivas.length > 4 || user.campañasTerminadas.length > 4 ?
                                            <div className="hidden lg:flex lg:justify-between h-1">
                                                <button className="relative -top-24" onClick={() => completed_move("D")}><Image src={left} /></button>
                                                <button className="relative -top-24" onClick={() => completed_move("I")}><Image src={right} /></button>
                                            </div> : null
                                        }
                                    </div>
                                    : <div className="h-20 text-center flex items-center justify-center text-gray-400 px-8 my-5">Actualmente no tienes ninguna campaña completada</div>
                            }

                        </div>
                    </div>
            }
        </BasePage>

    )
}

export default Profile