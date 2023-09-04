import { createSelector } from 'reselect'
import { TypeOrders } from '../actions/ordersActions'

export interface CardContentFormat {
  idCliente: number
  nombreExcel: string
  plantilla: string
  imagen: string
  nombrePlantilla: string
  tipo: string
  usuario: string
  fecha: string
  idPlantilla: number
  id: number
  excel: string
}

interface StateParams {
  orders: any
  cardContentFormats: CardContentFormat[] | null
}

const INITIAL_STATE: StateParams = {
  orders: null,
  cardContentFormats: null
}

const reducer = (state: StateParams = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case TypeOrders.getOrders: {
      return { ...state, orders: action.payload }
    }
    case TypeOrders.createOrders: {
      const order = action.payload

      return {
        ...state,
        orders: {
          ...state.orders,
          [order.id]: order
        }
      }
    }
    case TypeOrders.getCardContentFormats: {
      return {
        ...state,
        cardContentFormats: action.payload
      }
    }
    default:
      return { ...state }
  }
}

export default reducer

export const getListOrders = createSelector(
  (state: any) => state.ordersReducer,
  (ordersReducer: StateParams) => ordersReducer?.orders
)

export const selectCardContentFormats = createSelector(
  (state: any) => state.ordersReducer,
  (ordersReducer: StateParams) => ordersReducer?.cardContentFormats
)
