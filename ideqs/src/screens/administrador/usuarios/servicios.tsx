import Image from "next/image";
import { useEffect, useState } from "react";
import iden from "../../../assets//administrador/usuarios/manejador/servicios.svg";
import carnepdf from "../../../assets/administrador/usuarios/manejador/carnepdf.png";
import idmobile from "../../../assets/administrador/usuarios/manejador/idmobile.png";
import idfisico from "../../../assets/administrador/usuarios/manejador/idfisico.png";
import Switch from "../../../components/inputs/switch";
import { UserDataModel } from "../../../models/userDataModel";
import { updateDataUser } from "../../../redux/actions/adminUserActions";
interface ServicesType {
    user: UserDataModel | null
}

const Services = ({ user}: ServicesType) => {
    const [carne, setCarne] = useState<boolean>();
    const [mobile, setMobile] = useState<boolean>();
    const [fisico, setFisico] = useState<boolean>();

    

    useEffect(()=>{
        if(carne!==undefined && mobile!==undefined && fisico !==undefined)
        updateDataUser({ ...user, pdf: carne?1:0, mobile: mobile?1:0, physical: fisico?1:0})
    },[carne, mobile, fisico])
    
    useEffect(()=>{
        if(user){
            setCarne(user?.pdf === 1)
            setMobile(user?.mobile === 1)
            setFisico(user?.physical === 1)
        }
    },[user?.id])



    const UpdateServices = (event: any) => {
        if (event.target.name === "pdf")
            setCarne(!carne)
        if (event.target.name === "mobile")
            setMobile(!mobile)
        if (event.target.name === "physical")
            setFisico(!fisico)
    }
    

    return (<div className="container mx-auto border-2 border-azulPrimary100 shadow-xl rounded-lg lg:w-[805px] w-[288px] my-10">
        <div className="h-[60px] bg-[#F6FAFF] items-center flex ">
            <div className="mx-7 flex justify-start items-center gap-5">
                <Image src={iden} alt="" className="" />
                <span className="lg:text-textSize4 text-[16px] text-azulPrimary700">
                    Servicios
                </span>
            </div>
        </div>
        <div className="lg:h-[294px]">
            <div className="lg:grid lg:grid-cols-3 flex flex-col justify-center text-center" >
                <div className="flex flex-col lg:py-10 py-5 px-24 mx-auto">
                    <div className="flex my-1">
                        <Image src={carnepdf} layout="fixed" alt="" className="" />
                    </div>
                    <span className=" my-5 text-azulPrimary700  text-textSize6 font-semibold  text-center w-full">
                        Carné PDF
                    </span>
                    <Switch name={"pdf"} value={carne} action={UpdateServices} />
                </div>
                <div className="flex flex-col lg:py-10 py-5 px-10 justify-center text-center">
                    <div className="my-5">
                        <Image src={idmobile} layout="fixed" alt="" className="pt-5" />
                    </div>
                    <span className="  pt-11 text-azulPrimary700  text-textSize6 font-semibold">
                        ID Mobile
                    </span>
                    <br />
                    <Switch name={"mobile"} value={mobile} action={UpdateServices} />
                </div>
                <div className="flex flex-col lg:py-10 py-5 px-20">
                    <div className="mx-auto">
                        <Image src={idfisico} layout="fixed" alt="" className="" />
                    </div>
                    <span className=" my-5 text-azulPrimary700  text-textSize6 font-semibold pt-2">
                        ID Físico
                    </span>
                    <Switch name={"physical"} value={fisico} action={UpdateServices} />
                </div>
            </div>
        </div>
    </div>)
}
export default Services;