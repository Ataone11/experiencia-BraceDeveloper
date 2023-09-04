import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSucursales } from "../../../../redux/reducers/adminUserReducer";
import { getSucursalesClient } from "../../../../redux/actions/adminUserActions";
import Select from "../../../../components/inputs/selectUser";

interface Params {
  id: number;
}

const SelectSucursales = ({ id }: Params) => {
  const sucursales = useSelector((state: any) => getSucursales(state, id));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!sucursales) {
      getSucursalesClient(id, dispatch);
    }
  }, [id]);

  const options = (sucursales ?? []).map((sucursal) => {
    return {
      value: sucursal.id,
      name: sucursal.nombre,
    };
  });

  return (
    <div className="grid-item pt-6 w-full h-full">
      <Select
        name={"idSucursal"}
        options={options}
        label={"Sucursal:"}
        choose={"Selecciona"}
        className={" w-full lg:h-12 h-10 text-[13px]"}
      ></Select>
    </div>
  );
};

export default SelectSucursales;
