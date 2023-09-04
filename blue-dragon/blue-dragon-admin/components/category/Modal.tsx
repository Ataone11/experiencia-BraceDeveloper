import Image from "next/image";
import { Dispatch, useState } from "react";
import { BeatLoader } from "react-spinners";
import Cerrar from "../../assets/Cerrar";
import Upload from "../../assets/Upload";
import { CategoriaModel } from "../../interfaces";
import {
  createCategory,
  editCategoryById,
} from "../../src/redux/actions/categoriasActions";
import colores from "../../src/utils/colores";
import ButtonPage from "../ButtonPage";
import ImageWithFallback from "../general/ImageWithFallback";

const ModalCategory = ({
  category,
  parent,
  loadCategories,
  setPopUp,
}: {
  category?: CategoriaModel;
  parent?: string;
  loadCategories: () => Promise<void>;
  setPopUp: Dispatch<any> | null;
}) => {
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState<{ imageCategory: any; name: string }>({
    imageCategory: null,
    name: "",
  });
  const [nameCategory, setNameCategory] = useState<{
    nameSpanish: string;
    nameEnglish: string;
    nameChinese: string;
  }>({
    nameSpanish: "",
    nameEnglish: "",
    nameChinese: "",
  });

  const onImageChange = (e: any) => {
    setImg({ imageCategory: e.target.files[0], name: e.target.files[0].name });
    return;
  };

  const btnCancel = () => {
    setNameCategory({
      nameSpanish: "",
      nameEnglish: "",
      nameChinese: "",
    });
    setPopUp && setPopUp(null);
  };

  const onChange = async (e: any) => {
    e.preventDefault();

    setNameCategory({
      ...nameCategory,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);

    if (category) {
      const res = await editCategoryById({
        idCategory: category.id,
        es_name: nameCategory.nameSpanish,
        en_name: nameCategory.nameEnglish,
        zh_name: nameCategory.nameChinese,
        parent,
      });
    } else {
      const res = await createCategory({
        es_name: nameCategory.nameSpanish,
        en_name: nameCategory.nameEnglish,
        zh_name: nameCategory.nameChinese,
        parent: parent,
        photo: img.imageCategory,
      });
    }
    setPopUp && setPopUp(null);
    loadCategories();
    setLoading(false);
  };

  return (
    <form
      onChange={onChange}
      onSubmit={(e: any) => handleOnSubmit(e)}
      className="flex flex-col gap-y-8 relative"
    >
      <button
        onClick={() => btnCancel()}
        className="absolute -top-4 -right-2 bg-gray-100 p-2 rounded-full"
      >
        <Cerrar />
      </button>
      <h1 className="text-Oscuro text-xl font-bold mt-3 w-fit mx-auto">
        Agregar categorias
      </h1>
      <div className="flex flex-col gap-y-4 w-fit mx-auto">
        <div className="flex flex-col gap-y-2 text-sm">
          <label htmlFor="nameSpanish" className="font-normal w-fit">
            Nombre de la categoria&nbsp;
            <span className="text-Principal">(Español)</span>
          </label>
          <input
            type="text"
            placeholder={category ? category.name.text : "Nombre en español"}
            name="nameSpanish"
            id="nameSpanish"
            required
            className={`border-[1px] border-backgroundPage rounded-md w-full md:w-[300px] h-[36px] px-2 focus:outline-none ${
              category && "placeholder:text-black"
            }`}
          />
        </div>
        <div className="flex flex-col gap-y-2 text-sm">
          <label htmlFor="nameEnglish" className="font-normal w-fit">
            Nombre de la categoria&nbsp;
            <span className="text-Principal">(Ingles)</span>
          </label>
          <input
            type="text"
            placeholder="Nombre en ingles"
            name="nameEnglish"
            id="nameEnglish"
            required
            className="border-[1px] border-backgroundPage rounded-md w-full md:w-[300px] h-[36px] px-2 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-y-2 text-sm">
          <label htmlFor="nameChinese" className="font-normal w-fit">
            Nombre de la categoria&nbsp;
            <span className="text-Principal">(Chino)</span>
          </label>
          <input
            type="text"
            placeholder="Nombre en chino"
            name="nameChinese"
            id="nameChinese"
            required
            className="border-[1px] border-backgroundPage rounded-md w-full md:w-[300px] h-[36px] px-2 focus:outline-none"
          />
        </div>
      </div>
      <div className="mx-auto w-fit flex flex-col gap-y-2">
        <span className="text-Principal font-semibold w-fit mx-auto">
          Foto de la categoria (Opcional)
        </span>
        <div className="grid place-content-center w-fit mx-auto">
          <label
            htmlFor="imageCategory"
            className={`bg-Principal rounded-md py-2 px-1 text-Active font-medium text-sm break-words transition-all duration-300 ease-in-out hover:bg-Oscuro`}
          >
            <span className="flex items-center gap-x-3 px-3">
              <Upload />
              {!img.name ? "Subir imagen" : "Cambiar imagen"}
            </span>
          </label>
          <input
            type="file"
            id="imageCategory"
            name="imageCategory"
            accept="image/png, image/jpeg"
            onChange={onImageChange}
            className="hidden"
          />
        </div>
        {img.name !== "" && (
          <div className="flex flex-col mt-2 gap-y-1">
            <div className="shadow-lg px-4 py-3 rounded-md">
              <div className="w-full min-h-[130px] max-h-[130px] bg-backgroundPage relative">
                <ImageWithFallback
                  src={URL.createObjectURL(img.imageCategory)}
                  fromBucket={false}
                  objectFit="cover"
                  layout="fill"
                  alt={img.name}
                />
              </div>
            </div>
            <span className="w-fit mx-auto text-xs text-TextOpacity">
              {img.name}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row md:place-content-center md:gap-x-4 md:w-fit md:mx-auto">
        <ButtonPage>
          {loading ? (
            <BeatLoader color={colores.Active} size={10} />
          ) : (
            <button
              type="submit"
              className="flex items-center justify-center px-6"
            >
              <span>Guardar</span>
            </button>
          )}
        </ButtonPage>
        {!loading && (
          <ButtonPage action={() => btnCancel()}>
            <span className="flex items-center justify-center px-6">
              Cancelar
            </span>
          </ButtonPage>
        )}
      </div>
    </form>
  );
};

export default ModalCategory;
