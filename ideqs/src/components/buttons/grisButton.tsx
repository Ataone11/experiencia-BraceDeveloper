import Image from 'next/image'
interface Params {
  label: string
  action?: () => void
  type?: 'button' | 'submit'
  className?: string | null
  classNameText?: string | null
  icon?: string | null | any
}
const GrisButton = ({
  label,
  action,
  type = 'button',
  className = 'bg-azulPrimary100 rounded-lg',
  classNameText = 'mx-2',
  icon
}: Params) => {
  return (
    <button
      type={type}
      onClick={() => (action ? action() : null)}
      className={`items-center  snap-center md:font-bold  py-2 px-4 flex  rounded-full justify-center  text-sm my-5  ${className}`}
    >
      {icon && <Image src={icon} alt="" />}
      <h1 className={`${classNameText}`}>{label}</h1>
    </button>
  )
}

export default GrisButton
