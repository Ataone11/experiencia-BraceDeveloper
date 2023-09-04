import React, { useEffect, useState } from 'react';
import Image from "next/image";
import arrow_blue from "../../screens/general/login/arrow-blue.svg";
import check from "../../screens/general/login/check.svg";
import ChooseMapLocation, { LocationInfoInterface } from "../maps/ChooseMapLocation";

interface EditLocationProps {
    userInfo: any,
    setUserInfo: (newUserInfo: any) => void
    setShow: (newShow: boolean) => void
}
const EditLocation = ({ userInfo, setUserInfo, setShow }: EditLocationProps) => {

    const [location, setLocation] = useState({
        city: "",
        direccion: "",
        latitud: "",
        longitud: "",
        pais: "",
    });

    const [locationInfo, setLocationInfo] =
        useState<LocationInfoInterface | null>(null);

    useEffect(() => {
        setLocation({
            direccion: locationInfo ? locationInfo.address : "",
            latitud: locationInfo ? locationInfo.latitude.toString() : "",
            longitud: locationInfo ? locationInfo.longitude.toString() : "",
            city: locationInfo ? locationInfo.city : "",
            pais: locationInfo ? locationInfo.country : "",
        })
    }, [locationInfo])

    function sendLocation() {
        setUserInfo({
            ...userInfo,
            direccion: location.direccion,
            latitud: location.latitud,
            longitud: location.longitud,
            city: location.city,
        })

        setShow(false)
    }

    function onChange(event: any) {
        setLocation({
            ...location,
            [event.target.name]: event.target.value
        })
    }

    function close() {
        setShow(false)
    }

    return (
        <div className=" fixed top-0 left-0 z-20 w-screen h-screen p-4 bg-opacity-30 bg-black flex justify-center items-center">
            <div className="bg-white rounded-lg w-96 lg:flex lg:flex-col lg:items-center lg:w-8/12 lg:max-w-3xl">
                <div className="w-full flex flex-row justify-around lg:justify-between lg:px-7 items-center pt-3">
                    <div onClick={close} className="cursor-pointer z-10 -left-1/3 lg:block">
                        <Image src={arrow_blue} height={25} />
                    </div>
                    <div className="z-10 text-primary text-[20px]">
                        <h1>Editar ubicación</h1>
                    </div>
                    <div onClick={sendLocation} className="cursor-pointer z-10 -left-1/3 lg:block">
                        <Image src={check} height={25} />
                    </div>
                </div>
                <div className="p-2 max-w-md w-full lg:max-w-4xl">
                    <form onSubmit={sendLocation} className="mx-2 max-w-lg lg:max-w-5xl lg:w-full">
                        <div className="lg:flex lg:flex-row">
                            <fieldset className="pb-5 lg:w-full lg:mx-3 lg:flex lg:flex-col lg:justify-between">
                                <ChooseMapLocation setLocationInfo={setLocationInfo} locationInfo={locationInfo} onChange={onChange} createUsuarioInfo={locationInfo} />
                            </fieldset>
                        </div>
                        <div className="w-full flex justify-center lg:w-full lg:flex lg:justify-center lg py-5">
                            <button type="submit" className="bg-primary text-white w-[166px] h-[33px] rounded-[5px]">
                                Confirmar
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )

}

export default EditLocation