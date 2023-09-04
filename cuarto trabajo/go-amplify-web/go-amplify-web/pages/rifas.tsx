import { NextPage } from "next";
import { CSSProperties, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PuffLoader from "react-spinners/PuffLoader";
import { getRifas } from "../src/redux/actions/rifasAction";
import { getRifasState } from "../src/redux/reducers/rifaReducer";
import Puntos from "../src/components/rifas/puntos";
import Rifa from "../src/components/rifas/Rifas";
import BasePage from "../src/screens/general/base/BasePage";

//prueba para renderizar componente multiples veces
/*const rifa = [
  {
    id: 0,
    nombre: "!2 Nets mini segunda generacion",
    fecha: "31/08/2022",
    tipo: "mensual",
  },
  {
    id: 1,
    nombre: "!phone nuevo !phone nuevo",
    fecha: "2022-2",
    tipo: "semestral",
  },
  {
    id: 2,
    nombre: "!tesla 0 kilometros",
    fecha: "12/12/2022",
    tipo: "anual",
  }
]*/



const Rifas: NextPage = () => {
  let toggle: Boolean = false  //variable para alternar entre componentes renderizados
  const rifas = useSelector(getRifasState)
  const dispatch = useDispatch();
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "blue",
  };

  useEffect(() => {
    if(!rifas) {
      getRifas(dispatch)
    } 
  }, [rifas])

  const loading = () => {

    if(!rifas){
      return(
        <div className="grid place-items-center h-loader">
          <PuffLoader color={"blue"} loading={!rifas} cssOverride={override} size={150} />
        </div>
      )
    }

  }
  

  return (
    <BasePage>
      <div className="bg-default w-full grid place-items-center">
        <div className="w-rifaDescripM md:w-rifaDescrip px-5">
          <Puntos></Puntos>
          {rifas?.map((rifa: any) => ( //map para renderizar componentes de cada rifa
            <div key={rifa.id}>
              {toggle = !toggle}
              <Rifa nombre={rifa.nombre} fecha={rifa.fecha} tipo={rifa.tipo} toggle={toggle} img={rifa.imagen} descripcion={rifa.descripcion}></Rifa>
            </div>
          ))}
          {loading()}
        </div>
      </div>
    </BasePage>
  )
}

export default Rifas

