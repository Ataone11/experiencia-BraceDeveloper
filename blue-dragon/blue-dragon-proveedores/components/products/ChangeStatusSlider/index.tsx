import { ArrowRightIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import { PRODUCT_STATUS } from '../../../src/utils/constants'

export const PRODUCT = 'Producto'
export const PROVIDER = 'Proveedor'

const ChangeStatusSlider = ({ status, setStatus }: { status?: number, setStatus: any}) => {
    const [option, setOption] = useState<number | null>(status || null)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const optionSelected = (newOption: any) => {
        setOption(newOption);
        setStatus(newOption);
    }

    return (
        <section
            onClick={(e: any) => {
                setIsOpen(!isOpen)
            }}
            className={`cursor-pointer relative grid grid-cols-8 bg-primary ${!isOpen
                ? 'md:rounded-md'
                : 'rounded-t-md'
                }  md:col-start-1 md:row-start-1 lg:grid-cols-10`}
        >
            <div
                className='w-full flex items-center px-2 col-span-6 lg:col-start-1 lg:row-start-1'
            >
                <p className='text-medium font-semibold text-white'>
                    {option && PRODUCT_STATUS[option]?.name}
                </p>
            </div>
            <section
                className='grid place-items-center lg:place-items-center lg:col-start-9 lg:row-start-1 '
            >
                <span
                    className={`w-[15px] stroke-primaryColor fill-transparent ${isOpen ? 'rotate-90' : 'rotate-0'
                        } transition-all ease-in-out duration-500`}
                >
                    <ArrowRightIcon color='white' />
                </span>
            </section>
            <section
                className={`font-semibold w-full flex flex-col ${!isOpen ? 'top-0 -z-50' : 'top-[100%] z-50'
                    } transition-all duration-300 ease-in-out place-items-center absolute bg-white left-0 shadow-thru overflow-hidden`}
            >
                {
                    Object.values(PRODUCT_STATUS).map((status: any, index: number) => {
                        return <div
                            className={`w-full text-xs flex items-center px-2 py-2 hover:bg-primary hover:text-white ${Object.values(PRODUCT_STATUS).length - 1 === index ? "rounded-b-xl" : ""}`}
                            key={status.value}
                            onClick={(e: any) => {
                                optionSelected(status.value)
                            }}
                        >
                            {
                                status.name
                            }
                        </div>
                    })
                }
            </section>
        </section>
    )
}

export default ChangeStatusSlider