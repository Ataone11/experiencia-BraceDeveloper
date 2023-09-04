import { Dispatch, SetStateAction, useState } from "react";
import Desplegable from "../../../../src/assets/products/categories/Desplegable";
import PrimerItemDesplegable from "../../../../src/assets/products/categories/PrimerItemDesplegable";
import { CategoryModel } from "../../../../src/models/CategoryModel";

const ItemCategory = ({
  depth,
  category,
  changeCategory
}: {
  depth: number;
  category: CategoryModel;
  changeCategory: (category: CategoryModel) => void
}) => {
  const [open, setOpen] = useState(false);

  const openCategory = () => {
    setOpen(!open);
  };

  return (
    <div
      style={{
        backgroundColor: depth > 0 ? "rgba(23, 113, 175, 0.1)" : "",
      }}
    >
      <div
        key={category.id}
        onClick={() => changeCategory(category)}
        className={`pt-2 relative cursor-pointer ${
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
                  type="button"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    openCategory()
                  }}
                  className={`${open && "rotate-180"} px-2 py-3 -ml-2`}
                >
                  <Desplegable />
                </button>
              )}
              <span
                className={`font-bold text-sm`}
              >
                {category.name.text}
              </span>
            </div>
          </div>
        </div>
      </div>

      {open &&
        category.children
          .map((childCategory: CategoryModel) => (
            <ItemCategory
              key={childCategory.id}
              depth={depth + 1}
              category={childCategory}
              changeCategory={changeCategory}
            />
          ))}
    </div>
  );
};

export default ItemCategory;
