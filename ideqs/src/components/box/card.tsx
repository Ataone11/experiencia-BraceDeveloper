import Image from 'next/image'
import Button from '../../components/buttons/primaryButton'
import chulito from '../../../src/assets/chulito.svg'
import chulitow from '../../../src/assets/chulow.svg'
import downdload from '../../../src/assets/downdload.svg'
import { Colors } from '../../components/buttons/typesButton'
interface Params {
  title: string
  description?: string
  img: any
  button: boolean
  classname?: string | null
  action?: () => void
  flag: boolean
  buttonOnClick?: () => void
}

const Cards = ({
  title,
  description,
  img,
  button,
  classname = 'w-[199px] h-[287px]',
  flag,
  action,
  buttonOnClick
}: Params) => {
  const hovering = false
  return (
    <div
      onClick={action}
      className={`bg-white  text-azulPrimary700  container rounded-xl shadow-lg border-2 ${
        flag ? ' border-azulPrimary700' : 'border-grisNeutral300'
      }     relative flex flex-col justify-center ${classname} `}
    >
      <div
        className={`w-[18px] h-[18px] border-2 ${
          flag ? ' border-white ' : 'border-grisNeutral300 bg-white'
        }  rounded-sm m-2 absolute left-0 top-0`}
      >
        {flag && !button && (
          <Image
            src={button ? chulito : chulitow}
            width={18}
            height={18}
            layout="fixed"
            className="mx-auto"
            alt=""
          />
        )}
        {flag && button && (
          <Image
            src={!button ? chulito : chulitow}
            width={18}
            height={18}
            layout="fixed"
            className="mx-auto"
            alt=""
          />
        )}
      </div>
      <div className="mx-auto  ">
        <Image src={img} layout="fixed" className="mx-auto" alt="" />
      </div>
      <div className="flex flex-col justify-center text-center">
        <h3 className="text-textSize5  tracking-[.1em]   font-bold my-3">
          {title || 'Sin nombre'}
        </h3>
        {hovering && (
          <p className="text-textSize7 font-normal text-center mx-auto w-[80%] my-2">
            {description}
          </p>
        )}

        {button === true && (
          <Button
            action={buttonOnClick}
            color={Colors.blue_primary}
            label={'Descargar'}
            className={
              'text-center w-[127px] h-[40px] mx-auto bg-azulPrimary700'
            }
            classNameText={'text-textSize7 mx-2'}
            icon={downdload}
            type={'button'}
          />
        )}
      </div>
    </div>
  )
}

export default Cards
