import React, {useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import eye from "../../screens/general/login/eye.svg";
import {toast, ToastContainer} from "react-toastify";
import {submitPasswordChange} from "../../redux/actions/authActions";
import ScaleLoader from "react-spinners/ScaleLoader";

const RecoverPassword = (props: any) => {

    const [passDiff, setPassDiff] = useState(false);
    const [loading, setLoading] = useState(false);

    const [newPass, setNewPass] = useState({
        password: "",
        againPassword: "",
    })

    const [verifyCode, setVerifyCode] = useState({
        first: "",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
        sixth: ""
    })

    function next(event: any) {

        if (event.target.value.length == 2){
            return null
        }


        setVerifyCode({
            ...verifyCode,
            [event.target.id]: event.target.value
        })

        if (event.target.value) {

            if (event.target.id == "first") {
                let input = document.getElementById("second")
                input?.focus()

                if (event.target.value.length == 6){
                    setVerifyCode({
                        first: event.target.value[0],
                        second: event.target.value[1],
                        third: event.target.value[2],
                        fourth: event.target.value[3],
                        fifth: event.target.value[4],
                        sixth: event.target.value[5]
                    })
                }
            }
            if (event.target.id == "second") {
                let input = document.getElementById("third")
                input?.focus()
            }
            if (event.target.id == "third") {
                let input = document.getElementById("fourth")
                input?.focus()
            }
            if (event.target.id == "fourth") {
                let input = document.getElementById("fifth")
                input?.focus()
            }
            if (event.target.id == "fifth") {
                let input = document.getElementById("sixth")
                input?.focus()
            }
        }
    }

    function fullCode() {
        let code = `${verifyCode.first}${verifyCode.second}${verifyCode.third}${verifyCode.fourth}${verifyCode.fifth}${verifyCode.sixth}`

        return code
    }

    function onChange(event: any) {
        setNewPass({
            ...newPass,
            [event.target.name]: event.target.value
        })

        // Valida si las contraseñas son iguales
        if (event.target.name == "againPassword") {
            if (newPass.password !== event.target.value) {
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
        const pass = document.getElementById("againPassword");

        // @ts-ignore
        if (pass.type == "password") {
            // @ts-ignore
            pass.type = "text";
        } else {
            // @ts-ignore
            pass.type = "password";
        }
    }

    function close() {
        props.setRecovey(false)
    }

    async function onSubmit(event: any) {
        event.preventDefault()

        setPassDiff(false)

        setLoading(true)

        props.mail({
            mail: window.sessionStorage.getItem("mail"),
            password: ""
        })

        const res = await submitPasswordChange(fullCode(), window.sessionStorage.getItem("mail"), newPass.password)

        //Acaba la carga
        setLoading(false)

        if (res.error == "El código que ingresaste es incorrecto, inténtalo de nuevo") {
            // Mandar toast con res.error
            toast.error('El código que ingresaste es incorrecto, inténtalo de nuevo', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return null
        }

        if (res.error == "La contraseña debe contener mayúsculas, por lo menos 8 caracteres y simbolos (@#.$)") {
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

        if (res.error == "Has excedido el límite de intentos") {
            // Mandar toast con res.error
            toast.error('Has excedido el límite de intentos', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return null
        }

        if (res.error == "El código que iha expirado, vuelvelo a solicitar") {
            // Mandar toast con res.error
            toast.error('El código que iha expirado, vuelvelo a solicitar', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return null
        }

        if (res.message == "OK") {
            toast.success('La contraseña se ha actualizado correctamente', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            setTimeout(() => close(), 200)
        }

        close()
    }

    return (
        <div
            className="fixed top-0 z-40 left-0 bg-black bg-opacity-30 flex justify-center items-center h-screen w-screen">
            <div
                className="w-screen shadow-2xl lg:w-[513px] lg:h-auto lg:rounded-[20px] lg:p-12 h-screen z-50 bg-white p-5 flex flex-col items-center justify-center">
                <div className="max-w-md">
                    <p className="text-[#425AC5] text-[25px] lg:text-[28px] leading-tight font-semibold text-center">Digite
                        el código de verificacion y su nueva contraseña</p>
                    <p className="text-[12px] lg:text-[15px] text-[#707070] my-6">Digita el código que hemos enviado a
                        tu correo para que puedas continuar con el cambio de tu contraseña</p>

                    <div className="w-full rounded-md p-6 lg:p-0 shadow-[0_3px_7px_0_rgba(0,0,0,0.2)] lg:shadow-none">
                        <div className="relative w-full flex justify-center lg:mb-5">
                            <div
                                className="w-[38px] h-[28px] lg:w-[45px] lg:h-[35px] flex justify-center items-center rounded-[4px] mx-0.5 bg-gradient-to-r p-[6px] from-[#9955D4] to-[#425AC5]">
                                <input type="number" id="first" maxLength={1} onChange={next} value={verifyCode.first}
                                       required
                                       className="w-[36px] h-[26px] lg:w-[43px] lg:h-[33px] outline-0 text-center rounded-[3px]"/>
                            </div>
                            <div
                                className="w-[38px] h-[28px] lg:w-[45px] lg:h-[35px] flex justify-center items-center rounded-[4px] mx-0.5 bg-gradient-to-r p-[6px] from-[#9955D4] to-[#425AC5]">
                                <input type="number" id="second" maxLength={1} onChange={next} value={verifyCode.second}
                                       required
                                       className="w-[36px] h-[26px] lg:w-[43px] lg:h-[33px] outline-0 text-center rounded-[3px]"/>
                            </div>
                            <div
                                className="w-[38px] h-[28px] lg:w-[45px] lg:h-[35px] flex justify-center items-center rounded-[4px] mx-0.5 bg-gradient-to-r p-[6px] from-[#9955D4] to-[#425AC5]">
                                <input type="number" id="third" maxLength={1} onChange={next} value={verifyCode.third}
                                       required
                                       className="w-[36px] h-[26px] lg:w-[43px] lg:h-[33px] outline-0 text-center rounded-[3px]"/>
                            </div>
                            <div
                                className="w-[38px] h-[28px] lg:w-[45px] lg:h-[35px] flex justify-center items-center rounded-[4px] mx-0.5 bg-gradient-to-r p-[6px] from-[#9955D4] to-[#425AC5]">
                                <input type="number" id="fourth" maxLength={1} onChange={next} value={verifyCode.fourth}
                                       required
                                       className="w-[36px] h-[26px] lg:w-[43px] lg:h-[33px] outline-0 text-center rounded-[3px]"/>
                            </div>
                            <div
                                className="w-[38px] h-[28px] lg:w-[45px] lg:h-[35px] flex justify-center items-center rounded-[4px] mx-0.5 bg-gradient-to-r p-[6px] from-[#9955D4] to-[#425AC5]">
                                <input type="number" id="fifth" maxLength={1} onChange={next} value={verifyCode.fifth}
                                       required
                                       className="w-[36px] h-[26px] lg:w-[43px] lg:h-[33px] outline-0 text-center rounded-[3px]"/>
                            </div>
                            <div
                                className="w-[38px] h-[28px] lg:w-[45px] lg:h-[35px] flex justify-center items-center rounded-[4px] mx-0.5 bg-gradient-to-r p-[6px] from-[#9955D4] to-[#425AC5]">
                                <input type="number" id="sixth" maxLength={1} onChange={next} value={verifyCode.sixth}
                                       required
                                       className="w-[36px] h-[26px] lg:w-[43px] lg:h-[33px] outline-0 text-center rounded-[3px]"/>
                            </div>
                        </div>
                        <div className="relative password">
                            <label className="text-primary-button-bg text-[10px] lg:text-[14px]">Ingresa tu nueva
                                contraseña</label>
                            <input name="password" required
                                   className="border-b-2 border-neutral-300 w-full h-full text-[12px] lg:text-[15px] outline-0 pb-1"
                                   placeholder="Digite la nueva contraseña" type="password" onChange={onChange}
                                   value={newPass.password} id="password"/>
                            <div onClick={showPassword} className="h-2 absolute right-1 bottom-4 cursor-pointer"><Image
                                src={eye} height={20} width={30}></Image></div>
                        </div>
                        <div className="relative password">
                            <label className="text-primary-button-bg text-[10px] lg:text-[14px]">Escribe nuevamente tu
                                contraseña</label>
                            <input name="againPassword" required
                                   className="border-b-2 border-neutral-300 w-full h-full text-[12px] lg:text-[15px] outline-0 pb-1"
                                   placeholder="Confirma tu nueva contraseña" type="password" onChange={onChange}
                                   value={newPass.againPassword} id="againPassword"/>
                            <div onClick={showPasswordConfirm}
                                 className="h-2 absolute right-1 bottom-4 z-auto cursor-pointer">
                                <Image src={eye} height={20} width={30}></Image></div>
                        </div>
                        {
                            passDiff ?
                                <div className="text-[14px] text-red-500 underline">Las contraseñas deben
                                    coincidir</div> :
                                null
                        }
                        {
                            loading ?
                                <div className="flex justify-center items-center mt-8">
                                    <ScaleLoader color="#425AC5"/>
                                </div> :
                                <div className="flex justify-center items-center mt-10">
                                    <button onClick={onSubmit}
                                            className="bg-primary-button-bg text-[15px] text-white w-[166px] h-[33px] rounded-[5px]">
                                        Confirmar
                                    </button>
                                </div>
                        }
                    </div>

                    <div onClick={close}
                         className="text-[#9955D4] text-[10px] lg:text-[14px] cursor-pointer mt-5 flex justify-center"><Link
                        href="/login"><u><b>Volver al inicio</b></u></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecoverPassword;