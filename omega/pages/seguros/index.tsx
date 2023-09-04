import FormContacto from '../../components/contacto/FormContacto'
import SeguroPersonas from '../../components/seguros/segurosPersonas'
import SeguroEmpresas from '../../components/seguros/segurosEmpresas'
import Otros from '../../components/seguros/otrosSeguros'
import segurosAccidentes from '../../assets/images/seguros/Seguros_Otros_Accidentes.jpg'
import segurosBicicletas from '../../assets/images/seguros/Seguros_Otros_Bicicletas.jpg'
import segurosEducacion from '../../assets/images/seguros/Seguros_Otros_Educacion.jpg'
import segurosMascotas from '../../assets/images/seguros/Seguros_Otros_Mascotas.jpg'
import segurosExequias from '../../assets/images/seguros/Seguros_Otros_Exequias.jpg'
import segurosViales from '../../assets/images/seguros/Seguros_Otros_Viajes.jpg'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface Props {
  title?: string
  negrilla?: string
  description?: string
  image?: any | string
  id: number
}

const dataSecure3: Props[] = [
  {
    id: 1,
    title: 'SEGUROS DE EXEQUIAS',
    negrilla: 'En momentos difíciles mereces estar tranquilo.',
    description:
      'Este seguro te ayudara a no preocuparte por cuestiones económicas al momento de falleciiento de un ser querido.',
    image: segurosExequias
  },
  {
    id: 2,
    title: 'ACCIDENTES PERSONALES',
    negrilla: 'Los accidentes pueden ocurrir en cualquier momento.',
    description:
      'El seguro de Accidentes te suministrará una ayuda económica, en caso de que un evento exterior te cause lesión física o la muerte',
    image: segurosAccidentes
  },
  {
    id: 3,
    title: 'SEGURO DE EDUCACIÓN',
    negrilla: 'Sabemos la importancia de la formación de tus hijos. ',
    description:
      'Asesórate con nosotros y descubre la manera mas efectiva para cubrir los costos de sus planes educativos',
    image: segurosEducacion
  },
  {
    id: 4,
    title: 'SEGURO PARA MASCOTAS',
    negrilla: 'Ellos también son parte de la familia.',
    description:
      'Te respaldamos satifaciendo tus necesidades y las de tus mascotas y te ayudamos a cuidarlos, atenderlos y protegerlos',
    image: segurosMascotas
  },
  {
    id: 5,
    title: 'BICICLETAS Y PATINETAS',
    negrilla: 'Tú eliges cómo moverte.',
    description:
      'Te acompañamos en caso de pérdida total por accidente o en caso de rono de tu bicicleta o patineta. para que tengas la libertad de desplazaese como quieres.',
    image: segurosBicicletas
  },
  {
    id: 6,
    title: 'SEGUROS DE VIAJES',
    negrilla: 'No hay razon para viajar sin buena compañía. ',
    description:
      'Nuestro seguro cubre gastos de atención médica tanto en el extranjero como en territorio nacional, además de pérdida de equipaje y cancelación de viajes',
    image: segurosViales
  }
]

const dataSecure: Props[] = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  },
  {
    id: 4
  }
]

const Seguros = () => {
  const [servicios, setServicios] = useState(dataSecure[0])
  const router = useRouter()
  const { tipo } = router.query

  useEffect(() => {
    if(tipo)
      setServicios(dataSecure[parseInt(tipo as string)])
  }, [tipo])
  

  return (
    <div className="bg-white h-full w-full mx-auto ">
      <div className="bg-white w-full h-full  items-center justify-center block lg:hidden">
        <div className="w-full flex flex-col items-center my-5 pt-5 px-1">
          <h2
            className="text-redOmega text-3xl xl:text-4xl font-bold
           w-full lg:w-[50%] text-center tracking-widest md:w-full"
          >
            NUESTROS SEGUROS
          </h2>
        </div>
      </div>
      <div className="text-center pt-5 lg:w-full md:w-[80%] lg:text-sm xl:text-base mx-2 md:mx-auto my-1 lg:my-10">
        <button
          onClick={() => setServicios(dataSecure[0])}
          className={`${
            servicios.id === 1
              ? ' bg-redOmega border-redOmega text-white'
              : 'bg-white'
          }  rounded-full md:rounded-full hover:bg-redOmega hover:text-white hover:border-redOmega font-semibold
          border-2 border-greyOmega text-greyOmega lg:py-2 mx-1 md:mx-5  lg:w-[240px] h-[35px] lg:h-[45px] snap-center my-2 text-[14px] px-[8px] py-[5.5px]`}
        >
          Seguros para personas
        </button>
        <button
          onClick={() => setServicios(dataSecure[1])}
          className={`${
            servicios.id === 2
              ? ' bg-redOmega border-redOmega text-white'
              : 'bg-white'
          }  rounded-full md:rounded-full hover:bg-redOmega hover:text-white hover:border-redOmega font-semibold
         border-2 border-greyOmega text-greyOmega  lg:py-2 mx-1 md:mx-5 lg:w-[260px]  h-[35px] lg:h-[45px] my-2 text-[14px] px-[8px] py-[5.5px]`}
        >
          Seguros para empresas
        </button>
        <button
          onClick={() => setServicios(dataSecure[2])}
          className={`${
            servicios.id === 3
              ? ' bg-redOmega border-redOmega text-white'
              : 'bg-white'
          }  rounded-full md:rounded-full hover:bg-redOmega hover:text-white hover:border-redOmega font-semibold
         border-2 border-greyOmega text-greyOmega lg:py-2 mx-1 md:mx-5 lg:w-[240px]  h-[35px] lg:h-[45px] my-2 text-[14px] px-[8px] py-[5.5px]`}
        >
          Otros seguros
        </button>
      </div>

      <div
        className={`${
          servicios.id === 1 ? ' transition-opacity2' : 'hidden'
        }  bg-white h-full w-full container mx-auto`}
      >
        <SeguroPersonas />
      </div>
      <div
        className={`${
          servicios.id === 2 ? ' transition-opacity2' : 'hidden'
        }  `}
      >
        <br className="hidden md:block lg:hidden" />
        <SeguroEmpresas />
      </div>
      <div
        className={`${
          servicios.id === 3 ? ' transition-opacity2' : 'hidden'
        } tracking-widest text-center text-greyOmega w-full lg:w-[50%]  my-4 lg:my-10 mx-auto text-xs lg:text-base font-bold`}
      >
        <h1>¿No has encontrado lo que buscas?</h1>
        <h1> Encuentra aqui los servicios que tenemos para ofrecerte.</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {dataSecure3.map((item: any) => (
          <div
            key={item.id}
            className={`${
              servicios.id === 3 ? ' transition-opacity2' : 'hidden'
            }  `}
          >
            <div className="container mx-auto ">
              <Otros
                image={item.image}
                titleOne={item.title}
                description={item.description}
                negrilla={item.negrilla}
              />
            </div>
          </div>
        ))}
      </div>
      <br className="hidden lg:block" />
      <br className="hidden md:block" />
      <div className="bg-white h-full w-full container mx-auto "></div>
      <FormContacto />
    </div>
  )
}

export default Seguros
