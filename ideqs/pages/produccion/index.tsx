import type { NextPage } from 'next'
import { useState } from 'react'
import Image from 'next/image'
import BasePage from '../../src/screens/general/base/BasePage'
import logoM from '../../src/assets/general/Logotipo.png'
import ordenador from '../../src/assets/administrador/home/ordenador.png'
import usuario from '../../src/assets/administrador/home/usuario.png'
import Cards from '../../src/screens/home/cards'
import Select from '../../src/components/menu/signIn'
import CardsM from '../../src/screens/home/cardsM'
import { useSelector } from 'react-redux'
import { selectUser } from '../../src/redux/reducers/authReducer'
import consultas from '../../src/assets/empresa/home/consultashome.png'

interface Props {
  title?: string
  description?: string
  image?: any | string
  id: number
  href: string
}
const dataSecure: Props[] = [
  {
    id: 1,
    title: 'ÓRDENES',
    description:
      'Cree, edite y revise el estado de las órdenes de trabajo, conozca su estado actualizado en tiempo real',
    image: ordenador,
    href: 'produccion/orders?estado=0'
  },
  {
    id: 3,
    title: 'USUARIOS',
    description:
      'Cree, edite y revise la información de los usuarios asociados',
    image: usuario,
    href: 'produccion/usuarios'
  },
  {
    id: 2,
    title: 'CONSULTAS',
    description:
      'Realice búsquedas con filtros personalizados, de archivos Excel convertidos a bases de datos',
    image: consultas,
    href: 'produccion/consulta'
  }
]

const Home: NextPage = () => {
  const user = useSelector(selectUser)
  const [, setPrueba] = useState(true)

  return (
    <BasePage title={'Home'}>
      <div className="h-[100%]">
        <div className="hidden md:flex lg:container xl:mx-auto justify-between w-full h-full m-10">
          <div className="mx-5">
            <Image src={logoM} width={212} height={73} layout="fixed" alt="" />
          </div>
          <div className="flex text-azulPrimary900 text-textSize5 gap-3 items-start absolute top-0 right-0 m-10 mx-20">
            <span className="py-4"> Panel de Control</span>
            <Select
              name={'sesion'}
              label={''}
              href={'login'}
              choose={user?.user}
              className={
                'text-textSize5 w-[238px] h-[46px] border-2 border-azulPrimary900'
              }
              action={() => null}
            />
          </div>
        </div>
        <div className=" md:hidden flex gap-3 items-start justify-end absolute top-0 right-0 mx-3 ">
          <Select
            name={'sesion'}
            label={''}
            href={'login'}
            choose={user?.user}
            className={
              'text-textSize8 w-[120px] h-[23px] py-0 items-center border border-azulPrimary900'
            }
            action={() => setPrueba(false)}
          />
        </div>
        <div className="flex flex-col justify-center container w-full mx-auto min-h-[75vh] my-auto">
          <div className="flex justify-center text-azulPrimary900 text-textSize4 md:text-textSize2 font-bold w-full pt-20 md:pt-0">
            <span>MÓDULOS</span>
          </div>
          <div className="hidden md:flex h-[345px] flex-col mx-auto md:flex-row justify-center gap-7 my-7">
            {dataSecure.map((i: any) => (
              <Cards
                title={i.title}
                description={i.description}
                img={i.image}
                href={i.href}
                key={`card-${i}`}
              />
            ))}
          </div>
          <div className="md:hidden  flex flex-col mx-auto  justify-center gap-7 my-20">
            {dataSecure.map((i: any) => (
              <CardsM
                title={i.title}
                description={i.description}
                img={i.image}
                href={i.href}
                key={`card-${i}`}
              />
            ))}
          </div>
        </div>
      </div>
    </BasePage>
  )
}

export default Home
