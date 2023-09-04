import { useEffect, useState } from "react";
import { CampaignActive } from "../../models/campaniaActiva";
import CampañasActivas from "./campaniaActiva";
import flecha from "../../../src/assets/flechas/next.svg"
import Image from "next/image";
import { getCampaignsActives } from "../../redux/actions/usuario";

const ActivesCampaignsD = () => {

    const [campaignsActives, setCampaignsActives] = useState<CampaignActive[] | null>(null);
    const [activeCampaignPage, setActiveCampaignPage] = useState(0);

    const loadMoreCampaignsActives = async () => {
        const res = await getCampaignsActives();

        if (!campaignsActives) {
            setCampaignsActives(res);
        } else {
            setCampaignsActives([
                ...campaignsActives,
                ...res.data
            ])
        }
    }

    useEffect(() => {
        if (!campaignsActives) {
            loadMoreCampaignsActives()
        }
    }, [campaignsActives]);


    const next = () => {
        if (campaignsActives && campaignsActives[(activeCampaignPage + 1) * 2]) {
            const point = document.querySelectorAll('.point')
            point[activeCampaignPage + 1].classList.add('bg-primary')
            point[activeCampaignPage + 1].classList.add('h-2')
            point[activeCampaignPage + 1].classList.add('w-2')
            point[activeCampaignPage + 1].classList.remove('bg-text')
            point[activeCampaignPage + 1].classList.remove('h-1.5')
            point[activeCampaignPage + 1].classList.remove('w-1.5')
            point[activeCampaignPage].classList.remove('bg-primary')
            point[activeCampaignPage].classList.remove('h-2')
            point[activeCampaignPage].classList.remove('w-2')
            point[activeCampaignPage].classList.add('bg-text')
            point[activeCampaignPage].classList.add('h-1.5')
            point[activeCampaignPage].classList.add('w-1.5')
            setActiveCampaignPage(activeCampaignPage + 1)
        }
    }
    const prev = () => {
        if (campaignsActives && campaignsActives[(activeCampaignPage - 1) * 2]) {
            const point = document.querySelectorAll('.point')
            point[activeCampaignPage - 1].classList.add('bg-primary')
            point[activeCampaignPage - 1].classList.add('h-2')
            point[activeCampaignPage - 1].classList.add('w-2')
            point[activeCampaignPage - 1].classList.remove('bg-text')
            point[activeCampaignPage - 1].classList.remove('h-1.5')
            point[activeCampaignPage - 1].classList.remove('w-1.5')
            point[activeCampaignPage].classList.remove('bg-primary')
            point[activeCampaignPage].classList.remove('h-2')
            point[activeCampaignPage].classList.remove('w-2')
            point[activeCampaignPage].classList.add('bg-text')
            point[activeCampaignPage].classList.add('h-1.5')
            point[activeCampaignPage].classList.add('w-1.5')
            setActiveCampaignPage(activeCampaignPage - 1)
        }
    }


    return (
        <div className="hidden md:block md:h-72 md:px-4 md:pt-3 bg-white rounded-rifa overflow-hidden drop-shadow-campaing">
            <h1 className="text-center text-points text-primary">Mis campañas activas</h1>
            
            <div className="flex items-center justify-center mb-2.5 md:mb-0 rounded-xl md:w-full md:h-4/5">
                {
                    campaignsActives &&
                    <div className="md:w-full">
                        {}
                        <CampañasActivas
                            img={campaignsActives[activeCampaignPage * 2].campaña.imgCampania}
                            title={campaignsActives[activeCampaignPage * 2].campaña.titulo}
                            brand={campaignsActives[activeCampaignPage * 2].campaña.marca}
                            state={campaignsActives[activeCampaignPage * 2].estado}
                            id={campaignsActives[activeCampaignPage * 2].campaña.id}>
                                
                        </CampañasActivas>
                        {
                            campaignsActives[activeCampaignPage * 2 + 1] &&
                            <CampañasActivas
                                img={campaignsActives[activeCampaignPage * 2 + 1].campaña.imgCampania}
                                title={campaignsActives[activeCampaignPage * 2 + 1].campaña.titulo}
                                brand={campaignsActives[activeCampaignPage * 2 + 1].campaña.marca}
                                state={campaignsActives[activeCampaignPage * 2 + 1].estado}
                                id={campaignsActives[activeCampaignPage * 2+1].campaña.id}>
                                    
                            </CampañasActivas>
                        }
                    </div>
                }
            </div>
            <div className="flex justify-center">
                <div className="hidden md:flex items-center">

                    <span id="prev" className="md:block h-4 text-categorieGrey text-tittle rotate-180 cursor-pointer" onClick={prev}>
                        <Image src={flecha} alt="prev" />
                    </span>
                </div>
                <div className="flex items-center px-2">
                    <div className="w-2 h-2 bg-primary rounded-full m-1 point transition-all"></div>
                    {campaignsActives &&
                        Array.from({ length: campaignsActives.length % 2 == 0 ? (campaignsActives.length / 2) - 1 : campaignsActives.length / 2 }).map((_, index) => (
                            <div className="w-1.5 h-1.5 bg-text rounded-full m-1 point transition-all" key={index}></div>
                        ))}
                </div>
                <div className="flex items-center">
                    <span id="next" className="md:block text-categorieGrey text-tittle cursor-pointer" onClick={next}>
                        <Image src={flecha} alt="next" />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ActivesCampaignsD