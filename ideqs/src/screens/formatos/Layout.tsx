import Header from './Header'
import Sidebar from './Sidebar'
import React, { useState } from 'react'
import Footer from '../general/footer/footer'
import HomeIcon from '../../assets/general/HomeIcon'
import Link from 'next/link'
import { useRouter } from 'next/router'
import BasePage from '../general/base/BasePage'
import Button from '../../components/buttons/primaryButton'

interface Props {
  children: React.ReactNode
  titleSection: string
  dataSidebar: any
  titleBasePage: string
  descriptionBasePage?: string
}

export default function Layout({
  children,
  titleSection,
  dataSidebar,
  titleBasePage,
  descriptionBasePage
}: Props) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const router = useRouter()
  return (
    <BasePage title={titleBasePage} description={descriptionBasePage}>
      <Header
        isOpen={sidebarIsOpen}
        onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
      />
      <section className="lg:flex w-full h-[calc(100vh-90px)] md:h-[calc(100vh-125px)] lg:h-[calc(100vh-65px)]">
        <section className="w-[243px]">
          <Sidebar isOpen={sidebarIsOpen} data={dataSidebar} />
        </section>
        <section
          className={`px-[16px] w-full lg:px-[133px] mx-auto max-w-[calc(1920px-300px)] h-full py-[40px] overflow-y-auto`}
        >
          <h1 className="text-azulPrimary900 font-bold text-textSize4 xl:text-textSize2 mb-[27px] w-full justify-between items-center lg:flex">
            <div className="flex flex-row items-center justify-center">
              {titleSection === 'USUARIOS' && (
                <Button
                  color="bg-azulPrimary900 h-11 justify-between mt-0 mb-0 mr-4"
                  label={'<-'}
                  classNameText="text-[15px]"
                  action={() => history.back()}
                ></Button>
              )}
              {titleSection === 'EMPRESAS' && (
                <Button
                  color="bg-azulPrimary900 h-11 justify-between mt-0 mb-0 mr-4"
                  label={'<-'}
                  classNameText="text-[15px]"
                  action={() => history.back()}
                ></Button>
              )}
              {titleSection === 'SUCURSAL' && (
                <Button
                  color="bg-azulPrimary900 h-11 justify-between mt-0 mb-0 mr-4"
                  label={'<-'}
                  classNameText="text-[15px]"
                  action={() => history.back()}
                ></Button>
              )}
              {titleSection}
            </div>

            <Link href={`/${router.pathname.split('/')[1]}`} replace shallow>
              <a
                className={`bg-azulPrimary900 rounded-full h-[56px] place-content-center hidden lg:grid transition-all ease-in-out duration-200 ${
                  isHover
                    ? 'w-auto xl:flex xl:gap-[10px] xl:items-center xl:px-[20px]'
                    : 'w-[56px]'
                } `}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                {isHover && (
                  <span className="text-white text-textSize6">Inicio</span>
                )}
                <HomeIcon />
              </a>
            </Link>
          </h1>
          {children}
        </section>
      </section>
      <Footer />
    </BasePage>
  )
}
