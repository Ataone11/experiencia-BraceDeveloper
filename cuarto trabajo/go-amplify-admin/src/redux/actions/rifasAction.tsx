import { getData, patchData } from "../../proxy/BackendREST";
import { Rifa } from "../../models/rifa";

export enum RIFAS_ACTIONS {
  GET_RIFAS = "GET_RIFAS",
}
export const getRaffles = async (dispatch: any, setLoader?:any) => {
  const response = await getData(
    `rifas`
  );

  const rifas: Rifa[] = response.data;
  dispatch({
    type: RIFAS_ACTIONS.GET_RIFAS,
    payload: rifas,
  });
  if (rifas&&setLoader)
    setLoader(false)
};

export const updateRaffles = async (title:string, date:string, description:string, raffle:Rifa, setLoader:any, image?:string) =>{
  const formData = new FormData();

  if(raffle.nombre !== title){
    formData.append('nombre', title)
  }
  if(raffle.fecha !== new Date(date)){
    formData.append('fecha', String(date))
  }
  if(raffle.descripcion !== description){
    formData.append('descripcion', description)
  }
  if(image)
    formData.append('imagen', image)
  
  console.log(image)
  console.log(formData.getAll('imagen'))

  const response = await patchData('rifas/'+String(raffle.id), {}, formData)
  if(response)
    setLoader(false)
    
  return response
}
