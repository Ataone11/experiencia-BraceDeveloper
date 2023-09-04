import { combineReducers } from 'redux'
import pageReducer from './pageReducer'
import authReducer from './authReducer'
import ordersReducer from './ordersReducer'
import carneReducer from './carneReducer'
import orderAdminReducer from './orderAdminReducer'
import remisionesReducer from './remisionesReducer'
import adminUsersReducer from './adminUsersReducer'
import adminUserReducer from './adminUserReducer'
import camposReducer from './camposReducer'
import formatAdminReducer from './formatAdminReducer'
import sucursalReducer from './sucursalReducer'
import usuariosReducer from './usuariosReducer'
import pointsReducer from './pointsReducer'
import informationReducer from './informationReducer'
import informesReducer from './informesReducer'

export default combineReducers({
  pageReducer,
  authReducer,
  ordersReducer,
  carneReducer,
  orderAdminReducer,
  remisionesReducer,
  adminUserReducer,
  camposReducer,
  adminUsersReducer,
  formatAdminReducer,
  sucursalReducer,
  usuariosReducer,
  pointsReducer,
  informationReducer,
  informesReducer
})
