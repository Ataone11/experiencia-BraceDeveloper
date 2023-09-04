import Button from '../../../components/buttons/primaryButton'
import Image from 'next/image'
import caraSeria from '../../../assets/general/cara.svg'
import downdload from '../../../assets/empresa/informacion/downdload.svg'
import Table from '../../general/table/Table'
import { Chart } from 'react-google-charts'
import Numeral from '../../../assets/general/Numeral'
import Pdf from '../../../assets/general/Pdf'
import { useFetchPagination } from '../../../hooks/useFetchPagination'
import { getInformes } from '../../../redux/actions/orderAdminActions'
import { useDispatch, useSelector } from 'react-redux'
import {
  getFilters,
  getInforme
} from '../../../redux/reducers/orderAdminReducer'

const headers: any = [
  'Nº Orden',
  'Cliente',
  'Sucursal',
  'Física',
  'ID Mobile',
  'Carné PDF',
  'Fecha',
  'Estado'
]

export const options = {
  is3D: true,
  colors: ['#465569', '#086EAE', '#6DC6FD'],
  legend: 'none'
}

const InformesTabla = () => {
  const filters = useSelector(getFilters)
  const informes = useSelector(getInforme)
  const dispatch = useDispatch()
  const params = {
    dispatch,
    body: filters
  }
  const { paginator, isLoading } = useFetchPagination({
    functionFetcher: getInformes,
    params
  })

  const odenes = [
    ['Informe', 'Unidades'],
    ['Hiblido', informes?.pie2?.hibrido],
    ['Digital', informes?.pie2?.digital],
    ['Físico', informes?.pie2?.fisico]
  ]

  const unidades = [
    ['Informe', 'Unidades'],
    ['ID Mobile', informes?.pie1?.idmobile],
    ['Carné PDF', informes?.pie1?.pdf],
    ['ID Física', informes?.pie1?.idfisica]
  ]
  const content = informes?.ordenes?.map((orden: any) => {
    return {
      order: orden.orden,
      client: orden.cliente,
      sucursal: orden.sucursal,
      physical: orden.fisica,
      mobile: orden.idmobile,
      carne: orden.pdf,
      date: orden.fecha,
      status: orden.estado
    }
  })

  return (
    <div className="mx-auto py-10 px-5 w-full h-full">
      <span className="text-textSize2 font-extrabold text-azulPrimary900 pl-3">
        INFORME
      </span>
      {informes?.ordenes ? (
        <div className="w-full flex flex-col justify-start text-black">
          <div>
            <Table
              title={headers}
              list={content}
              totalPage={informes?.page?.pages}
              functionPagination={paginator}
              isLoading={isLoading}
            />
          </div>
          <div className="grid gap-[15px] md:grid-cols-2 md:px-[10px] lg:mx-auto lg:gap-[120px]">
            <article className="max-w-[500px] border rounded-[10px] border-neutral-300 bg-white">
              <header className="flex gap-[15px] bg-azulSecondary100 text-azulPrimary900 text-textSize6 rounded-t-[10px] p-[10px]">
                <Numeral />
                <p>Unidades</p>
              </header>
              <Chart
                chartType="PieChart"
                data={unidades}
                options={options}
                className="w-[250px] mx-auto md:w-[350px] md:h-[300px]"
              />
              <section className="w-[250px] mx-auto grid gap-[15px]">
                <h2 className="text-center text-textSize5 font-bold text-azulPrimary700">
                  Total en unidades
                </h2>
                <section className="mb-[15px]">
                  <div className="flex justify-between p-[8px] bg-slate-100 rounded-[20px]">
                    <p className="text-textSize6 font-bold text-azulPrimary700">
                      ID Mobile
                    </p>
                    <p className="text-textSize6 text-neutral-900">
                      {informes?.pie1?.idmobile}
                    </p>
                  </div>
                  <div className="flex justify-between p-[8px] rounded-[20px]">
                    <p className="text-textSize6 font-bold text-azulPrimary700">
                      Carné PDF
                    </p>
                    <p className="text-textSize6 text-neutral-900">
                      {informes?.pie1?.pdf}
                    </p>
                  </div>
                  <div className="flex justify-between p-[8px] bg-slate-100 rounded-[20px]">
                    <p className="text-textSize6 font-bold text-azulPrimary700">
                      ID Física
                    </p>
                    <p className="text-textSize6 text-neutral-900">
                      {informes?.pie1?.idfisica}
                    </p>
                  </div>
                </section>
              </section>
            </article>
            <article className="max-w-[500px] bg-white border rounded-[10px] border-neutral-300">
              <header className="flex gap-[15px] bg-azulSecondary100 text-azulPrimary900 text-textSize6 rounded-t-[10px] p-[10px]">
                <Pdf />
                <p>Órdenes</p>
              </header>
              <Chart
                chartType="PieChart"
                data={odenes}
                options={options}
                className="w-[250px] mx-auto md:w-[350px] md:h-[300px]"
              />
              <section className="w-[250px] mx-auto grid gap-[15px]">
                <h2 className="text-center text-textSize5 font-bold text-azulPrimary700">
                  Total en unidades
                </h2>
                <section className="mb-[15px]">
                  <div className="flex justify-between p-[8px] bg-slate-100 rounded-[20px]">
                    <p className="text-textSize6 font-bold text-azulPrimary700">
                      Híbridos
                    </p>
                    <p className="text-textSize6 text-neutral-900">
                      {informes?.pie2?.hibrido}
                    </p>
                  </div>
                  <div className="flex justify-between p-[8px] rounded-[20px]">
                    <p className="text-textSize6 font-bold text-azulPrimary700">
                      Digital
                    </p>
                    <p className="text-textSize6 text-neutral-900">
                      {informes?.pie2?.digital}
                    </p>
                  </div>
                  <div className="flex justify-between p-[8px] bg-slate-100 rounded-[20px]">
                    <p className="text-textSize6 font-bold text-azulPrimary700">
                      Físicos
                    </p>
                    <p className="text-textSize6 text-neutral-900">
                      {informes?.pie2?.fisico}
                    </p>
                  </div>
                </section>
              </section>
            </article>
          </div>
          <div className="grid grid-cols-2 mx-auto gap-10 my-16">
            <Button
              color="bg-azulPrimary700"
              label="Descargar en PDF"
              className={'rounded-md w-[187px] h-[40px]'}
              classNameText={'text-textSize7 mx-3'}
              icon={downdload}
            />
            <Button
              color="bg-azulPrimary700"
              label="Descargar en Excel"
              className={'rounded-md w-[197px] h-[40px]'}
              classNameText={'text-textSize7 mx-3'}
              icon={downdload}
            />
          </div>
        </div>
      ) : (
        <div className="mx-auto flex flex-col justify-center  my-[20%]">
          <Image src={caraSeria} alt="" className="" />
          <span className=" text-textSize5 my-5 text-center text-gray-400 mx-auto w-fit">
            Lo siento, no hay informes disponibles
          </span>
        </div>
      )}
    </div>
  )
}

export default InformesTabla
