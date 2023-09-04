import { useState } from 'react'
import Inputs from '../../../components/inputs/inputTexto'
import InvertButton from '../../../components/buttons/buttonPrimaryInvert'
import Select from '../../../components/inputs/select'
import chulitto from '../../../assets/administrador/remision/chulitto.svg'
import Image from 'next/image'
import subida from '../../../assets/administrador/remision/subida.svg'
import subidaw from '../../../assets/administrador/remision/subidaw.svg'
import formatoo from '../../../assets/administrador/remision/formato.svg'
import formatow from '../../../assets/administrador/remision/formatow.svg'
import attachfile from '../../../assets/administrador/remision/attach file.svg'

const Informes = () => {
  const [formato, setFormato] = useState(1)
  const handleChange = () => null
  return (
    <div className="container py-[63px] mx-auto xl:px-[133px]  w-[64%] max-w-[1225px] flex flex-col my-5">
      <span className="text-textSize2 font-extrabold text-azulPrimary900">
        NUEVA REMISIÓN
      </span>
      <div className="flex gap-7 pt-8">
        <InvertButton
          label="Formato de APP"
          icon={subidaw}
          secondColor={'bg-grisNeutral100 border-2 border-grisNeutral300'}
          className={'w-[233px] h-[44px] rounded-xl mx-0'}
          classNameText={'mx-10 text-textSize6'}
          icona={subida}
          action={() => setFormato(1)}
          flag={formato}
          index={1}
        />
        <InvertButton
          label="Formato y adjuntos"
          icon={formatow}
          secondColor={'bg-grisNeutral100 border-2 border-grisNeutral300'}
          className={'w-[269px] h-[44px] rounded-xl  mx-0'}
          classNameText={'mx-10 text-textSize6 text-grisNeutral300'}
          icona={formatoo}
          action={() => setFormato(2)}
          flag={formato}
          index={2}
        />
      </div>
      <div className="my-10 grid grid-cols-2 gap-x-0 ">
        <div className="flex flex-col gap-y-7 w-21">
          <Select
            name={'Entregar'}
            label={'Entregar a:'}
            choose={'selecciona'}
            className={'text-textSize5 w-[345px] xl:w-[453px] h-[56px]'}
            action={() => null}
            options={[]}
          />
          <Select
            name={'Correo'}
            label={'Correo:'}
            choose={'selecciona'}
            className={'text-textSize5 w-[345px] xl:w-[453px] h-[56px]'}
            action={() => null}
            options={[]}
          />
          <Inputs
            name={'Tomador'}
            label={'Tomador:'}
            className={'w-[690px] xl:w-[933px] h-[56px] rounded-md '}
            action={() => null}
            type={'text'}
            placeholder={'Nombre de tomador'}
          />
        </div>
        <div className="flex flex-col gap-y-7 w-20">
          <Select
            name={'Dirección'}
            label={'Dirección:'}
            choose={'selecciona'}
            className={'text-textSize5 w-[345px] xl:w-[453px] h-[56px]'}
            action={() => null}
            options={[]}
          />
          <Select
            name={'Teléfono'}
            label={'Teléfono:'}
            choose={'selecciona'}
            className={'text-textSize5 w-[345px] xl:w-[453px] h-[56px]'}
            action={() => null}
            options={[]}
          />
        </div>
      </div>
      <div className="rounded-full flex gap-5 text-black  font-bold items-center">
        Columnas adicionales:
        <div className="mx-5 flex items-center">
          <input
            className="rounded-full focus:bg-azulPrimary900 w-4 h-4 mx-5 "
            type="checkbox"
            id="Número de póliza"
            name="Número de póliza"
            value="Número de póliza"
          />
          Número de póliza
        </div>
        <div className="mx-5 flex items-center">
          <input
            className="rounded-full focus:bg-azulPrimary900 w-4 h-4 mx-5"
            type="checkbox"
            id="Sucursal/Agencia"
            name="Sucursal/Agencia"
            value="Sucursal/Agencia"
          />
          Sucursal/Agencia
        </div>
      </div>
      {formato === 2 && (
        <label
          className="rounded-full flex gap-5 text-black  font-bold items-center pt-5
      "
          htmlFor=""
        >
          Archivos adjuntos:
        </label>
      )}
      {formato === 2 && (
        <label className="box-c rounded-md cursor-pointer w-[387px] h-[56px] my-2 flex justify-center items-center font-semibold text-grisNeutral500  ">
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className={`hidden`}
          />
          <div className="flex py-2 pr-5">
            <Image src={attachfile} alt="" className="" />
          </div>
          Arrastra o
          <span className=" text-azulPrimary700 mx-2">adjunta aquí</span>
          los archivos
        </label>
      )}

      <label
        className="rounded-full flex gap-5 text-black  font-bold items-center my-5
      "
        htmlFor=""
      >
        Selecciona una o varias órdenes
      </label>
      <div className="container  my-2  w-[690px] xl:w-[933px]">
        <table className="table w-[100%] overflow-hidden rounded-lg">
          <thead className=" bg-white  border-4 border-b-azulPrimary900 border-t-white border-r-white border-l-white text-textSize7  ">
            <tr className=" text-azulPrimary900 font-semibold h-[44px] ">
              <th className="pl-2">
                <Image src={chulitto} alt="" layout="fixed" />
              </th>
              <th>
                <label htmlFor=""></label> N° Orden
              </th>
              <th>Cliente</th>
              <th>Tomador</th>
              <th>Cantidad</th>
              <th>Remisionada</th>
              <th>Saldo</th>
              <th>Remisionar</th>
            </tr>
          </thead>
          <tbody className="">
            <tr className="rounded-lg h-[64px] text-center my-10 ">
              <td className="pl-2">
                <input
                  className="rounded-lg border border-gray-500 focus:bg-azulPrimary900 w-4 h-4 "
                  type="checkbox"
                  id="Sucursal/Agencia"
                  name="Sucursal/Agencia"
                  value="Sucursal/Agencia"
                />
              </td>
              <td>
                <label htmlFor="">69743</label>
              </td>
              <td>Prueba: Seguros del Estado</td>
              <td>Liceo San Rafael de Alicante</td>
              <td>1</td>
              <td>0</td>
              <td>1</td>
              <td>
                <label
                  className="container w-[80%] h-[80%] border-2 border-gray-300 bg-white rounded-lg"
                  htmlFor=""
                >
                  1
                </label>{' '}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className=" flex lx:justify-end lx:mx-8">
        <InvertButton
          disable={false}
          className={
            'w-[154px] h-[36px] text-textSize mx-0 text-center bg-azulPrimary700'
          }
          label={'Generar Remision'}
          classNameText={'text-textSize8'}
          action={() => null}
          flag={1}
          index={1}
        />
      </div>
    </div>
  )
}

export default Informes
