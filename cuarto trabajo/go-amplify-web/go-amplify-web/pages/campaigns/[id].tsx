import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { S3_BUCKET_URL } from "../../src/utils/constants";
import cross from '../../src/screens/general/login/cross.svg';
import arrow from "../../src/screens/general/login/arrow.svg";
import check from "../../src/screens/general/login/check.svg";
import add from "../../src/screens/general/icons/add.svg";
import del from "../../src/screens/general/icons/delete.svg";
import edit from "../../src/screens/general/icons/editBlue.svg";
import instagram from '../../src/screens/general/icons/instagramBold.svg'
import ScaleLoader from "react-spinners/ScaleLoader";
import {
    uploadScreenshotsCampaign,
    detailCampaign,
    signUpCampaign,
} from "../../src/redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { USER_CAMPAIGN_STATES } from "../../src/utils/user-campaign-states";
import MoonLoader from "react-spinners/MoonLoader";
import moment from "moment";
import Horario from "../../src/components/horario/horario";
import EditLocation from "../../src/components/edit-location/edit-location";
import { useRouter } from "next/router";
import BasePage from "../../src/screens/general/base/BasePage";
import { capitalize } from "../../src/utils/stringHelperFunctions";
import Logo from "../../src/assets/logotipo/Logotipo.png"
import { selectUser } from '../../src/redux/reducers/authReducer';
import { toast } from 'react-toastify';

const Campaign = () => {

    moment.locale('es');
    require('moment/locale/es');

    const dispatch = useDispatch()
    const router = useRouter();

    const dateNow = moment(Date.now())

    const [loading, setLoading] = useState(true);
    const [loadRegister, setLoadRegister] = useState(false);
    const [loadScreenshots, setLoadScreenshots] = useState(false);

    const [idHorario, setIdHorario] = useState(0);

    const [showModal, setShowModal] = useState(false)
    const [showSample, setShowSample] = useState(false)
    const [showAddress, setShowAddress] = useState(false)
    const [showScreen, setShowScreen] = useState(true)
    const [final, setFinal] = useState(false)

    const { query: { id } } = useRouter()

    useEffect(() => {
        id ? loadCampaign(id.toString()) : null
    }, [id])

    const user = useSelector(selectUser);

    const [campaign, setCampaign] = useState<any>({
        id: 0,
        titulo: "",
        marca: "",
        fechaCierreInscripciones: "",
        cupos: 0,
        inscritos: 0,
        estado: 0,
        puntos: 0,
        requisitos: "",
        instrucciones: "",
        muestra: false,
        imgMuestra: "",
        imgCampania: "",
        urlInstagram: "",
        descripcion: null,
        horarios: [],
    })

    const [userCampania, setUserCampania] = useState<any>({
        estado: 0,
        fecha_inscripcion: "",
        horario: { fecha_hora: "", id: 0 },
        id: 0,
        pantallazos: [],
        puntos: 0,
        codigo: ""
    })
    const inscrito = userCampania.estado !== 0;
    const inscritos = campaign.inscritos
    const cupos = campaign.cupos
    const estado =  campaign.estado;

    function show() {
        setShowModal(true)
    }

    function close() {
        setShowSample(false)
        setShowAddress(false)
        setFinal(false)
    }

    async function loadCampaign(id: string) {
        detailCampaign(dispatch, id).then(res => {
            if (res.data.usuarioCampaña) {
                setCampaign({
                    id: res.data.id,
                    titulo: res.data.titulo,
                    marca: res.data.marca,
                    fechaCierreInscripciones: res.data.fechaCierreInscripciones,
                    cupos: res.data.cupos,
                    inscritos: res.data.inscritos,
                    puntos: res.data.puntos,
                    requisitos: res.data.requisitos,
                    instrucciones: res.data.instrucciones,
                    muestra: res.data.muestra,
                    imgMuestra: res.data.imgMuestra,
                    imgCampania: res.data.imgCampania,
                    urlInstagram: res.data.urlInstagram,
                    descripcion: res.data.descripcion,
                    horarios: res.data.horarios,
                    estado: res.data.estado,
                    materialGrafico: res.data.materialGrafico
                })
                setUserCampania({
                    estado: res.data.usuarioCampaña.estado,
                    fecha_inscripcion: res.data.usuarioCampaña.fecha_inscripcion,
                    horario: res.data.usuarioCampaña.horario,
                    id: res.data.usuarioCampaña.id,
                    pantallazos: res.data.usuarioCampaña.pantallazos,
                    puntos: res.data.usuarioCampaña.puntos,
                    codigo: res.data.usuarioCampaña.codigo?.codigo,
                    razon_rechazo_pantallazos: res.data.usuarioCampaña.razon_rechazo_pantallazos

                })
            } else {
                setCampaign({
                    ...campaign,
                    id: res.data.id,
                    titulo: res.data.titulo,
                    marca: res.data.marca,
                    estado: res.data.estado,
                    fechaCierreInscripciones: res.data.fechaCierreInscripciones,
                    cupos: res.data.cupos,
                    inscritos: res.data.inscritos,
                    puntos: res.data.puntos,
                    requisitos: res.data.requisitos,
                    instrucciones: res.data.instrucciones,
                    muestra: res.data.muestra,
                    imgMuestra: res.data.imgMuestra,
                    imgCampania: res.data.imgCampania,
                    urlInstagram: res.data.urlInstagram,
                    descripcion: res.data.descripcion,
                    horarios: res.data.horarios,
                })
            }
            setLoading(false);
        })
    }

    function next() {
        if (idHorario != 0) {
            if (campaign.muestra) {
                setShowAddress(true)
                setShowModal(false)
            } else {
                callSignUpCampaign()
            }
        }
    }

    function reset() {
        setFinal(false);
    }

    async function callSignUpCampaign() {
        setLoadRegister(true)

        const res: any = await signUpCampaign(dispatch, campaign.id, idHorario);
        if ((res.error)) {
            toast.error(res.error);
            return;
        }

        setUserCampania({
            estado: res.data.estado,
            fecha_inscripcion: res.data.fecha_inscripcion,
            horario: res.data.horario,
            id: res.data.id,
            pantallazos: res.data.pantallazos,
            puntos: res.data.puntos,
            codigo: res.data.codigo?.codigo
        })

        setShowAddress(false)
        setFinal(true)
        setShowModal(false)
        setLoadRegister(false)


    }

    async function uploadScreenshots() {
        setLoadScreenshots(true)
        const res = await uploadScreenshotsCampaign(dispatch, campaign.id, screenshots);
        setLoadScreenshots(false)

        window.location.reload()
    }

    const [sendingScreenshots, setSendingScreenshots] = useState(false)

    function screen() {
        if (userCampania.estado == USER_CAMPAIGN_STATES.PANTALLAZOS_RECHAZADOS) {
            setUserCampania({
                ...userCampania,
                estado: 3
            })
        }
        setSendingScreenshots(true)
        setTimeout(() => inputFile(), 300)
    }

    const [viewScreen, setViewScreen] = useState(<div></div>)

    function viewScreenShots(url: string) {
        setShowScreen(true)
        setViewScreen(
            <div
                onClick={() => setShowScreen(false)}
                className="fixed top-0 left-0 z-40 flex justify-center items-center w-screen h-screen bg-black bg-opacity-50">
                <div style={{ width: '100%', height: '400px', position: 'relative' }}>
                    <Image
                        src={url}
                        layout='fill'
                        objectFit='contain'
                    />
                </div>
            </div>)

    }

    const [screenshots, setScreenshots] = useState<File[]>([])

    function inputFile() {
        let file = document.getElementById("loadScreenshot")
        if (file) {
            file.click()
        }
    }

    function onChange(event: any) {

        const newScreenshots = [...screenshots]

        const files: FileList = event.target.files;

        for (var i = 0; i < files.length; i++) {
            newScreenshots.push(files[i]);
        }

        setScreenshots(newScreenshots)

    }

    function deleteScreenshot(name: string) {

        let newScreenshots = [...screenshots]

        newScreenshots = newScreenshots.filter((item) => item.name !== name)

        setScreenshots(newScreenshots)

    }

    function olderDate(horarios: any[]) {
        let date: any

        horarios.forEach((horario, index) => {
            if (index == 0) {
                date = moment(horario['fecha_hora'])
            }

            if (date < moment(horario['fecha_hora'])) {
                date = moment(horario['fecha_hora'])
            }
        })

        return date
    }

    function minorDate(horarios: any[]) {
        let date: any

        horarios.forEach((horario, index) => {
            if (index == 0) {
                date = moment(horario['fecha_hora'])
            }

            if (date > moment(horario['fecha_hora'])) {
                date = moment(horario['fecha_hora'])
            }
        })

        return date
    }

    return (
        <BasePage title={campaign?.titulo}>
            {
                loading ?
                    <div className="flex justify-center items-center h-screen">
                        <MoonLoader color="#425AC5" />
                    </div> :
                    <div>
                        <div className="flex flex-col lg:flex-row lg:justify-center lg:mt-7">
                            {
                                showModal ?
                                    <Horario
                                        campania={campaign}
                                        showModal={setShowModal}
                                        idHorario={setIdHorario}
                                        onSubmit={next}
                                        loading={loadRegister}
                                    /> : null
                            }
                            {
                                final ?
                                    <div
                                        className="fixed top-0 z-30 flex justify-center items-center w-screen h-screen bg-black bg-opacity-50">
                                        <div
                                            className="w-[284px] lg:w-[470px] rounded-[20px] bg-white bg-cover bg-center">
                                            <div onClick={close}
                                                className="p-5 w-full flex flex-row-reverse align-bottom cursor-pointer">
                                                <Image src={cross} />
                                            </div>
                                            <div className="text-primary text-center text-[24px] mb-4">
                                                ¡Felicidades!, estas inscrito
                                            </div>
                                            <div className="px-8 text-center text-[15px] text-gray-400">
                                                Espera tu horario de publicación y sigue las instrucciones
                                            </div>
                                            {userCampania.codigo ?
                                                <div className="px-8 text-center text-[15px] text-gray-400">
                                                    Tu codigo unico es {userCampania.codigo}
                                                </div> : null
                                            }
                                            <div className="flex justify-center my-4">
                                                <button onClick={() => router.push("/")}
                                                    className="bg-primary text-[15px] text-white w-[166px] h-[33px] rounded-[5px]">
                                                    Ir al inicio
                                                </button>
                                            </div>
                                            <div className="flex justify-center my-4">
                                                <button onClick={() => reset()}
                                                    className="bg-white border-2 border-primary text-primary text-[15px] w-[166px] h-[33px] rounded-[5px]">
                                                    Aceptar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    : null

                            }
                            {
                                showSample ?
                                    <div
                                        className="fixed top-0 z-30 flex justify-center items-center w-screen h-screen bg-black bg-opacity-50">
                                        <div
                                            className="w-[284px] h-[350px] rounded-[20px] bg-amber-300 bg-cover bg-center"
                                            style={{ backgroundImage: `url('${S3_BUCKET_URL}${campaign.imgMuestra}')` }}>
                                            <div onClick={close}
                                                className="p-5 w-full flex flex-row-reverse align-bottom cursor-pointer">
                                                <Image src={cross} />
                                            </div>
                                        </div>
                                    </div>
                                    : null
                            }
                            {
                                showAddress ?
                                    <div
                                        className="fixed top-0 z-30 flex justify-center items-center w-screen h-screen bg-black bg-opacity-50">
                                        <div
                                            className="w-[400px] lg:w-[470px] rounded-[20px] bg-white bg-cover bg-center px-10">
                                            <div onClick={close}
                                                className="p-5 w-full flex flex-row-reverse align-bottom cursor-pointer">
                                                <Image src={cross} />
                                            </div>
                                            <div className="text-primary text-center text-[25px] mb-4">
                                                Confirma tu dirección
                                            </div>
                                            <div className="px-8 text-center text-[15px] text-gray-400">
                                                Confirmanos tu dirección para hacer el envio del sampling
                                            </div >
                                            <div className="flex justify-center my-10">
                                                <div className="bg-gradient-to-r from-[#9955D4] to-[#425AC5] rounded">
                                                    <div onClick={() => router.push("/profile")}
                                                        className="flex flex-row m-[1px] px-3 py-1 rounded bg-white items-center cursor-pointer">
                                                        <div className="text-[14px] text-primary">{user.direccion}</div>
                                                        <div className="pl-3">
                                                            <Image src={edit} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-center my-4">
                                                {loadRegister ?
                                                    <ScaleLoader color="#425AC5" /> :
                                                    <button onClick={() => callSignUpCampaign()}
                                                        className="bg-primary text-[15px] text-white w-[166px] h-[33px] rounded-[5px]">
                                                        Terminar
                                                    </button>
                                                }
                                            </div>
                                        </div >
                                    </div >
                                    : null
                            }
                            <div className="hidden lg:flex lg:w-5/12 lg:max-w-[470px] flex-col">
                                <div className="rounded-3xl shadow-[0_4px_5px_0_rgba(0,0,0,0.25)]">
                                    <div
                                        className="relative hidden pt-4 lg:flex flex-row  h-[297px] bg-center bg-cover rounded-3xl w-full bg-white shadow-[inset_0_50px_10px_0_rgba(0,0,0,0.5)]"
                                        style={{ backgroundImage: `url('${S3_BUCKET_URL}${campaign.imgCampania}'), url(${Logo.src})` }}>
                                        <div className="absolute cursor-pointer top-2 mr-2 h-[25px] w-[25px] m-5"
                                            onClick={() => window.history.back()}>
                                            <Image src={arrow} layout={"responsive"}></Image>
                                        </div>
                                        <div className="text-white text-[28px] mx-auto">{campaign.titulo}</div>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-around my-5">
                                    {
                                        campaign.urlInstagram ?
                                            <a href={campaign.urlInstagram}
                                                className="w-[99px] h-[73px] flex flex-col items-center justify-center rounded-lg shadow-[0_0_6px_0_rgba(0,0,0,0.2)]"
                                                target="_blank" rel="noreferrer">
                                                <Image src={instagram} width={35} height={35}></Image>
                                                <div className="text-[#9955D4] text-[15px]">Instagram</div>
                                            </a> : null
                                    }
                                    {
                                        campaign.imgMuestra && campaign.muestra ?
                                            <div className="rounded-lg shadow-[0_0_6px_0_rgba(0,0,0,0.2)] cursor-pointer">
                                                <div onClick={() => setShowSample(true)}
                                                    className="w-[99px] h-[73px] flex items-end pb-1 justify-center rounded-lg bg-cover shadow-[inset_0_-25px_10px_0_rgba(0,0,0,0.5)]"
                                                    style={{ backgroundImage: `url('${S3_BUCKET_URL}${campaign.imgMuestra}')` }}>
                                                    <div className="text-white text-[15px]">Muestra</div>
                                                </div>
                                            </div> : null
                                    }
                                    <div
                                        className="w-[99px] h-[73px] flex flex-col items-center justify-center rounded-lg shadow-[0_0_6px_0_rgba(0,0,0,0.2)]">
                                        <div
                                            className="text-transparent bg-clip-text font-medium text-[25px] bg-gradient-to-r from-[#9955D4] to-[#425AC5]">
                                            {userCampania.puntos || campaign.puntos || "-"}
                                        </div >
                                        <div className="text-[#9955D4] text-[15px]">Puntos</div>
                                    </div >
                                </div >
                                {
                                    !inscrito && moment(dateNow).isBefore(campaign.fechaCierreInscripciones) ?
                                        <div className="flex justify-center m-1">
                                            <button onClick={() => show()}
                                                className={`${cupos != inscritos && estado === 1 ?  "" : "hidden"}bg-primary text-white w-[166px] h-[33px] rounded-[5px]`}>
                                                Inscribirme
                                            </button>
                                        </div>
                                        : null
                                }
                            </div >
                            <div className="lg:w-6/12 lg:pl-10">
                                {
                                    showScreen ?
                                        viewScreen
                                        : null
                                }
                                <div className="rounded-b-3xl shadow-[0_0_10px_0_rgba(0,0,0,0.9)]">
                                    <div
                                        className="relative lg:hidden pt-6 flex flex-row  h-[297px] bg-center bg-cover rounded-b-3xl w-screen bg-white mb-3 shadow-[inset_0_110px_20px_0_rgba(0,0,0,0.5)]"
                                        style={{ backgroundImage: `url('${S3_BUCKET_URL}${campaign.imgCampania}'), url(${Logo.src})` }}>
                                        <div className="absolute cursor-pointer top-2 mr-2 h-[25px] w-[25px] m-5"
                                            onClick={() => window.history.back()}>
                                            <Image src={arrow} layout={"responsive"}></Image>
                                        </div>
                                        <div className="text-white text-[25px] mx-auto">{campaign.titulo}</div>
                                    </div>
                                </div>
                                <div className="mx-4 lg:order-4">
                                    <div className="flex flex-row justify-between items-center mb-4">
                                        <div>
                                            <div className="text-[15px] lg:text-[24px] font-bold">{campaign.marca}</div>
                                            {(inscritos / cupos) * 100 >= 90 ? <div
                                                className="text-[10px] lg:text-[14px] text-[#EA61DA] underline">
                                                Últimos cupos disponibles
                                            </div> : ""}

                                        </div>
                                        {!inscrito ?
                                            <div
                                                className="relative border-[#9955D4] border-[1px] h-[32px] w-[153px] lg:h-[58px] lg:w-[239px] rounded-md flex flex-col justify-center items-center">
                                                <div
                                                    className="absolute -top-2 lg:-top-3 bg-white px-1 text-[10px] lg:text-[14px] text-[#9955D4]">
                                                    Cierre de inscripciones
                                                </div>
                                                <div
                                                    className="text-[10px] lg:text-[14px] text-[#9955D4]">{moment(campaign.fechaCierreInscripciones).format("L") ? moment(campaign.fechaCierreInscripciones).format("L") : "-"}</div>
                                            </div> : null
                                        }
                                    </div>
                                    {
                                        userCampania.estado == USER_CAMPAIGN_STATES.INSCRITO ?
                                            <div className="my-3">
                                                <div className="flex flex-row justify-between">
                                                    <div
                                                        className="w-1/5 h-[30px] lg:h-[45px] text-[12px] lg:text-[15px] text-primary flex justify-center items-center border-[1px] border-primary rounded-md">Inscrito
                                                    </div>
                                                    <div
                                                        className="w-3/4 text-[10px] lg:text-[14px] flex items-center">Lee
                                                        las
                                                        instrucciones y
                                                        prepara tu publicación para que la tengas lista en tu horario
                                                    </div>
                                                </div>
                                                <div className="flex justify-center items-center">
                                                    <div
                                                        className="relative border-[#9955D4] border-[1px] h-[32px] lg:h-[45px] w-[200px] lg:w-[300px] mt-5 rounded-md flex flex-col justify-center items-center">
                                                        <div
                                                            className="absolute -top-2 lg:-top-4 bg-white px-1 text-[10px] lg:text-[15px] text-[#9955D4]">Tu
                                                            horario de publicación
                                                        </div>
                                                        <div className="flex flex-row items-center">
                                                            <div className="text-[10px] lg:text-[14px] text-[#9955D4]">
                                                                {moment(userCampania.horario.fecha_hora).format('D') + ", " + capitalize(moment(userCampania.horario.fecha_hora).format('MMMM')) + " - " + moment(userCampania.horario.fecha_hora).format('LT a')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        userCampania.codigo ?
                                                            <div
                                                                className="relative border-[#9955D4] border-[1px] h-[32px] lg:h-[45px] ml-4 w-[100px] lg:w-[150px] mt-5 rounded-md flex flex-col justify-center items-center">
                                                                <div
                                                                    className="absolute -top-2 lg:-top-4 bg-white px-1 text-[10px] lg:text-[15px] text-[#9955D4]">
                                                                    Código
                                                                </div>
                                                                <div className="flex flex-row items-center">
                                                                    <div className="text-[10px] lg:text-[14px] text-[#9955D4]">
                                                                        {userCampania.codigo}
                                                                    </div>
                                                                </div>
                                                            </div> : null
                                                    }
                                                </div>
                                            </div>
                                            :
                                            userCampania.estado == USER_CAMPAIGN_STATES.DEBO_PUBLICAR && inscrito ?
                                                <div className="my-3">
                                                    <div className="flex flex-row justify-between">
                                                        <div
                                                            className="w-2/6 h-[30px] lg:h-[45px] text-[12px] lg:text-[15px] text-primary flex justify-center items-center border-[1px] border-primary rounded-md">Debes
                                                            publicar
                                                        </div>
                                                        <div
                                                            className="w-3/5 text-[10px] lg:text-[14px] flex items-center">¡Recuerda
                                                            hacer tu
                                                            publicación!
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-center items-center">
                                                        <div
                                                            className="relative border-[#9955D4] border-[1px] h-[32px] lg:h-[45px] w-[200px] lg:w-[302px] mt-5 rounded-md flex flex-col justify-center items-center">
                                                            <div
                                                                className="absolute -top-2 lg:-top-4 bg-white px-1 text-[10px] lg:text-[15px] text-[#9955D4]">
                                                                Tu horario de publicación
                                                            </div>
                                                            <div className="flex flex-row items-center">
                                                                <div
                                                                    className="text-[10px] lg:text-[14px] text-[#9955D4]">
                                                                    {moment(userCampania.horario.fecha_hora).format('D') + ", " + capitalize(moment(userCampania.horario.fecha_hora).format('MMMM')) + " - " + moment(userCampania.horario.fecha_hora).format('LT a')}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {
                                                            userCampania.codigo ?
                                                                <div
                                                                    className="relative border-[#9955D4] border-[1px] h-[32px] lg:h-[45px] ml-4 w-[100px] lg:w-[150px] mt-5 rounded-md flex flex-col justify-center items-center">
                                                                    <div
                                                                        className="absolute -top-2 lg:-top-4 bg-white px-1 text-[10px] lg:text-[15px] text-[#9955D4]">
                                                                        Código
                                                                    </div>
                                                                    <div className="flex flex-row items-center">
                                                                        <div className="text-[10px] lg:text-[14px] text-[#9955D4]">
                                                                            {userCampania.codigo}
                                                                        </div>
                                                                    </div>
                                                                </div> : null
                                                        }
                                                    </div>
                                                </div>
                                                :
                                                userCampania.estado == USER_CAMPAIGN_STATES.SUBIR_PANTALLAZOS && inscrito && userCampania.horario ?
                                                    <div className="my-3">
                                                        <div className="flex flex-row justify-between">
                                                            <div
                                                                className="px-1 h-[30px] lg:h-[45px] lg:w-[189px] text-[12px] lg:text-[15px] text-primary flex justify-center items-center border-[1px] border-primary rounded-md">Subir
                                                                pantallazos
                                                            </div>
                                                            <div
                                                                className="w-3/5 text-[10px] lg:text-[14px] flex items-center">
                                                                ¡Recuerda subir el pantallazo(s) de las visualizaciones
                                                                que tuviste!
                                                            </div>
                                                        </div>
                                                        {sendingScreenshots ?
                                                            <div
                                                                className="w-full my-5 p-4 rounded-md shadow-[0_0_6px_0_rgba(0,0,0,0.2)]">
                                                                <div className="flex flex-row justify-between">
                                                                    <div
                                                                        className="text-primary text-[15px] lg:text-[24px]">Imagenes
                                                                        subidas
                                                                    </div>
                                                                    <input id="loadScreenshot" type="file"
                                                                        className="hidden" multiple
                                                                        accept="image/*" onChange={onChange} />
                                                                    <div onClick={inputFile} className="cursor-pointer">
                                                                        <Image src={add}></Image>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    {
                                                                        screenshots.map(obj => {
                                                                            if (obj) {
                                                                                return (
                                                                                    <div key={obj.name}
                                                                                        className="relative h-[56px] pr-10 cursor-pointer rounded-[5px] flex items-center bg-gradient-to-r my-5 from-[#9955D4] to-[#425AC5]">
                                                                                        <div
                                                                                            onClick={() => viewScreenShots(URL.createObjectURL(obj))}
                                                                                            className="w-[47px] h-[43px] mx-2 rounded-sm bg-center bg-cover"
                                                                                            style={{ backgroundImage: `url('${URL.createObjectURL(obj)}')` }} />
                                                                                        <div
                                                                                            className="text-white text-[12px] whitespace-nowrap overflow-x-hidden">{obj.name}</div>
                                                                                        <div
                                                                                            className="absolute z-20 text-[12px] lg:text-[15px] right-3 ml-4 flex"
                                                                                            onClick={() => deleteScreenshot(obj.name)}>
                                                                                            <Image src={del} />
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        })
                                                                    }
                                                                </div>
                                                                {
                                                                    screenshots.length > 0 ?
                                                                        <div className="flex justify-center m-6">
                                                                            {loadScreenshots ?
                                                                                <ScaleLoader color="#425AC5" /> :
                                                                                <button
                                                                                    onClick={() => uploadScreenshots()}
                                                                                    className="bg-primary text-white w-[166px] h-[33px] rounded-[5px]">
                                                                                    Enviar
                                                                                </button>
                                                                            }
                                                                        </div> : null
                                                                }
                                                            </div>
                                                            :
                                                            <>
                                                                {
                                                                    moment(dateNow).format("L") <= moment(userCampania.horario.fecha_hora).format('L') ?
                                                                        <div
                                                                            className="flex justify-center items-center mt-5">
                                                                            <button
                                                                                onClick={() => screen()}
                                                                                className="bg-primary text-[15px] text-white w-[166px] h-[33px] rounded-[5px]">
                                                                                Subir pantallazos
                                                                            </button>
                                                                        </div>
                                                                        :
                                                                        moment(dateNow).subtract(3, 'days').isAfter(userCampania.horario.fecha_hora) ?
                                                                            <div
                                                                                className="w-full my-5 p-4 rounded-md shadow-[0_0_6px_0_rgba(0,0,0,0.2)]">
                                                                                <div
                                                                                    className="text-center text-primary text-[12px] lg:text-[15px]">
                                                                                    Ya pasaron 72 horas y aún no envias
                                                                                    los pantallazos de las
                                                                                    visualizaciones, por favor
                                                                                    hazlo tan pronto sea posible,
                                                                                    recuerda que si no lo haces
                                                                                    no podremos darte los puntos con los
                                                                                    que podras participar en las rifas
                                                                                </div>
                                                                                <div
                                                                                    className="flex justify-center items-center mt-5">
                                                                                    <button
                                                                                        onClick={() => screen()}
                                                                                        className="bg-primary text-[15px] text-white w-[166px] h-[33px] rounded-[5px]">
                                                                                        Subir pantallazos
                                                                                    </button>
                                                                                </div>
                                                                            </div> :
                                                                            <div
                                                                                className="w-full my-5 p-4 rounded-md shadow-[0_0_6px_0_rgba(0,0,0,0.2)]">
                                                                                <div
                                                                                    className="text-center text-primary text-[12px] lg:text-[15px]">Ya
                                                                                    pasaron 24 horas y aún no envias los
                                                                                    pantallazos
                                                                                    de las vizualizaciones, por favor
                                                                                    hazlo tan
                                                                                    pronto sea posible
                                                                                </div>
                                                                                <div
                                                                                    className="flex justify-center items-center mt-5">
                                                                                    <button
                                                                                        onClick={() => screen()}
                                                                                        className="bg-primary text-[15px] text-white w-[166px] h-[33px] rounded-[5px]">
                                                                                        Subir pantallazos
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                }
                                                            </>
                                                        }
                                                    </div>
                                                    :
                                                    userCampania.estado == USER_CAMPAIGN_STATES.PANTALLAZOS_EN_REVISION && inscrito ?
                                                        <div className="my-3">
                                                            <div className="flex flex-row justify-between">
                                                                <div
                                                                    className="w-3/6 mr-2 h-[30px] lg:h-[45px] lg:text-[15px] text-[12px] text-primary flex justify-center items-center border-[1px] border-primary rounded-md">
                                                                    Pantallazos en revision
                                                                </div>
                                                                <div
                                                                    className="w-3/6 text-[10px] lg:text-[14px] flex items-center">
                                                                    Actualmente los pantallazos se encuentran en
                                                                    revision, este proceso puede tardar un par de dias.
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="flex flex-col py-5 px-8 mt-5 rounded-lg shadow-[0_0_6px_0_rgba(0,0,0,0.2)]">
                                                                <div
                                                                    className="text-[15px] lg:text-[24px] text-primary">
                                                                    Imagenes subidas
                                                                </div>
                                                                <div className="text-[12px] text-gray-500 mt-5">
                                                                    {
                                                                        userCampania.pantallazos.filter((obj: any) => obj.aprobado == null).map((obj: any) => {
                                                                            if (obj) {
                                                                                return (
                                                                                    <div key={obj['id']}
                                                                                        className="relative h-[56px] pr-2 cursor-pointer rounded-[5px] flex items-center bg-gradient-to-r my-5 from-[#9955D4] to-[#425AC5]">
                                                                                        <div
                                                                                            onClick={() => viewScreenShots(`${S3_BUCKET_URL}${obj['ruta']}`)}
                                                                                            className="w-[47px] h-[43px] mx-2 rounded-sm bg-center bg-cover"
                                                                                            style={{ backgroundImage: `url('${S3_BUCKET_URL}${obj['ruta']}')` }} />
                                                                                        <div
                                                                                            className="text-white text-[12px] lg:text-[15px] whitespace-nowrap overflow-x-hidden">{obj['ruta'].split("/")[obj['ruta'].split("/").length - 1]}</div>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        userCampania.estado == USER_CAMPAIGN_STATES.PANTALLAZOS_RECHAZADOS && inscrito ?
                                                            <div className="my-3">
                                                                <div className="flex flex-row justify-between">
                                                                    <div
                                                                        className="h-[30px] px-2 lg:h-[45px] lg:text-[15px] text-[12px] text-primary flex justify-center items-center border-[1px] border-primary rounded-md">Subir
                                                                        pantallazos
                                                                    </div>
                                                                    <div
                                                                        className="w-3/5 text-[10px] lg:text-[14px] flex items-center">
                                                                        ¡Recuerda subir el pantallazo(s) de las
                                                                        visualizaciones que tuviste!
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="flex flex-col py-5 px-8 mt-5 rounded-lg shadow-[0_0_6px_0_rgba(0,0,0,0.2)]">
                                                                    <div
                                                                        className="text-[15px] lg:text-[24px] text-primary">Imagenes
                                                                        rechazadas
                                                                    </div>
                                                                    <div
                                                                        className="text-[12px] lg:text-[15px] text-gray-500 mt-5">
                                                                        {
                                                                            userCampania.razon_rechazo_pantallazos
                                                                        }, por favor adjunta otras.
                                                                    </div>
                                                                    <div
                                                                        className="flex justify-center items-center mt-5">
                                                                        <button
                                                                            onClick={() => screen()}
                                                                            className="bg-primary text-[15px] text-white w-[166px] h-[33px] rounded-[5px]">
                                                                            Agregar pantallazos
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            :
                                                            userCampania.estado == USER_CAMPAIGN_STATES.TERMINADA_SATISFACTORIAMENTE && inscrito ?
                                                                <div className="my-3">
                                                                    <div className="flex flex-row justify-between">
                                                                        <div
                                                                            className="w-2/6 h-[30px] lg:h-[45px] lg:text-[15px] text-[12px] text-primary flex justify-center items-center border-[1px] border-primary rounded-md">Finalizada
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="flex flex-col py-5 px-8 justify-center items-center mt-5 rounded-lg shadow-[0_0_6px_0_rgba(0,0,0,0.2)]">
                                                                        <div
                                                                            className="text-[15px] lg:text-[24px] text-primary">¡Campaña
                                                                            terminada
                                                                            con éxito!
                                                                        </div>
                                                                        <div
                                                                            className="text-[15px] text-primary">Recibiste
                                                                        </div>
                                                                        <div
                                                                            className="relative w-[99px] h-[73px] my-5 flex flex-col items-center justify-center rounded-lg shadow-[0_0_6px_0_rgba(0,0,0,0.2)]">
                                                                            <div
                                                                                className="text-transparent bg-clip-text font-medium text-[25px] lg:text-[30px] bg-gradient-to-r from-[#9955D4] to-[#425AC5]">{userCampania.puntos ? userCampania.puntos : "-"}</div>
                                                                            <div
                                                                                className="text-[#9955D4] text-[15px]">Puntos
                                                                            </div>
                                                                            <div
                                                                                className="absolute -right-1 -top-1 flex justify-center items-center w-[19px] h-[19px] rounded-[3px] bg-gradient-to-r from-[#9955D4] to-[#425AC5]">
                                                                                <div
                                                                                    className="flex justify-center items-center w-[17px] h-[17px] rounded-[2px] bg-white p-1">
                                                                                    <Image src={check} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="text-[12px] lg:text-[15px] text-gray-500 text-center">Con
                                                                            los cuales podrás participar en nuestras
                                                                            rifas,
                                                                            ¡buen
                                                                            trabajo y buena suerte!
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                :
                                                                userCampania.estado == USER_CAMPAIGN_STATES.TERMINADA_INSATISFACTORIAMENTE && inscrito ?
                                                                    <div className="my-3">
                                                                        <div className="flex flex-row justify-between">
                                                                            <div
                                                                                className="w-2/6 h-[30px] lg:h-[45px] lg:text-[15px] text-[12px] text-primary flex justify-center items-center border-[1px] border-primary rounded-md">Finalizada
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="flex flex-col py-5 px-8 justify-center items-center mt-5 rounded-lg shadow-[0_0_6px_0_rgba(0,0,0,0.2)]">
                                                                            <div
                                                                                className="text-[15px] lg:text-[24px] text-primary">Proceso
                                                                                finalizado
                                                                            </div>
                                                                            <div
                                                                                className="relative w-[99px] h-[73px] my-5 flex flex-col items-center justify-center rounded-lg shadow-[0_0_6px_0_rgba(0,0,0,0.2)]">
                                                                                <div
                                                                                    className="text-transparent bg-clip-text font-medium text-[25px] lg:text-[30px] bg-gradient-to-r from-[#9955D4] to-[#425AC5]">{userCampania.puntos ? userCampania.puntos : "-"}</div>
                                                                                <div
                                                                                    className="text-[#9955D4] text-[15px]">Puntos
                                                                                </div>
                                                                                <div
                                                                                    className="absolute -right-1 -top-1 flex justify-center items-center w-[19px] h-[19px] rounded-[3px] bg-gradient-to-r from-[#9955D4] to-[#425AC5]">
                                                                                    <div
                                                                                        className="flex justify-center items-center w-[17px] h-[17px] rounded-[2px] bg-white p-1">
                                                                                        <Image src={cross} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                className="text-[12px] lg:text-[15px] text-gray-500 text-center">Lo
                                                                                sentimos, desafortunadamente no enviaste
                                                                                los pantallazos de las vizualizaciones,
                                                                                por
                                                                                ende <u><b>no podemos darte
                                                                                    los {userCampania.puntos} puntos</b></u> de
                                                                                la campaña, ya que esta ha finalizado
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    : null
                                    }
                                    <div
                                        className="text-[15px] lg:text-[24px] text-primary font-medium mb-[15px]">Descripción
                                    </div>
                                    <div className="text-[12px] lg:text-[15px] mb-[30px]">{campaign.descripcion}</div>
                                    {
                                        !inscrito ?
                                            <div className="flex justify-center items-center">
                                                <div
                                                    className="relative border-[#9955D4] border-[1px] h-[32px] lg:h-[45px] lg:w-[300px] w-[200px] mt-5 rounded-md flex flex-col justify-center items-center">
                                                    <div
                                                        className="absolute -top-2 bg-white px-1 lg:-top-4 lg:text-[15px] text-[10px] text-[#9955D4]">
                                                        Publicación de stories
                                                    </div>
                                                    <div
                                                        className="flex flex-row items-center text-[10px] lg:text-[14px] text-[#9955D4]">
                                                        {
                                                            campaign.horarios.length == 1 ?
                                                                <div>{moment(campaign.horarios[0]['fecha_hora']).format('D') + ", " + capitalize(moment(campaign.horarios[0]['fecha_hora']).format('MMMM'))}</div>
                                                                : campaign.horarios.length > 1 ?
                                                                    <div>
                                                                        {moment(minorDate(campaign.horarios)).format('D') + ", " + capitalize(moment(minorDate(campaign.horarios)).format('MMMM')) + " - " + moment(olderDate(campaign.horarios)).format('D') + ", " + capitalize(moment(olderDate(campaign.horarios)).format('MMMM'))}
                                                                    </div>
                                                                    : <div>-</div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            : null
                                    }
                                </div>
                                <div className="flex flex-row justify-around my-5 lg:hidden">
                                    {
                                        campaign.urlInstagram ?
                                            <a href={campaign.urlInstagram}
                                                className="w-[99px] h-[73px] flex flex-col items-center justify-center rounded-lg shadow-[0_0_6px_0_rgba(0,0,0,0.2)]"
                                                target="_blank" rel="noreferrer">
                                                <Image src={instagram} width={35} height={35}></Image>
                                                <div className="text-[#9955D4] text-[12px]">Instagram</div>
                                            </a> : null
                                    }
                                    {
                                        campaign.imgMuestra ?
                                            <div className="rounded-lg shadow-[0_0_6px_0_rgba(0,0,0,0.2)] cursor-pointer">
                                                <div onClick={() => setShowSample(true)}
                                                    className="w-[99px] h-[73px] flex items-end pb-1 justify-center rounded-lg bg-cover shadow-[inset_0_-25px_10px_0_rgba(0,0,0,0.5)]"
                                                    style={{ backgroundImage: `url('${S3_BUCKET_URL}${campaign.imgMuestra}')` }}>
                                                    <div className="text-white text-[12px]">Muestra</div>
                                                </div>
                                            </div> : null
                                    }
                                    <div
                                        className="w-[99px] h-[73px] flex flex-col items-center justify-center rounded-lg shadow-[0_0_6px_0_rgba(0,0,0,0.2)]">
                                        <div
                                            className="text-transparent bg-clip-text font-medium text-[25px] bg-gradient-to-r from-[#9955D4] to-[#425AC5]">{userCampania.puntos || campaign.puntos || "-"}</div>
                                        <div className="text-[#9955D4] text-[12px]">Puntos</div>
                                    </div>
                                </div>
                                <div className="px-3">
                                    <div
                                        className="w-full rounded-xl p-3 bg-gradient-to-r my-5 from-[#9955D4] to-[#425AC5] text-white">
                                        <div className="text-[15px] lg:text-[24px]">Instrucciones</div>
                                        <ol className="ml-5 list-disc text-[12px] lg:text-[15px] font-thin">
                                            <li className="mb-1">{campaign.instrucciones}</li>
                                        </ol>
                                        <div className="w-full h-[1px] my-3 bg-white" />
                                        <div className="text-[15px] lg:text-[24px]">Requisitos</div>
                                        <ol className="ml-5 list-disc text-[12px] lg:text-[15px] font-thin">
                                            <li className="mb-1">{campaign.requisitos}</li>
                                        </ol>
                                    </div>
                                </div>
                                {
                                    (userCampania.estado !== 0) && campaign.materialGrafico && <div className="flex justify-center m-1">
                                        <a href={S3_BUCKET_URL + campaign.materialGrafico} target="_blank" rel="noreferrer"
                                            className="bg-primary text-white text-[15px] w-[166px] h-[33px] rounded-[5px] flex justify-center items-center mb-10">
                                            Material gráfico
                                        </a>
                                    </div>
                                }
                                {
                                    !inscrito && moment(dateNow).isBefore(campaign.fechaCierreInscripciones) ?
                                        <div className="flex justify-center m-6 lg:hidden">
                                            {loadRegister ?
                                                <ScaleLoader color="#425AC5" /> :
                                                
                                                <button onClick={() => show()}
                                                    className={`${cupos != inscritos && estado === 1 ? "" : "hidden"}bg-primary text-white w-[166px] h-[33px] rounded-[5px]`}>
                                                    Inscribirme
                                                </button>
                                            }
                                        </div>
                                        : null
                                }
                            </div >
                        </div >
                    </div>
            }
        </BasePage >
    );
};

export default Campaign;