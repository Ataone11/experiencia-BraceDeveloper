import Image from 'next/image'
import Button from '../buttons/primaryButton'
import camara from '../../assets/camara.svg'
import { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'
import Link from 'next/dist/client/link'
interface Params {
  title: string
  description?: string | null
  img: any
  img2?: any | null
  href?: string | null
  button: string
  classname?: string | null
  action?: () => void
  add?: boolean
  pdf?: boolean
  unidades?: number
  url?: any
}
const CardsCreados = ({
  title,
  unidades,
  img,
  img2,
  pdf,
  button,
  action,
  classname = 'min-h-[120px] md:h-[295px]',
  add,
  url
}: Params) => {
  const [load, setLoad] = useState(1)
  const hoverout = () => {
    setLoad(load + 1)
    if (load === 5) {
      setLoad(1)
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      hoverout()
    }, 1000)
    return () => clearTimeout(timer)
  }, [load])
  return (
    <div
      className={`container border-2 border-azulPrimary100 shadow-xl rounded-xl w-[200px] `}
    >
      <div className="h-[24px] md:h-[49px] bg-[#F6FAFF] items-center flex ">
        <div className="mx-7 flex justify-start items-center gap-10">
          <span className=" text-textSize6 md:text-textSize4  text-azulPrimary700">
            {title}
          </span>
        </div>
      </div>
      <div
        className={`${classname} flex justify-center ${
          !unidades && !pdf ? 'pt-14' : 'pt-0'
        }`}
      >
        <div className="flex flex-col my-auto text-center">
          <div className="p-2 mx-auto ">
            <Image src={img} alt="" className="" layout="fixed" />
          </div>
          {unidades && pdf !== false && img2 && (
            <div className="flex gap-2 text-azulPrimary900 text-textSize4 font-bold">
              <span>
                {unidades > 0 ? unidades + ' Unidades' : 'Pendiente'}
              </span>
            </div>
          )}
          {unidades && pdf === false && (
            <div className="flex gap-2 text-azulPrimary900 text-textSize4 font-bold">
              <span>
                {unidades > 0 ? unidades + ' Unidades' : 'Pendiente'}
              </span>
            </div>
          )}
          {!unidades && pdf !== false && (
            <div className="flex gap-2 text-azulPrimary900   text-textSize4 font-bold my-5 "></div>
          )}

          {add && (
            <Button
              label={'Adjuntar fotos'}
              className={
                'px-5 mx-auto w-[142px] rounded-lg my-0 h-[40px] border border-azulPrimary700'
              }
              action={() => null}
              color={'bg-white'}
              icon={camara}
              classNameText={'text-textSize8 text-azulPrimary700  mx-auto'}
            />
          )}

          {pdf === true && (
            <div className="flex justify-center mx-auto  items-center my-1">
              <BarLoader color="#2283b0" />
            </div>
          )}
          {url && (
            <Link target="_blank" href={url} shallow>
              <a target={'_blank'}>
                <Button
                  label={button}
                  className={`px-5 mx-auto  rounded h-[40px]  `}
                  action={action}
                  color={'bg-azulPrimary700'}
                  classNameText={'text-textSize8  mx-auto'}
                />
              </a>
            </Link>
          )}
          {!url && !pdf && (
            <Button
              label={button}
              className={`px-5 mx-auto  rounded h-[40px]  `}
              action={action}
              color={'bg-azulPrimary700'}
              classNameText={'text-textSize8  mx-auto'}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default CardsCreados
