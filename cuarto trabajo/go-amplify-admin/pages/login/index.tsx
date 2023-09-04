import React, {useState} from 'react';
import Image from 'next/image';
import logo from '../../src/screens/general/login/Logotipo.svg';
import photo from "../../src/screens/general/login/bg_image.svg";
import effect from "../../src/screens/general/login/Rectangle.svg";
import eye from '../../src/screens/general/login/eye.svg';
import {signInUser} from "../../src/redux/actions/authActions";
import {useDispatch} from "react-redux";
import {ToastContainer ,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ScaleLoader from "react-spinners/ScaleLoader";
import RecoveryPassword from "../../src/components/recoverPassword/recoveryPassword";
import ChangePassword from "../../src/components/changePassword/changePassword";
import T from '../../src/components/T';

const Login = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [showRecoveryPassword, setShowRecoveryPassword] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [credentials, setCredentials] = useState({
        mail: "",
        password: ""
    })

    const onSubmit = async (e: any) => {
        e.preventDefault()
        const { mail, password} = credentials;
        setLoading(true)
        const res = await signInUser(dispatch, mail, password);
        setLoading(false)

        if (res == null){
            toast.error('Tu usuario no es Administrador', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return null
        }

        // Manejar error
        if (res.error == "Incorrect username or password."){
            toast.warn('El usuario y/o contraseña son incorrectos', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return null
        }

        if(res.error) {
            toast.error(res.error);
            return
        }

        if(!res.error) {
        }
    }

    function showPassword(){
        const tipo = document.getElementById("password");

        // @ts-ignore
        if(tipo.type == "password"){
            // @ts-ignore
            tipo.type = "text";
        }else{
            // @ts-ignore
            tipo.type = "password";
        }
    }

    function onChange(event: any) {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        })
    }


    return (
        <div className="relative w-screen h-screen m-0">
            
            {
                showRecoveryPassword ?
                    <RecoveryPassword
                        setRecovey={setShowRecoveryPassword}
                        mail={setCredentials}
                    />
                    :null
            }
            {
                showChangePassword ?
                    <ChangePassword
                        setRecovey={setShowRecoveryPassword}
                        setChange={setShowChangePassword}
                        setCredentials={setCredentials}
                    />
                    :null
            }
            <div className="z-0 lg:hidden"><Image src={photo} layout={"responsive"}/></div>
            <div className="absolute z-0 top-0 opacity-50 w-screen h-screen lg:hidden">
                <Image src={effect} layout={"responsive"}/>
            </div>
            <div className="z-10 fixed bottom-0 px-10 pt-10 lg:flex lg:flex-row h-auto bg-white rounded-t-[18px] lg:h-screen lg:bottom-auto lg:pt-0 lg:px-0 w-full">
                <div className="hidden bg-no-repeat bg-cover bg-[url('../../src/screens/general/login/bg_image.svg')] lg:block lg:w-1/2 lg:max-w-[600px] rounded-r-full"/>
                <div className="flex flex-col items-center justify-center lg:w-1/2 lg:h-screen flex-grow">
                    <Image className="" src={logo}/>
                    <form onSubmit={onSubmit} className="mx-7 w-full min-w-min max-w-[400px] px-7 pt-10 lg:w-96 lg:h-auto">
                        <div className="email">
                            <label className="text-primary-button-bg text-[10px] lg:text-[14px]">Correo electronico</label>
                            <input required onChange={onChange} name={"mail"} value={credentials.mail} type="text" className="border-b-2 border-neutral-300 w-full min-w-[250px] h-full text-[12px] lg:text-[15px] outline-0 pb-1"/>
                        </div>
                        <div className="password relative mt-3">
                            <label className="text-primary-button-bg text-[10px] lg:text-[14px]">Contraseña</label>
                            <input required onChange={onChange} name={"password"} value={credentials.password} id="password" className="border-b-2 border-neutral-300 w-full h-full text-[12px] lg:text-[15px] outline-0 pb-1" type="password"/>
                            <div onClick={showPassword} className="h-2 absolute right-1 bottom-4 cursor-pointer"><Image src={eye} height={20} width={30}></Image></div>
                        </div>
                        <div className="flex text-[#9955D4] text-[10px] lg:text-[14px] pt-9">
                            <div onClick={() => setShowChangePassword(true)} className="cursor-pointer"><a>¿Olvidé mi contraseña?</a></div>
                        </div>
                        <div className="flex justify-center items-center py-9">
                            {loading ?
                                <ScaleLoader color="#425AC5"/>:
                                <button className="bg-primary-button-bg text-[15px] text-white w-[166px] h-[33px] rounded-[5px]">
                                    Iniciar sesión
                                </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;