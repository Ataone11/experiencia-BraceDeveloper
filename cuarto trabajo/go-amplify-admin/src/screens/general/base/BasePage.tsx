import Navbar from '../header/Navbar'
import NavbarM from '../header/NavbarM'
import BaseHead from './BaseHead'

interface Params {
  title?: string
  description?: string
  children?: any
}

const defaultTitle = "Go Amplify"
const defaultDescription = "Descripción por default"
const BasePage = ({ title = defaultTitle, description = defaultDescription, children }: Params) => {

  return (
    <>
      <BaseHead title={title} description={description}></BaseHead>
      <main >
        <Navbar />

        <div className="initial-container ">
          {children}
        </div>
      </main>
    </>
  )
}

export default BasePage