import { Dispatch, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import Cerrar from "../../assets/Cerrar";
import Delete from "../../assets/Delete";
import Edit from "../../assets/Edit";
import Plus from "../../assets/Plus";
import { CategoriaModel } from "../../interfaces";
import {
  addVariantToCategory,
  deleteVariantToCategory,
  getCategoryById,
} from "../../src/redux/actions/categoriasActions";
import colores from "../../src/utils/colores";
import ButtonPage from "../ButtonPage";

const EditVariantsModal = ({
  categoryId,
  setPopUp,
}: {
  categoryId: number;
  setPopUp: Dispatch<any> | null;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [category, setcategory] = useState<CategoriaModel | null>(null);
  const [addVariant, setAddVariant] = useState<boolean>(false);
  const [variants, setVariants] = useState<{
    id?: number | null;
    name?: string;
    variant: string[];
  }>({
    id: null,
    name: "",
    variant: [],
  });
  const [newVariant, setNewVariant] = useState<{
    variant: string;
  }>({
    variant: "",
  });

  const getCategory = async (id: number) => {
    setLoading(true);
    const res = await getCategoryById(id);
    setcategory(res);
    setLoading(false);
  };

  const btnCancel = () => {
    if (variants.name === "") {
      setPopUp && setPopUp(null);
    } else {
      setAddVariant(false);
      setNewVariant({
        variant: "",
      });
      setVariants({
        name: "",
        variant: [],
      });
    }
  };

  const addVariantToArray = () => {
    if (variants.name === "") {
      toast.warning("Digite el nombre de la variante.");
      return;
    }
    if (newVariant.variant === "") {
      toast.warning("Digite el valor de la variante.");
      return;
    }
    setVariants({
      ...variants,
      variant: [...variants.variant, newVariant.variant],
    });
    setNewVariant({
      variant: "",
    });
  };

  const deleteVariant = async (id: number) => {
    setLoading(true);
    const res = await deleteVariantToCategory(id);
    setLoading(false);
    getCategory(categoryId);
  };

  const updateVariant = (id: number) => {
    const current: any = category?.variants.filter((v) => v.id === id)[0];
    setVariants({
      id,
      name: current?.name as any,
      variant: current?.variant_values?.map((v: any) => v.value) as any,
    });
    setAddVariant(true);
  };

  const saveVariants = async () => {
    if (variants.name === "") {
      toast.warning("Agregue un nombre a la variante antes de guardar.");
      return;
    }

    if (variants.variant.length <= 0) {
      toast.warning("Agregue alguna variante antes de guardar.");
      return;
    }

    if (variants.id) {
      deleteVariant(variants.id);
    }

    setLoading(true);
    const res = await addVariantToCategory({
      name: variants.name as any,
      category: categoryId,
      variant_values: variants.variant,
    });
    getCategory(categoryId);
    setLoading(false);
    setAddVariant(false);
    setNewVariant({
      variant: "",
    });
    setVariants({
      name: "",
      variant: [],
    });
  };

  useEffect(() => {
    if (!category) {
      getCategory(categoryId);
    }
  }, [category]);

  return (
    <div className="flex flex-col gap-y-8 relative px-5">
      <button
        onClick={() => btnCancel()}
        className="absolute -top-4 -right-2 bg-gray-100 p-2 rounded-full"
      >
        <Cerrar />
      </button>
      <span className="text-Oscuro text-xl font-bold mt-3 w-fit">
        Variantes
      </span>
      {loading ? (
        <div className="w-[450px] grid place-content-center gap-y-2">
          <span className="font-bold text-lg text-Principal">Cargando...</span>
          <span className="flex justify-center">
            <BeatLoader color={colores.Principal} size={10} />
          </span>
        </div>
      ) : category?.variants.length === 0 && !addVariant ? (
        <span className="font-bold text-base w-fit mx-14 text-center">
          Actualmente no hay ninguna variante para esta categoria
        </span>
      ) : category?.variants ? (
        category?.variants.length > 0 && !addVariant ? (
          <table className="w-[450px]">
            <tbody>
              <tr className="text-left">
                <th className="border-b border-backgroundPage pb-3 font-bold text-[13px] text-Oscuro">
                  Nombre
                </th>
                <th className="border-b border-backgroundPage pb-3 font-bold text-[13px] text-Oscuro">
                  Valores
                </th>
                <th className="border-b border-backgroundPage pb-3 font-bold text-[13px] text-Oscuro w-[120px]">
                  Acciones
                </th>
              </tr>
              {category?.variants.map(({ id, name, variant_values }: any) => (
                <tr
                  key={id}
                  className="border-b border-backgroundPage last:border-none"
                >
                  <td className="py-3 pr-3 font-normal text-[13px] max-w-[50px] text-ellipsis overflow-hidden">
                    {name}
                  </td>
                  <td className="py-3 pr-3 font-normal text-[13px] max-w-[50px] text-ellipsis overflow-hidden">
                    {variant_values.map(
                      (
                        { id, value }: { id: number; value: string },
                        index: number
                      ) => (
                        <span key={id}>
                          {value}
                          {`${variant_values.length !== index + 1 ? ", " : ""}`}
                        </span>
                      )
                    )}
                  </td>
                  <td className="py-3 flex gap-x-3">
                    <button
                      onClick={() => updateVariant(id)}
                      className="w-12 h-9 rounded-md bg-Principal grid place-content-center"
                    >
                      <Edit color="white" />
                    </button>
                    <button
                      onClick={() => deleteVariant(id)}
                      className="w-12 h-9 rounded-md bg-alert grid place-content-center"
                    >
                      <Delete color="white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col gap-y-4">
            {/* ADD NEW VARIANT */}
            <div className="flex items-center gap-x-3">
              <label
                className="font-bold text-[13px] text-Oscuro w-14"
                htmlFor="name"
              >
                Nombre:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                spellCheck={false}
                placeholder="Nombre de la variante"
                value={variants.name}
                onChange={(e) =>
                  setVariants({ ...variants, name: e.target.value })
                }
                className="w-[calc(100%-68px)] border-[1px] border-backgroundPage focus:outline-none rounded-md px-4 py-2 font-normal text-[13px] placeholder:text-TextOpacity placeholder:text-[13px]"
              />
            </div>
            <div className="flex items-center gap-x-3">
              <label
                className="font-bold text-[13px] text-Oscuro w-14"
                htmlFor="variant"
              >
                Valores:
              </label>
              <div className="flex gap-x-2">
                <input
                  type="text"
                  name="variant"
                  id="variant"
                  spellCheck={false}
                  placeholder="Nombre valor"
                  value={newVariant.variant}
                  onChange={(e) =>
                    setNewVariant({ ...newVariant, variant: e.target.value })
                  }
                  className="border-[1px] border-backgroundPage focus:outline-none rounded-md px-4 py-2 font-normal text-[13px] placeholder:text-TextOpacity placeholder:text-[13px]"
                />
                <button
                  onClick={() => addVariantToArray()}
                  className="flex items-center gap-x-2 px-4 h-9 border border-Principal bg-Claro rounded-md"
                >
                  <Plus color={colores.Principal} />
                  <span className="font-normal text-[13px] text-Principal">
                    Agregar
                  </span>
                </button>
              </div>
            </div>

            {/* VARIANTS */}
            {variants && (
              <div className="flex items-center gap-3 flex-wrap">
                {variants?.variant?.map((index, key) => (
                  <div
                    key={key}
                    className="border border-backgroundPage w-fit px-2 py-1 rounded-md relative"
                  >
                    <button
                      onClick={() =>
                        setVariants({
                          ...variants,
                          variant: [
                            ...variants.variant.filter((v) => v !== index),
                          ],
                        })
                      }
                      className="bg-Principal p-1 rounded-full rotate-45 absolute -right-2 -top-2"
                    >
                      <Plus color="white" />
                    </button>
                    <span className="font-normal text-[13px]">{index}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      ) : null}

      {!loading && (
        <div className="flex items-center mx-auto gap-x-5">
          {(category?.variants.length === 0 || addVariant) && (
            <button
              onClick={() => btnCancel()}
              className="bg-TextOpacity rounded-md py-2 px-4 text-white font-medium text-sm break-words transition-all duration-300 ease-in-out hover:bg-Oscuro"
            >
              Cancelar
            </button>
          )}
          <ButtonPage
            action={() => (!addVariant ? setAddVariant(true) : saveVariants())}
          >
            <span className="px-4">
              {!addVariant ? "Añadir nueva variante" : "Guardar"}
            </span>
          </ButtonPage>
        </div>
      )}
    </div>
  );
};

export default EditVariantsModal;
