import { useEffect, useState } from "react";
import useWindowSize from "../../hooks/IseWindowSize";
import Icon from "./icono";

interface CategoriaProps {
    toggleCategoryId: (categoryId: number) => void,
    index: number
    id: number
    nombre: string
    selectedCategoriesIds: number[]
}

const SELECTED_COLOR = "#53E7F2";

const Categoria = ({ toggleCategoryId, id, nombre, selectedCategoriesIds }: CategoriaProps) => {

    const [width,] = useWindowSize();
    const [baseColor, setBaseColor] = useState("");
    const [color, setColor] = useState("#707070")

    useEffect(() => {
        let newBaseColor = "";
        if (width < 768) {
            newBaseColor = "#CACACA";
        } else {
            newBaseColor = "#707070";
        }

        if (color !== SELECTED_COLOR) {
            setColor(newBaseColor)
        }
        setBaseColor(newBaseColor)
    }, [width]);


    return (
        <div className="md:w-20 w-16 cursor-pointer transition-[width]" onClick={() => toggleCategoryId(id)}>
            <div className="flex justify-center mb-1">
                <Icon fill={selectedCategoriesIds.includes(id) ? SELECTED_COLOR : baseColor}></Icon>
            </div>
            <h3 className="text-categoriaSize text-center ml:text-tittleM md:text-rifaDateSize categorie font-light" style={{
                color: selectedCategoriesIds.includes(id) ? SELECTED_COLOR : baseColor
            }}>
                {nombre}
            </h3>
        </div>
    );
}

export default Categoria;