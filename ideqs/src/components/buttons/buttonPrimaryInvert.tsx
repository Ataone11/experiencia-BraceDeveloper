import Image from 'next/image'
interface Params {
  label: string
  flag?: number | null | string
  index?: number | null | string
  secondColor?: string | null
  action?: () => any
  type?: 'button' | 'submit'
  className?: string | null
  classNameText?: string | null
  icon?: string | null | any
  icona?: string | null | any
  disable?: boolean
}

const InvertButton = ({
  label,
  action,
  className = 'bg-azulPrimary900',
  classNameText = 'text-textSize7  w-[65%]',
  secondColor = 'bg-azulPrimary300',
  icon,
  flag,
  index,
  icona,
  type = 'button',
  disable
}: Params) => {
  return (
    <button
      className={`${
        flag === index ? className : secondColor
      } flex  my-1  h-[50px]  items-center rounded-md `}
      type={type}
      onClick={action}
      disabled={disable}
    >
      <a
        className={`${
          flag === index
            ? 'text-white font-normal '
            : 'text-azulPrimary900 font-semibold'
        }       flex justify-center mx-auto items-center ${classNameText}`}
      >
        {icon && (
          <div className="flex my-auto">
            <Image
              src={flag === index ? icon : icona}
              layout="fixed"
              className=""
              alt=""
            />
          </div>
        )}
        <span className="w-full">{label}</span>
      </a>
    </button>
  )
}

export default InvertButton
