import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import derecha from '../../../assets/derechaGris.svg'

interface PaginacionProps {
  currentPage: number
  lastPage: number
  previousPage: () => void
  nextPage: () => void
  setCurrentPage: (newPage: number) => void
}

const Paginacion = ({
  currentPage,
  lastPage,
  previousPage,
  nextPage,
  setCurrentPage
}: PaginacionProps) => {
  const paginationRef = useRef<HTMLDivElement>(null)

  // Show first 5 pages and swap to last 5 pages

  useEffect(() => {
    if (paginationRef.current) {
      const pagination = paginationRef.current
      const paginationChildren = pagination.children
      const paginationChildrenArray = Array.from(paginationChildren)
      const paginationChildrenArrayLength = paginationChildrenArray.length

      if (currentPage <= 5) {
        paginationChildrenArray.forEach((child, i) => {
          if (i < 5) {
            child.classList.remove('hidden')
          } else {
            child.classList.add('hidden')
          }
        })
      } else if (currentPage > 5 && currentPage < lastPage - 4) {
        paginationChildrenArray.forEach((child, i) => {
          if (i >= currentPage - 3 && i <= currentPage + 1) {
            child.classList.remove('hidden')
          } else {
            child.classList.add('hidden')
          }
        })
      } else if (currentPage >= lastPage - 4) {
        paginationChildrenArray.forEach((child, i) => {
          if (i >= paginationChildrenArrayLength - 5) {
            child.classList.remove('hidden')
          } else {
            child.classList.add('hidden')
          }
        })
      }
    }
  }, [currentPage, lastPage])

  return (
    <div className="container mx-auto flex gap-2 my-5 justify-center items-center text-textSize7">
      <button
        onClick={previousPage}
        className="font-myriad text-center items-center flex gap-3 text-azulPrimary900 font-bold disabled:opacity-50"
        disabled={currentPage === 1}
      >
        <Image
          src={derecha}
          alt=""
          className={`${currentPage === 1 && 'opacity-50'} rotate-180`}
        />
        Anterior
      </button>
      <div ref={paginationRef}>
        {Array.from({ length: lastPage }, (_, i) => i + 1).map(
          (page: number) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`${
                currentPage === page
                  ? 'text-white bg-azulPrimary900/70'
                  : 'border-0 text-azulPrimary900 font-bold'
              } border rounded-[4px]  font-myriad w-[20px] h-[20px] text-center items-center cursor-pointer`}
            >
              {page}
            </button>
          )
        )}
      </div>
      <button
        onClick={nextPage}
        className="font-myriad text-center items-center flex gap-3 text-azulPrimary900 font-bold disabled:opacity-50"
        disabled={currentPage === lastPage}
      >
        Siguiente
        <Image
          src={derecha}
          alt=""
          className={`${currentPage === lastPage && 'opacity-50'}`}
        />
      </button>
    </div>
  )
}

export default Paginacion
