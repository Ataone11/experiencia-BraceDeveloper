import { LoadScript } from "@react-google-maps/api";
import credentials from "./credentials";

const Ubicacion = () => {
  return (
    <div className="bg-white h-full w-full my-4">
      <div className="bg-white w-full h-full flex justify-center pt-10">
        <h2 className="text-redOmega text-2xl md:text-2xl lg:text-4xl font-bold w-[65%] md:w-[80%] text-center  tracking-[0.2em] md:my-0 font-myriad">
          ¿EN DÓNDE NOS ENCONTRAMOS?
        </h2>
      </div>
      <div className="flex justify-center">
        <h1 className="text-greyOmega text-sm md:text-sm lg:text-lg font-bold text-center w-[85%] md:w-[90%] lg:w-[40%] my-5  lg:my-10 font-myriad">
          Somos una empresa 100% llanera con cobertura a nivel nacional Descubre
          nuestro punto de atencion mas cercano.
        </h1>
      </div>
      <div className=" m-5 md:w-full flex justify-center">
        <LoadScript googleMapsApiKey={credentials.mapsKey}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.3262062654007!2d-73.63987358474908!3d4.156117247294746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3e2dec20ed3709%3A0x9ddf4996e3acf4f3!2sCra.%2030%20%2341A-88%2C%20Villavicencio%2C%20Meta!5e0!3m2!1ses!2sco!4v1642105580373!5m2!1ses!2sco"
            loading="lazy"
            className="rounded-3xl h-[350px] w-[600px] md:w-[95%] lg:w-[83%] mx-5"
          ></iframe>
        </LoadScript>
      </div>
    </div>
  );
};

export default Ubicacion;
