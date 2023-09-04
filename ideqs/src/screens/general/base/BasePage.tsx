import BaseHead from './BaseHead'
import Footer from '../footer/footer'
import LoadingPage from './LoadingPage'

interface Params {
  title?: string
  description?: string
  children?: any
}

const defaultTitle = 'IDEQS'
const defaultDescription = 'IDEQS'
const BasePage = ({
  title = defaultTitle,
  description = defaultDescription,
  children
}: Params) => {
  return (
    <div className="h-[100%]">
      <BaseHead title={`${title} | IDEQS`} description={description}></BaseHead>
      <main className="h-[100%]">
        <div className="initial-container flex-1 h-full">{children}</div>
        <LoadingPage />
      </main>
      <Footer></Footer>
    </div>
  )
}

export default BasePage
