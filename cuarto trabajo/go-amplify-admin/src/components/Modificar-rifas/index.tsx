import moment from "moment"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Rifa } from "../../models/rifa"
import { updateRaffles } from "../../redux/actions/rifasAction"
import upload from "../../assets/subida.svg"
import { useDispatch } from "react-redux"
import { MAX_IMAGE_SIZE, S3_BUCKET_URL } from "../../utils/constants"
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify"

interface RaffleType {
    raffle: Rifa,
    getRaffles: (x: any, y: any) => any,
}

const Raffle = ({ raffle, getRaffles, }: RaffleType) => {

    const dispatch = useDispatch();
    const [title, setTitle] = useState(raffle.nombre)
    const [date, setDate] = useState(moment(raffle.fecha).format('YYYY-MM-DD'))
    const [description, setDescription] = useState(raffle.descripcion)
    const [image, setImage] = useState<any>()
    const [preVisualImage, setPreVisualImage] = useState<string>(S3_BUCKET_URL + raffle.imagen)
    const [border, setBorder] = useState('')
    const [loader, setLoader] = useState(false)

    const changeTitle = (event: any) => {
        setTitle(event.target.value)
    }
    const changeDate = (event: any) => {
        setDate(event.target.value)
    }
    const changeDescription = (event: any) => {
        setDescription(event.target.value)
    }

    const chargeImage = (event: any) => {
        const fileToAdd = event.target.files[0];
        if (fileToAdd?.size > MAX_IMAGE_SIZE) {
            toast.error("Por favor adjunte una imagen que pese menos de un 1MB");
            return;
        }

        if (fileToAdd) {
            setImage(fileToAdd)
            setPreVisualImage(URL.createObjectURL(fileToAdd))
        }
    }

    const cancel = () => {
        getRaffles(dispatch, setLoader)
        setLoader(true)
    }

    useEffect(() => {
        setDescription(raffle.descripcion)
        setDate(moment(raffle.fecha).format('YYYY-MM-DD'))
        setTitle(raffle.nombre)
        setPreVisualImage(S3_BUCKET_URL + raffle.imagen)
        setImage(undefined)
    }, [raffle])

    const saveChanges = async () => {
        setLoader(true)
        await updateRaffles(title, String(date), description, raffle, setLoader, image)
        toast.success("Información actualizada")
    }

    return (
        <div className='md:w-[1356px] dl:w-[690px] w-[320px] h-[500px] md:h-auto'>
            <form action="" className={border + " bg-white md:bg-transparent w-full h-full md:h-auto p-5 md:p-0 rounded-lg shadow-box md:shadow-none border border-transparent md:border-0 overflow-hidden md:overflow-visible"}>
                <h1 className='text-primary-button-bg md:text-[28px] text-[15px] text-center md:text-left md:mb-[25px] mb-5 md:font-semibold'>Rifa {raffle.tipo}</h1>
                <div className={'md:' + border + ' md:bg-white md:flex md:justify-between w-full md:h-[290px] dl:h-[360px] md:px-10 md:py-5 rounded-lg md:shadow-box border  border-transparent md:overflow-hidden'}>
                    <div className='md:w-[431px] dl:w-[270px] w-full'>
                        <div>
                            <label htmlFor="title-raffle" className='block text-primary-button-bg md:text-[14px] text-[10px] md:font-normal'>Titulo de rifa</label>
                            <input id="title-raffle" autoComplete="off" value={title} type="text" className='w-full mb-5 md:py-0.5 border-b border-b-#AAAAAA md:text-[15px] text-[12px] focus:outline-none focus:border-primary-button-bg' onChange={changeTitle} onFocus={() => setBorder('border-primary-button-bg')} onBlur={() => setBorder('')} />
                        </div>
                        <div>
                            <label htmlFor="date" className='block text-primary-button-bg md:text-[14px] text-[10px] md:font-normal'>Fecha de la rifa</label>
                            <input id='date' value={date} type="date" className='w-full md:mb-0 mb-[15px] border-b md:py-0.5 border-b-#AAAAAA md:text-[15px] text-[12px] focus:outline-none focus:border-b-primary-button-bg' onChange={changeDate} onFocus={() => setBorder('border-primary-button-bg')} onBlur={() => setBorder('')} />
                        </div>
                        <div className='md:flex md:flex-col md:items-center md:justify-center md:h-[110px] dl:h-[200px]'>
                            <div className="md:w-[340px] dl:w-[250px]">
                                <label htmlFor={"file " + raffle.id} className='block text-primary-button-bg md:text-[14px] text-[10px] md:mb-2 mb-1 md:font-normal'>Imagen de la rifa</label>
                                <label htmlFor={"file " + raffle.id} className='flex items-center justify-center md:w-full h-[60px] p-1.5 border-dashed border-primary-button-bg border rounded-md mb-[10px] md:mb-0 md:text-[14px] text-[10px] text-[#AAAAAA] cursor-pointer'>
                                    {preVisualImage == '' && 'Subir archivo'}
                                    {preVisualImage == '' && <div className="relative md:w-[16px] md:h-[12px] w-[15px] h-[11px] md:ml-3 ml-2">
                                        <Image src={upload} alt={'subir'} layout={'fill'} />
                                    </div>}
                                    {preVisualImage != '' &&
                                        <div className="flex justify-between w-full h-full rounded-md bg-inset p-2">
                                            <div className="flex items-center">
                                                <div className="relative md:h-[32px] md:w-[40px] w-[38px] h-[30px] md:mr-5 mr-2.5">
                                                    <Image src={preVisualImage} alt={'img'} layout={'fill'} objectFit="contain"/>
                                                </div>
                                                <h2 className="text-white">
                                                    {image ? image.name : raffle.imagen}
                                                </h2>
                                            </div>
                                        </div>
                                    }
                                </label>
                                <input id={"file " + raffle.id} accept="image/*" type="file" className='hidden' onChange={chargeImage} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col h-[215px] md:h-auto justify-between">
                        <div className="flex flex-col justify-between md:w-[630px] dl:w-[300px]">
                            <label htmlFor="title" className='text-primary-button-bg md:text-[14px] text-[10px] mb-[10px] md:font-normal'>Descripción de la rifa</label>
                            <textarea value={description} id='title' name="title" cols={30} rows={10} className='md:w-full h-[130px] dl:h-[180px] px-[25px] md:py-2.5 py-2.5 border-[#AAAAAA] border rounded-md text-[10px] md:text-[15px] focus:outline-none focus:border-primary-button-bg resize-none' onChange={changeDescription} onFocus={() => setBorder('border-primary-button-bg')} onBlur={() => setBorder('')}></textarea>
                        </div>
                        <div className="flex justify-center items-center md:justify-end">
                            {loader && <div className="flex justify-center items-center md:w-[190px] w-[136px] md:h-[40px] h-[27px]"><PulseLoader color="rgb(66 20 197)"></PulseLoader></div>}
                            {!loader && <div className="flex justify-center items-center bg-inset md:w-[90px] w-[63px] md:h-[40px] h-[27px] text-white md:text-[15px] text-[12px] md:rounded-lg rounded-[5px] mr-2.5 shadow-box cursor-pointer" onClick={saveChanges}>Guardar</div>}
                            {!loader && <div className="flex justify-center items-center bg-white md:w-[90px] w-[63px] md:h-[40px] h-[27px] text-primary-button-bg md:text-[15px] text-[12px] border-primary-button-bg border md:rounded-lg rounded-[5px] shadow-box cursor-pointer" onClick={cancel}>Cancelar</div>}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Raffle