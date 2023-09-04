import imageOne from "../../assets/images/home/segurosImage.png"
import imageTwo from "../../assets/images/home/asesoriasImage.png"
import CardHome from "../CardHome"

const dataService = [
  {
    id: 1,
    titleOne: "SEGUROS",
    route: '/seguros',
    description:
      "Conoce los seguros que tenemos para ti y tu familia o tu empresa",
    image: imageOne,
    button: "Ver más",
  },
  {
    id: 2,
    titleOne: "ASESORÍAS",
    route: '/asesorias',
    description:
      "Te asesoramos para que adquieras el seguro que se ajusta a tu necesidad",
    image: imageTwo,
    button: "Ver más",
  },
]

const Service = () => {
  return (
    <div className="flex justify-center bg-[#F0F0F0] my-10 py-10 w-full">
      <div className="flex flex-col md:flex-row gap-[16px] md:mx-4 md:gap-[30px] lg:gap-[123px] max-w-[900px] mx-auto">
        {dataService.map((item: any) => (
          <CardHome key={item.id} {...item} href={item.route} />
        ))}
      </div>
    </div>
  )
}

export default Service
