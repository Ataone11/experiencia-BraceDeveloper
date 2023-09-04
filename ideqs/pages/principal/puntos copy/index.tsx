import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import GoogleMap from '../../../src/components/GoogleMap'
import { Points } from '../../../src/models/pointsModel'
import { getMapsPoints } from '../../../src/redux/actions/pointsActions'
import { selectUser } from '../../../src/redux/reducers/authReducer'
import { getLoadingPoints } from '../../../src/redux/reducers/pointsReducer'
import CardAddress from '../../../src/screens/formatos/CardAddress'
import Layout from '../../../src/screens/formatos/Layout'
import { dataSidebar } from '../../../src/utils/constants'
import { SIDEBAR_ENUM } from '../../../src/utils/enums'
import caraSeria from '../../../src/assets/general/cara.svg'
import { PuffLoader } from 'react-spinners'

export default function Puntos() {
  const user = useSelector(selectUser)
  const loadingPoints = useSelector(getLoadingPoints)
  const dispatch = useDispatch()
  const [points, setPoints] = useState<Array<Points>>([])

  const getPoints = async () => {
    if (user && user.idCliente) {
      const data = await getMapsPoints(dispatch, user.idCliente)
      setPoints(data)
    }
  }

  useEffect(() => {
    getPoints()
  }, [])

  return (
    <Layout
      titleSection="PUNTOS DE ATENCIÓN"
      dataSidebar={dataSidebar[SIDEBAR_ENUM.PUNTOS]}
      titleBasePage="Puntos de atención"
    >
      <section>
        {loadingPoints ? (
          <div className="flex justify-center mx-auto items-center min-h-[90%]">
            <PuffLoader
              color="#086eae"
              loading={true}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : points && points.length > 0 ? (
          <>
            <GoogleMap data={points} />
            {points.map((sede) => (
              <CardAddress key={sede.id} data={sede} getPoints={getPoints} />
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <Image src={caraSeria} alt="" className="" />
            <span className=" text-textSize5 my-4 text-center text-gray-400">
              No hay puntos disponibles, agrega tu primero
            </span>
          </div>
        )}
      </section>
    </Layout>
  )
}
