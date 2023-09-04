import React from "react"
import { useEffect } from "react"
import { getCampaigns } from "../src/redux/actions/campaingAction";
import Campaña from "../src/components/campanias/campanias";
import Categorias from "../src/components/campanias/categorias";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { Campaign } from "../src/models/campania";
import { PuffLoader } from "react-spinners";
import SkeletonCampañas from "../src/components/campanias/skeletonCampaing";
import { getCampaignsActives } from "../src/redux/actions/usuario";
import { CampaignActive } from "../src/models/campaniaActiva";
import NothingCampaigns from "../src/components/campanias/noCampanias";
import CampaignsActivesRenderD from "../src/components/campanias/campaniasPage/campaniasActivasRenderD";
import CampaignsActivesRenderM from "../src/components/campanias/campaniasPage/campaniasActivasRenderM";
import BasePage from "../src/screens/general/base/BasePage";
import { useRouter } from "next/router";

const Campañas = () => {
    const [campaigns, setCampaigns] = useState<Campaign[] | null>();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [lastPage, setLastPage] = useState<number>(0);
    const [campaignsActives, setCampaignsActives] = useState<CampaignActive[] | null>(null);
    const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<number[]>([]);
    const [textFilter, setTextFilter] = useState<string | null>(null)
    const [dateFilter, setDateFilter] = useState<string[] | null>(null)
    const [orderFilter, setOrderFilter] = useState<number | null>(null)
    const [typeDateFilter, setTypeDateFilter] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    const { query: { keyword } } = useRouter();
    let Campaigns: any
    let CampaignsList: any

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

    const loadMoreCampaigns = async (reset: boolean = false) => {
        const basePage = reset ? 0 : currentPage;
        const res = await getCampaigns(basePage + 1, selectedCategoriesIds || [], textFilter, dateFilter, typeDateFilter, orderFilter);
        setCurrentPage(basePage + 1);
        setLastPage(res.lastPage)

        if (reset) {
            setCampaigns(
                res.data
            )
        } else {
            setCampaigns([
                ...(campaigns || []),
                ...res.data
            ])
        }
        if (res) {
            setLoading(false)
        }

    }


    const toggleCategoryId = (categoryId: number) => {
        if (!selectedCategoriesIds?.includes(categoryId)) {
            setSelectedCategoriesIds([
                ...(selectedCategoriesIds || []),
                categoryId
            ])
        } else {
            const newSelectedCategoriesIds = selectedCategoriesIds.filter((category: any) => category !== categoryId);
            setSelectedCategoriesIds(newSelectedCategoriesIds);
        }
    };

    if (!campaigns) {
        Campaigns = (
            <div className="md:grid md:grid-cols-2 dl:grid-cols-3 gx:grid-cols-4 md:gap-5">
                {Array.from({ length: 12 }).map((_, index) => (
                    <SkeletonCampañas key={index}></SkeletonCampañas>
                ))}
            </div>
        )
    } else {
        Campaigns = (
            campaigns?.map((campanias: any) => ( //map para renderizar componentes de cada rifa
                <Campaña key={campanias.id} id={campanias.id} titulo={campanias.titulo} marca={campanias.marca} puntos={campanias.puntos} img={campanias.imgCampania}></Campaña>
            )))

    }

    if (campaigns?.length !== 0) {
        CampaignsList = (
            <div className="w-infiniteScroll max-w-[100vw] md:w-full px-2.5 pb-3 pt-2.5 md:px-5 m-auto">
                <Categorias selectedCategoriesIds={selectedCategoriesIds} toggleCategoryId={toggleCategoryId}></Categorias>
                <div className="md:grid md:grid-cols-2 mb-5 md:mb-10 dl:grid-cols-3 gx:grid-cols-4 md:gap-5">
                    <CampaignsActivesRenderD campaignsActives={campaignsActives}></CampaignsActivesRenderD>
                    {Campaigns}
                </div>
            </div>

        )
    }
    if (loading) {
        CampaignsList = (
            <div className="w-infiniteScroll md:w-full px-2.5 pb-3 pt-2.5 md:px-5  m-auto">
                <Categorias selectedCategoriesIds={selectedCategoriesIds} toggleCategoryId={toggleCategoryId}></Categorias>
                <div className="md:grid md:grid-cols-2 mb-5 md:mb-10 dl:grid-cols-3 gx:grid-cols-4 md:gap-5">
                    <CampaignsActivesRenderD campaignsActives={campaignsActives}></CampaignsActivesRenderD>
                    {Array.from({ length: 16 }).map((_, index) => (
                        <SkeletonCampañas key={index}></SkeletonCampañas>
                    ))}
                </div>
            </div>
        )
    } else {
        if (campaigns?.length === 0 && selectedCategoriesIds.length === 0 && !textFilter && !dateFilter && !orderFilter) {
            CampaignsList = (
                <NothingCampaigns filtered={false}></NothingCampaigns>
            )
        } else {
            if (campaigns?.length === 0) {
                CampaignsList = (
                    <div className="w-infiniteScroll md:w-full px-2.5 pb-3 pt-2.5 md:px-5  m-auto">
                        <Categorias selectedCategoriesIds={selectedCategoriesIds} toggleCategoryId={toggleCategoryId}></Categorias>
                        <div className="flex min-h-[80vh]">
                            <div className="flex justify-center items-center">
                                <CampaignsActivesRenderD campaignsActives={campaignsActives}></CampaignsActivesRenderD>
                            </div>
                            <NothingCampaigns filtered={true}></NothingCampaigns>
                        </div>
                    </div>
                )
            }
        }
    }

    useEffect(() => {
        if(keyword) {
            setTextFilter(keyword as string)
        }
    }, [keyword])
    

    useEffect(() => {
        if (!campaigns) {
            loadMoreCampaigns()
            setLoading(true)
        }
    }, [campaigns]);

    useEffect(() => {
        if (campaigns && selectedCategoriesIds || textFilter || dateFilter || orderFilter) {
            loadMoreCampaigns(true)
            setLoading(true)
        }
    }, [selectedCategoriesIds, textFilter, dateFilter, orderFilter])

    useEffect(() => {
        if (!campaignsActives) {
            loadMoreCampaignsActives()
        }
    }, [campaignsActives]);

    return (
        <BasePage setTextFilter={setTextFilter}  setDateFilter={setDateFilter} setOrderFilter={setOrderFilter} setTypeDateFilter={setTypeDateFilter}>
            <div className="grid place-items-center w-full max-w-screen min-w-fit">
                <div className="w-full md:w-full max-w-hd relative min-h-[75vh]">
                    <CampaignsActivesRenderM campaignsActives={campaignsActives}></CampaignsActivesRenderM>
                    {CampaignsList}
                    {campaigns&&
                    <InfiniteScroll dataLength={campaigns.length} next={loadMoreCampaigns} hasMore={currentPage < lastPage} loader={<PuffLoader className="mx-auto mt-20" color={"blue"} size={100} />}>
                    </InfiniteScroll>}
                </div>
            </div>
        </BasePage>
    )
}

export default Campañas
