import React from 'react';
import Image from "next/image";
import cross from '../../screens/general/login/cross.svg'
import {useRouter} from "next/router";


//se le envia title, info y button para generar una notificacion
const ModalNotify = (props:any) => {
    const router = useRouter();

    function  close(){
        props.url !== "" ?
            router.push(props.url)
            :props.setNotify({show:false})
    }

    return (
        <div className="fixed top-0 left-0 z-20 w-screen h-screen flex justify-center items-center bg-opacity-30 bg-black">
            <div className="bg-white w-80 h-auto p-7 mx-4 rounded-2xl flex flex-col justify-center items-center">
                <div className="w-full flex flex-row-reverse align-bottom">
                    <Image src={cross}/>
                </div>
                <h1 className="text-primary text-[25px] font-bold text-center">{props.title}</h1>
                <div className="text-center text-[12px] my-7">{props.info}</div>
                <button onClick={close} className="bg-primary text-white text-[15px] w-[166px] h-[33px] rounded-[5px]">{props.button}</button>
            </div>
        </div>
    );
};

export default ModalNotify;