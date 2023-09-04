import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import arrow from '../../src/screens/general/login/arrow.svg'
import arrow_blue from '../../src/screens/general/login/arrow-blue.svg'
import photo from "../../src/screens/general/login/bg_image.svg";
import effect from "../../src/screens/general/login/Rectangle.svg";
import logo from "../../src/screens/general/login/Logotipo.svg";
import TermsConditions from "../termsConditions";
import { registerUser } from "../../src/redux/actions/authActions";
import { useDispatch } from "react-redux";
import ScaleLoader from "react-spinners/ScaleLoader";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import eye from "../../src/screens/general/icons/eye.svg";
import SelectIndicative from '../../src/screens/general/SelectIndicative';

const CreateAccount = () => {
    const router = useRouter();
    const [createUsuarioInfo, setCreateUsuarioInfo] = useState<any>({
        nombre: "",
        apellido: "",
        correo: "",
        instagram: "",
        indicativo: "+57",
        telefono: "",
        fechaDeNacimiento: undefined,
        tipoDocumento: 0,
        numeroDocumento: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [passDiff, setPassDiff] = useState(false);

    const dispatch = useDispatch()

    function onChange(event: any) {
        setCreateUsuarioInfo({
            ...createUsuarioInfo,
            [event.target.name]: event.target.value
        })

        // Valida si las contraseñas son iguales
        if (event.target.name == "confirmPassword") {
            if (createUsuarioInfo.password !== event.target.value) {
                setPassDiff(true)
            } else {
                setPassDiff(false)
            }
        }
    }

    function showPassword() {
        const pass = document.getElementById("password");

        // @ts-ignore
        if (pass.type == "password") {
            // @ts-ignore
            pass.type = "text";
        } else {
            // @ts-ignore
            pass.type = "password";
        }
    }

    function showPasswordConfirm() {
        const pass = document.getElementById("confirmPassword");

        // @ts-ignore
        if (pass.type == "password") {
            // @ts-ignore
            pass.type = "text";
        } else {
            // @ts-ignore
            pass.type = "password";
        }
    }

    async function onSubmit(event: any) {
        event.preventDefault()
        setPassDiff(false)

        //Inicia la carga
        setLoading(true)
        const res = await registerUser(dispatch, createUsuarioInfo)
        //Acbas la carga
        setLoading(false)

        // Validar si hubo error, si hay error mostrar el toast (El mas comun es del la contrasena no cumple los requisitos)
        if (res == "La contraseña debe contener mayúsculas, por lo menos 8 caracteres y simbolos (@#.$)") {
            // Mandar toast con res.error
            toast.error('La contraseña debe contener mayúsculas, por lo menos 8 caracteres y simbolos (@#.$)', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return null
        }

        //Si el usuario ya esta registrado
        if (res == "Ya existe un usuario con este correo") {
            toast.error('Ya existe un usuario con este correo', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return null
        }

        // Si todo funciono mandar al paso 2
        router.push("/geographical-data")
    }

    return (
        <div className="relative w-screen h-screen m-0 lg:flex lg:flex-row">
            {showTerms ? <TermsConditions setShowTerms={setShowTerms} /> : null}
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
                                <div id="paso1" className="flex justify-center items-center w-[42px] h-[42px] bg-gradient-to-r from-[#9955D4] to-[#425AC5] rounded-full before:content-[''] before:w-6/12 lg:before:w-4/12 before:h-1 before:absolute before:-z-10 before:left-1/4 lg:before:left-1/3 before:bg-gradient-to-r before:from-[#C4C4C4] before:to-[#C4C4C4]">
                                    <li className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent border-[8px] border-[#EEEEEE] text-white">
                                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-transparent">
                                            1
                                        </div>
                                    </li>
                                </div>
                                <li className="text-transparent text-[10px] bg-clip-text bg-gradient-to-r from-[#9955D4] to-[#425AC5]">Datos basicos</li>
                            </div>
                            <div className="flex flex-col items-center">
                                <div id="paso2" className='flex justify-center items-center w-[42px] h-[42px] rounded-full bg-gradient-to-r from-[#C4C4C4] to-[#C4C4C4]'>
                                    <li className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent border-[8px] border-[#EEEEEE] text-white">
                                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-transparent">
                                            2
                                        </div>
                                    </li>
                                </div>
                                <li className="text-transparent text-[10px] bg-clip-text bg-gradient-to-r from-[#C4C4C4] to-[#C4C4C4]">Datos geograficos</li>
                            </div>
                        </ul>
                    </div>
                    <form onSubmit={onSubmit} className="mx-7 w-screen px-7 max-w-lg lg:max-w-5xl lg:w-full lg:flex lg:flex-row">
                        <fieldset id="page1" className="pb-5 lg:w-1/2 lg:mx-3">
                            <legend className="text-primary text-[22px]">Datos básicos</legend>
                            <div className="flex flex-row w-full pt-4">
                                <div className="flex flex-col w-6/12">
                                    <label className="text-primary text-[10px] lg:text-[14px]">Nombre (s)</label>
                                    <input type="text" className="border-b-2 border-neutral-300 w-11/12 h-full text-[12px] lg:text-[15px] outline-0 pb-1" required name="nombre" onChange={onChange} value={createUsuarioInfo.nombre} />
                                </div>
                                <div className="flex flex-col w-6/12">
                                    <label className="text-primary text-[10px] lg:text-[14px]">Apellido (s)</label>
                                    <input type="text" className="border-b-2 border-neutral-300 w-full h-full text-[12px] lg:text-[15px] outline-0 pb-1" required name="apellido" onChange={onChange} value={createUsuarioInfo.apellido} />
                                </div>
                            </div>
                            <div className="flex flex-col pt-2.5">
                                <label className="text-primary text-[10px] lg:text-[14px]">Correo electronico</label>
                                <input type="email" className="border-b-2 border-neutral-300 w-full h-full text-[12px] lg:text-[15px] outline-0 pb-1" required name="correo" onChange={onChange} value={createUsuarioInfo.correo} />
                            </div>
                            <div className="flex flex-col pt-2.5">
                                <label className="text-primary text-[10px] lg:text-[14px]">Celular</label>
                                <SelectIndicative
                                    indicative={createUsuarioInfo.indicativo}
                                    setIndicative={(newIndicative) => {
                                        setCreateUsuarioInfo({
                                            ...createUsuarioInfo,
                                            "indicativo": newIndicative
                                        })
                                    }}
                                    setPhone={(newPhone) => {
                                        setCreateUsuarioInfo({
                                            ...createUsuarioInfo,
                                            "telefono": newPhone
                                        })
                                    }} />
                            </div>
                            <div className="flex flex-col pt-2.5">
                                <label className="text-primary text-[10px] lg:text-[14px]">Usuario de instagram</label>
                                <div className='flex border-b-2 border-neutral-300 items-center'> @ <input type="text" className=" w-full h-full text-[12px] lg:text-[15px] outline-0 pb-1 mx-1" required name="instagram" onChange={onChange} value={createUsuarioInfo.instagram} /></div>
                            </div>
                            <div className="flex flex-col pt-2.5">
                                <label className="text-primary text-[10px] lg:text-[14px]">Fecha de nacimiento</label>
                                <input type="date" className="border-b-2 border-neutral-300 w-full h-full text-[12px] lg:text-[15px] outline-0 pb-1" required name="fechaDeNacimiento" onChange={onChange} value={createUsuarioInfo.fechaDeNacimiento} />
                            </div>

                            <div className="flex flex-row w-full pt-4">
                                <div className="flex flex-col w-3/12">
                                    <label className="text-primary text-[10px] lg:text-[14px]">Tipo</label>
                                    <select className="border-b-2 border-neutral-300 w-11/12 h-full text-[12px] lg:text-[15px] outline-0 pb-1" required name="tipoDocumento" onChange={onChange} value={createUsuarioInfo.tipoDocumento}>
                                        <option value="" />
                                        <option value={2}>T.I.</option>
                                        <option value={1}>C.C.</option>
                                    </select>
                                </div>
                                <div className="flex flex-col w-9/12">
                                    <label className="text-primary text-[10px] lg:text-[14px]">Documento de identidad</label>
                                    <input type="text" className="border-b-2 border-neutral-300 w-full h-full text-[12px] lg:text-[15px] outline-0 pb-1" required name="numeroDocumento" onChange={onChange} value={createUsuarioInfo.numeroDocumento} />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset id="page1" className="pb-5 lg:w-1/2 lg:mx-3 lg:flex lg:flex-col lg:justify-between">
                            <div>
                                <legend className="text-primary text-[22px] mt-0 lg:mt-0">Crear contraseña</legend>
                                <div className="relative flex flex-col pt-4">
                                    <label className="text-primary text-[10px] lg:text-[14px]">Contraseña</label>
                                    <input type="password" className="border-b-2 border-neutral-300 w-full h-full text-[12px] lg:text-[15px] outline-0 pb-1" required name="password" id="password" onChange={onChange} value={createUsuarioInfo.password} />
                                    <div onClick={showPassword} className="h-2 absolute right-1 bottom-4 cursor-pointer"><Image src={eye} height={20} width={30}></Image></div>
                                </div>
                                <div className="relative flex flex-col pt-2.5">
                                    <label className="text-primary text-[10px] lg:text-[14px]">Confirmar contraseña</label>
                                    <input type="password" className="border-b-2 border-neutral-300 w-full h-full text-[12px] lg:text-[15px] outline-0 pb-1" required name="confirmPassword" id="confirmPassword" onChange={onChange} value={createUsuarioInfo.confirmPassword} />
                                    <div onClick={showPasswordConfirm} className="h-2 absolute right-1 bottom-4 cursor-pointer"><Image src={eye} height={20} width={30}></Image></div>
                                </div>
                                {
                                    passDiff ?
                                        <div className="text-[14px] text-red-500 underline">Las contraseñas deben coincidir</div> :
                                        null
                                }
                            </div>
                            <div className="flex justify-center items-center pb-3 lg:pb-0 flex-col">
                                <div className="flex justify-center text-url text-[10px] lg:text-[14px] underline pb-6 pt-9">
                                    <input type="checkbox" required name="terminosCondiciones" onChange={onChange} />
                                    <a className="pl-3 cursor-pointer pointer-events-auto" onClick={() => setShowTerms(true)}>Acepto terminos y condiciones</a>
                                </div>
                                {loading ?
                                    <ScaleLoader color="#425AC5" /> :
                                    <button type="submit" className="bg-primary text-white w-[166px] h-[33px] rounded-[5px]">
                                        Siguiente
                                    </button>
                                }
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;