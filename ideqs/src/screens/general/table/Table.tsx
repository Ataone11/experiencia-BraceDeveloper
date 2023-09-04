import React, { useEffect, useState } from 'react'
import Paginacion from '../../administrador/ordersAdmin/Paginacion'
import Link from 'next/link'
import EmptyComponent from '../base/EmptyComponent'
import { useWindowSize } from '../../../hooks/useWindowSize'
import { PuffLoader } from 'react-spinners'
import Image from 'next/image'
import cara from '../../../assets/general/cara.svg'

interface Params {
  title?: Array<string>
  colorTitle?: string
  list?: any[]
  bgRow?: string
  totalPage: number
  functionPagination?: any
  isLoading: boolean
}

const Table = ({
  title,
  colorTitle = 'bg-white',
  list,
  bgRow,
  totalPage,
  functionPagination,
  isLoading
}: Params) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { width } = useWindowSize()
  const RESOLUTION_WIDTH = 768

  const previousPage = () => {
    setCurrentPage(currentPage - 1)
  }
  useEffect(() => {
    functionPagination({ page: currentPage })
  }, [currentPage])

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
    window.scrollTo(0, 0)
  }

  let latestColor = 'no-color'

  const override: any = {
    display: 'block',
    margin: '0 auto',
    borderColor: '#086eae'
  }

  return isLoading ? (
    <div className="flex w-full h-52 inset-0  justify-center items-center">
      <PuffLoader
        color="#086eae"
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  ) : list ? (
    <div className="overflow-x-auto xl:w-[100%] border-none pb-[2rem] my-5">
      <table
        className="overflow-hidden w-[200%] sm:w-[150%] rounded-[0.5rem] lg:w-[120%] xl:w-[100%] border-collapse overflow-x-auto xl:overflow-hidden"
        id="table-users"
      >
        <thead>
          <tr
            className={`border-b-4 border-azulPrimary900 ${colorTitle} sticky z-10 top-0`}
          >
            {title?.map((title, i) => {
              const newTitle = i === 0 ? '' : title
              return (
                <th
                  key={`title-${i}`}
                  className={`w-auto text-center px-[1rem] py-[0.5rem] sticky z-10 top-0 text-azulPrimary900 font-bold mx-5`}
                >
                  {width < RESOLUTION_WIDTH ? newTitle : title}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {(list ?? []).map((element: any, i: number) => {
            const color = 'color'
            const opacity = latestColor === (list ?? [])[i][color]
            if (latestColor === (list ?? [])[i][color]) latestColor = 'no-color'
            latestColor = element[color]

            const fields = Object.keys(element)
            const firstField = fields[0]
            const first = element[firstField]

            return (
              <EmptyComponent key={`orer-${i}`}>
                <tr className="md:hidden">
                  <td
                    className={`px-[1rem] py-[0.2rem] md:p-[1rem] text-ellipsis min-w-[10rem] overflow-hidden text-[#344050] bg-white sticky left-0 `}
                    colSpan={Infinity}
                  >
                    {title && title[0]}:{' '}
                    {typeof first === 'object' ? (
                      first && first.link ? (
                        <Link href={first.href} shallow>
                          <a className="text-azulPrimary900 underline">
                            {first.text}
                          </a>
                        </Link>
                      ) : (
                        first
                      )
                    ) : (
                      first
                    )}
                  </td>
                  {/*<td
                    colSpan={fields.length - 3}
                    className={`p-[1rem] text-ellipsis max-w-[10rem] overflow-hidden text-[#344050] bg-white`}
                    ></td>*/}
                </tr>
                <tr>
                  {Object.keys(element).map((field: any, j: number) => {
                    if (field === 'color') return ''

                    const newFields =
                      j === 0 && width < RESOLUTION_WIDTH ? '' : element[field]
                    return (
                      <td
                        className={`px-[1rem] text-center py-[0.2rem] border-b border-t border-azulPrimary900 md:border-none md:p-[1rem] text-ellipsis max-w-[10rem] overflow-hidden text-[#344050] ${
                          bgRow
                            ? i % 2 === 0
                              ? bgRow
                              : 'bg-white'
                            : i % 2 === 0
                            ? element[color] ?? ''
                            : `${element[color]} ${
                                opacity ? 'bg-opacity-40' : ''
                              }` ?? ''
                        }`}
                        key={`field-${j}`}
                      >
                        {typeof newFields === 'object' ? (
                          newFields && newFields.link ? (
                            <Link href={newFields.href} shallow>
                              <a className="text-azulPrimary900 underline">
                                {newFields.text}
                              </a>
                            </Link>
                          ) : (
                            newFields
                          )
                        ) : (
                          newFields
                        )}
                      </td>
                    )
                  })}
                </tr>
              </EmptyComponent>
            )
          })}
        </tbody>
      </table>
      <Paginacion
        currentPage={currentPage}
        lastPage={totalPage}
        previousPage={previousPage}
        nextPage={nextPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  ) : (
    <div className="mx-auto my-auto flex flex-col justify-center items-center h-[450px]">
      <Image src={cara} alt="" className="" />
      <span className=" text-textSize5 my-5 text-center text-gray-400 w-[220px]">
        Lo siento, no hay datos disponibles
      </span>
    </div>
  )
}

export default Table
