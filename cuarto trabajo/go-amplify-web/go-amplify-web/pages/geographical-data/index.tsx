import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import arrow from '../../src/screens/general/login/arrow.svg'
import arrow_blue from '../../src/screens/general/login/arrow-blue.svg'
import photo from "../../src/screens/general/login/bg_image.svg";
import effect from "../../src/screens/general/login/Rectangle.svg";
import logo from "../../src/screens/general/login/Logotipo.svg";
import { completeRegistration } from "../../src/redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import ScaleLoader from "react-spinners/ScaleLoader";
import ModalNotify from "../../src/components/modalNofity/modalNofity";
import ChooseMapLocation, { LocationInfoInterface } from "../../src/components/maps/ChooseMapLocation";
import { toast } from 'react-toastify';
import { selectUser } from '../../src/redux/reducers/authReducer';

const CreateAccount = () => {
    const user = useSelector(selectUser);
    const [createUsuarioInfo, setCreateUsuarioInfo] = useState({
        direccion: "",
        latitud: "",
        longitud: "",
        indicacionesAdicionales: "",
        ciudad: "",
        pais: "",
    });

    const [notify, setNotify] = useState({
        title: "",
        info: <></>,
        button: "",
        url: "",
        show: false,
    })

    const [loading, setLoading] = useState(false);

    const [locationInfo, setLocationInfo] =
        useState<LocationInfoInterface | null>(null);

    useEffect(() => {
        setCreateUsuarioInfo({
            ...createUsuarioInfo,
            direccion: locationInfo ? locationInfo.address : "",
            latitud: locationInfo ? locationInfo.latitude.toString() : "",
            longitud: locationInfo ? locationInfo.longitude.toString() : "",
            ciudad: locationInfo ? locationInfo.city : "",
            pais: locationInfo ? locationInfo.country : "",
        });
    }, [locationInfo])

    const dispatch = useDispatch()

    function onChange(event: any) {
        setCreateUsuarioInfo({
            ...createUsuarioInfo,
            [event.target.name]: event.target.value
        })
    }

    async function onSubmit(event: any) {
        event.preventDefault()

        if(!createUsuarioInfo.direccion || !createUsuarioInfo.latitud || !createUsuarioInfo.longitud) {
            toast.warning("Por favor completa primero los datos");
            return
        }

        //Inicia la carga
        setLoading(true)
        //Hacer nuevo llamado
        const res: any = await completeRegistration(dispatch, createUsuarioInfo, user.id)
        //Acbas la carga
        setLoading(false)

        if (res.statusCode == 400) {
            setNotify({
                title: "¡Lo sentimos!",
                info: <p>En la ubicación que elegiste Go Amplify no tiene cobertura.</p>,
                button: "Salir",
                show: true,
                url: ""
            })
            return null
        }

        // Si todo funciono mandar al paso 2
        //Mensaje para cuando se completa el registro geografico
        setNotify({
            title: "¡Te esperamos pronto!",
            info: <p>¡Felicidades!, has completado el primer paso, ahora revisaremos los datos que nos enviaste y pronto te daremos respuesta a tu solicitud para ser un Amplifier</p>,
            button: "Salir",
            show: true,
            url: "/login"
        })
    }

    return (
        <div className="relative w-screen h-screen m-0 lg:flex lg:flex-row">
            {notify.show ?
                <ModalNotify
                    title={notify.title}
                    info={notify.info}
                    button={notify.button}
                    setNotify={setNotify}
                    url={notify.url}
                /> : null
            }
            { }
            <div className="z-0 absolute -top-28 w-screen max-h-96 overflow-hidden lg:hidden">
                <Image src={photo} layout={"responsive"} />
            </div>
            <div className="absolute z-0 -top-1 opacity-50 max-h-96 overflow-hidden w-screen lg:hidden">
                <Image src={effect} layout={"responsive"} />
            </div>
            <div className="hidden bg-no-repeat bg-cover bg-[url('../../src/screens/general/login/photo2.svg')] lg:block lg:w-1/4 lg:max-w-[600px] rounded-r-[300px]" />
            <div className="bg-transparent h-auto lg:w-3/4 lg:flex lg:flex-col lg:justify-center">
                <div className="hidden lg:flex lg:justify-center lg:pt-10 lg:pb-5"><Image className="" src={logo} /></div>
                <div className="relative flex flex-row justify-center h-16 mx-7 lg:h-auto items-center lg:mx-20">
                    <Link href='/login'>
                        <div className="absolute left-0 h-auto w-auto">
                            <div className="relative cursor-pointer z-10 top-1 -left-1/4 lg:hidden">
                                <Image src={arrow} />
                            </div>
                            <div className="hidden cursor-pointer relative z-10 top-1 lg:block">
                                <Image src={arrow_blue} />
                            </div>
                        </div>
                    </Link>
                    <div className="relative z-10 text-white lg:text-[24px] lg:text-primary">
                        <h1>Crear cuenta</h1>
                    </div>
                </div>
                <div className="relative z-10 px-10 flex flex-col items-center justify-center w-screen h-auto bg-white rounded-t-[18px] lg:w-full">
                    <div className="mx-7 w-screen px-7 pt-10 lg:pt-2 lg:w-9/12">
                        <ul className="flex flex-row justify-around mb-6">
                            <div className="flex flex-col items-center">
                                <div id="paso1" className="flex justify-center items-center w-[42px] h-[42px] bg-gradient-to-r from-[#9955D4] to-[#425AC5] rounded-full before:content-[''] before:w-6/12 lg:before:w-4/12 before:h-1 before:absolute before:-z-10 before:left-1/4 lg:before:left-1/3 before:bg-gradient-to-r before:from-[#425AC5] before:to-[#9955D4]">
                                    <li className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent border-[8px] border-[#EEEEEE] text-white">
                                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-transparent">
                                            1
                                        </div>
                                    </li>
                                </div>
                                <li className="text-transparent text-[10px] bg-clip-text bg-gradient-to-r from-[#9955D4] to-[#425AC5]">Datos basicos</li>
                            </div>
                            <div className="flex flex-col items-center">
                                <div id="paso2" className={'flex justify-center items-center w-[42px] h-[42px] rounded-full bg-gradient-to-r from-[#9955D4] to-[#425AC5]'}>
                                    <li className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent border-[8px] border-[#EEEEEE] text-white">
                                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-transparent">
                                            2
                                        </div>
                                    </li>
                                </div>
                                <li className="text-transparent text-[10px] bg-clip-text bg-gradient-to-r from-[#9955D4] to-[#425AC5]">Datos geográficos</li>
                            </div>
                        </ul>
                    </div>
                    <form onSubmit={onSubmit} className="mx-7 w-screen px-7 max-w-lg lg:max-w-5xl lg:w-full">
                        <fieldset className="pb-5 lg:mx-3 lg:flex lg:flex-col lg:justify-between">
                            <legend className="text-primary text-[22px] mt-8">Datos geográficos</legend>
                            <p className='text-[13px] mt-3'>Por favor selecciona en el mapa la dirección en la que te encuentras para poder sugerirte las campañas a las que puedes aplicar.</p>
                            <ChooseMapLocation setLocationInfo={setLocationInfo} locationInfo={locationInfo} onChange={onChange} createUsuarioInfo={createUsuarioInfo} />
                        </fieldset>
                        <div className="w-full flex justify-center lg:w-full lg:flex lg:justify-center lg py-5">
                            {loading ?
                                <ScaleLoader color="#425AC5" /> :
                                <button type="submit" className="bg-primary text-white w-[166px] h-[33px] rounded-[5px]">
                                    Terminar
                                </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;