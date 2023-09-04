import moment from "moment"
import 'moment/locale/es';
import { S3_BUCKET_URL } from "../../utils/constants";
import { capitalize } from "../../utils/stringHelperFunctions";
import RenderIntercal from "./RenderIntercal"
import Logo from "../../assets/logotipo/Logotipo.png"

export const Rifa = (props: any) => { //template para cada rifa

  const bg = {
    backgroundImage: `url(${S3_BUCKET_URL+props.img}), url(${Logo.src})`,
  }

  const img = ( //template de cada imagen y titulo
    <div className="bg-cover h-imageRifaM md:h-full md:w-1/2" style={bg}>
      <div className="bg-tittleImg flex justify-center h-tittleM pt-4 px-3 md:h-tittle md:px-10 md:pt-5">
        <h2 className="text-white md:text-tittleRifa">{props.nombre}</h2>
      </div>
    </div>
  )
  const description = (// template de cada descripcion de rifa
    <div className="h-rifaDescripM md:h-full md:w-1/2 px-4 py-4">
      <div className="grid place-items-center h-full w-full overflow-y-auto">
      <p className="text-white text-tittleM md:text-tittle">{props.descripcion}</p>
      </div>
    </div>
  )

  return (
    <section className="w-full">
      <div className="flex justify-between items-end mb-5 md:mb-8">
        <div>
          <h2 className="text-rifaSizeM md:text-rifaSize font-semibold text-rifa md:pt-2.5">Rifa {props.tipo}</h2>
        </div>
        <div className="px-6 md:px-10 border-rifaDate border border-solid rounded-md h-6 md:h-9">
          <p className="text-center text-rifaDateSizeM md:text-rifaDateSize text-rifaDate bg-default relative bottom-2.5 md:px-px md:bottom-3">Fecha de la rifa</p>
          <p className="text-center text-rifaDateSizeM md:text-rifaDateSize text-rifaDate bg-default relative bottom-2 md:px-px md:bottom-2" >{capitalize(moment(props.fecha).locale("es").format("MMMM DD"))}</p>
        </div>
      </div>
      <div className="md:hidden bg-inset w-full md:h-rifa rounded-rifa overflow-hidden mb-4 md:mb-9">
        {img}
        {description}
      </div>
      <RenderIntercal toggle={props.toggle} nombre={props.nombre} description={description} img={img}></RenderIntercal>
    </section>
  )

}
export default Rifa