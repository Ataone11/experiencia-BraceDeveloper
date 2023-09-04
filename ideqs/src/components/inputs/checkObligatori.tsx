import { useState } from "react"

const Obligatory = () =>{

    const [classState,setClassState] = useState ('text-[#7D848E]')

    const toggleState = (event:any) =>{
        if(event.target.checked){
        setClassState('text-[#2490D3]')}
        else{
        setClassState('text-[#7D848E]')}
    }

    return(
        <div>
            <input type={'checkbox'} id={'obligatory'} title={'Obligatory'} className='checked:bg-[#2490D3] mr-2.5 border-[#7D848E]' onClick={toggleState}/>
            <label htmlFor="obligatory" className={"text-[13px] "+ classState}>Obligatorio</label>
        </div>
    )
}

export default Obligatory