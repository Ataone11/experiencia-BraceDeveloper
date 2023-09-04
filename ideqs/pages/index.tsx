import type { NextPage } from 'next'
import BasePage from '../src/screens/general/base/BasePage'


const Home: NextPage = () => {

  window.location.href = "/login"

  return (
    <BasePage>
    Cargando...
    </BasePage>
  )
}

export default Home
