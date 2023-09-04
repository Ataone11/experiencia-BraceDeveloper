/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux'
import React, { CSSProperties, useEffect } from 'react'
import { getClients } from '../../../redux/reducers/adminUsersReducer'
import { getClientsAdmin } from '../../../redux/actions/adminUsersActions'
import { text } from './text/users'
import { PuffLoader } from 'react-spinners'
import ClientList from './listaCliente'
import Image from 'next/image'
import caraSeria from '../../../assets/general/cara.svg'

const Companies = () => {
  const dispatch = useDispatch()
  const clients = useSelector(getClients)
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: '#086eae'
  }

  useEffect(() => {
    getClientsAdmin(dispatch)
  }, [])

  return (
    <>
      {!clients && (
        <div className="flex min-h-[75vh] justify-center items-center">
          <PuffLoader
            color="#086eae"
            loading={true}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {clients && (
        <>
          <div className="mx-auto">
            {clients.length === 0 ? (
              <div className="mx-auto min-h-[75vh] flex flex-col justify-center w-fit">
                <Image src={caraSeria} alt="" className="" />
                <span className=" text-textSize5 my-5 text-center text-gray-400 w-[220px]">
                  Lo siento, no hay empresas disponibles
                </span>
              </div>
            ) : (
              <div className="mb-[20px]">
                <ClientList subtitle={text.users.es} users={clients} />
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default Companies
