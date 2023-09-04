import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Image from 'next/image'
import { FC, useState } from 'react'
import { PulseLoader } from 'react-spinners'
import imageForm from '../../assets/images/nosotros/Nosotros_Formulario.jpg'
import { API_URL } from '../../utils/constants'

const WorkWithUs: FC<any> = () => {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <div className="container mx-auto w-full mb-10 lg:pt-20 space-y-8 mt-4">
      <h3 className="mx-4 text-redOmega text-large lg:text-extraLarge font-bold tracking-[0.2em] uppercase text-center">
        Trabaja con nosotros
      </h3>
      <div className="space-y-9 flex flex-col items-center lg:flex-row lg:justify-between max-w-[1100px] m-auto">
        <div className="relative w-[80%] h-[200px] mx-8 md:w-1/2 xl:w-[524px] lg:h-[300px] xl:h-[322px] before:mx-auto before:absolute before:bottom-[-9%]  before:rounded-2xl before:right-[-5%] before:w-[50%] before:h-full before:bg-[#6B6B6B]/10">
          <Image
            className="relative rounded-xl"
            src={imageForm}
            alt="imagen de formulario"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <Formik
          initialValues={{
            nombre: '',
            correo: '',
            contacto: '',
            archivo: ''
          }}
          validate={(valores) => {
            // eslint-disable-next-line prefer-const
            let errors: any = {}
            if (!valores.nombre) {
              errors.nombre = 'El nombre es requerido'
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
              errors.nombre = 'El nombre solo puede contener letras y espacios'
            }

            if (!valores.contacto) {
              errors.contacto = 'Ingresa tu número de teléfono'
            }

            if (!valores.archivo) {
              errors.archivo = 'Ingresa un archivo'
            }

            if (!valores.correo) {
              errors.correo = 'El correo es requerido'
            } else if (
              !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                valores.correo
              )
            ) {
              errors.correo =
                'El correo solo puede contener letras, números, puntos, guiones y guiones bajos'
            }
            return errors
          }}
          onSubmit={async (valores: any, { resetForm }) => {
            const formData = new FormData()
            Object.keys(valores).forEach((key: string) => {
              formData.append(key, valores[key])
            })
            setLoading(true)
            await axios.post(`${API_URL}/api/correo/trabaja`, formData)
            setLoading(false)
            resetForm()
            setSubmitted(true)
            setTimeout(() => {
              setSubmitted(false)
            }, 5000)
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="w-[80%] md:w-1/2 mx-8 flex flex-col xl:max-w-[500px] space-y-1 justify-start items-start">
              <div className="grid grid-cols-1 w-full gap-3 mb-4">
                <label
                  htmlFor="nombre"
                  className="text-small font-semibold text-blackOmega"
                >
                  Nombre
                </label>
                <Field
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="w-full h-[35px] p-2 border-1  border-gray-700 rounded-lg focus:border-none focus:outline-none focus:ring focus:ring-redOmega/40"
                />
                <ErrorMessage
                  name="nombre"
                  component={() => (
                    <span className="text-redOmega">{errors.nombre}</span>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 w-full gap-3 mb-4">
                <label
                  htmlFor="phone"
                  className="text-small font-semibold text-blackOmega"
                >
                  Ingresa tu número de teléfono
                </label>
                <Field
                  type="number"
                  id="phone"
                  name="contacto"
                  className="w-full h-[35px] p-2 border-1 border-gray-700 rounded-lg focus:border-none focus:outline-none focus:ring focus:ring-redOmega/40"
                />
                {touched.contacto && errors.contacto && (
                  <span className="text-redOmega">{errors.contacto}</span>
                )}
              </div>
              <div className="grid grid-cols-1 w-full gap-3 mb-4">
                <label
                  htmlFor="email"
                  className="text-small font-semibold text-blackOmega"
                >
                  Correo electrónico
                </label>
                <Field
                  type="text"
                  id="email"
                  name="correo"
                  className="w-full h-[35px] p-2 border-1 border-gray-700 rounded-lg focus:border-none focus:outline-none focus:ring focus:ring-redOmega/40"
                />
                {touched.correo && errors.correo && (
                  <span className="text-redOmega text-extraSmall">
                    {errors.correo}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-4 justify-start items-start pt-5">
                <label
                  className="text-small font-semibold text-blackOmega"
                  htmlFor=""
                >
                  Adjuntar hoja de vida
                </label>
                <input
                  type="file"
                  name="archivo"
                  placeholder="Adjuntar"
                  onChange={(event) => {
                    setFieldValue(
                      'archivo',
                      event?.currentTarget?.files
                        ? event?.currentTarget?.files[0]
                        : null
                    )
                  }}
                  className="file:bg-redOmega file:outline-none file:text-white file:border-none file:rounded-full file:px-4 file:mr-3 w-full file:py-1 file:focus:ring focus:ring-redOmega/40 cursor-pointer file:hover:bg-redOmega2 file:cursor-pointer"
                />
                {touched.archivo && errors.archivo && (
                  <span className="text-redOmega text-extraSmall">
                    {errors.archivo}
                  </span>
                )}
                {loading ? (
                  <PulseLoader color="#CC0000" />
                ) : (
                  <button
                    className="btn-primary mt-2 w-auto align-middle text-center my-4"
                    type="submit"
                  >
                    Enviar
                  </button>
                )}
                {submitted && (
                  <p className="text-lime-500">Formulario enviado con exito!</p>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default WorkWithUs
