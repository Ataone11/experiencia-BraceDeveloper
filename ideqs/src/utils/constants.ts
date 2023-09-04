import Pdf from '../assets/general/Pdf'
import { SIDEBAR_ENUM } from './enums'
import pdf from '../assets/general/pdf.png'
import Sede from '../assets/general/Sede'
import Plus from '../assets/general/Plus'
import sede from '../assets/general/sede.png'
import remisiones from '../assets/administrador/remision/remisiones.png'
import InformationIcon from '../assets/general/Information'
import MenuHamburger from '../assets/administrador/remision/MenuHamburger'
import Search from '../assets/administrador/remision/Search'
import File from '../assets/empresa/carne/File'
import ordenador from '../assets/administrador/orders/ordenador.png'
import userIcon from '../assets/administrador/usuarios/usersIcon.svg'
import UserIcon from '../assets/administrador/usuarios/User'
import ClienteIcon from '../assets/administrador/usuarios/Cliente'
export const OK = 'OK'
export const ERROR = 'ERROR'
export const UNAUTHORIZED = 'UNAUTHORIZED'

export const screensRemisiones = {
  NEW: 'NUEVA REMISIÓN',
  SEARCH: 'BUSCAR REMISIÓN',
  ADD: 'GENERAR REMISIÓN',
  DETAIL: 'REMISIÓN',
  LIST: 'REMISIONES'
}

export const dataSidebar = {
  [SIDEBAR_ENUM.USUARIOS]: {
    image: userIcon,
    module: 'Usuarios',
    buttons: [
      {
        Icon: UserIcon,
        text: 'IDEQS',
        action: () => 0,
        route: `/usuarios`
      },
      {
        Icon: ClienteIcon,
        text: 'Empresas',
        action: () => 0,
        route: `/usuarios/empresas`
      },
      {
        Icon: Plus,
        text: 'Añadir',
        action: () => 0,
        route: `/usuarios/crear`
      }
    ]
  },

  [SIDEBAR_ENUM.USUARIOSPRODUCCION]: {
    image: userIcon,
    module: 'Usuarios',
    buttons: [
      {
        Icon: UserIcon,
        text: 'IDEQS',
        action: () => 0,
        route: `/usuarios`
      },
      {
        Icon: ClienteIcon,
        text: 'Empresas',
        action: () => 0,
        route: `/usuarios/empresas`
      }
    ]
  },

  [SIDEBAR_ENUM.FORMATOS]: {
    image: pdf,
    module: 'Carné PDF',
    buttons: [
      {
        Icon: Pdf,
        text: 'Carnés PDF',
        action: () => 0,
        route: '/consultar/formatos'
      }
    ]
  },
  [SIDEBAR_ENUM.PUNTOS]: {
    image: sede,
    module: 'Puntos de atención',
    buttons: [
      {
        Icon: Sede,
        text: 'Mapa',
        action: () => 0,
        route: '/puntos'
      },
      {
        Icon: Plus,
        text: 'Añadir sede',
        action: () => 0,
        route: '/puntos/crear-sede'
      }
    ]
  },
  [SIDEBAR_ENUM.INFORMACION]: {
    image: sede,
    module: 'Información',
    buttons: [
      {
        Icon: InformationIcon,
        text: 'Información',
        action: () => 0,
        route: '/informacion'
      },
      {
        Icon: Plus,
        text: 'Añadir información',
        action: () => 0,
        route: '/informacion/agregar-informacion'
      }
    ]
  },
  [SIDEBAR_ENUM.REMISIONES]: {
    image: remisiones,
    module: 'Mis remisiones',
    buttons: [
      {
        Icon: MenuHamburger,
        text: 'Mis remisiones',
        action: () => 0,
        route: '/remisiones'
      },
      {
        Icon: Plus,
        text: 'Nueva remisión',
        action: () => 0,
        route: '/remisiones/generar-remision'
      },
      {
        Icon: Search,
        text: 'Buscar remisión',
        action: () => 0,
        route: '/remisiones/buscar-remision'
      }
    ]
  },
  [SIDEBAR_ENUM.ORDERS_BUSINESS]: {
    image: sede,
    module: 'Carné PDF',
    buttons: [
      {
        Icon: Pdf,
        text: 'Carnés PDF',
        action: () => 0,
        route: '/carne'
      },
      {
        Icon: File,
        text: 'Formatos',
        action: () => 0,
        route: '/carne/formatos'
      }
    ]
  },
  [SIDEBAR_ENUM.ORDERS_ADMINISTRATOR]: {
    image: ordenador,
    module: 'Órdenes',
    buttons: [
      {
        Icon: MenuHamburger,
        text: 'Mis órdenes',
        action: () => 0,
        route: '/orders'
      },
      {
        Icon: File,
        text: 'Informe',
        action: () => 0,
        route: '/orders/informe'
      },
      {
        Icon: Search,
        text: 'Buscar orden',
        action: () => 0,
        route: '/orders/buscar'
      }
    ]
  },
  [SIDEBAR_ENUM.ORDERS_REMISION]: {
    image: ordenador,
    module: 'Órdenes',
    buttons: [
      {
        Icon: MenuHamburger,
        text: 'Mis órdenes',
        action: () => 0,
        route: '/orders'
      },
      {
        Icon: File,
        text: 'Informe',
        action: () => 0,
        route: '/orders/informe'
      },
      {
        Icon: Plus,
        text: 'Nueva Orden',
        action: () => 0,
        route: '/orders/nuevaOrden'
      },
      {
        Icon: Search,
        text: 'Buscar orden',
        action: () => 0,
        route: '/orders/buscar'
      }
    ]
  },
  [SIDEBAR_ENUM.ORDERS_ENCARGADO]: {
    image: ordenador,
    module: 'Órdenes',
    buttons: [
      {
        Icon: MenuHamburger,
        text: 'Mis órdenes',
        action: () => 0,
        route: '/orders'
      },
      {
        Icon: File,
        text: 'Informe',
        action: () => 0,
        route: '/orders/informe'
      },
      {
        Icon: Search,
        text: 'Buscar orden',
        action: () => 0,
        route: '/orders/buscar'
      }
    ]
  }
}
