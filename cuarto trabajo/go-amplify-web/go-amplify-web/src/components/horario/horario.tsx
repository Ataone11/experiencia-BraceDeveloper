import React, {useEffect, useState} from 'react';
import Image from "next/image";
import cross from '../../screens/general/login/cross.svg'
import moment from "moment";
import ScaleLoader from "react-spinners/ScaleLoader";
import {capitalize} from "../../utils/stringHelperFunctions";

const Horario = (props: any) => {

    function close() {
        props.showModal(false)
    }

    const [horarios, sethorarios] = useState<any[]>([])
    const [loadRegister, setLoadRegister] = useState(false);

    function selectHorario(horarioId: number) {
        const newHorarios: any[] = horarios.map((horario: any) => {
            if (horario.id === horarioId) {
                return {
                    ...horario,
                    selected: !horario.selected
                }
            } else {
                return {
                    ...horario,
                    selected: false
                }
            }
        })

        let count = 0

        newHorarios.forEach(horario => {

            if (horario.selected) {
                return props.idHorario(horario.id)
            }

            count+=1

            if (count == newHorarios.length) {
                return props.idHorario(0)
            }

        })

        sethorarios(newHorarios)
    }

    const loadHorarios = async () => {
        const res = props.campania.horarios
        res?.map((obj: any) => {
            obj.selected = false
        });

        sethorarios(res)
    }

    useEffect(() => {
        loadHorarios();
    }, [])

    function onSubmit() {
        setLoadRegister(true)
        props.onSubmit()
    }

    return (
        <div
            className="fixed top-0 left-0 z-30 w-screen h-screen flex justify-center items-center bg-opacity-30 bg-black">
            <div className="bg-white w-80 h-auto p-7 mx-4 rounded-2xl flex flex-col justify-center items-center">
                <div onClick={close} className="w-full flex flex-row-reverse align-bottom">
                    <Image src={cross}/>
                </div>
                <div className="text-primary text-[12px]">¡Ya casi terminamos!</div>
                <div className="text-primary text-[15px]">Elige el horario que mejor te parezca</div>
                <div className="">
                    {
                        horarios?.map((horario: any) => (
                            <div onClick={() => selectHorario(horario.id)}
                                 className="flex justify-center items-center h-[22px] w-[172px] bg-gradient-to-r my-5 from-[#9955D4] to-[#425AC5] rounded"
                                 key={horario.id}>
                                <div
                                    className={"flex text-[10px] justify-center items-center h-[20px] w-[170px] rounded-[3px] cursor-pointer " + (!horario.selected ? "inactive" : "active")}>
                                    {moment(horario.fecha_hora).format('D') + ", " + capitalize(moment(horario.fecha_hora).format('MMMM')) + " - " + moment(horario.fecha_hora).format('LT a')}
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    props.campania.muestra ?
                        <button onClick={() => onSubmit()}
                                className="bg-primary text-[15px] text-white w-[166px] h-[33px] rounded-[5px]">
                            Siguiente
                        </button> :
                        loadRegister ?
                            <ScaleLoader color="#425AC5"/> :
                            <button onClick={() => onSubmit()}
                                    className="bg-primary text-[15px] text-white w-[166px] h-[33px] rounded-[5px]">
                                Terminar
                            </button>

                }
            </div>
        </div>
    );
};

export default Horario;