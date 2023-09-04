import { getData} from "../proxy/backendRest"
import { ResponseModel,ResponseType } from "../models/responseData";
import { PlanModel } from "../models/PlanModel";
import {Planes} from "../models/Planes"



export enum PlansActions {
    LOADING_PLANS = 'plansReducer/loading',
    GOTTEN_PLANS = 'plansReducer/plans',
    ERROR_PLANS = "plansReducer/error"
}
export const getPlans  = async (dispatch:any, id:string) => {
 dispatch({
   type: PlansActions.LOADING_PLANS,
   payload: true
 })

 const response = await getData(`plan/${id}`,{},null,{})
 console.log(response)
if(response.status === ResponseType.OK)
{
  
  const plans = new PlanModel(response.data)
  dispatch({
    type:PlansActions.GOTTEN_PLANS,
    payload: plans
  })
}else{
  dispatch({
    type:PlansActions.ERROR_PLANS,
    payload: "ERROR_PLANES"
  })

}

}
export const getPlan  = async (dispatch:any) => {
  dispatch({
    type: PlansActions.LOADING_PLANS,
    payload: true
  })
 
  const response = await getData(`plan`,{},null,{})
  console.log(response)
 if(response.status === ResponseType.OK)
 {
   
   const plans = response.data.map((plan:any)=> {
     return new PlanModel(plan)
   });
   dispatch({
     type:PlansActions.GOTTEN_PLANS,
     payload: plans
   })
 }else{
   dispatch({
     type:PlansActions.ERROR_PLANS,
     payload: "ERROR_PLANES"
   })
 
 }
 
 }