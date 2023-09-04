import Image from 'next/image'
import { useRouter } from 'next/router'
import logoOmega from '../../assets/icons/omegaLogo.svg'

const BlogCard = ({ item }: any) => {
  const router = useRouter()
  return (
    <div className="w-[325px] relative h-[350px] rounded-xl shadow-2xl">
      <div className='h-[100px] w-full relative'>
        <Image src={item.attributes.imagen.data?.attributes.formats.small.url ?? logoOmega} objectFit={item.attributes.imagen.data ? 'cover' : 'contain'} layout='fill' className="rounded-t-xl" alt="Foto publicación"/>
      </div>
      <div className="flex flex-col space-y-3 py-3 px-8">
        <h4 className="text-redOmega tracking-[0.2em] text-[20px] uppercase font-semibold max-h-[120px] overflow-y-hidden">
          {item.attributes.titulo}
        </h4>
        <p className="text-blackOmega text-small">{item.attributes.Descripcion}</p>
        <button
          className="bg-redOmega text-white rounded-full hover:bg-redOmega2 absolute bottom-5 transition-colors py-1 max-w-[150px] md:max-w-[180px] w-[137px] h:[34px] font-semibold"
          onClick={() => router.push(`/blog/${item.id}`)}
        >
          Ver más
        </button>
      </div>
    </div>
  )
}

export default BlogCard
