/* eslint-disable no-unused-vars */
import { useState } from 'react'
import Inputs from '../../components/inputs/inputTexto'
import InvertButton from '../../components/buttons/buttonPrimaryInvert'

const Verificador = () => {
  const [identificacion, setIdentificacion] = useState('')
  const [carnetPdf, setCarnetPdf] = useState('')
  const [, setData] = useState({})
  const [, setCarnet] = useState({})
  const [, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    getCarnet()
  }

  async function getCarnet() {
    const urlget =
      'http://162.19.88.73:8081/reporte/verificador?identificacion=' +
      identificacion +
      '&tipoCarnet=CodensaContratista'
    // const res =await fetch('http://162.19.88.73:8081/reporte/verificador?identificacion=1123308370&tipoCarnet=CodensaContratista');
    const res = await fetch(urlget)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    const data = await res.json()
    setData(data)
    const car = await data.carnet
    setCarnet(car)
    // const operationResult = res.json();
    const capd = (await 'data:application/pdf;base64,') + car.carnet
    setCarnetPdf(capd)
    return data
  }

  const handleChange = (e: any) => {
    setIdentificacion(e.target.value)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="container xl:py-[63px] xl:px-[133px]  w-[100%] flex flex-col"
    >
      <span className="text-textSize2 font-extrabold text-azulPrimary900">
        Verificador
      </span>
      <button type="button" onClick={getCarnet}></button>
      <div className="my-10 grid grid-cols-2 gap-x-1 ">
        <div className="flex flex-col gap-y-4 w-20">
          <Inputs
            name={'user'}
            label={'Cedula'}
            className={'w-[453px] h-[56px] rounded-md '}
            action={handleChange}
            type={'text'}
            placeholder={'cedula'}
          />
        </div>
      </div>

      <div className=" flex justify-center">
        <InvertButton
          disable={false}
          className={'w-[105px] h-[44px] text-textSize9 mx-0 text-center'}
          label={'Consultar'}
          flag={1}
          type={'submit'}
          index={1}
        />
      </div>
      <br></br>
      <embed type="application/pdf" src={carnetPdf} />
    </form>
  )
}

export default Verificador
