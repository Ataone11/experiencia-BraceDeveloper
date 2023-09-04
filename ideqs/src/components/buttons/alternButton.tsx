import Image from 'next/image'

interface Params {
  color: string
  label: string
  action?: () => void
  type?: 'button' | 'submit'
  className?: string | null
  icon?: string | null | any
  textColor?: string | null
}

const ButtonA = ({
  color,
  label,
  action,
  type = 'button',
  className = '',
  icon,
  textColor
}: Params) => {
  return (
    <button
      type={type}
      onClick={() => (action ? action() : null)}
      className={`items-center border-2 snap-center font-bold rounded-lg py-2 px-4 flex bg-[#FAFAFA] my-5 text-sm  ${textColor} ${color}${className}`}
    >
      {label && <h1 className="mx-2">{label}</h1>}

      {icon && (
        <div className="w-fit mx-auto ">
          {' '}
          <Image src={icon} alt="" className="py-5" />
        </div>
      )}
    </button>
  )
}

export default ButtonA
