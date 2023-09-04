import { useState } from 'react'
import { BeatLoader } from 'react-spinners'
import Delete from '../../assets/general/Delete'
import perfil from '../../assets/administrador/usuarios/profile.svg'
import Image from 'next/image'
import { Points } from '../../models/pointsModel'
import { deleteMapPoint } from '../../redux/actions/pointsActions'
import { COLORS } from '../../utils/colors'
import { toast } from 'react-toastify'

export default function CardAddress({
  data,
  getPoints
}: {
  data: Points
  getPoints: () => void
}) {
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [src, setSrc] = useState(
    data?.imagen != null ? 'data:image/*;base64,' + data.imagen : perfil
  )
  const removeSede = async (id: number) => {
    setLoadingDelete(true)
    const result = await deleteMapPoint(id)
    setLoadingDelete(false)
    if (result === 'OK') {
      getPoints()
      toast.success('Punto de atención eliminado')
    } else
      toast.error('Hubo un error al tratar de eliminar el punto de atención')
  }

  let telefonos = ''
  if (data.telefono1 && data.telefono2) {
    telefonos = data.telefono1 + ' - ' + data.telefono2
  } else if (data.telefono1) {
    telefonos = data.telefono1
  } else if (data.telefono2) {
    telefonos = data.telefono2
  } else {
    telefonos = 'Sin teléfono'
  }

  return (
    <div
      id={data.id.toString()}
      className="border-[2px] mt-[40px] border-neutral-300 rounded-[10px] flex gap-[20px] py-[16px] px-[15px] lg:py-[30px] lg:px-[35px]"
    >
      <div
        className={`flex bg-cover bg-no-repeat w-[108px] overflow-hidden relative `}
      >
        <Image
          alt="Perfil"
          src={src}
          quality={100}
          layout={'fill'}
          style={{
            objectFit: 'contain'
          }}
          onError={() => setSrc(perfil)}
        />
      </div>
      <article className="text-textSize7 xl:text-textSize6">
        <header className="text-azulPrimary700 text-textSize6 lg:text-textSize5">
          {data.nombre || 'Sin Nombre'}
        </header>
        <section className="mt-[20px] flex flex-col gap-[10px]">
          <section className="flex gap-[23px]">
            <p className="text-neutral-300 font-bold">
              Dirección:{' '}
              <span className="font-normal text-neutral-900">
                {data.direccion || 'Sin dirección'}
              </span>
            </p>
          </section>
          <section className="flex gap-[23px]">
            <p className="text-neutral-300 font-bold">
              Teléfono:{' '}
              <span className="font-normal text-neutral-900">{telefonos}</span>
            </p>
          </section>
        </section>
      </article>
      <div className="ml-auto">
        {loadingDelete ? (
          <BeatLoader
            color={COLORS.azulPrimaryDark}
            size={15}
            className="lg:min-w-[57px]"
          />
        ) : (
          <span
            className="cursor-pointer text-neutral-300 hover:text-azulPrimary700 lg:mt-[5px]"
            onClick={() => removeSede(data.id)}
          >
            <Delete />
          </span>
        )}
      </div>
    </div>
  )
}
