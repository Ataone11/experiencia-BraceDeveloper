import { useState } from "react";
import Categoria from "./categoria";
import flecha from "../../../src/assets/flechas/next.svg"
import Image from "next/image";
import { selectInterestsIds } from "../../redux/reducers/authReducer";
import { useSelector } from "react-redux";

interface RenderCategoriasProps {
    toggleCategoryId: (categoryId: number) => void
    numberCategories: number
    selectedCategoriesIds: number[],
    categorias: any,
}

export const RenderCategorias = ({ categorias, toggleCategoryId, numberCategories, selectedCategoriesIds }: RenderCategoriasProps) => {

    const [firstIndex, setFirstIndex] = useState<number>(0)
    const [lastIndex, setLastIndex] = useState<number>(1)
    const interestsIds: number[]  = useSelector(selectInterestsIds); 

    const next = document.querySelectorAll('.category')

    const nextCategory = () => {
        if (categorias.length - 1 >= numberCategories + lastIndex) {
            next[firstIndex].classList.remove('md:w-full')
            next[firstIndex].classList.add('md:w-0')
            next[numberCategories + lastIndex].classList.remove('md:w-0')
            next[numberCategories + lastIndex].classList.add('md:w-full')
            setFirstIndex(firstIndex + 1)
            setLastIndex(lastIndex + 1)
        }

    }

    const prevCategory = () => {
        if (firstIndex > 0) {
            next[firstIndex - 1].classList.remove('md:w-0')
            next[firstIndex - 1].classList.add('md:w-full')
            next[numberCategories + lastIndex - 1].classList.add('md:w-0')
            next[numberCategories + lastIndex - 1].classList.remove('md:w-full')
            setFirstIndex(firstIndex - 1)
            setLastIndex(lastIndex - 1)
        }

    }

    let arrowNext
    let arrowPrev
    if (categorias && numberCategories + lastIndex != categorias.length) {
        arrowNext = (
            <span id="next" className=" md:block md:cursor-pointer text-categorieGrey text-tittle" onClick={nextCategory}>
                <Image src={flecha} alt="next" />
            </span>
        )
    }
    if (firstIndex != 0) {
        arrowPrev = (<span id="next" className="md:block md:cursor-pointer text-categorieGrey text-tittle rotate-180" onClick={prevCategory}>
            <Image src={flecha} alt="whatsappIcon" />
        </span>)
    }

    return (
        <div className="flex w-full max-w-full overflow-scroll no-scrollbar">
            <div className="hidden md:flex items-center px-5">
                {arrowPrev}
            </div>
            <div className="flex h-full w-full md:first-line:pl-5 pb-1.5 md:overflow-hidden justify-between">
                {categorias?.sort((a: any, b: any) => {
                    if(interestsIds?.includes(a.id)) {
                        return -1
                    } else if(interestsIds?.includes(b.id)) {
                        return 1
                    } else {
                        return 0
                    }
                }).map((categoria: any, index: number) => {
                    if (index <= numberCategories) {
                        return (<div className="md:flex transition-all w-16 md:w-full md:overflow-hidden md:justify-center category" key={categoria.id}>
                            <Categoria selectedCategoriesIds={selectedCategoriesIds} id={categoria.id} nombre={categoria.nombre} toggleCategoryId={toggleCategoryId} index={index} />
                        </div>)
                    }
                    else {
                        return (<div className="md:flex w-16 md:w-0 transition-all md:overflow-hidden md:justify-center category" key={categoria.id} >
                            <Categoria selectedCategoriesIds={selectedCategoriesIds} id={categoria.id} nombre={categoria.nombre} toggleCategoryId={toggleCategoryId} index={index} />
                        </div>)
                    }
                })}
            </div>
            <div className="hidden md:flex items-center px-5">
                {arrowNext}
            </div>
        </div>
    )
}

export default RenderCategorias;