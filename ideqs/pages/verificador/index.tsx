import type { NextPage } from 'next'
import Image from 'next/image'
import logo from '../../src/assets/login/Enel Codensa.png'
import img from '../../src/assets/login/Tecnicos.png'
import Form from '../../src/screens/login/verificador'

const Registro: NextPage = () => {
  return (
    <div className=" flex w-full h-full lg:fixed lg:top-0 lg:left-0 ">
      <div
        className="lg:w-[60%]  bg-[#6DC6FD] lg:flex lg:flex-col justify-center hidden"
        id="back"
      >
        <div className="mx-auto  my-20">
          <Image src={logo} alt="Logo IDEQS" width={331} height={82} />
        </div>
        <div className="mx-auto image-container contain w-[25rem] lx:w-[34rem] h-[22rem] lx:h-[29rem] ">
          <Image src={img} alt="Logo IDEQS" layout="fixed" />
        </div>
      </div>
      <div className="mx-auto min-w-[320px]  lg:w-[40%] h-[870px]  lx:py-[7%]">
        <Form />
      </div>
    </div>
  )
}

export default Registro
