import moment from "moment"
import { SetStateAction, useEffect, useState } from "react"
import NumberCalendar from "./numero"
import flecha from "../../../src/assets/flechas/next.svg"
import Image from "next/image";
interface Calendar {
    setDate: (value: SetStateAction<string[] | null>) => void,
    date: string[] | null,
    setAdditionMonth?: number,
    setAddition?: number,
    setNext?: (value: SetStateAction<boolean>) => void,
    next?: boolean
    setPrev?: (value: SetStateAction<boolean>) => void,
    prev?: boolean
}

const Calendar = ({ setDate, date, setAdditionMonth, setAddition, setNext, next, setPrev, prev}: Calendar) => {

    let dateMoment = moment().format('YYYY,MM,d,DD')
    let arrayDate = dateMoment.split(',')
    const [month, setMonth] = useState(parseInt(arrayDate[1]) - 1 + (setAdditionMonth ? setAdditionMonth : 0))
    const [year, setYear] = useState(parseInt(arrayDate[0]))
    const [firstDate, setFirstDate] = useState<any>(null)
    const [lastDate, setLastDate] = useState<any>(null)
    const days = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa',]
    const [renderNumbers, setRenderNumbers] = useState<any>([]);

    useEffect(() => {
        renderDays()
        
    }, [year, month])

    useEffect(() => {
        if (firstDate || lastDate)
            setDate([firstDate, lastDate])
    }, [firstDate, lastDate])

    useEffect(() => {
        setFirstDate(date ? date[0] : null)
        setLastDate(date ? date[1] : null)
    }, [date])

    useEffect(()=>{
        if(prev==true){
            changeMonthPrev()
            setPrev&&
            setPrev(false)
            console.log('hola')
        }
    },[prev])

    useEffect(()=>{
        if(next===true){
            changeMonthNext()
            setNext&&
            setNext(false)
        }
    },[next])


    const renderDays = () => {
        const monthDays = moment().year(year).month(month).daysInMonth();
        const firstDayOfWeek = moment().year(year).month(month).date(1).day();
        const newRenderNumbers = [];

        for (let i = 0; i < firstDayOfWeek; i++) {
            newRenderNumbers.push('')
        }
        let contDays = 0
        for (let i = 0; i < monthDays; i++) {
            contDays++
            newRenderNumbers.push(
                contDays
            )
        }
        setRenderNumbers(newRenderNumbers);
    }

    const changeMonthPrev = () => {
        if (month <= 0 + (setAddition ? setAddition : 0)) {
            setYear(year - 1)
            setMonth(11 - (month===0 ? setAddition ? setAddition : 0  : 0))
        } else { setMonth(month - 1 - (setAddition ? setAddition : 0)) }
        console.log(month)
    }

    const changeMonthNext = () => {
        if (month >= 11 - (setAddition ? setAddition : 0)) {
            setYear(year + 1)
            setMonth(0 + (month===11 ? setAddition ? setAddition : 0  : 0))
        } else { setMonth(month + 1 + (setAddition ? setAddition : 0)) }
        console.log(month)
    }


    const setDates = (selectedDate: any) => {
        if (firstDate === null) {
            setFirstDate(selectedDate)
        } else if (lastDate === null) {
            if (firstDate.isAfter(selectedDate)) {
                setFirstDate(selectedDate)
                setLastDate(firstDate)
            } else {
                setLastDate(selectedDate)
            }
        } else if (firstDate && lastDate) {
            setFirstDate(selectedDate)
            setLastDate(null)
        }
    }

    return (
        <div className="w-[190px] md:w-[240px]">
            <div className="flex md:hidden p-2 mb-5 rounded-[5px] border border-primary text-[10px] relative">
                <h4 className="w-1/2 text-center">{firstDate ? firstDate.format("MMMM") + ', ' + firstDate.format("DD") : '---'}</h4>
                <div className="absolute text-center w-full left-0">-</div>
                <h4 className="w-1/2 text-center">{lastDate ? lastDate.format("MMMM") + ', ' + lastDate.format("DD") : '---'}</h4>
            </div>
            <div className="flex justify-between text-primary text-tittleM md:text-tittle mb-4 md:mb-6">
                <div className="flex items-center">
                    <div className="md:hidden w-[10px] h-[10px] cursor-pointer text-categorieGrey text-tittle relative rotate-180" onClick={changeMonthPrev}>
                        <Image src={flecha} alt="whatsappIcon" layout="fill" />
                    </div>
                </div>
                <h4>{moment().month(month).format('MMMM')} {year}</h4>
                <div className="flex items-center">
                    <div className="md:hidden w-[10px] h-[10px] cursor-pointer text-categorieGrey text-tittle relative" onClick={changeMonthNext}>
                        <Image src={flecha} alt="whatsappIcon" layout="fill" />
                    </div>
                </div>
            </div>
            <div id='calendar' className="grid justify-center grid-cols-7 grid-rows-6 gap-y-4 overflow-hidden">
                {days.map((day, index) => (
                    <div className="text-[#CACACA] text-[10px] md:text-tittleM text-center" key={index}>{day}</div>
                ))}
                {renderNumbers.map((number: any, index: number) => (
                    <NumberCalendar firstDate={firstDate} lastDate={lastDate} index={index} handleClick={setDates} year={year} month={month} day={number} key={index}></NumberCalendar>
                ))}
            </div>
        </div>
    )
}

export default Calendar