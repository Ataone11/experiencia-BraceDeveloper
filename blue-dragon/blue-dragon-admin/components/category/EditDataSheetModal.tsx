import { Dispatch, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import Cerrar from "../../assets/Cerrar";
import Delete from "../../assets/Delete";
import Edit from "../../assets/Edit";
import Plus from "../../assets/Plus";
import { CategoriaModel, DataSheetModel } from "../../interfaces";
import {
  addDataSheetToCategory,
  deleteDataSheetToCategory,
  getCategoryById,
} from "../../src/redux/actions/categoriasActions";
import colores from "../../src/utils/colores";
import { FEATURE_TYPE } from "../../src/utils/constants";
import ButtonPage from "../ButtonPage";

const EditDataSheetModal = ({
  categoryId,
  setPopUp,
}: {
  categoryId: number;
  setPopUp: Dispatch<any> | null;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [category, setcategory] = useState<CategoriaModel | null>(null);
  const [addDataSheet, setAddDataSheet] = useState<boolean>(false);
  const [dataSheet, setDataSheet] = useState<DataSheetModel>({
    id: null,
    type: 0,
    name: "",
    required: false,
    discrete_values: [],
  });
  const [discreteValue, setDiscreteValue] = useState<{ discrete: string }>({
    discrete: "",
  });

  const getCategory = async (id: number) => {
    setLoading(true);
    const res = await getCategoryById(id);
    setcategory(res);
    setLoading(false);
  };

  const btnCancel = () => {
    if (dataSheet.name === "") {
      setPopUp && setPopUp(null);
    } else {
      setAddDataSheet(false);
      setDiscreteValue({
        discrete: "",
      });
      setDataSheet({
        type: 0,
        name: "",
        required: false,
        discrete_values: [],
      });
    }
  };

  const addDataSheetToArray = () => {
    if (dataSheet.type === 0) {
      toast.warning("Seleccione un tipo para esta ficha antes de guardar.");
      return;
    }
    if (dataSheet.name === "") {
      toast.warning("Agregue el nombre para esta ficha antes de guardar.");
      return;
    }

    if (dataSheet.type === FEATURE_TYPE.DISCRETE) {
      if (discreteValue.discrete === "") {
        toast.warning("Agregue el valor discreto antes de guardar.");
        return;
      }

      setDataSheet({
        ...dataSheet,
        discrete_values: [...dataSheet.discrete_values, discreteValue.discrete],
      });
      setDiscreteValue({ discrete: "" });
    }
  };

  const deleteDataSheet = async (id: number) => {
    setLoading(true);
    const res = await deleteDataSheetToCategory(id);
    setLoading(false);
    getCategory(categoryId);
  };

  const updateDataSheet = (id: number) => {
    const current = category?.features.filter((f) => f.id === id)[0];
    setDataSheet({
      id,
      type: current?.type as number,
      name: current?.name,
      required: current?.required,
      discrete_values: current?.discrete_values?.map((f) => f.value) as string[],
    });
    setAddDataSheet(true);
  };

  const saveDataSheet = async () => {
    if (dataSheet.type === 0) {
      toast.warning("Seleccione un tipo antes de guardar.");
      return;
    }

    if (dataSheet.type === FEATURE_TYPE.DISCRETE) {
      if (dataSheet.discrete_values.length <= 0) {
        toast.warning("Agregue algun valor discreto antes de guardar.");
        return;
      }
    } else {
      if (dataSheet.name === "") {
        toast.warning("Agregue alguna ficha técnica antes de guardar.");
        return;
      }
    }

    if (dataSheet.id) {
      deleteDataSheet(dataSheet.id);
    }

    setLoading(true);
    const res = await addDataSheetToCategory({
      type: dataSheet.type,
      category: categoryId,
      name: dataSheet.name,
      required: dataSheet.required,
      discrete_values:
        dataSheet.type === FEATURE_TYPE.DISCRETE
          ? dataSheet.discrete_values
          : [],
    });
    getCategory(categoryId);
    setLoading(false);
    setAddDataSheet(false);
    setDiscreteValue({
      discrete: "",
    });
    setDataSheet({
      type: 0,
      name: "",
      required: false,
      discrete_values: [],
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
      {category?.features && (
        <span className="text-Oscuro text-xl font-bold mt-3 w-fit">
          {category?.features.length > 0
            ? `Ficha técnica: ${category?.name.text}`
            : !addDataSheet
            ? "Atributos ficha técnica"
            : `Añadir atributo: ${category?.name.text}`}
        </span>
      )}

      {loading ? (
        <div className="w-[450px] grid place-content-center gap-y-2">
          <span className="font-bold text-lg text-Principal">Cargando...</span>
          <span className="flex justify-center">
            <BeatLoader color={colores.Principal} size={10} />
          </span>
        </div>
      ) : category?.features.length === 0 && !addDataSheet ? (
        <span className="font-bold text-base w-fit mx-14 text-center">
          Actualmente no hay ninguna ficha técnica para esta categoria
        </span>
      ) : category?.features ? (
        category?.features.length > 0 && !addDataSheet ? (
          <table className="w-[450px]">
            <tbody>
              <tr className="text-left">
                <th className="border-b border-backgroundPage pb-3 font-bold text-[13px] text-Oscuro">
                  Nombre
                </th>
                <th className="border-b border-backgroundPage pb-3 font-bold text-[13px] text-Oscuro">
                  Tipo
                </th>
                <th className="border-b border-backgroundPage pb-3 font-bold text-[13px] text-Oscuro">
                  Requerido
                </th>
                <th className="border-b border-backgroundPage pb-3 font-bold text-[13px] text-Oscuro w-[120px]">
                  Acciones
                </th>
              </tr>
              {category?.features.map(({ id, name, type, required }, key) => (
                <tr
                  key={key}
                  className="border-b border-backgroundPage last:border-none"
                >
                  <td className="py-3 pr-3 font-normal text-[13px] max-w-[50px] text-ellipsis overflow-hidden">
                    {name}
                  </td>
                  <td className="py-3 pr-3 font-normal text-[13px] max-w-[50px] text-ellipsis overflow-hidden">
                    {type === FEATURE_TYPE.TEXT
                      ? "Text"
                      : type === FEATURE_TYPE.NUMBER
                      ? "Numérico"
                      : type === FEATURE_TYPE.DISCRETE
                      ? "Discreto"
                      : undefined}
                  </td>
                  <td className="py-3 pr-3 font-normal text-[13px] max-w-[50px] text-ellipsis overflow-hidden">
                    {required ? "Si" : "No"}
                  </td>
                  <td className="py-3 flex gap-x-3">
                    <button
                      onClick={() => updateDataSheet(id)}
                      className="w-12 h-9 rounded-md bg-Principal grid place-content-center"
                    >
                      <Edit color="white" />
                    </button>
                    <button
                      onClick={() => deleteDataSheet(id)}
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
          <div className="flex flex-col gap-y-4 w-[450px]">
            {/* TYPE */}
            <div className="flex items-center gap-x-3">
              <span className="font-bold text-[13px] text-Oscuro w-14">
                Tipo:
              </span>
              <div className="w-[calc(100%-56px)] flex gap-x-10 items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <input
                    onClick={() => {
                      setDataSheet({
                        ...dataSheet,
                        type: FEATURE_TYPE.NUMBER,
                      });
                      /* setDiscreteValue({ discrete: "" }); */
                    }}
                    checked={dataSheet.type === FEATURE_TYPE.NUMBER}
                    type="checkbox"
                    name="numeric"
                    id="numeric"
                    className="accent-Principal"
                  />
                  <label className="font-bold text-[13px]" htmlFor="numeric">
                    Numérico
                  </label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    onClick={() => {
                      setDataSheet({
                        ...dataSheet,
                        type: FEATURE_TYPE.TEXT,
                      });
                      /* setDiscreteValue({ discrete: "" }); */
                    }}
                    checked={dataSheet.type === FEATURE_TYPE.TEXT}
                    type="checkbox"
                    name="text"
                    id="text"
                    className="accent-Principal"
                  />
                  <label className="font-bold text-[13px]" htmlFor="text">
                    Texto
                  </label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    onClick={() => {
                      setDataSheet({
                        ...dataSheet,
                        type: FEATURE_TYPE.DISCRETE,
                        /* name: "", */
                      });
                    }}
                    checked={dataSheet.type === FEATURE_TYPE.DISCRETE}
                    type="checkbox"
                    name="discreteValue"
                    id="discreteValue"
                    className="accent-Principal"
                  />
                  <label
                    className="font-bold text-[13px]"
                    htmlFor="discreteValue"
                  >
                    Valor discreto
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-x-3">
              <label
                htmlFor="name"
                className="font-bold text-[13px] text-Oscuro w-14"
              >
                Nombre:
              </label>
              <div className="w-[calc(100%-56px)] flex items-center justify-between">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={dataSheet.name}
                  placeholder="Nombre de la variante"
                  onChange={(e) =>
                    setDataSheet({
                      ...dataSheet,
                      name: e.target.value,
                    })
                  }
                  className="border-[1px] border-backgroundPage focus:outline-none rounded-md px-4 py-2 font-normal text-[13px] placeholder:text-TextOpacity placeholder:text-[13px] w-[calc(100%-140px)]"
                />
                <div className="flex items-center gap-x-3">
                  <label
                    htmlFor="mandatoryName"
                    className="font-bold text-[13px] text-Oscuro"
                  >
                    Obligatorio
                  </label>
                  <input
                    onClick={(e: any) =>
                      setDataSheet({
                        ...dataSheet,
                        required: e.target.checked,
                      })
                    }
                    checked={dataSheet.required}
                    type="checkbox"
                    name="mandatoryName"
                    id="mandatoryName"
                    className="accent-Principal"
                  />
                </div>
              </div>
            </div>

            {dataSheet.type === FEATURE_TYPE.DISCRETE && (
              <div className="flex items-center gap-x-3">
                <label
                  htmlFor="name"
                  className="font-bold text-[13px] text-Oscuro w-14"
                >
                  Valor discreto:
                </label>
                <div className="w-[calc(100%-56px)] flex items-center gap-x-4">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nombre valor"
                    value={discreteValue.discrete}
                    onChange={(e) =>
                      setDiscreteValue({
                        ...discreteValue,
                        discrete: e.target.value,
                      })
                    }
                    className="border-[1px] border-backgroundPage focus:outline-none rounded-md px-4 py-2 font-normal text-[13px] placeholder:text-TextOpacity placeholder:text-[13px] w-[calc(100%-140px)]"
                  />
                  <button
                    onClick={() => addDataSheetToArray()}
                    className="flex items-center gap-x-2 px-4 h-9 border border-Principal bg-Claro rounded-md"
                  >
                    <Plus color={colores.Principal} />
                    <span className="font-normal text-[13px] text-Principal">
                      Agregar
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* DataSheets */}
            {dataSheet.discrete_values &&
              dataSheet.discrete_values.length > 0 &&
              dataSheet.type === FEATURE_TYPE.DISCRETE && (
                <div className="flex items-center gap-3 flex-wrap">
                  {dataSheet.discrete_values.map((index, key) => (
                    <div
                      key={key}
                      className="border border-backgroundPage w-fit px-2 py-1 rounded-md relative"
                    >
                      <button
                        onClick={() =>
                          setDataSheet({
                            ...dataSheet,
                            discrete_values: [
                              ...dataSheet.discrete_values.filter(
                                (d) => d !== index
                              ),
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
          {(category?.features.length === 0 || addDataSheet) && (
            <button
              onClick={() => btnCancel()}
              className="bg-TextOpacity rounded-md py-2 px-4 text-white font-medium text-sm break-words transition-all duration-300 ease-in-out hover:bg-Oscuro"
            >
              Cancelar
            </button>
          )}
          <ButtonPage
            action={() =>
              !addDataSheet ? setAddDataSheet(true) : saveDataSheet()
            }
          >
            <span className="px-4">
              {!addDataSheet ? "Añadir nueva variante" : "Guardar"}
            </span>
          </ButtonPage>
        </div>
      )}
    </div>
  );
};

export default EditDataSheetModal;
