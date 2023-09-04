import Image from 'next/image'
import Link from 'next/dist/client/link'
import { useState } from 'react'
import { signOutWithAmazon } from '../../redux/actions/authActions'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { selectUser } from '../../redux/reducers/authReducer'
import abajo from '../../assets/general/abajo.svg'
interface Params {
  name: string | null
  label: string
  action?: () => void
  className?: string | null
  choose?: string | null
  menu?: boolean
  href?: string
}
const Select = ({
  href,
  className = 'w-[300px] py-2 ',
  menu = true
}: Params) => {
  const [estate, setEstate] = useState(false)

  const dispatch = useDispatch()
  const router = useRouter()
  const user = useSelector(selectUser)
  const signOut = async () => {
    await signOutWithAmazon(dispatch)
    await router.push('/login', undefined, { shallow: true })
  }

  return (
    <div className="flex flex-col justify-start font-semibold  ">
      <button
        onClick={() => setEstate(!estate)}
        className={`${
          estate === true ? 'h-[72px] md:h-[95px]' : 'h-[36px] md:h-[46px]'
        }   align-middle text-left  rounded-lg  my-2   ${className}`}
      >
        {menu === true && (
          <div
            className={`${
              menu ? '' : ''
            }flex justify-between px-2 items-center `}
          >
            <div className="w-[90%]  truncate text-ellipsis">
              {`${user?.name ?? ''} ${user?.lastname ?? ''}`}
            </div>

            <Image src={abajo} alt="" className="flex justify-end" />
          </div>
        )}

        {estate && (
          <Link href={href ?? ''} shallow>
            <button
              onClick={signOut}
              className={`py-3 px-2 align-middle text-left border-none   my-2 ${className}`}
            >
              Cerrar Sesión
            </button>
          </Link>
        )}
      </button>
    </div>
  )
}

export default Select
