import { CampaignActive } from "../../../models/campaniaActiva"
import CampañasActivas from "../campaniaActiva"

interface Campaigns {
    campaignsActives: CampaignActive[] | null
}


const CampaignsActivesRenderM = ({ campaignsActives }: Campaigns) => {
    if (campaignsActives?.length) {
        return (
            <div className="md:hidden text-tittleM text-primary relative">
                <h2 className="mb-1 px-2.5">Mis campañas activas</h2>
                <div className="flex w-screen md:mb-0 overflow-x-auto overflow-y-visible md:justify-center md:w-full md:h-4/5 md:pr-5 scrollNone  px-2.5">
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
    } else {
        return <div></div>
    }

}

export default CampaignsActivesRenderM