import Image from 'next/image'
import BaseButton from './BaseButton'
interface Params {
  color: string
  label: string
  action?: () => void
  type?: 'button' | 'submit'
  className?: string | null
  classNameText?: string | null
  disable?: boolean
  icon?: string | null | any
  link?: any
}

const Button = ({
  color,
  label,
  action,
  type = 'button',
  className = 'bg-azulPrimary700',
  classNameText = 'mx-2',
  icon,
  link,
  disable = false
}: Params) => {
  return (
    <BaseButton
      type={type}
      onClick={() => (action ? action() : null)}
      className={`items-center  snap-center font-semibold rounded-md py-2 px-4 flex text-white  text-sm my-5 ${
        disable === true ? 'bg-azulPrimary500 ' : color
      }  ${color} ${className}`}
      link={link}
      disable={disable}
    >
      <h1 className={`${classNameText}`}>{label}</h1>

      {icon && <Image src={icon} alt="" className="flex justify-end" />}
    </BaseButton>
  )
}

export default Button
