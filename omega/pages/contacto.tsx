import FormContacto from "../components/contacto/FormContacto"
import Ubicacion from "../components/Ubicacion"

const Contacto = () => {
  return (
    <div className="bg-white h-full w-full container mx-auto ">
      <br />
      <FormContacto />
      <br className="hidden md:block" />
      <Ubicacion />
      <br />
      <br />
      <br />
    </div>
  )
}

export default Contacto
