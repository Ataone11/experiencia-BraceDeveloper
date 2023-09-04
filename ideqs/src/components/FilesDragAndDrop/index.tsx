import Image from 'next/image'
import React, {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState
} from 'react'
import { toast } from 'react-toastify'
import AttachFileIcon from '../../assets/empresa/orders/attach file.svg'
import fileM from '../../assets/empresa/orders/fileM.svg'
import { XMarkIcon } from '@heroicons/react/24/solid'
interface FilesDragAndDropProps {
  onUpload: (file: File | null) => void
  file: File | null
  validFileFormats: string[] | null
  validFileExtensions?: string[] | null
  name: string
  nameInput?: string
  verification?: boolean
  required?: boolean
}

const FilesDragAndDrop = ({
  onUpload,
  file,
  validFileFormats,
  name,
  required,
  nameInput = 'pathArchivo',
  validFileExtensions
}: FilesDragAndDropProps) => {
  const drop = useRef<HTMLLabelElement>(null)
  const [dragging, setDragging] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    drop?.current?.addEventListener('dragover', handleDragOver)
    drop?.current?.addEventListener('drop', handleDrop)
    drop?.current?.addEventListener('dragenter', handleDragEnter)
    drop?.current?.addEventListener('dragleave', handleDragMouseLeave)
    drop?.current?.addEventListener('mouseleave', handleDragMouseLeave)

    return () => {
      drop?.current?.removeEventListener('dragover', handleDragOver)
      drop?.current?.removeEventListener('drop', handleDrop)
      drop?.current?.removeEventListener('dragenter', handleDragEnter)
      drop?.current?.removeEventListener('dragleave', handleDragMouseLeave)
      drop?.current?.removeEventListener('mouseleave', handleDragMouseLeave)
    }
  }, [])

  const handleDragOver = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
  }
  const borrarHorario = () => {
    if (ref.current) ref.current.value = ''
    onUpload(null)
  }
  const handleDrop = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    const { files } = e.dataTransfer
    handleFiles(files)
  }

  const handleDragEnter = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    setDragging(true)
  }

  const handleDragMouseLeave = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    setDragging(false)
  }

  const handleFiles = (files: FileList | null) => {
    if (files && files.length === 1) {
      const newFile = files[0]

      let tempValidFileExtensions = validFileExtensions || []

      if (validFileFormats?.includes('image/*')) {
        tempValidFileExtensions = tempValidFileExtensions.concat([
          'jpg',
          'png',
          'apng',
          'avif',
          'jpeg',
          'webp'
        ])
      }

      const extensionMatch = tempValidFileExtensions
        ?.map((extension: string) => extension.toLowerCase())
        .includes(newFile.name.split('.').pop()?.toLowerCase() || '')

      const matchingMIMEType = validFileFormats?.includes(newFile?.type)

      if (
        !extensionMatch &&
        !matchingMIMEType &&
        (validFileFormats || validFileExtensions)
      ) {
        toast.warning('Por favor seleccione un archivo con formato valido')
      } else {
        onUpload(newFile)
      }
    } else {
      toast.warning('Por favor seleccione solo un archivo')
    }
  }
  return (
    <>
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          handleFiles(e.target.files)
        }}
        type="file"
        ref={ref}
        required={required}
        accept={validFileFormats ? validFileFormats.join(',') : undefined}
        name={nameInput}
        className={`hidden cursor-pointer`}
      />
      <label
        ref={drop}
        className={`relative z-0 box-c rounded-md cursor-pointer text-textSize8 md:text-textSize6 max-w-full w-[275px] md:w-[387px] h-[29px] md:h-[56px]  flex justify-start p-[18px] items-center font-semibold  ${
          dragging || file
            ? 'bg-azulPrimaryDark text-white'
            : 'text-grisNeutral500'
        }`}
        onClick={() => {
          ref.current?.click()
        }}
      >
        <div className="flex w-full pointer-events-none">
          <div className="flex">
            <div className="hidden md:flex pr-1">
              <Image src={AttachFileIcon} alt="" className="" />
            </div>
            <div className="md:hidden">
              <Image src={fileM} alt="" className="" />
            </div>
          </div>
          <span className="max-w-[89%] truncate lg:text-textSize6 py-1 mx-5 md:mx-0 md:py-0">
            {file ? (
              file.name
            ) : (
              <>
                Arrastra o
                <span className=" text-azulPrimary700 mx-1">adjunta aquí</span>
                {name}
              </>
            )}
          </span>
        </div>
        {file && (
          <button
            type="button"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation()
              borrarHorario()
            }}
            className="absolute h-6 w-6 right-5 z-10"
          >
            <XMarkIcon className="text-white" />
          </button>
        )}
      </label>
    </>
  )
}

export default FilesDragAndDrop
