import Image from "next/image"
import { useEffect, useState } from "react"
import clip from '../../assets/administrador/usuarios/clip.svg';

const InputFile = () => {
    const [image, setImage] = useState<File | null>(null)
    const [classImage, setClassimage] = useState(' border-2 border-dashed border-neutral-300')

    const chargeImage = (event: any) => {
        if (event.target.files[0])
            setImage(event.target.files[0])
    }

    useEffect(() => {
        if (image) setClassimage(' bg-[#D8F0FF] text-[#2490D3]')
        else setClassimage(' border-2 border-dashed border-neutral-300')
    }, [image])

    return (
        <div className="grid-item w-full h-full">
            <p className="font-semibold mb-2">Fotografia:</p>
            <label htmlFor="picture" className={"flex justify-center lg:justify-start lg:pl-4 lg:h-14 h-9 w-full items-center p-1 rounded-lg cursor-pointer" + classImage} >
                <div className="mr-4">
                    <Image src={clip} alt='clip'></Image>
                </div>
                {!image ? <>Arrastra o <span className="text-azulPrimary700 font-semibol ml-1 mr-1">adjunta aqui</span> los archivos</> : image.name}
            </label>
            <input type="file" accept="image/*" id='picture' title={"picture"} name={"picture"} className='hidden' onChange={chargeImage} />
        </div>
    )
}

export default InputFile