import React, { useEffect, useState } from 'react'
import Flags from 'country-flag-icons/react/3x2'
import { useDispatch } from 'react-redux';
import CountriesIndicatives from "./../../../utils/countries-indicatives.json";
import { ChevronRightIcon } from '@heroicons/react/24/solid'

interface SelectIndicativeProps {
    value?: any,
    error?: any,
    idInput?: any,
    placeholder?: any,
    ref?: any,
    setIndicative: (indicative: string) => void,
    setPhone: (phone: string) => void,
    indicative?: string,
    phone?: string
}

const SelectIndicative = ({
    error,
    idInput,
    ref,
    setIndicative,
    setPhone,
    phone,
    indicative
}: SelectIndicativeProps) => {
    const [filteredCountries, setFilteredCountries] = useState(CountriesIndicatives);
    const [isSearch, setIsSearch] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({ code: '', indicative: '' });

    useEffect(() => {
        if (indicative) {
            const matchingCountry = CountriesIndicatives.find((item: any) =>
                item.indicative === indicative
            )
            if (matchingCountry)
                setSelectedCountry({ code: matchingCountry.code, indicative: matchingCountry.indicative })
        }
    }, [indicative])


    const findCountry = (code: string) => {
        setIsActive(true)
        setIsSearch(true)
        if (code) {
            const matchingCountries = CountriesIndicatives?.filter((item: any) =>
                item.name.toLowerCase().includes(code.toLowerCase())
            )
            setFilteredCountries(matchingCountries as any)
        }
    }

    const getFlag = (flag: string) => {
        const Flag = (Flags as any)[flag]
        return Flag ? <Flag width={22} /> : <></>
    }

    return (
        <section className='flex relative text-[0.9rem] lg:text-[0.75rem] xl:text-[0.9rem] w-full gap-x-2 h-[2.8rem]'>
            <section
                className='bg-white'
                onClick={() => {
                    setIsSearch(!isSearch)
                    setIsActive(!isActive)
                }}
            >
                {isSearch && (
                    <input
                        onChange={e => findCountry(e.target.value)}
                        autoFocus={isSearch}
                        type='text'
                        className='border h-full w-[93px] md:w-[120px] px-2 rounded-tl-large'
                    />
                )}
                {!isSearch && (
                    <button
                        onClick={() => setIsActive(!isActive)}
                        type='button'
                        className={`grid h-full grid-flow-col gap-6 place-items-center grid-cols-3 border px-4 ${isActive ? 'rounded-tl-[0.4rem]' : 'rounded-l-[0.4rem]'
                            }  rounded-r-0`}
                    >
                        <span
                            className={`w-4 rotate-90 fill-transparent ${isActive ? 'stroke-primaryColor' : 'stroke-[#b9b9b9]'
                                } `}
                        >
                            <ChevronRightIcon strokeWidth={3} />
                        </span>
                        {
                            selectedCountry?.code
                            && getFlag(selectedCountry?.code)
                        }
                        <span className='text-medium  text-ellipsis overflow-x-hidden whitespace-nowrap'>
                            {indicative || selectedCountry?.indicative}
                        </span>
                    </button>
                )}
                {
                    isSearch &&
                    <div
                        className={`absolute z-50 h-[100px] border border-t-0 rounded-b-large -bottom-[160px] overflow-y-scroll bg-white ${isActive ? '-translate-y-[60px]' : '-translate-y-[94px] -z-[99]'
                            } transition-all ease-in-out duration-500 w-[93px] md:w-[120px]`}
                    >
                        {filteredCountries?.map(({ indicative, code }: any) => (
                            <button
                                key={code}
                                id={'phone_indicative'}
                                type='button'
                                className='grid bg-white grid-cols-2 py-2 px-1 w-full'
                                onClick={() => {
                                    setIsActive(false)
                                    setSelectedCountry({ code, indicative })
                                    setIsSearch(false)
                                    setFilteredCountries(CountriesIndicatives);
                                    setIndicative(indicative);
                                }}
                            >
                                {getFlag(code)}
                                <span className='text-medium col-start-2'>{indicative}</span>
                            </button>
                        ))}
                    </div>
                }
            </section>

            <input
                value={phone}
                id={idInput}
                placeholder={"Teléfono"}
                ref={ref}
                onChange={(e: any) => setPhone(e.target.value)}
                type={"number"}
                className={`border-b-2 border-neutral-300 w-full h-full text-[12px] lg:text-[15px] outline-0 pb-1'
                    } ${error && 'border-red-500'} px-[0.5rem] text-[0.8rem] outline-none`}
            />
        </section>
    )
}

export default SelectIndicative