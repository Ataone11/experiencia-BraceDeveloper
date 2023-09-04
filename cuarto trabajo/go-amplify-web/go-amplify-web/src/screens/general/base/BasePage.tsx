import { SetStateAction } from 'react'
import Footer from '../../../components/footer/footer'
import Whatsapp from '../../../components/footer/whatsappBoton'
import Header from '../../../components/header/header'
import BaseHead from './BaseHead'

interface Params {
  title?: string
  description?: string
  children?: any
  setTextFilter?: (value: SetStateAction<string | null>) => void,
  setDateFilter?: (value: SetStateAction<string[] | null>) => void,
  setOrderFilter?: (value: SetStateAction<number | null>) => void,
  setTypeDateFilter?: (value: SetStateAction<number | null>) => void
}

const defaultTitle = "Go Amplify"
const defaultDescription = "Descripción por default"
const BasePage = ({ title = defaultTitle, description = defaultDescription, children, setTextFilter, setDateFilter, setOrderFilter, setTypeDateFilter }: Params) => {

  return (
    <>
      <BaseHead title={title} description={description}></BaseHead>
      <main className='min-h-screen flex flex-col justify-between'>
        <div className='flex flex-col'>
          <Header setTextFilter={setTextFilter} setDateFilter={setDateFilter} setOrderFilter={setOrderFilter} setTypeDateFilter={setTypeDateFilter}></Header>
          <div className="initial-container">
            {children}
          </div>
        </div>
        <Whatsapp></Whatsapp>
        <Footer></Footer>
      </main>
    </>
  )
}

export default BasePage