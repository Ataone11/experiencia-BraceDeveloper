import { getData } from "../../proxy/BackRest";
import { ResponseModel, ResponseType } from "../../models/responseData";
import { DepartModel } from "../../models/DepatModel";

export enum DepartActions {
  LOADING_DEPART = "departamentoReducer/loading",
  GOTTEN_DEPART = "departamentoReducer/plans",
  ERROR_DEPART = "departamentoReducer/error",
}
export const getDepart = async (dispatch: any) => {
  dispatch({
    type: DepartActions.LOADING_DEPART,
    payload: true,
  });

  const response = await getData(
    `lugares/departamentos`,
    { conLugares: false },
    null,
    {}
  );
  console.log(response);
  if (response.status === ResponseType.OK) {
    const plans = response.data as DepartModel;
    dispatch({
      type: DepartActions.GOTTEN_DEPART,
      payload: plans,
    });
  } else {
    dispatch({
      type: DepartActions.ERROR_DEPART,
      payload: "ERROR_PLANES",
    });
  }
};
