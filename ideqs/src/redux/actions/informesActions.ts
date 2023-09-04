/* eslint-disable no-unused-vars */
import { PORTS, postData } from '../../proxy/BackendREST'
import { informesModel } from '../../screens/administrador/ordersAdmin/Report'
export enum TypeOrders {
  getInforme = 'getInforme'
}
export const getInformes = async ({
  dispatch,
  body
}: {
  dispatch: any
  body: informesModel
}) => {
  const response = await postData(
    `reporte/listarOrdenesReporte`,
    {},
    PORTS.REPORTE,
    body
  )

  if (!response.data) {
    return
  }
  const informe = response.data
  dispatch({
    type: TypeOrders.getInforme,
    payload: { informe, filters: body }
  })
}
