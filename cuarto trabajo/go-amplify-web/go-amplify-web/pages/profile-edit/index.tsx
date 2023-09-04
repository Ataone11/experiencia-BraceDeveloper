import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import arrow_blue from "../../src/screens/general/login/arrow-blue.svg";
import ScaleLoader from "react-spinners/ScaleLoader";
import EditLocation from "../../src/components/edit-location/edit-location";
import { updateUser } from "../../src/redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import { ERROR, S3_BUCKET_URL } from "../../src/utils/constants";
import { selectUser } from '../../src/redux/reducers/authReducer';
import BasePage from '../../src/screens/general/base/BasePage';

const Profile = () => {

    const router = useRouter();
    const user = useSelector(selectUser);
    const dispatch = useDispatch()

    const [userInfo, setUserInfo] = useState({
        nombre: "",
        apellido: "",
        city: "",
        direccion: "",
        indicacionesAdicionales: "",
        latitud: "",
        longitud: "",
        urlFoto: "",
    });

    useEffect(() => {
        if (user) {
            setUserInfo({
                nombre: user.nombre,
                apellido: user.apellido,
                city: `${user.ciudad?.nombre}`,
                direccion: user.direccion,
                indicacionesAdicionales: user.indicacionesAdicionales,
                latitud: user.latitud,
                longitud: user.longitud,
                urlFoto: user?.urlFoto,
            })
        }
    }, [user])

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    function onChange(event: any) {
        setUserInfo({
            ...userInfo,
            [event.target.name]: event.target.value
        })
    }

    function goToHome() {
        router.push("/profile")
    }

    async function onSubmit(event: any) {
        event.preventDefault()

        setLoading(true)
        const res: any = await updateUser(dispatch, userInfo)
        setLoading(false)
        
        if(res.status === ERROR) {
            toast.error(res.data.response.data.message);
            return
        }

        toast.success('Actualizacion exitosa', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
        });

        goToHome();
    }

    return (
        <BasePage>
            <div className="flex flex-col justify-center items-center p-4">
                {show ?
                    <EditLocation
                        setShow={setShow}
                        setUserInfo={setUserInfo}
                        userInfo={userInfo}
                    /> : null
                }
                <div className="relative w-full max-w-lg lg:max-w-full flex flex-row justify-center lg:pl-5 lg:justify-start items-center pt-3">
                    <Link href='/profile'>
                        <div className="relative cursor-pointer z-10 -left-1/3 lg:left-0 lg:block">
                            <Image src={arrow_blue} height={25} />
                        </div>
                    </Link>
                    <div className="absolute z-10 text-primary text-[25px] lg:relative lg:-top-1 lg:ml-8">
                        <h1>Editar perfil</h1>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center lg:flex-row lg:h-72 lg:justify-around lg:mt-16 lg:max-w-4xl lg:rounded-2xl lg:shadow-[0_0_15px_0_rgba(0,0,0,0.1)]">
                    {
                        userInfo.urlFoto
                            ? <div style={{ backgroundImage: `url('${S3_BUCKET_URL}${userInfo.urlFoto}')` }} className="w-[122px] h-[122px] rounded-full bg-cover bg-center shadow-[0_0_5px_0_rgba(0,0,0,0.2)]" />
                            : <div style={{ backgroundImage: `url('https://www.pngitem.com/pimgs/m/334-3344170_user-vector-user-flat-png-transparent-png.png')` }} className="w-[122px] h-[122px] rounded-full bg-cover bg-center shadow-[0_0_5px_0_rgba(0,0,0,0.2)]" />
                    }
                    <div className="hidden h-52 w-[2px] bg-gray-300 lg:flex" />
                    <div className="p-2 max-w-md w-full">
                        <form>
                            <div className="flex flex-col pt-2.5">
                                <label className="text-primary text-[10px] lg:text-[14px]">Nombre(s)</label>
                                <input type="text" className="border-b-2 border-neutral-300 w-full h-full text-[12px] outline-0 pb-1" required name="nombre" onChange={onChange} value={userInfo.nombre} />
                            </div>
                            <div className="flex flex-col pt-2.5">
                                <label className="text-primary text-[10px] lg:text-[14px]">Apellido(s)</label>
                                <input type="text" className="border-b-2 border-neutral-300 w-full h-full text-[12px] outline-0 pb-1" required name="apellido" onChange={onChange} value={userInfo.apellido} />
                            </div>
                            {/* <div className="flex flex-col pt-2.5">
                                <label className="text-primary text-[10px] lg:text-[14px]">Ciudad</label>
                                <input type="text" disabled className="border-b-2 border-neutral-300 w-full h-full text-[12px] outline-0 pb-1" required name="city" onChange={onChange} value={userInfo.city} />
                            </div> */}
                            <div className="flex flex-col pt-2.5">
                                <label className="text-primary text-[10px] lg:text-[14px]">Dirección</label>
                                <input type="email" onClick={() => setShow(true)} className="cursor-pointer border-b-2 border-neutral-300 w-full h-full text-[12px] outline-0 pb-1" required name="direccion" onChange={onChange} value={userInfo.direccion} />
                            </div>
                            {/* <div className="flex flex-col pt-2.5">
                                <label className="text-primary text-[10px] lg:text-[14px]">Indicaciones adicionales</label>
                                <input type="text" className="border-b-2 border-neutral-300 w-full h-full text-[12px] outline-0 pb-1" required name="indicacionesAdicionales" onChange={onChange} value={userInfo.indicacionesAdicionales} />
                            </div> */}
                        </form>
                    </div>
                </div>
                <div className="w-full flex my-16 justify-center">
                    {loading ?
                        <ScaleLoader color="#425AC5" /> :
                        <button onClick={onSubmit} className="bg-primary text-white w-[166px] h-[33px] rounded-[5px]">
                            Guardar cambios
                        </button>
                    }
                </div>
            </div>
        </BasePage>
    )

}

export default Profile