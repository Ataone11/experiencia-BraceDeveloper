import Button from "../../../components/buttons/primaryButton";
import BasePage from "../../general/base/BasePage";
import User from "../../../assets/administrador/usuarios/data.svg";
import Box from "../../../components/box/userBox";

const Digital = () => {
    return (
        <>
            <div className="grid grid-cols-2 pt-[44px] px-[82px] ">
                <div className="flex mb-[30px]">
                    <input type="checkbox" title="1" name="1" className="w-[18px] mr-[19px]"/>
                    <label htmlFor="1">Seguros estudiantes 1</label>
                </div>
                <div className="flex mb-[30px]">
                    <input type="checkbox" title="1" name="1" className="w-[18px] mr-[19px]"/>
                    <label htmlFor="1">Seguros estudiantes 2</label>
                </div>
                <div className="flex mb-[30px]">
                    <input type="checkbox" title="1" name="1" className="w-[18px] mr-[19px]"/>
                    <label htmlFor="1">Exequial 1</label>
                </div>
                <div className="flex mb-[30px]">
                    <input type="checkbox" title="1" name="1" className="w-[18px] mr-[19px]"/>
                    <label htmlFor="1">Exequial 2</label>
                </div>
                <div className="flex mb-[30px]">
                    <input type="checkbox" title="1" name="1" className="w-[18px] mr-[19px]"/>
                    <label htmlFor="1">Colegios profecionales</label>
                </div>
                <div className="flex mb-[30px]">
                    <input type="checkbox" title="1" name="1" className="w-[18px] mr-[19px]"/>
                    <label htmlFor="1">Codigos-barras-QR</label>
                </div>
                <div className="flex ">
                    <input type="checkbox" title="1" name="1" className="w-[18px] mr-[19px]"/>
                    <label htmlFor="1">Carnes corporativos</label>
                </div>
                <div className="flex ">
                    <input type="checkbox" title="1" name="1"  className="w-[18px] mr-[19px]"/>
                    <label htmlFor="1">Añadir formato</label>
                </div>
            </div>
            <div className="w-full flex justify-end px-8 pb-[30px]">
                <Button color={'bg-[#086EAE80] my-0'} label={'Guardar cambios'}></Button>
            </div>
        </>
    )
}

const DigitalData = () => {
    return (
        <BasePage>
            <Box title={'Datos digitales'} icon={User} label={<Digital/>} className={'w-[805px]'}></Box>
        </BasePage>
    )
}

export default DigitalData;
