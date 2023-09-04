import Image from 'next/image'
import iden from '../../../assets/empresa/carne/iden.svg'
import { Template } from '../../../models/templateModel'
import { decodeImageBase64 } from '../../../functions/DecodeBase64'

const MisDiseños = (format: Template) => {
  return (
    <div className="container hidden md:block   w-[90%]">
      <div className="container border-2 border-azulPrimary100 shadow-xl rounded-lg w-[804px] ">
        <div className="h-[60px] bg-[#F6FAFF] items-center flex ">
          <div className="mx-7 flex justify-start items-center gap-10">
            <Image src={iden} alt="" className="" />
            <span className="text-textSize4  text-azulPrimary700">
              Carné estudiantil
            </span>
          </div>
        </div>
        <div className="h-[381px]">
          <div className="grid grid-cols-2 gap-x-10 p-10 px-16">
            <div className="flex flex-col">
              <Image
                src={decodeImageBase64(format.caraB)}
                layout="fixed"
                className=" "
                alt=""
              />
              <span className="mx-auto my-5 font-semibold">Cara A</span>
            </div>
            <div className="flex flex-col">
              <Image
                src={decodeImageBase64(format.caraA)}
                layout="fixed"
                className=" "
                alt=""
              />
              <span className="mx-auto my-5 font-semibold">Cara B</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MisDiseños
