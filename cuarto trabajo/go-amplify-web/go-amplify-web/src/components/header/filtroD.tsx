import { SetStateAction, useEffect, useState } from "react"
import Calendar from "./calendario"
import Image from "next/image";
import flecha from "../../../src/assets/flechas/next.svg"
import React from "react";
import moment from "moment"

interface State {
    show: boolean,
    setFilter: (value: SetStateAction<boolean>) => void,
    SetDateFilter: (value: SetStateAction<string[] | null>) => void,
    orderState: boolean,
    setOrderState: (value: SetStateAction<boolean>) => void,
    orderValue: OrderValue,
    setOrderValue: (value: SetStateAction<OrderValue>) => void,
    dateValue: OrderValue
    setDateValue: (value: SetStateAction<OrderValue>) => void,
    setOrderFilter: (value: SetStateAction<number | null>) => void,
    setTypeDateFilter: (value: SetStateAction<number | null>) => void,
    setDate: (value: SetStateAction<any[] | null>) => void
    date: any[] | null,
    setApplyFilters:(value: SetStateAction<boolean>) => void,
    ApplyFilters:boolean,
    setDeleteAllFilters:(value: SetStateAction<boolean>) => void,
    deleteAllFilters:boolean
}
export interface OrderValue {
    option: number | null,
    value: string,
}

const FilterD = ({ show, setFilter, SetDateFilter, orderState, setOrderState, orderValue, setOrderValue, dateValue, setDateValue, setOrderFilter, setTypeDateFilter, date, setDate, setApplyFilters, ApplyFilters, deleteAllFilters, setDeleteAllFilters }: State) => {
    const [prev, setPrev] = useState(false)
    const [next, setNext] = useState(false)
    const [dateStatePublication, setDateStatepublication] = useState (false)
    const [dateStateInscription, setDateStateInscription] = useState (false)
    let openHandle: string
    let bg: string
    let order: string
    let orderBox: string
    let filterBox: string
    let publication = ''
    let inscription = ''
    let calendar: string

    const close = () => {
        setFilter(false)
    }

    const apply = () =>{
        close()
        SetDateFilter(date)
        setOrderFilter(orderValue.option)
        setTypeDateFilter(dateValue.option)
        setApplyFilters(false)
    }

    const deleteAll = () =>{
        close()
        setOrderState(false)
        setDateValue({option: null, value:'Seleccionar'})
        setOrderValue({option: null, value:'Seleccionar'})
        setDate(null)
        SetDateFilter(null)
        setOrderFilter(null)
        setTypeDateFilter(null)
        setDeleteAllFilters(false)
    }

    const changeMonthNext = () => {
        setNext(true)
    }

    const changeMonthPrev = () => {
        setPrev(true)
    }

    const showOrder = () => {
        setDateStateInscription(false)
        setDateStatepublication(false)
        setOrderState(!orderState)
    }
    const showPublication = () => {
        setDateStateInscription(false)
        setDateStatepublication(dateValue.option === 1 ? false : true)
        setDateValue({ option: (dateValue.option === 1 ? null : 1), value: (dateValue.option === 1 ? 'Seleccionar' : 'De Publicación') })
        
    }

    const showInscription = () => {
        setDateStateInscription(dateValue.option === 2 ? false : true)
        setDateStatepublication(false)
        setDateValue({ option: (dateValue.option === 2 ? null : 2), value: (dateValue.option === 2 ? 'Seleccionar' : 'De inscripción') })
    }

    useEffect(()=>{
        if(ApplyFilters){
            apply()
        }
    },[ApplyFilters])

    useEffect(()=>{
        if(deleteAllFilters){
            deleteAll()
        }
    },[deleteAllFilters])

    

    if (show) {
        openHandle = "w-full flex justify-center absolute top-28 h-20 z-[15]"
        bg = "bg-black/25 w-screen h-screen fixed top-0 left-0 z-10 transition-opacity"
       
    } else {
        openHandle = "hidden"
        bg = "bg-black/0 w-0 h-screen fixed top-0 left-0 z-10 transition-opacity"
    }

    if (orderState) {
        order = "mt-[10.5px] w-[230px] absolute top-[55px] right-0 bg-white h-fit rounded-[10px] text-primary text-tittle px-5 transition-opacity duration-1000"
        orderBox = "bg-inset text-white rounded-[10px] h-full"
        filterBox = "bg-white text-categorieGray"
    } else {
        order = "opacity-0 w-[230px] h-0 absolute top-[55px] right-0 bg-white overflow-hidden rounded-[10px] text-primary text-tittle px-5 transition-opacity duration-1000"
        orderBox = "h-[30px]"
        filterBox = "bg-inset text-white"
    }

    if (dateStatePublication) {
        publication = "bg-inset text-white rounded-[10px] h-full"
        calendar = 'h-fit'
        filterBox = "bg-white text-categorieGray"
    } else {
        publication = "h-[30px]"
        calendar = 'opacity-0 hidden'
    }

    if (dateStateInscription) {
        inscription = "bg-inset text-white rounded-[10px] h-full"
        calendar = 'h-fit'
        filterBox = "bg-white text-categorieGray"
    }

    return (
        <div className={bg + ' hidden md:block'}>
            
            <div className={openHandle}>
                <div className={filterBox + ' flex items-center rounded-[10px] h-[51px] z-50 md:w-[566px] transition-all'}>
                    <div className={inscription + " flex flex-col justify-center items-center text-center w-1/2 border-r-gray-300 border-r cursor-pointer"} onClick={() => { setOrderState(false); showInscription()}}>
                        <h5 className="text-tittle font-normal">Fecha de inscripción</h5>
                        <h6 className="text-rifaDateSize font-light mt-1">
                            {dateValue.option === 2 ? date&&date[0]!==null ? moment(date[0]).format("MMM") + ', ' + moment(date[0]).format("DD") : '' : ''}
                            {' - '}
                            {dateValue.option === 2 ? date&&date[1]!==null ? moment(date[1]).format("MMM") + ', ' + moment(date[1]).format("DD") : '' : ''}
                        </h6>
                    </div>
                    <div className="flex justify-center w-full absolute top-[65px] left-0">
                        <div className={calendar + " flex justify-center w-[650px] py-5 rounded-[10px] bg-white transition-opacity duration-1000"}>
                            <div className="flex items-center h-[22px]">
                                <div className="w-[10px] h-[10px] cursor-pointer text-categorieGrey text-tittle relative rotate-180" onClick={changeMonthPrev}>
                                    <Image src={flecha} alt="whatsappIcon" layout="fill" />
                                </div>
                            </div>
                            <div className="px-6">
                                <Calendar setDate={setDate} date={date} setAddition={1} setPrev={setPrev} prev={prev} setNext={setNext} next={next}></Calendar>
                            </div>
                            <div className="px-6">
                                <Calendar setDate={setDate} date={date} setAdditionMonth={1} setAddition={1} setPrev={setPrev} prev={prev} setNext={setNext} next={next}></Calendar>
                            </div>
                            <div className="flex items-center h-[22px]">
                                <div className="w-[10px] h-[10px] cursor-pointer text-categorieGrey text-tittle relative" onClick={changeMonthNext}>
                                    <Image src={flecha} alt="whatsappIcon" layout="fill" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={publication + " flex flex-col justify-center items-center text-center w-1/2 border-r-gray-300 border-r cursor-pointer"} onClick={() => { setOrderState(false); showPublication() }}>
                        <h5 className="text-tittle font-normal">Fecha de publicación</h5>
                        <h6 className="text-rifaDateSize font-light mt-1">
                            {dateValue.option === 1 ? date&&date[0]!==null ? moment(date[0]).format("MMM") + ', ' + moment(date[0]).format("DD") : '' : ''}
                            {' - '}
                            {dateValue.option === 1 ? date&&date[1]!==null  ? moment(date[1]).format("MMM") + ', ' + moment(date[1]).format("DD") : '' : ''}
                        </h6>
                    </div>
                    <div className={orderBox + " flex flex-col justify-center relative items-center px-4 text-center w-1/2 cursor-pointer"} onClick={showOrder}>
                    <h5 className="text-tittle font-normal">Ordenar Por:</h5>
                        <h5 className="text-tittle font-normal">{orderValue.option === null ? '' : orderValue.value}</h5>
                        <div className={order}>
                            <div className="flex items-center h-9 border-b border-categorieGrey" onClick={() => { setOrderValue({ option: 0, value: 'Inscripcion(Ascendente)' }); setOrderState(!orderState); }}>Inscripcion(Ascendente)</div>
                            <div className="flex items-center h-9 border-b border-categorieGrey" onClick={() => { setOrderValue({ option: 1, value: 'Incripcion(Descendente)' }); setOrderState(!orderState); }}>Inscripcion(Descendente)</div>
                            <div className="flex items-center h-9 border-b border-categorieGrey" onClick={() => { setOrderValue({ option: 2, value: 'Publicacion(Ascendente)' }); setOrderState(!orderState); }}>Publicacion(Ascendente)</div>
                            <div className="flex items-center h-9" onClick={() => { setOrderValue({ option: 3, value: 'Publicacion(Descendiente)' }); setOrderState(!orderState) }}>Publicacion(Descendente)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterD;