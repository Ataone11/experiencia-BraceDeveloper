import Link from 'next/link'
import playerIcon from '../../assets/icons/playerIcon.svg'
import thumbnail from '../../assets/images/home/Tumbnail.png'

const CardVideo = ({ modal, setModal }: any) => {
  return (
    <div className='rounded-2xl shadow-xl bg-white max-w-[300px] sm:max-w-md md:max-w-5xl flex-col-reverse flex md:flex-row w-10/12 mx-auto relative'>
      <div className='flex flex-col py-6 space-y-5  md:space-y-6 w-full justify-center items-start px-6 md:px-'>
        <h3 className='text-redOmega text-medium md:text-large font-semibold tracking-widest uppercase'>
          Empresa llanera para todos los colombianos
        </h3>
        <p className='text-blackOmega text-small md:text-medium'>
          Somos la empresa líder en la intermediación de seguros, te brindamos
          asesoría profesional en cada paso que quieras dar.
        </p>
        <Link href="/nosotros">
          <button className='btn-primary'>Conoce más</button>
        </Link>
      </div>
      <div className='relative flex justify-center items-center'>
        <img
          src={thumbnail.src}
          className='w-full h-full lg:h-[300px] rounded-t-lg md:rounded-tl-none md:rounded-r-2xl'
        />
        <img
          src={playerIcon.src}
          className='absolute hover:scale-105 cursor-pointer bg-black/10 transition-all rounded-full p-2 m-auto'
          alt='play'
          onClick={() => setModal(!modal)}
        />
      </div>
    </div>
  )
}

export default CardVideo
