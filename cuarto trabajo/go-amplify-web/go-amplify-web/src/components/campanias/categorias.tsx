import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "../../hooks/IseWindowSize";
import { getCategorias } from "../../redux/actions/categoriasAction";
import { getCategoriaState } from "../../redux/reducers/categoriaReducer";
import RenderCategorias from "./renderCategorias";
import SkeletonCategoria from "./skeletonCategorias";

interface CategoriasProps {
      toggleCategoryId: (categoryId: number) => void,
      selectedCategoriesIds: number[],
}

const Categorias = ({toggleCategoryId, selectedCategoriesIds }: CategoriasProps) => {

      const [width,] = useWindowSize();
      const categorias = useSelector(getCategoriaState)
      const dispatch = useDispatch()

      useEffect(() => {
            if (!categorias) {
                getCategorias(dispatch)
            }
      },[categorias])

      const categories = (number: any) => {
            if (number < 900) {
                  return 3
            } else if (number >= 901 && number < 1100) {
                  return 4
            } else if (number >= 1101 && number < 1200) {
                  return 5
            } else {
                  return 6
            }
      }

      if(categorias){
            return (
                  <div id='Screen' className="md:flex md:items-center md:h-20 md:mb-8 bg-white pt-2 mb-4 w-full h-24 rounded-points shadow-points">
                        <h1 className="md:mb-0 md:ml-16 md:mr-20 md:text-points text-tittle text-center text-rifa mb-4 font-medium">Categorias</h1>
                        <div className="flex md:overflow-hidden w-full">
                              <div className="h-full w-full">
                                    <RenderCategorias categorias={categorias} selectedCategoriesIds={selectedCategoriesIds} numberCategories={categories(width)} toggleCategoryId={toggleCategoryId}></RenderCategorias>
                              </div>
                        </div>
                  </div>
            )
      }else return <SkeletonCategoria></SkeletonCategoria>

      
}

export default Categorias;