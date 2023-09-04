import Image from 'next/image'
import Download from '../../../../src/assets/general/Download'
import Button from '../../../../src/components/buttons/Button'
import { Template } from '../../../models/templateModel'
import Excel from '../../empresa/carne/Excel'
import {
  decodeExcelBase64,
  decodeImageBase64
} from '../../../functions/DecodeBase64'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../redux/reducers/authReducer'
import { USER_ROLES } from '../../../utils/user-roles'

export default function DataFormatManejador({
  format,
  onchange
}: {
  format: Template
  onchange?: (e: any, idFormat: number) => void
}) {
  const user = useSelector(selectUser)
  return (
    <div className="flex flex-col gap-[15px] ">
      <div className="flex mx-10 items-center gap-3">
        {user?.rol !== USER_ROLES.RECEPCION && (
          <input
            name="activo"
            type="checkbox"
            id="activo"
            value={format.activo === 1 ? 0 : 1}
            defaultChecked={format.activo === 1 && true}
            onChange={(e) => onchange && onchange(e, format.id)}
          />
        )}

        <h2 className="text-azulPrimary900 text-left text-textSize4 font-bold ">
          {format?.nombrePlantilla || 'Sin nombre'}
        </h2>
      </div>

      <main className="grid md:grid-cols-2 md:grid-place-content  p-[15px] gap-[15px] border-b-2 ">
        <section className="flex flex-col items-center gap-[10px] justify-center lg:justify-start ">
          <h2>Diseño</h2>
          <Image
            src={decodeImageBase64(format?.diseno)}
            width={200}
            height={200}
            alt="iden"
          />
        </section>
        <section className="flex flex-col items-center gap-[30px]">
          <div className="flex flex-col items-center gap-[30px] justify-center md:justify-end">
            <h2>Formato de excel</h2>
            <div className="w-[100px] h-auto">
              <Excel />
            </div>
          </div>
          <div className="flex flex-col items-center gap-[10px] justify-center w-full md:w-[117px] md:h-[30%]">
            <Button className="bg-azulPrimary700 w-auto h-10 px-3 text-[10px] rounded-md">
              {
                <a
                  download
                  href={decodeExcelBase64(format?.excel)}
                  className="flex gap-[10px] text-white items-center w-fit mx-auto"
                >
                  Descargar
                  <Download />
                </a>
              }
            </Button>
          </div>
        </section>
        <div className="text-center grid gap-[15px] md:col-span-2 md:grid-flow-row">
          <h2 className="md:col-span-2 text-center h-fit">Formato</h2>
          <section className="flex flex-col items-center gap-[10px] justify-center">
            <Image
              src={decodeImageBase64(format?.caraA)}
              width={200}
              height={200}
              alt="iden"
            />
            <p className="text-neutral-900 font-semibold">Cara A</p>
          </section>
          <section className="flex flex-col items-center gap-[10px] justify-center">
            <Image
              src={decodeImageBase64(format?.caraB)}
              width={200}
              height={200}
              alt="iden"
            />
            <p className="text-neutral-900 font-semibold">Cara B</p>
          </section>
        </div>
      </main>
    </div>
  )
}
