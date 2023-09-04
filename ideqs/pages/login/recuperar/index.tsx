import type { NextPage } from 'next'
import Image from 'next/image'
import logo from '../../../src/assets/login/IDEQS Logo.png'
import img from '../../../src/assets/login/img.png'
import BasePage from '../../../src/screens/general/base/BasePage'

const Login: NextPage = () => {
  return (
    <BasePage title='Recuperar contraseña'>
      <div className=' flex w-full h-full lg:fixed lg:top-0 lg:left-0 '>
        <div
          className='lg:w-[60%]  bg-[#6DC6FD] lg:flex lg:flex-col justify-center hidden'
          id='back'
        >
          <div className='mx-auto hidden lg:block my-20'>
            <Image src={logo} alt='Logo omega' width={331} height={82} />
          </div>
          <div className='mx-auto  '>
            <Image
              src={img}
              alt='Logo omega'
              className='mx-auto'
              width={548}
              height={462}
              layout='fixed'
            />
          </div>
        </div>
        <div className='mx-auto min-w-[320px]  lg:w-[40%] h-[870px]  xl:py-[7%] overflow-y-scroll'>
          {/* <RecuperarContraseña /> */}
        </div>
      </div>
    </BasePage>
  )
}

export default Login
