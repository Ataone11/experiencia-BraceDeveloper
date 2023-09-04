import { SetStateAction, useEffect, useState } from "react";
import filter from "../../assets/header/BotonFiltros.svg"
import search from "../../assets/header/Buscar.svg"
import FilterD, { OrderValue } from "./filtroD";
import FilterM from "./filtroM";
import Image from "next/image";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/router";

interface SetText {
    Text?: (value: SetStateAction<string | null>) => void,
    SetDateFilter?: (value: SetStateAction<string[] | null>) => void,
    setOrderFilter?: (value: SetStateAction<number | null>) => void,
    setTypeDateFilter?: (value: SetStateAction<number | null>) => void,
    setFilterDesktop: (value: any) => void
}

const Search = ({ Text, SetDateFilter, setOrderFilter, setTypeDateFilter, setFilterDesktop }: SetText) => {

    const [filterState, setFilterState] = useState(false)
    const [orderState, setOrderState] = useState(false)
    const [orderValue, setOrderValue] = useState<OrderValue>({ option: null, value: '' })
    const [dateValue, setDateValue] = useState<OrderValue>({ option: null, value: 'Seleccionar' })
    const [date, setDate] = useState<any[] | null>(null)
    const [searchText, setSearchText] = useState<string | null>(null);
    const [debouncedSearchText] = useDebounce(searchText, 1000);
    const [ApplyFilters, setApplyFilters] = useState(false)
    const [deleteAllFilters, setDeleteAllFilters] = useState(false)
    const { query: { keyword }, push, pathname } = useRouter();

    useEffect(() => {
        if (debouncedSearchText !== null && pathname === "/" && Text)
            Text(debouncedSearchText)
    }, [debouncedSearchText])

    useEffect(() => {
        if (keyword) {
            setSearchText(keyword as string);
        }

    }, [keyword])


    const setText = (event: any) => {
        setSearchText(event.target.value || "")
        //Text(event.target.value)
    }

    const showFilter = () => {
        setFilterState(true)
    }

    const apply = () => {
        setApplyFilters(true)
    }

    const deleteAll = () => {
        setDeleteAllFilters(true)
    }

    const startSearch = (e: any) => {
        e.preventDefault();
        if (searchText) {
            push({ pathname: "/", query: { keyword: searchText } });
        }
    }

    useEffect(() => {
        if (filterState && SetDateFilter && setOrderFilter && setTypeDateFilter) {
            setFilterDesktop(<FilterD
                show={filterState}
                setFilter={setFilterState}
                SetDateFilter={SetDateFilter}
                orderState={orderState}
                setOrderState={setOrderState}
                orderValue={orderValue}
                setOrderValue={setOrderValue}
                dateValue={dateValue}
                setDateValue={setDateValue}
                setOrderFilter={setOrderFilter}
                setTypeDateFilter={setTypeDateFilter}
                date={date}
                setDate={setDate}
                setApplyFilters={setApplyFilters}
                ApplyFilters={ApplyFilters}
                setDeleteAllFilters={setDeleteAllFilters}
                deleteAllFilters={deleteAllFilters} />)
        } else {
            setFilterDesktop(null)
        }
    }, [filterState, orderState, orderValue, dateValue, date, ApplyFilters, deleteAllFilters])

    const hidden = () => {
        if (filterState) {
            return "hidden md:block"
        } else {
            return "hidden md:hidden"
        }
    }


    return (
        <div className="md:w-full md:flex md:justify-center md:absolute md:left-0 md:top-2.5">
            <nav className="flex my-4 justify-between items-center md:w-[25vw] md:max-w-filter md:h-full">
                <form className="w-full relative" onSubmit={startSearch}>
                    <input value={searchText || ""} type='text' placeholder="Buscar" className="w-full md:h-10 bg-[#F8F8F8] borderImghola rounded-full shadow-points p-1.5 text-tittleM" onChange={setText}></input>
                    <div onClick={startSearch} className="absolute w-2.5 h-2.5 top-2 md:w-3 md:h-3 md:top-4 right-3 cursor-pointer">
                        <Image src={search} alt="" layout="fill"></Image>
                    </div>
                </form>
                {
                    pathname === "/" &&
                    <div className="flex justify-center items-center ml-6 w-9 h-8 md:min-h-[40px] md:min-w-[40px] md:max-w-[40px] md:max-h-[40px] md:w-[4vw] md:h-[3vw] rounded-full bg-activeCampaing shadow-points cursor-pointer relative" onClick={filterState ? apply : showFilter}>
                        <div className="relative w-4 h-4 md:w-5 md:h-5">
                            <Image src={filter} alt='Filtros' layout="fill"></Image>
                        </div>
                        <div className={hidden() + ' justify-center absolute top-[40px] -left-2 w-[55px] z-40'} onClick={(e) => e.stopPropagation}>
                            <span className="text-tittleMinM text-red-600 underline cursor-pointer" onClick={deleteAll}>Borrar todo</span>
                        </div>
                    </div>
                }
                {
                    SetDateFilter && setOrderFilter && setTypeDateFilter &&
                    <FilterM
                        filter={filterState}
                        setFilter={setFilterState}
                        SetDateFilter={SetDateFilter}
                        orderState={orderState}
                        setOrderState={setOrderState}
                        orderValue={orderValue}
                        setOrderValue={setOrderValue}
                        dateValue={dateValue}
                        setDateValue={setDateValue}
                        setOrderFilter={setOrderFilter}
                        setTypeDateFilter={setTypeDateFilter}
                        date={date}
                        setDate={setDate} />
                }
            </nav>
        </div>

    )
}

export default Search