import { CSSProperties, useState } from 'react'
import Button from '../../../components/buttons/primaryButton'
import { toast } from 'react-toastify'
import { BeatLoader } from 'react-spinners'
import { useRouter } from 'next/router'
import { text } from './text/deleteData'
import { useDispatch } from 'react-redux'

interface DeleteDataType {
  id: number | undefined
  show: boolean
  setShow: any
  DeleteData: (x: number | undefined, y?: any) => any
  message?: boolean
}

const DeleteData = ({
  id,
  show,
  setShow,
  DeleteData,
  message
}: DeleteDataType) => {
  const router = useRouter()
  const [loader, setLoader] = useState(false)
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: '#086eae'
  }
  const dispatch = useDispatch()

  const deleteData = async () => {
    setLoader(true)
    const response = await DeleteData(id, dispatch)
    setLoader(false)
    if (response.statusCode === 200) {
      toast.success('El usuario fue eliminado')
    }

    if (response.statusCode === 400)
      toast.error('El usuario no pudo ser eliminado')
    setShow(false)

    router.push('/administrador/usuarios', undefined, { shallow: true })
  }

  const deleteModal = (
    <div
      className={
        'fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-azulPrimary700 bg-opacity-20'
      }
    >
      <div
        className="w-full h-full absolute"
        onClick={() => setShow(false)}
      ></div>
      <div className="flex flex-col w-[615px] h-[141px] justify-center items-center border-1 border-neutral-100 rounded-md drop-shadow-box bg-white">
        <div className="mb-1">
          <p className="text-[24px] text-azulPrimary700">
            {message
              ? text.validationMessage.es
              : text.validationMessageClient.es}
          </p>
          {message && <p className="h-0 text-[12px]">{text.warning.es}</p>}
        </div>
        <div className="flex">
          <Button
            color={'bg-azulPrimary700'}
            label={text.cancelButton.es}
            className={'w-[105px] mb-0 mr-4'}
            classNameText={'text-[10px] text-center w-full'}
            action={() => setShow(false)}
          ></Button>
          {loader && (
            <div className="flex w-[114.5px] justify-center items-center mt-5">
              <BeatLoader
                color="#2490D3"
                loading={loader}
                cssOverride={override}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
          {!loader && (
            <Button
              color={'bg-[#EE7B13]'}
              label={text.deleteButton.es}
              className={'w-[105px] mb-0 '}
              classNameText={'text-[10px] text-center w-full'}
              action={deleteData}
            ></Button>
          )}
        </div>
      </div>
    </div>
  )
  return show ? deleteModal : null
}

export default DeleteData
