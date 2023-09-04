import React, {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../src/screens/general/login/Logotipo.svg';
import photo from "../../src/screens/general/login/bg_image.svg";
import effect from "../../src/screens/general/login/Rectangle.svg";
import eye from '../../src/screens/general/icons/eye.svg';
import ModalNotify from "../../src/components/modalNofity/modalNofity";
import {signInUser} from "../../src/redux/actions/authActions";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {ToastContainer ,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {USER_STATES} from "../../src/utils/userStates";
import ScaleLoader from "react-spinners/ScaleLoader";
import RecoveryPassword from "../../src/components/recoverPassword/recoveryPassword";
import ChangePassword from "../../src/components/changePassword/changePassword";

const Login = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [showRecoveryPassword, setShowRecoveryPassword] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const router = useRouter();
    const [credentials, setCredentials] = useState({
        mail: "",
        password: ""
    })

    const [notify, setNotify] = useState({
        title: "",
        info: <></>,
        button: "",
        url: "",
        show:false,
    })

    const onSubmit = async (e: any) => {
        e.preventDefault()
        const { mail, password} = credentials;
        setLoading(true)
        const res = await signInUser(dispatch, mail, password);
        setLoading(false)

        if (res == null){
            toast.error('Tu usuario no tiene rol de Amplifier', {
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
        } else if (res.data.estado == USER_STATES.ESPERANDO_APROBACION){
            setNotify({
                title: "¡Hola!",
                info: <p>Te informamos que tu solicitud de registro <b className="text-[#EA61DA]">esta en proceso</b>, pronto te daremos una respuesta </p>,
                button: "Salir",
                show: true,
                url: "",
            })
            return null
        } else if (res.data.estado == USER_STATES.RECHAZADO){
            setNotify({
                title: "¡Hola!",
                info: <p>Tu solicitud de registro <b className="text-[#EA61DA]">ha sido rechazada</b> debido a que no cumples con todos los requisitos necesarios, esperamos puedas aplicar de nuevo en otra ocasión</p>,
                button: "Salir",
                show: true,
                url: "",
            })
            return null
        } else if (res.data.estado == USER_STATES.COMPLETANDO_REGISTRO){
            setNotify({
                title: "¡Hola!",
                info: <p>Upss, Al parecer <b className="text-[#EA61DA]">no has completado tu registro</b>, porfavor completa el registro para continuar</p>,
                button: "Continuar",
                show: true,
                url: "/geographical-data",
            })
            return null
        } else if (res.data.estado == USER_STATES.OCULTO){
            setNotify({
                title: "¡Hola!",
                info: <p>Al parecer tu cuenta se encuentra <b className="text-[#EA61DA]">desactivada</b>, por favor contacta con los administradores</p>,
                button: "Salir",
                show: true,
                url: "",
            })
            return null
        }
        
        if(!res.error) {
            if (res.data.estado == USER_STATES.ACTIVO){
                setNotify({
                    title: "¡Hola!",
                    info: <p>Tu solicitud de registro ha sido todo un exito ahora <b className="text-[#EA61DA]">eres un Amplifier</b>, preparate para pasarla bien llevando a cabo diferentes actividades con campañas publicitarias</p>,
                    button: "Continuar",
                    show: false,
                    url: "/profile",
                })
                router.push("/")
            }

            if (res.data.estado == USER_STATES.SELECCION_INTERESES){
                setNotify({
                    title: "¡Hola!",
                    info: <p>Tu solicitud de registro ha sido todo un exito ahora <b className="text-[#EA61DA]">eres un Amplifier</b>, preparate para pasarla bien llevando a cabo diferentes actividades con campañas publicitarias</p>,
                    button: "Continuar",
                    show: true,
                    url: "/interests",
                })
            }
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
            {notify.show ?
                <ModalNotify
                    title={notify.title}
                    info={notify.info}
                    button={notify.button}
                    setNotify={setNotify}
                    url={notify.url}
                />:null
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
                            <label className="text-primary text-[10px] lg:text-[14px]">Correo electronico</label>
                            <input required onChange={onChange} name={"mail"} value={credentials.mail} type="text" className="border-b-2 border-neutral-300 w-full min-w-[250px] h-full text-[12px] lg:text-[15px] outline-0 pb-1"/>
                        </div>
                        <div className="password relative mt-3">
                            <label className="text-primary text-[10px] lg:text-[14px]">Contraseña</label>
                            <input required onChange={onChange} name={"password"} value={credentials.password} id="password" className="border-b-2 border-neutral-300 w-full h-full text-[12px] lg:text-[15px] outline-0 pb-1" type="password"/>
                            <div onClick={showPassword} className="h-2 absolute right-1 bottom-4 cursor-pointer"><Image src={eye} height={20} width={30}></Image></div>
                        </div>
                        <div className="flex justify-between text-url text-[10px] lg:text-[14px] pt-9">
                            <div onClick={() => setShowChangePassword(true)} className="cursor-pointer"><a>¿Olvidé mi contraseña?</a></div>
                            <Link href="/sign-up"><a>Crear cuenta</a></Link>
                        </div>
                        <div className="flex justify-center items-center py-9">
                            {loading ?
                                <ScaleLoader color="#425AC5"/>:
                                <button className="bg-primary text-[15px] text-white w-[166px] h-[33px] rounded-[5px]">
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