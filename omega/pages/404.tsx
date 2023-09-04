import { useRouter } from 'next/router'
import enriqueImage from '../assets/images/personOmega.png'

const NotFound = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/')
  }
  return (
    <section className="w-full mt-24 flex flex-col justify-center items-center relative">
      <div className="flex flex-col items-center my-auto space-y-5">
        <h2 className="text-[160px] leading-[104px] text-greyOmega tracking-[0.2em] font-bold">
          404
        </h2>
        <h4 className="text-redOmega uppercase text-extraLarge tracking-[0.2em] font-bold">
          Not found
        </h4>
        <p className="text-medium text-greyOmega  max-w-xs text-center">
          La página que estás intentando encontrar no está disponible. Inténtalo
          después.
        </p>
        <button onClick={handleClick} className="btn-primary">
          Ir al inicio
        </button>
      </div>
      <div className="mt-12 invisible">
        <img src={enriqueImage.src} alt="" />
      </div>
      <div className="absolute bottom-0">
        <img src={enriqueImage.src} alt="" />
      </div>
    </section>
  )
}

export default NotFound
