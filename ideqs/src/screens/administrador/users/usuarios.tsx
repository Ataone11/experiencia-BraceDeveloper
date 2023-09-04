/* eslint-disable no-unused-vars */
import List from './lista'
import Image from 'next/image'
import caraSeria from '../../../assets/general/cara.svg'
import { useDispatch, useSelector } from 'react-redux'
import React, { CSSProperties, useEffect } from 'react'
import { getUsers } from '../../../redux/reducers/adminUsersReducer'
import { getUsersIDEQS } from '../../../redux/actions/adminUsersActions'
import { text } from './text/users'
import { PuffLoader } from 'react-spinners'
import { selectUser } from '../../../redux/reducers/authReducer'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(getUsers)
  const user = useSelector(selectUser)

  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: '#086eae'
  }

  useEffect(() => {
    if (user) getUsersIDEQS(user.idCliente, dispatch)
  }, [user, users])

  return (
    <>
      {!users && (
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
      {users && (
        <>
          <div className="mx-auto">
            {users.length === 0 ? (
              <div className="mx-auto min-h-[75vh] flex flex-col justify-center w-fit">
                <Image src={caraSeria} alt="" className="" />
                <span className=" text-textSize5 my-5 text-center text-gray-400 w-[220px]">
                  Lo siento, no hay Usuarios disponibles
                </span>
              </div>
            ) : (
              <div className="lg:mb-[20px] mb-[20px]">
                <List
                  subtitle={text.admins.es}
                  rols={[1, 2, 3]}
                  users={users}
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default Users
