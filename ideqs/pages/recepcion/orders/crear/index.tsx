import type { NextPage } from 'next'
import BasePage from '../../../../src/screens/general/base/BasePage'
import Menu from '../../../../src/screens/empresa/orders/menu'
import NuevaOrden from '../../../../src/screens/empresa/orders/nuevaOrden'

const Orders: NextPage = () => {
  return (
    <BasePage title="Crear Orden">
      <div className="flex w-full ">
        <div className="flex">
          <Menu menu={0} setMenu={() => null} order={0} setOrder={() => null} />
        </div>
        <div className="w-[78%]">
          <NuevaOrden />
        </div>
      </div>
    </BasePage>
  )
}

export default Orders
