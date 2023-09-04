import React, {useState} from 'react';
import Link from "next/link";
import ScaleLoader from "react-spinners/ScaleLoader";
import {forgotPasswordWithAmazon} from "../../redux/actions/authActions";
import {toast, ToastContainer} from "react-toastify";

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
            className="fixed top-0 left-0 z-40 w-screen h-screen bg-white lg:bg-black lg:bg-opacity-30 flex justify-center items-center">
            <div
                className="bg-white p-5 flex flex-col items-center justify-center max-w-md lg:p-8 lg:shadow-2xl lg:rounded-[20px]">
                <p className="text-[#425AC5] text-[25px] lg:text-[28px] leading-tight font-semibold text-center">Cambiar
                    contraseña</p>
                <p className="text-[12px] lg:text-[15px] text-[#707070] mt-6 mx-3">Ingrese su correo para hacer el
                    cambio de
                    su contraseña. Enviaremos un código provicional para hacer el cambio </p>

                <div className="w-full rounded-md p-6 lg:p-3 mt-4 shadow-[0_3px_7px_0_rgba(0,0,0,0.2)] lg:shadow-none">
                    <form action="">
                        <div className="mail">
                            <label className="text-primary text-[10px] lg:text-[14px]">Correo electronico</label>
                            <input id="mail" required
                                   className="border-b-2 border-neutral-300 w-full h-full text-[12px] lg:text-[14px] outline-0 pb-1"
                                   placeholder="example@e-mail.com" type="email" onChange={onChange}/>
                        </div>
                        {
                            loading ?
                                <div className="flex justify-center items-center mt-8">
                                    <ScaleLoader color="#425AC5"/>
                                </div> :
                                <div className="flex justify-center items-center mt-8">
                                    <button onClick={send}
                                            className="bg-primary text-white text-[15px] w-[166px] h-[33px] rounded-[5px]">
                                        Enviar
                                    </button>
                                </div>
                        }
                    </form>
                </div>

                <div onClick={close}
                     className="text-url text-[10px] lg:text-[14px] cursor-pointer mt-5 flex justify-center">
                    <u><b>Volver al inicio</b></u>
                </div>
            </div>
        </div>
    );
};

export default RecoverPassword;