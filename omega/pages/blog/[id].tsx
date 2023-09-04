import arrowLeft from '../../assets/icons/arrow-l.svg'
import imagenAyuda from '../../assets/images/ayuda/imagenPregunta.png'
import enriqueOmega2 from '../../assets/images/ayuda/enriqueOmega2.png'
import playIcon from '../../assets/icons/playIcon2.svg'
import axios from 'axios'
import { API_URL, QUERY_IMAGE } from '../../utils/constants'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import ModalEnrique from './ModalEnrique'

const Post = ({ post }: any) => {
  const [video, setVideo] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const videoEnrique = (
    <div className="w-[80%] mx-auto flex justify-center items-center mt-9 relative">
      <img className="w-auto rounded-xl" src={imagenAyuda.src} alt="" />
      <img
        src={playIcon.src}
        onClick={() => setVideo(true)}
        className="absolute hover:scale-105 shadow-2xl transition-all  cursor-pointer"
        alt=""
      />
    </div>
  )
  return (
    <div className="container w-11/12 lg:w-full mx-auto my-10 space-y-7 lg:px-5">
      {video && <ModalEnrique setVideo={setVideo} url={post.attributes.video_preguntale_a_enrique.data.attributes.url}/>}
      <div className="flex items-center gap-3">
        <div
          onClick={() => router.back()}
          className="w-10 h-10 bg-redOmega cursor-pointer hover:bg-redOmega2 transition-colors flex justify-center items-center rounded-full"
        >
          <img src={arrowLeft.src} alt="volver" />
        </div>
      </div>
      <div className="space-y-5">
        <h1 className="text-redOmega text-large lg:text-extraLarge tracking-[0.2em] uppercase font-bold">
          {post.attributes.titulo}
        </h1>
        <p className="text-blackOmega leading-[22px]">
          {post.attributes.contenido}
        </p>
        {
          post.attributes.imagen.data &&
            <img
              className="w-full mx-auto aspect-video md:aspect-[7/2] object-cover rounded-3xl shadow-xl"
              src={`${post.attributes.imagen.data.attributes.url}`}
              alt=""
            />
        }
      </div>
      <div className="pt-5 md:pt-10 flex flex-col lg:flex-row justify-center lg:justify-between items-center w-full gap-x-20">
        <div className="flex flex-col space-y-10">
          <div className="flex flex-col gap-6">
            <h2 className="text-redOmega text-large lg:text-extraLarge tracking-[0.2em] uppercase text-center lg:text-left w-[100%] mx-auto lg:mx-0 font-bold">
              Pregúntale a Enrique
            </h2>
            <p className="text-blackOmega text-justify">
              ¿Tienes alguna duda sobre nuestros servicios o de información
              referente a los seguros? ¿Quieres exponer tu caso para tener una
              mejor guía? Entonces pregúntale a Enrique, él estará feliz de
              ayudarte a resolver tus dudas e inquietudes.
            </p>
          </div>
          <button
            onClick={() => router.push('/contacto')}
            className="btn-primary max-w-[250px] text-normal mb-10 m-auto md:m-0"
          >
            Pregúntanos algo
          </button>
          {isMobile && post.attributes.video_preguntale_a_enrique.data && videoEnrique}
          {
            post.attributes.archivo && post.attributes.titulo_contenido_descargable && post.attributes.descripcion_contenido_descargable &&
            <div className="flex flex-col-reverse justify-start items-center lg:items-start lg:flex-col">
              <div className="bg-white rounded-2xl shadowCard overflow-x-hidden relative flex px-10 py-4 w-full">
                <div className="space-y-10 lg:mr-8">
                  <h4 className="text-redOmega uppercase font-bold md:text-large tracking-[0.2em]">
                    {
                      post.attributes.titulo_contenido_descargable ?? "Título del contenido descargable"
                    }
                  </h4>
                  <p className="text-blackOmega w-[70%] text-sm">
                    {
                      post.attributes.descripcion_contenido_descargable ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sedauctor donec viverra non eget."
                    }
                  </p>
                  {
                    post.attributes.archivo.data &&
                      <a className="btn-primary px-2 text-extraSmall font-semibold md:text-small md:px-3" href={`${post.attributes.archivo.data.attributes.url}`} target="_blank" rel="noreferrer">
                        Descarga recursos adicionales aquí
                      </a>
                  }
                </div>
                <div className=" absolute right-0 md:right-0 bottom-16 md:bottom-0 rounded-br-xl">
                  <img
                    src={enriqueOmega2.src}
                    className="w-[100px] lg:w-[90%]"
                    alt=""
                  />
                </div>
              </div>
            </div>
          }
        </div>
        {!isMobile && post.attributes.video_preguntale_a_enrique.data && videoEnrique}
      </div>
    </div>
  )
}

export default Post

export const getStaticPaths = async () => {
  try {
    const result = await axios.get(`${API_URL}/api/blogs?populate=archivo&populate=video_preguntale_a_enrique`)
    const blogs = await result.data.data
    const paths = blogs.map((item: any) => ({ params: { id: `${item.id}` } }))
    return { paths, fallback: false }
  } catch (error) {
    console.log('error', error)
  }
}

export const getStaticProps = async ({ params }: any) => {
  try {
    const result = await axios.get(
      `${API_URL}/api/blogs/${params.id}${QUERY_IMAGE}&populate=archivo&populate=video_preguntale_a_enrique`
    )
    const post = await result.data.data
    return { props: { post } }
  } catch (error) {
    console.log('error', error)
  }
}