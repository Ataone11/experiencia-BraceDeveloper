import Image from "next/image"
import { SetStateAction, useEffect, useState } from "react"
import Exit from "../../assets/header/SalidaMorado.svg"
import Calendar from "./calendario"
import { OrderValue } from "./filtroD"

interface State {
    filter: boolean,
    setFilter: (value: SetStateAction<boolean>) => void,
    SetDateFilter: (value: SetStateAction<string[]|null>) => void,
    orderState: boolean,
    setOrderState: (value: SetStateAction<boolean>) => void,
    orderValue: OrderValue,
    setOrderValue: (value: SetStateAction<OrderValue>) => void,
    dateValue: OrderValue
    setDateValue: (value: SetStateAction<OrderValue>) => void,
    setOrderFilter: (value: SetStateAction<number | null>) => void,
    setTypeDateFilter: (value: SetStateAction<number | null>) => void,
    setDate: (value: SetStateAction<any[] | null>) => void
    date:any[] | null
}

const FilterM = ({ filter, setFilter, SetDateFilter, orderState, setOrderState, orderValue, setOrderValue, dateValue, setDateValue,setOrderFilter,setTypeDateFilter,date,setDate}: State) => {
    const [show, setShow] = useState(false)
    const [dateState, setDateState] = useState(false)
    let openHandle: string
    let bg: string
    let hidden = "w-full h-full"
    let order: string
    let dateStyle: string

    const close = () => {
        setFilter(false)
    }

    if (show) {
        openHandle = 'flex flex-col justify-between bg-white rounded-r-3xl fixed top-0 left-0 h-screen z-50 w-80 md:w-[411px] overflow-hidden overflow-y-auto text-black transition-all no-scrollbar'
        bg = "bg-black/25 w-screen h-screen fixed top-0 left-0 z-10 transition-opacity"
        hidden = "w-full h-full"
    } else {
        openHandle = 'flex flex-col justify-between bg-white rounded-r-3xl fixed top-0 left-0 h-screen z-50 w-80 md:w-[411px] overflow-hidden overflow-y-auto text-black transition-all no-scrollbar -translate-x-80 md:-translate-x-[411px]'
        bg = "bg-black/0 w-0 h-screen fixed top-0 left-0 z-10 transition-opacity"
        hidden = "w-full h-full hidden"
    }

    if (!orderState) {
        order = "w-[160px] bg-white h-6 rounded-[5px] text-primary text-[10px] border border-primary px-2.5 overflow-hidden transition-all duration-1000"
    } else {
        order = "w-[160px] h-fit bg-white rounded-[5px] text-primary text-[10px] border border-primary px-2.5 overflow-hidden transition-all duration-1000"
    }
    if (!dateState) {
        dateStyle = "w-[160px] bg-white h-6 rounded-[5px] text-primary text-[10px] border border-primary px-2.5 overflow-hidden transition-all duration-1000"
    } else {
        dateStyle = "w-[160px] h-fit bg-white rounded-[5px] text-primary text-[10px] border border-primary px-2.5 overflow-hidden transition-all duration-1000"
    }

    useEffect(() => {
        if (filter) {
            setShow(true)
        } else {
            setShow(false)
        }
    }, [filter])

    const apply = () =>{
        close()
        SetDateFilter(date)
        setOrderFilter(orderValue.option)
        setTypeDateFilter(dateValue.option)
    }
    
    const deleteAll = () =>{
        close()
        setDate(null)
        setDateState(false)
        setOrderState(false)
        setDateValue({option: null, value:'Seleccionar'})
        setOrderValue({option: null, value:'Seleccionar'})
        SetDateFilter(null)
        setOrderFilter(null)
        setTypeDateFilter(null)
    }

    return (
        <div className={bg + ' md:hidden'}>
            <div id="slider" className={openHandle} >
                <form action="" className="text-[#220F80]">
                    <div className="flex justify-between pb-[42px] py-5 px-6">
                        <h2 className="text-rifaSizeM font-bold">Filtros y ordernar</h2>
                        <div className="flex items-center">
                            <div className="w-5 h-5 cursor-pointer" onClick={close}>
                                <Image src={Exit} alt='Salir'></Image>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end py-2.5 px-6 border-b-gray-300 border-b text-categorieGrey">
                        <div>
                            <span className="underline text-[10px] cursor-pointer" onClick={deleteAll}>Borrar todo</span>
                        </div>
                    </div>
                    <div className="flex justify-between  py-7 px-5 border-b-gray-300 border-b text-tittle">
                        <h4 className="w-[100px]">Ordenar por</h4>
                        <div className={order}>
                            <div className="flex items-center h-6 border-b border-categorieGrey" onClick={()=>{setOrderState(!orderState)}}>{orderState||orderValue.option===null ? 'Seleccionar' : orderValue.value}</div>
                            <div className="flex items-center h-6 border-b border-categorieGrey" onClick={()=>{setOrderValue({option: 0, value:'Inscripcion(Ascendente)'});setOrderState(!orderState);setDate(null)}}>Inscripcion(Ascendente)</div>
                            <div className="flex items-center h-6 border-b border-categorieGrey" onClick={()=>{setOrderValue({option: 1, value:'Incripcion(Descendente)'});setOrderState(!orderState);setDate(null)}}>Inscripcion(Descendente)</div>
                            <div className="flex items-center h-6 border-b border-categorieGrey" onClick={()=>{setOrderValue({option: 2, value:'Publicacion(Ascendente)'});setOrderState(!orderState);setDate(null)}}>Publicacion(Ascendente)</div>
                            <div className="flex items-center h-6" onClick={()=>{setOrderValue({option: 3, value:'Publicacion(Descendiente)'});setOrderState(!orderState);setDate(null)}}>Publicacion(Descendente)</div>
                        </div>
                    </div>
                    <div className="flex justify-between py-7 px-5 text-tittle">
                        <h4 className="w-[100px]">Filtrar por fecha:</h4>
                        <div className={dateStyle}>
                            <div className="flex items-center h-6 border-b border-categorieGrey" onClick={()=>{setDateState(!dateState)}}>{dateState ? 'Seleccionar' : dateValue.value}</div>
                            <div className="flex items-center h-6 border-b border-categorieGrey" onClick={()=>{setDateValue({option: 1, value:'De Publicación'});setDate(null);setDateState(!dateState)}}>De Publicación</div>
                            <div className="flex items-center h-6" onClick={()=>{setDateValue({option: 2, value:'De Inscripción'});setDate(null);setDateState(!dateState)}}>De Inscripción</div>
                        </div>
                    </div>
                    <div className={dateState || dateValue.option===null ? 'opacity-0':'opacity-1'+" flex items-center justify-center transition-opacity duration-1000"}>
                        <Calendar setDate={setDate} date={date}></Calendar>
                    </div>
                </form>
                <div className="flex justify-center items-center relative bottom-7">
                    <div className="bg-primary px-16 py-2 rounded-md cursor-pointer text-tittle text-white" onClick={apply}>
                        <span className="">Aplicar</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterM;