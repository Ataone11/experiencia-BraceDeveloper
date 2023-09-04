import { useEffect, useState } from "react";
import { CampaignActive } from "../../models/campaniaActiva";
import CampañasActivas from "./campaniaActiva";
import { getCampaignsActives } from "../../redux/actions/usuario";
const ActivesCampaignsD = () => {

    const [campaignsActives, setCampaignsActives] = useState<CampaignActive[] | null>(null);

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


    return (
        <div className="md:hidden text-tittleM text-primary relative">
            <h2 className="w-infiniteScroll mb-1 m-auto">Mis campañas activas</h2>
            <div className="flex w-screen md:mb-0 overflow-x-auto overflow-y-visible md:justify-center md:w-full md:h-4/5 md:pr-5 scrollNone">
                {campaignsActives?.map((campaignsActives: any, index: any) => (
                    <CampañasActivas key={index} img={campaignsActives.campaña.imgCampania}
                        title={campaignsActives.campaña.titulo}
                        brand={campaignsActives.campaña.marca}
                        state={campaignsActives.estado}
                        id={campaignsActives.campaña.id}>
                    </CampañasActivas>
                ))
                }
            </div>
        </div>
    )
}

export default ActivesCampaignsD