import iconStar from '../../assets/icons/starIcon.svg'
import groupIcon from '../../assets/icons/groupIcon.svg'
import handIcon from '../../assets/icons/handIcon.svg'
import coinIcon from '../../assets/icons/coinIcon.svg'

interface IData {
  id: number
  title: string
  description: string
  icon: any
}

const dataValues: IData[] = [
  {
    id: 1,
    title: 'Calidad',
    description:
      'Con más de 20 años de experiencia en el sector, contamos con las capacidades necesarias para ofrecer un servicio de la más alta calidad a nuestros clientes.',
    icon: iconStar,
  },
  {
    id: 2,
    title: 'Compromiso empresarial',
    description:
      'Transformamos nuestro entorno para mejorar la calidad de vida de nuestro equipo de trabajo para que esté capacitado y calificado, y sea innovador, eficiente y creativo.',
    icon: groupIcon,
  },
  {
    id: 3,
    title: 'transparencia',
    description:
      'Cumplimos con todas las leyes y normas vigentes en todos los campos de nuestro trabajo donde apliquen.',
    icon: handIcon,
  },
  {
    id: 4,
    title: 'responsabilidad social',
    description:
      'Trabajamos bajo la responsabilidad social empresarial ayudando a sectores vulnerables de nuestra sociedad.',
    icon: coinIcon,
  },
]

const WeValues = () => {
  return (
    <div className='w-full md:w-full container mx-auto pt-8'>
      <div className='w-11/12 mx-auto space-y-5'>
        <h3 className='uppercase font-bold text-redOmega text-large lg:text-extraLarge tracking-[0.2em] text-center'>
          Nuestros Valores
        </h3>
        <p className='text-center text-[#6B6B6B] text-extraSmall sm:text-small md:text-[16px]'>
          Nuestra compañía y todos sus integrantes seguimos un lineamiento de
          valores fundamentales que consideramos idóneos para llevar a cabo
          nuestras obligaciones hacia cada uno de nuestros clientes de la manera
          más efectiva posible, así como también para continuar dejando una
          huella de excelencia en la región y en el sector
        </p>
      </div>
      <div className='mt-10 flex flex-col xl:flex-row gap-y-8 justify-center xl:items-start items-center'>
        {dataValues.map((item: IData) => (
          <div
            className='w-11/12 mx-auto flex flex-row xl:flex-col xl:space-y-4 justify-center gap-x-5 sm:space-x-11 xl:space-x-0 items-center'
            key={item.id}>
            <div className='p-2 flex justify-center items-center  bg-redOmega rounded-full'>
              <img className='w-8' src={item.icon.src} alt="" />
            </div>
            <div className='bg-white w-[78%] relative max-w-[250px] sm:max-w-[600px] xl:h-[220px] space-y-3 xl:max-w-[450px] rounded-xl shadow-xl p-5'>
              <h4 className='uppercase font-bold text-redOmega text-base md:text-medium tracking-[0.2em] text-left'>
                {item.title}
              </h4>
              <p className='text-left text-blackOmega text-extraSmall sm:text-small'>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeValues
