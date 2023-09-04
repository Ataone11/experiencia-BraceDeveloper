import Link from 'next/link'
import Router from 'next/router'
import { useState } from 'react'
import BlogCard from './BlogCard'

export interface INews {
  titleBlog: string
  content: string
  id?: number
}

const BlogSection = ({ news, pageCount, page, text }: any) => {

  const [textSearch, setTextSearch] = useState(text)

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      Router.push({
        pathname: '/ayuda',
        query: { text: textSearch }
      })
    }
  }

  return (
    <div className="container w-11/12 mx-auto overflow-x-auto lg:pb-2">
      <h3 className="text-large md:text-extraLarge text-redOmega tracking-[0.2em] font-semibold text-center uppercase">
        Te puede interesar
      </h3>

      <p className="text-greyOmega text-small max-w-[800px] mx-auto text-center">
        En este espacio encontrarás diferentes escritos abordando temáticas que
        sabemos son importantes para ti tales como estilo de vida, salud,
        viajes, ahorro, tips para Pymes, datos curiosos, mascotas, bienestar
        laboral, consejos y recomendaciones.
      </p>
      <div className='flex flex-col items-start md:flex-row md:flex-start md:items-center m-auto max-w-[1000px] my-5 lg:mb-10'>
        <span className='text-[14px] font-semibold mb-5 block md:mb-0 md:mr-5 lg:text-[18px]'>Busca el tema de tu interés</span>
        <div className='rounded-xl border-black border-2 overflow-hidden flex items-center justify-between pr-2 w-full md:max-w-[400px]'>
          <input value={textSearch} onChange={(e) => setTextSearch(e.target.value)} onKeyDown={handleKeyDown} className='border-none ring-0 focus:ring-0 w-full' type="text" />
          <Link href={`/ayuda?text=${textSearch}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="rgb(204, 0, 0)" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>
        </div>
      </div>
      <div className={`flex justify-center max-w-6xl mx-auto items-center gap-x-10 gap-y-5 flex-wrap lg:flex-nowrap ${news.length > 0 ? '' : 'lg:h-[200px]'}`}>
        {
          news.length > 0 ?
            news.map((item: any) => <BlogCard item={item} key={item.id} />):
            <span className='text-redOmega text-[16px] lg:text-[20px] text-center'>No hay publicaciones que cumplan estos criterios</span>
        }
      </div>
      <div className="flex gap-x-5 pt-5 justify-center items-center">
        {page > 1 && (
          <Link href={`/ayuda?page=${page - 1}${text ? `&text=${text}` : ''}`}>
            <button
              className="btn-primary p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          </Link>
        )}
        {
          Array.from(Array(pageCount).keys()).map(n => (
              <Link key={n} href={`/ayuda?page=${n + 1}${text ? `&text=${text}` : ''}`}>
                <button className={`cursor-pointer text-lg font-semibold ${n+1 === page ? 'text-redOmega' : 'text-gray-500 hover:text-redOmega'}`}>{n+1}</button>
              </Link>
            ))
        }
        {page < pageCount && (
          <Link href={`/ayuda?page=${page + 1}${text ? `&text=${text}` : ''}`}>
            <button
              className="btn-primary p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default BlogSection
