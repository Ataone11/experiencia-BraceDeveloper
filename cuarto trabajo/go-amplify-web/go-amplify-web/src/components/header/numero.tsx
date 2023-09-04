import moment from "moment"
import { useState } from "react"

const NumberCalendar = ({
    handleClick,
    firstDate,
    lastDate,
    year,
    month,
    day
}: any) => {

    const currentDate = moment().year(year).month(month).date(day);
    const [state, setState] = useState(false)

    let select = "text-primary"

    select = state ? "bg-primary text-white rounded-full " : "text-primary"

    const getStyle = () => {
        if (firstDate?.format("YYYY/MM/DD") === currentDate.format("YYYY/MM/DD")) {
            return "bg-primary text-white rounded-l-full"
        } else if (lastDate?.format("YYYY/MM/DD") === currentDate.format("YYYY/MM/DD")) {
            return "bg-primary text-white rounded-r-full"
        }  else if(firstDate?.isBefore(currentDate) && lastDate?.isAfter(currentDate)) {
            return "bg-primary text-white"
        } 
    }

    return <div className={getStyle() + " overflow-show text-center text-[10px] md:text-tittleM transition-all duration-500 px-1.5 md:py-1.5 md:px-3 cursor-pointer"} onClick={() => handleClick(currentDate)}>{day}</div>
}

export default NumberCalendar