import Image from 'next/image'
import arrowLeft from '../../assets/icons/arrow-l.svg'
import arrowRight from '../../assets/icons/arrow-r.svg'
import { useEffect, useRef, useState } from 'react'
const Banner = ({ banner }: any) => {
  const [position, setPosition] = useState<any>(0)
  const timerRef = useRef<any>(null)

  const nextSlide = () => {
    console.log(banner.length)
    setPosition(position === (banner.length - 1) ? 0 : (position + 1))
  }

  const prevSlide = () => {
    setPosition(position === 0 ? (banner.length - 1) : (position - 1))
  }

  useEffect(() => {
    if(banner)
      timerRef.current = setInterval(() => {
        nextSlide()
      }, 6000)
      return () => {
        clearInterval(timerRef.current)
      }
  }, [position, banner])

  
  return (
    <>
      {banner.map((item: any, index: number) => (
        <div key={item.id}>
          {index === position && (
            <div className='w-full mx-auto h-full flex flex-col md:flex-row-reverse pt-10 md:pb-10 md:justify-center md:items-center gap'>
              <div className='relative z/5 md:py-8 pt-8 pb rounded-2xl w-full  max-w-full  m-auto'>
                <div
                  className='w-[314px] max-w-full xl:w-[669px] h-[192px] lg:h-[200px] xl:h-[369px] before:absolute sm:before:bottom-[-10%] before:bottom-[-10%] lg:before:bottom-[-8%] before:left-[-10px] sm:before:right-[4%] md:before:bottom-[15%] md:before:right-[30%] lg:before:left-[35%] before:max-w-full  before:w-[70%]  before:rounded-2xl before:h-[190px] lg:before:h-[90%] before:bg-[#6B6B6B]/10
                '>
                  <Image
                    className='rounded-2xl shadow-md z-50 '
                    src={`${item.attributes.imagen.data.attributes.url}`}
                    alt=''
                    layout='fill'
                    objectFit='cover'
                    priority={true}
                  />
                </div>
              </div>
              <div className='w-full flex flex-col lg:pt-10  md:flex-col-reverse md:gap-y-10 sm:pr-20 lg:w-[90%]'>
                <div
                  className='w-full md:w-[90%]
                  flex justify-end md:justify-start gap-8 py-6 md:py-0'>
                  <div
                    onClick={prevSlide}
                    className='cursor-pointer bg-redOmega rounded-full text-white p-1 md:p-2 select-none'>
                    <img src={arrowLeft.src} className='w-5 h-5' alt='' />
                  </div>
                  <div
                    onClick={nextSlide}
                    className='cursor-pointer bg-redOmega rounded-full text-white p-1 md:p-2 select-none'>
                    <img src={arrowRight.src} className='w-5 h-5' alt='' />
                  </div>
                </div>
                {position + 1} de {banner.length}
                <h1
                  className={
                    index === position
                      ? 'text-redOmega uppercase text-large  lg:text-extraLarge leading-[35px] lg:leading-[44px] font-bold tracking-[0.2em] w-[100%]'
                      : 'hidden'
                  }
                  key={index}>
                  {item.attributes.titulo}
                </h1>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default Banner
