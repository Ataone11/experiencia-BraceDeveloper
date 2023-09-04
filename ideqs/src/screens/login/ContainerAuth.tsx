import { ReactNode } from 'react'
import Logo from '../../assets/general/Logo'
import FondoLogin from '../../assets/login/FondoLogin'

export default function ContainerAuth({
  children,
  title,
  description = ''
}: {
  children: ReactNode
  title: string
  description?: string
}) {
  return (
    <div className="flex scrollbar scrollbar-track-transparent flex-colitems-center h-full justify-center px-[15px] lg:flex-row md:max-w-[400px] lg:px-0 lg:max-w-none mx-auto min-h-[90vh] my-auto">
      <section className="bg-azulPrimary500 min-h-screen w-full place-content-center hidden lg:grid">
        <FondoLogin />
      </section>
      <div className="flex flex-col items-center justify-center gap-[30px] lg:w-[600px] xl:w-[1000px] lg:px-[30px] ">
        <section className="flex flex-col items-center gap-[30px] w-[70%] lg:w-[80%] scrollbar scrollbar-track-transparent ">
          <span className="lg:hidden">
            <Logo />
          </span>
          <h1 className="text-textSize5 text-azulPrimary700 font-bold text-center lg:text-textSize3">
            {title}
          </h1>
          <p className="font-semibold lg:font-normal text-neutral-900 text-textSize7 lg:text-textSize6 text-center">
            {description}
          </p>
        </section>
        <div className="flex flex-col gap-[30px]">{children}</div>
      </div>
    </div>
  )
}
