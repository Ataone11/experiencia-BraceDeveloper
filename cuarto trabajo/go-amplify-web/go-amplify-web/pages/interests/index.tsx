import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import musica from '../../src/screens/general/interests/musica.svg'
import musica2 from '../../src/screens/general/interests/musica2.svg'
import {callCategories, loadProfile, saveCategories, updateUser} from "../../src/redux/actions/authActions";
import {useDispatch} from "react-redux";
import MoonLoader from "react-spinners/MoonLoader";
import Marquee from "react-fast-marquee";
import ScaleLoader from "react-spinners/ScaleLoader";
import {ToastContainer ,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from "next/router";


const Interest = () => {

    const dispatch = useDispatch()

    const router = useRouter();

    const [loading, setLoading] = useState(true)

    const [loadingSave, setLoadingSave] = useState(false)

    const [interests, setInterests] = useState<any[]>([])

    const [selection, setSelection] = useState(true)


    const loadCategories = async () => {
        const res = await callCategories(dispatch);
        res.data.forEach((obj:any) => {
            obj.selected = false
        });

        setInterests(res.data)
        setLoading(false)
    }

    useEffect(() => {
        loadCategories();
    }, [])

    function goToHome() {
        router.push("/")
    }

    useEffect(() =>{
        checkSelection()
    }, [interests])

    function checkSelection() {
        let count = 0

        interests.forEach((interest: any) => {
            if (interest.selected == true){
                count += 1
            }
        })

        count == 0 ? setSelection(true) : setSelection(false)
    }

    function selectInterest(interestId: number) {
        const newInterests: any[] = interests.map((interest: any) => {
            if(interest.id === interestId) {
                return {
                    ...interest,
                    selected: !interest.selected
                }
            } else {
                return interest
            }
        })
        setInterests(newInterests)
    }

    async function onSubmit(event: any) {
        event.preventDefault()

        const categories: any[] = []

        interests.map((interest) => {
            if (interest.selected){
                categories.push(interest.id)
            }
        })

        //Inicia la carga
        setLoadingSave(true)
        //Hacer nuevo llamado
        const res = await saveCategories(dispatch, categories)
        //Acbas la carga
        setLoadingSave(false)

        toast.success('Intereses registrados!', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
        });

        goToHome()
    }

    return (
        loading ?
            <div className="flex justify-center items-center h-screen">
                <MoonLoader color="#425AC5"/>
            </div> :
            <div className="w-screen h-screen bg-white p-5 flex flex-col items-center justify-center lg:flex-row lg:p-0">
                <div className="hidden bg-no-repeat bg-cover bg-[url('../../src/screens/general/login/bg_image2.svg')] lg:block lg:w-1/2 lg:h-screen lg:max-w-none rounded-r-full"/>
                <div className="w-screen max-w-sm mt-5 px-6 lg:w-1/2 lg:max-w-none lg:flex lg:flex-col lg:items-center">
                    <div className="pb-13 max-w-md">
                        <p className="text-[#425AC5] text-3xl text-center">Elige tus intereses</p>
                        <p className="text-[12px] lg:text-[15px] mt-6 mx-3 text-[#707070]">Para nosotros es importante saber cuales son algunos de tus intereses para recomendarte las campañas que sean más afin a tu persona.</p>
                    </div>
                    <div className="w-full max-w-md max-h-96 overflow-x-hidden py-2 flex flex-wrap flex-row mb-4 justify-around">
                        {
                            interests.map((interest: any) => {
                                return(
                                    <div onClick={() => selectInterest(interest.id)} className={"w-20 py-2 px-1 lg:w-32 " + (!interest.selected ? "inactive" : "active") +" lg:h-32 cursor-pointer mb-3 mx-1 rounded-md flex flex-col justify-center items-center shadow-[0_0_10px_0_rgba(0,0,0,0.2)]"} id={interest["nombre"]} key={interest['id']}>
                                        {
                                            !interest.selected ? <Image src={musica} className="h-2/3"/> : <Image src={musica2}/>
                                        }
                                        {
                                            interest.nombre.length > 10 ?
                                                <Marquee gradient={false} speed={10}>
                                                    <div className="lg:text-[20px] px-2">
                                                        {interest['nombre']}
                                                    </div>
                                                </Marquee>:
                                                <div className="lg:text-[20px]">
                                                    {interest['nombre']}
                                                </div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="flex justify-center items-center mt-10">
                        {loadingSave ?
                            <ScaleLoader color="#425AC5"/>:
                            <button disabled={selection} onClick={onSubmit} className={"bg-primary text-white w-[166px] h-[33px] rounded-[5px] disabled:bg-gray-500"}>
                                Confirmar
                            </button>
                        }
                    </div>
                </div>
            </div>
    );
};

export default Interest;