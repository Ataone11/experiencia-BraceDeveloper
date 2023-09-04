import React, {useState} from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";
import {forgotPasswordWithAmazon} from "../../src/redux/actions/authActions";
import {toast, ToastContainer} from "react-toastify";
import Image from "next/image";
import ThruLogo from "../../src/assets/thru/logo_blue.svg";
import BrandBlue from "../../assets/BrandBlue";

const RecoverPassword = (props: any) => {

    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false);

    function onChange(event: any) {
        setEmail(event.target.value)
    }

    function close() {
        props.setChange(false)
    }

    async function send(event:any) {
        event.preventDefault()

        setLoading(true)
        //Verificar existencia del correo

        let verifyEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

        if (verifyEmail.test(email)) {
            await forgotPasswordWithAmazon(email)

            window.sessionStorage.setItem("mail", email)

            props.setCredentials(email)
            props.setChange(false)
            props.setRecovey(true)
        }else{
            toast.error('Porfavor ingresa un correo valido', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }

        setLoading(false)
    }

    return (
        <div
            className="fixed top-0 left-0 z-40 w-screen h-screen bg-black bg-opacity-30 flex justify-center items-center">
            <div
                className="bg-white flex flex-col items-center justify-center max-w-md p-8 shadow-2xl rounded-[0.5rem]">

                <div className="w-fit mx-auto my-5">
                    <BrandBlue />
                </div>
                <p className="text-Principal text-[28px] leading-tight font-semibold text-center">
                    ¿Olvidaste tu contraseña?
                </p>
                <p className="text-[15px] text-black text-center mt-6 mx-3">
                    No te preocupes,es posible recuperarla. <br/>
                    Escribe el correo electrónico con el que te registraste.
                </p>
                <div className="w-full rounded-md p-3 mt-4">
                    <form action="components/changePassword/changePassword">
                        <div className="mail">
                            <label className="text-[#303030] text-[14px]">Correo electronico</label>
                            <input id="mail" required
                                   className="border-2 rounded-md border-[#EEEEEE] w-full h-[36px] pl-3 pt-1 text-[13px] outline-0 pb-1"
                                   placeholder="example@e-mail.com" type="email" onChange={onChange}/>
                        </div>
                        {
                            loading ?
                                <div className="flex justify-center items-center mt-8">
                                    <ScaleLoader color="#425AC5"/>
                                </div> :
                                <div className="flex justify-center items-center mt-8">
                                    <button onClick={send}
                                            className="bg-Principal text-white text-[15px] w-[166px] h-[33px] rounded-[5px]">
                                        Enviar
                                    </button>
                                </div>
                        }
                    </form>
                </div>

                <div onClick={close}
                     className="text-black text-[14px] cursor-pointer mt-5 flex justify-center">
                    Olvidalo lo he recordado, <b className="text-Principal ml-1"> ya la recorde</b>
                </div>
            </div>
        </div>
    );
};

export default RecoverPassword;