import { Dispatch, SetStateAction, useContext, useState } from "react";
import Desplegable from "../../assets/Desplegable";
import More from "../../assets/More";
import Plus from "../../assets/Plus";
import PrimerItemDesplegable from "../../assets/PrimerItemDesplegable";
import { CategoriaModel } from "../../interfaces";
import { PopUpContext } from "../../src/context/PopUpContext";
import { deleteCategoryById } from "../../src/redux/actions/categoriasActions";
import colores from "../../src/utils/colores";
import EditDataSheetModal from "./EditDataSheetModal";
import EditVariantsModal from "./EditVariantsModal";
import ModalCategory from "./Modal";

const ItemCategory = ({
  depth,
  category,
  categories,
  textSearch,
  categoryOptionsOpenId,
  loadCategories,
  setLoading,
  setVisibleCategories,
  setCategoryOptionsOpenId,
  compare,
}: {
  depth: number;
  category: CategoriaModel;
  categories: CategoriaModel[];
  textSearch: string;
  categoryOptionsOpenId: number;
  loadCategories: () => Promise<void>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setVisibleCategories: Dispatch<SetStateAction<CategoriaModel[]>>;
  setCategoryOptionsOpenId: Dispatch<SetStateAction<number> | null>;
  compare: (a: CategoriaModel, b: CategoriaModel) => number;
}) => {
  const setPopUp = useContext(PopUpContext);
  const [open, setOpen] = useState(false);

  const deleteCategory = async (id: number) => {
    setLoading(true);
    const res = await deleteCategoryById(id);
    setVisibleCategories(
      categories?.filter((c: CategoriaModel) => c.id !== category.id)
    );
    setLoading(false);
  };

  const openCategory = () => {
    setOpen(!open);
  };

  const actionsCategory = ({
    category,
    action,
  }: {
    category: CategoriaModel;
    action: string;
  }) => {
    let popUp = {
      setPopUp: true,
      children:
        action === "create" ? (
          <ModalCategory
            parent={category.id.toString()}
            loadCategories={loadCategories}
            setPopUp={setPopUp}
          />
        ) : action === "edit" ? (
          <ModalCategory
            category={category}
            loadCategories={loadCategories}
            setPopUp={setPopUp}
          />
        ) : action === "editVariants" ? (
          <EditVariantsModal categoryId={category.id} setPopUp={setPopUp} />
        ) : action === "editDataSheet" ? (
          <EditDataSheetModal categoryId={category.id} setPopUp={setPopUp} />
        ) : null,
    };
    setPopUp && setPopUp(popUp);
  };

  return (
    <div
      style={{
        backgroundColor: depth > 0 ? "rgba(23, 113, 175, 0.1)" : "",
      }}
    >
      <div
        key={category.id}
        className={`pt-2 relative ${
          depth === 0 ? "border-t border-backgroundPage" : ""
        }`}
      >
        <div
          className="flex items-center justify-between py-1 ml-6 mr-3"
          style={{
            paddingLeft: `${depth * 20}px`,
          }}
        >
          <div className="flex items-center gap-x-2 md:gap-x-5">
            <div className="flex items-center">
              {depth > 0 && (
                <div className="mt-[-10px] mr-2">
                  <PrimerItemDesplegable />
                </div>
              )}
              {category.children.length > 0 && (
                <button
                  onClick={() => openCategory()}
                  className={`${open && "rotate-180"} px-2 py-3 -ml-2`}
                >
                  <Desplegable />
                </button>
              )}
              <span
                className={`font-bold text-sm ${
                  category.children.length > 0
                    ? "cursor-pointer"
                    : "cursor-default"
                }`}
                onClick={() => {
                  category.children.length > 0 && openCategory();
                }}
              >
                {category.name.text}
              </span>
            </div>
            <button
              onClick={() => actionsCategory({ category, action: "create" })}
              className="border-2 border-Principal p-1 rounded-full"
            >
              <Plus color={colores.Principal} />
            </button>
          </div>
          <button
            onClick={() =>
              setCategoryOptionsOpenId(
                categoryOptionsOpenId !== category.id ? category.id : null
              )
            }
            className="py-3 px-2"
          >
            <More />
          </button>
        </div>

        {categoryOptionsOpenId === category.id && (
          <div
            className="absolute right-5 top-10 p-2 rounded-md flex flex-col bg-white z-[1] shadow-md"
            onMouseLeave={() => setCategoryOptionsOpenId(null)}
          >
            <button
              onClick={() => actionsCategory({ category, action: "edit" })}
              className="border-b border-backgroundPage py-2 text-left hover:font-bold hover:text-Principal"
            >
              Editar categoría
            </button>
            <button
              onClick={() => deleteCategory(category.id)}
              className="border-b border-backgroundPage py-2 text-left hover:font-bold hover:text-Principal"
            >
              Eliminar categoría
            </button>
            <button
              onClick={() =>
                actionsCategory({ category, action: "editVariants" })
              }
              className="border-b border-backgroundPage py-2 text-left hover:font-bold hover:text-Principal"
            >
              Editar variantes
            </button>
            <button
              onClick={() =>
                actionsCategory({ category, action: "editDataSheet" })
              }
              className="last:border-0 pt-2 text-left hover:font-bold hover:text-Principal"
            >
              Editar ficha técnica
            </button>
          </div>
        )}
      </div>

      {open &&
        category.children
          .filter((c: any) =>
            textSearch
              ? c.name.text?.toUpperCase().includes(textSearch.toUpperCase())
              : true
          )
          .sort(compare)
          .map((childCategory: CategoriaModel) => (
            <ItemCategory
              key={childCategory.id}
              depth={depth + 1}
              textSearch={textSearch}
              categories={categories}
              loadCategories={loadCategories}
              category={childCategory}
              categoryOptionsOpenId={categoryOptionsOpenId}
              setLoading={setLoading}
              setVisibleCategories={setVisibleCategories}
              setCategoryOptionsOpenId={setCategoryOptionsOpenId}
              compare={compare}
            />
          ))}
    </div>
  );
};

export default ItemCategory;
