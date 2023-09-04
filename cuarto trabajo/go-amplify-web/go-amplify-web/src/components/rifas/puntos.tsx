import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectUser } from "../../redux/reducers/authReducer"

let lapso = (parseInt(moment().format("MM"))) < 6 ? 1 : 2
const redu = [
  {
    key: 0,
    lapso: moment().locale("es").format("MMMM"),
    description: "Mes"
  },
  {
    key: 1,
    lapso: moment().format('YYYY') + '-' + lapso,
    description: "Semestre"
  },
  {
    key: 2,
    lapso: moment().format('YYYY'),
    description: "Año"
  },
]

export const Puntos = (props: any) => {

  const profile = useSelector(selectUser)
  const [title, setTitle] = useState('text-transparent text-tittleM md:text-tittle py-1')

  useEffect(() => {
    if (props.color)
      setTitle('text-' + props.colorT + 'text-' + props.Text + 'md:text-' + props.mdText + ' py-' + props.p)
  }, [props])

  const renderPoints = (index: number) => {
    switch (index) {
      case 0:
        return profile?.puntos_mes;
        break;
      case 1:
        return profile?.puntos_semestre;
        break;
      case 2:
        return profile?.puntos_año;
        break;
    }
  }


  return (
    <div className="grid place-items-center bg-inset bg-clip-text mt-1 mb-4 md:mt-2 md:mb-12">
      <div className="">
        <p className={title}>Tus Puntos</p>
        <div className="bg-white flex items-center justify-between px-8 py-2.5 w-pointsTableM h-pointsTableM md:px-10 md:w-pointsTable md:h-20 rounded-points shadow-points">
          {redu.map((redu, index) => (
            <div key={redu.key} className='w-1/3'>
              <h2 className="bg-inset bg-clip-text text-transparent text-center text-points mb-text">{0 | renderPoints(index)}</h2>
              <h3 className="text-center text-tittleM md:text-tittle text-text mb-text">{redu.lapso}</h3>
              <h3 className="text-center text-tittleMinM md:text-tittle text-text">{redu.description}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Puntos