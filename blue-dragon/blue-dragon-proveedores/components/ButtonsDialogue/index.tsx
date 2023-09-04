import React, { useState } from 'react'
import { ScaleLoader } from 'react-spinners';
import Button from '../Button'

export interface ButtonsDialogueProps { title: string, buttonText: string, text: string, buttonClick: () => void, closeDialogue: () => void, hasCancel: boolean }

const ButtonsDialogue = ({ title, buttonText, text, buttonClick = () => { }, closeDialogue, hasCancel }: ButtonsDialogueProps) => {
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        setLoading(true)
        await buttonClick();
        setLoading(false)
        closeDialogue();
    };

    return (
        <div className='fixed bg-black bg-opacity-30 w-[100vw] h-[100vh] grid place-items-center top-0 left-0 z-[100] p-5 overflow-y-scroll'>
            <div className="bg-white rounded-[8px] py-[20px] md:py-[30px] px-[20px] md:px-[40px] flex flex-col max-w-[600px]">
                <h2 className='text-[16px] text-primary font-bold text-center'>{title}</h2>
                <div className='mt-[20px] text-justify text-[14px]'>{text}</div>
                {
                    !loading ?
                        <div className='flex mt-[20px] mx-auto'>
                            {
                                hasCancel &&
                                <Button onClick={closeDialogue} className='mx-auto mr-5 bg-gray-400 text-white' text="Cancelar" />
                            }
                            <Button onClick={onClick} text={buttonText} />
                        </div> :
                        <div className='w-full mx-auto flex justify-center mt-2'>
                            <ScaleLoader color="#005C90" />
                        </div> 
                }
            </div>
        </div>
    )
}

export default ButtonsDialogue