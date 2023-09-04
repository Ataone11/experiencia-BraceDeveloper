import Image from 'next/image'
import creado from '../../../assets/administrador/orders/creado.svg'
import Button from '../../../components/buttons/buttonPrimaryInvert'

const DetalleRemision = () => {
  return (
    <div className="container py-[57px] px-[133px]  w-[90%]">
      <span className="text-textSize2 font-extrabold text-azulPrimary900">
        REMISIÓN
      </span>
      <div className="container border-2 border-azulPrimary100 shadow-xl rounded-xl  w-[805px] my-10">
        <div className="h-[60px] bg-[#F6FAFF] items-center flex ">
          <div className="mx-7 flex justify-start items-center gap-10">
            <Image src={creado} alt="" className="" />
            <span className="text-textSize4  text-azulPrimary700">
              N° Orden: 69347
            </span>
          </div>
        </div>
        <div className="h-[553px] text-center text-grisNeutral300 font-bold ">
          <div className="flex">
            <div className="flex flex-col gap-y-4 my-6 mx-20">
              <span className="flex  justify-start ">Fecha:</span>
              <span className="flex  justify-start ">Empresa:</span>
              <span className="flex  justify-start ">Entregar a:</span>
              <span className="flex  justify-start ">Dirección:</span>
              <span className="flex  justify-start ">Correo(s):</span>
              <span className="flex  justify-start ">Teléfono:</span>
            </div>
            <div className=" w-[40%]"></div>
          </div>
          <table className=" w-[90%] mx-auto border rounded-2xl text-black font-normal text-textSize7">
            <thead className=" bg-[#F6FAFF]  border-t-white border-r-white border-l-white  ">
              <tr className=" text-azulPrimary900 font-semibold h-[44px]  ">
                <th>Orden</th>
                <th>Tomador</th>
                <th>Póliza</th>
                <th>Sucursal/Agen??</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              <tr className="rounded-lg h-[84px] text-center ">
                <td>69335</td>
                <td className=" text-justify w-[30%] h-[5%]">
                  <span className=" text-left">
                    {' '}
                    Asociación de padres de hogares comunitarios de bienestar.
                    Cerro La Cruz
                  </span>
                </td>
                <td>3100022177</td>
                <td>Pos.Suc. Norte de Stder.</td>
                <td>39</td>
              </tr>
            </tbody>
          </table>
          <div className="mx-10 my-5 flex justify-end gap-3">
            <span className="flex  justify-end ">Total:</span>
            <span className="flex  justify-end text-black font-normal ">
              39
            </span>
          </div>
          <div className="mx-10 my-3 flex justify-start gap-x-3">
            <span className="flex  justify-end ">
              Recibido a satisfacción por:
            </span>
            <span className="flex  justify-end text-black font-normal ">
              No registra
            </span>
          </div>
          <div className="mx-10 flex justify-start gap-x-3">
            <span className="flex  justify-end ">Elaborado por:</span>
            <span className="flex  justify-end text-black font-normal ">
              Recepción
            </span>
          </div>
        </div>
      </div>
      <div className="my-5 flex justify-end w-[804px] items-center">
        <Button
          label={'Eliminar'}
          className={'w-[130px] bg-azulPrimary700 rounded h-[46px]'}
          action={() => null}
          flag={2}
          index={2}
        />
        <Button
          label={'Imprimir'}
          className={'w-[100px] rounded h-[46px]'}
          action={() => null}
          flag={2}
          index={2}
        />
      </div>
    </div>
  )
}

export default DetalleRemision
