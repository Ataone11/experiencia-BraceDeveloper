import React from 'react'


interface SeeCodesProps {
    codes: number[],
    close: () => void
}

const SeeCodes = ({ codes, close }: SeeCodesProps) => {
    return (
        <div className="fixed top-0 left-0 bg-black bg-opacity-30 w-[100vw] h-[100vh] z-[30] grid place-items-center p-4 overflow-y-scroll min-h-fit">
            <div className="container shadow-2xl flex rounded-2xl flex-col mx-auto text-center bg-white max-w-[550px] my-2 px-[40px] max-h-[90vh] overflow-hidden">
                <h2 className='mt-[50px] mb-[30px] text-[24px] text-primary-button-bg font-semibold'>Previsualización de códigos</h2>
                <div className='flex flex-wrap justify-around gap-x-2 gap-y-2 items-start max-h-[300px] overflow-y-scroll pr-4'>
                    {
                        codes.map((code: number) => <span key={code} className='border-primary-button-bg border-2 text-[12px] text-primary-button-bg py-2 px-4 rounded-[8px]'>{code}</span>)
                    }
                </div>
                <button
                    onClick={close}
                    className='my-[30px] bg-[#425AC5] flex justify-center mx-auto text-base rounded-md py-2 px-2 text-white font-myriad align-middle text-center'
                    type='button'
                >Cerrar</button>
            </div>
        </div>

    )
}

export default SeeCodes