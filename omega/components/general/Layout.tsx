import Navbar from '../Navbar'
import Footer from './Footer'
import whatsapp from '../../assets/icons/whatsapp.svg'
import Head from 'next/head'

const Layout = ({ children }: any) => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      <Head>
        <title>Omega Seguros</title>
        <meta name='description' content='Compañía de seguros' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <div
        className=" bg-[#25D366] gap-3 py-2 lg:py-3 pl-4 pr-8 rounded-l-full flex justify-center items-center fixed z-[100] top-[80%] right-0 cursor-pointer translate-x-[9.2em] hover:translate-x-0 transition-all duration-500 ease-in-out"
        onClick={() =>
          window.open(
            'https://api.whatsapp.com/send?phone=573506579596&text=Hola%2C%20quiero%20saber%20más%20sobre%20Omega%20Seguros!',
            '_blank'
          )
        }
      >
        <img className="w-8 lg:w-10 mr-8" src={whatsapp.src} alt="Whatsapp" />
        <span className="text-white">Escríbenos</span>
      </div>
      {children}
      <Footer />
    </div>
  )
}

export default Layout
