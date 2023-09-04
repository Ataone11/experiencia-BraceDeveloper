import Image from 'next/image'
import derecha from '../../assets/derechaGris.svg'
import izquierda from '../../assets/izquierdaGris.svg'

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
  return (
    <div className="container mx-auto flex gap-2 my-5 justify-center items-center text-textSize7">
      {currentPage > 1 && (
        <button
          onClick={previousPage}
          className="  font-myriad text-center items-center flex gap-3 text-grisNeutral300"
        >
          <Image src={izquierda} alt="" className="" />
          Anterior
        </button>
      )}
      {Array.from({ length: lastPage }, (_, i) => i + 1).map((page: number) => (
        <h1
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`${
            currentPage === page
              ? 'text-white bg-azulPrimary900 '
              : 'border-0 text-grisNeutral300'
          } border rounded-md  font-myriad w-[20px] h-[20px] text-center items-center cursor-pointer`}
        >
          {page}
        </h1>
      ))}
      {currentPage < lastPage && (
        <button
          onClick={nextPage}
          className="font-myriad  text-center items-center flex gap-3 text-grisNeutral300"
        >
          Siguiente
          <Image src={derecha} alt="" className="" />
        </button>
      )}
    </div>
  )
}

export default Paginacion
