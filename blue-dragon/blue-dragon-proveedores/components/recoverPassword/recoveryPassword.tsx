import React, {useState} from 'react';
import Image from "next/image";
import {toast} from "react-toastify";
import {submitPasswordChange} from "../../src/redux/actions/authActions";
import ScaleLoader from "react-spinners/ScaleLoader";
import ThruLogo from "../../src/assets/thru/logo_blue.svg";
import { useTranslation } from 'next-i18next';

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

        if (event.target.value.length == 2) {
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

                if (event.target.value.length == 6) {
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
            toast.error(t("login:sends"), {
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
            toast.error(t("login:(@#.$)"), {
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
            toast.error(t("login:you-have-exceeded-the limit-of-attempts"), {
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
            toast.error(t("login:the-code-that-has-expired,-request-it-again"), {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return null
        }

        if (res.message == "OK") {
            toast.success(t("login:the-password-has-been-updated-correctly"), {
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
    const { t } = useTranslation();
    return (
        <div
            className="fixed top-0 z-40 left-0 bg-black bg-opacity-30 flex justify-center items-center h-screen w-screen">
            <div
                className="w-screen shadow-2xl lg:w-[513px] lg:h-auto lg:rounded-[0.5rem] lg:p-12 h-screen z-50 bg-white p-5 flex flex-col items-center justify-center">
                <div className="max-w-md">
                    <div className="my-8 flex justify-center">
                        <Image alt="" src={ThruLogo}/>
                    </div>
                    <p className="text-[#425AC5] text-[25px] lg:text-[28px] leading-tight font-semibold text-center">
                    </p>
                    <p className="text-[12px] text-center lg:text-[15px] text-[#707070] my-6">
                    {t("login:we-send-you-a-code-to-the-mail")} {window.sessionStorage.getItem("mail")}. <br/>
                    {t("login:create-a-new-password-that-you-remember")}
                    </p>

                    <div className="w-full rounded-md p-6 lg:p-0 shadow-[0_3px_7px_0_rgba(0,0,0,0.2)] lg:shadow-none">
                        <div className="relative w-full flex justify-center lg:mb-5">

                            <input
                                className="w-[36px] mx-1 border-2 border-[#DADADA] h-[26px] lg:w-[35px] lg:h-[36px] outline-0 text-center rounded-[3px]"
                                type="number" id="first" maxLength={1} onChange={next} value={verifyCode.first}
                                required/>

                            <input
                                className="w-[36px] mx-1 border-2 border-[#DADADA] h-[26px] lg:w-[35px] lg:h-[36px] outline-0 text-center rounded-[3px]"
                                type="number" id="second" maxLength={1} onChange={next} value={verifyCode.second}
                                required/>

                            <input
                                className="w-[36px] mx-1 border-2 border-[#DADADA] h-[26px] lg:w-[35px] lg:h-[36px] outline-0 text-center rounded-[3px]"
                                type="number" id="third" maxLength={1} onChange={next} value={verifyCode.third}
                                required/>

                            <input
                                className="w-[36px] mx-1 border-2 border-[#DADADA] h-[26px] lg:w-[35px] lg:h-[36px] outline-0 text-center rounded-[3px]"
                                type="number" id="fourth" maxLength={1} onChange={next} value={verifyCode.fourth}
                                required/>

                            <input
                                className="w-[36px] mx-1 border-2 border-[#DADADA] h-[26px] lg:w-[35px] lg:h-[36px] outline-0 text-center rounded-[3px]"
                                type="number" id="fifth" maxLength={1} onChange={next} value={verifyCode.fifth}
                                required/>

                            <input
                                className="w-[36px] mx-1 border-2 border-[#DADADA] h-[26px] lg:w-[35px] lg:h-[36px] outline-0 text-center rounded-[3px]"
                                type="number" id="sixth" maxLength={1} onChange={next} value={verifyCode.sixth}
                                required/>
                        </div>
                        <div className="relative password">
                            <label className="text-[#303030] text-[10px] lg:text-[14px]">
                            {t("login:password")}
                            </label>
                            <input name="password" required
                                   className="border-2 pl-2 pt-1 rounded-md border-neutral-300 w-full h-[36px] text-[12px] lg:text-[15px] outline-0 pb-1"
                                   placeholder="Digite la nueva contraseña" type="password" onChange={onChange}
                                   value={newPass.password} id="password"/>
                            <div onClick={showPassword} className="h-2 absolute right-2 bottom-4 cursor-pointer">
                                <svg
                                    width="19"
                                    height="14"
                                    viewBox="0 0 19 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17.0909 5.96179C17.4853 6.47778 17.4853 7.17436 17.0909 7.68952C15.8483 9.31155 12.8673 12.6513 9.38685 12.6513C5.90643 12.6513 2.92536 9.31155 1.68283 7.68952C1.4909 7.44245 1.38672 7.13851 1.38672 6.82566C1.38672 6.5128 1.4909 6.20886 1.68283 5.96179C2.92536 4.33977 5.90643 1 9.38685 1C12.8673 1 15.8483 4.33977 17.0909 5.96179V5.96179Z"
                                        stroke="#005C90"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M9.38733 9.32228C10.7662 9.32228 11.884 8.20446 11.884 6.82557C11.884 5.44667 10.7662 4.32886 9.38733 4.32886C8.00844 4.32886 6.89062 5.44667 6.89062 6.82557C6.89062 8.20446 8.00844 9.32228 9.38733 9.32228Z"
                                        stroke="#005C90"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="relative password">
                            <label className="text-[#303030] text-[10px] lg:text-[14px]">
                            {t("login:verify-password")}
                            </label>
                            <input name="againPassword" required
                                   className="border-2 pl-2 pt-1 rounded-md border-neutral-300 w-full h-[36px] text-[12px] lg:text-[15px] outline-0 pb-1"
                                   placeholder="Confirma tu nueva contraseña" type="password" onChange={onChange}
                                   value={newPass.againPassword} id="againPassword"/>
                            <div onClick={showPasswordConfirm}
                                 className="h-2 absolute right-2 bottom-4 z-auto cursor-pointer">
                                <svg
                                    width="19"
                                    height="14"
                                    viewBox="0 0 19 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17.0909 5.96179C17.4853 6.47778 17.4853 7.17436 17.0909 7.68952C15.8483 9.31155 12.8673 12.6513 9.38685 12.6513C5.90643 12.6513 2.92536 9.31155 1.68283 7.68952C1.4909 7.44245 1.38672 7.13851 1.38672 6.82566C1.38672 6.5128 1.4909 6.20886 1.68283 5.96179C2.92536 4.33977 5.90643 1 9.38685 1C12.8673 1 15.8483 4.33977 17.0909 5.96179V5.96179Z"
                                        stroke="#005C90"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M9.38733 9.32228C10.7662 9.32228 11.884 8.20446 11.884 6.82557C11.884 5.44667 10.7662 4.32886 9.38733 4.32886C8.00844 4.32886 6.89062 5.44667 6.89062 6.82557C6.89062 8.20446 8.00844 9.32228 9.38733 9.32228Z"
                                        stroke="#005C90"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                        {
                            passDiff ?
                                <div className="text-[14px] text-red-500 underline">{t("login:passwords-must-match")}</div> :
                                null
                        }
                        {
                            loading ?
                                <div className="flex justify-center items-center mt-8">
                                    <ScaleLoader color="#425AC5"/>
                                </div> :
                                <div className="flex justify-center items-center mt-10">
                                    <button onClick={onSubmit}
                                            className="bg-primary text-[15px] text-white w-[166px] h-[33px] rounded-[5px]">
                                        {t("login:send")}
                                    </button>
                                </div>
                        }
                    </div>

                    <div onClick={close}
                         className="text-black text-[14px] cursor-pointer mt-5 flex justify-center">
                       {t("login:forget-it-i-remembered-it")}, <b className="text-primary ml-1"> {t("login:i-already-remembered-her")}</b>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecoverPassword;