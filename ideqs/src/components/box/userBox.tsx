import Image from 'next/image'

const Box: any = ({
  title,
  icon,
  className = '',
  label
}: {
  title: string
  icon?: string | null | any
  className?: string | null
  label?: () => any
}) => {
  return (
    <div
      className={
        'w-full bg-white rounded-[10px] border border-grisNeutral100 drop-shadow-box ' +
        className
      }
    >
      <div className="bg-azulSecondary100 h-[69px] py-[18px] px-[35px]">
        <div className="flex">
          <div className="mr-[32px] flex items-center">
            <Image src={icon} alt={'icon'}></Image>
          </div>
          <h2 className={'text-azulPrimary700 lg:text-[24px] text-[16px]'}>
            {title}
          </h2>
        </div>
      </div>
      {label}
    </div>
  )
}

export default Box
