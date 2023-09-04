import { useRouter } from "next/router";
import { CSSProperties, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PuffLoader } from "react-spinners"
import Raffle from "../../src/components/Modificar-rifas";
import { Rifa } from "../../src/models/rifa";
import { getRaffles } from "../../src/redux/actions/rifasAction";
import { getRifasState } from "../../src/redux/reducers/rifaReducer";
import BasePage from "../../src/screens/general/base/BasePage";

const RafflesIndex = () => {
    const raffles = useSelector(getRifasState)
    const dispatch = useDispatch();
    const router = useRouter()
    const [loader, setLoader] = useState(false)
    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "blue",
    };

    const getIdRaffle = (id:number):Rifa =>  {
        const result = raffles.filter((raffle:any)=>{
            return raffle.id === id
        })

        return result[0]
    }

    useEffect(() => {
        if (!raffles) {
            getRaffles(dispatch)
        }
    }, [raffles])

    useEffect(() => {
        if(!loader)
            setLoader(true)
        getRaffles(dispatch, setLoader)
    }, [router])

    if (!raffles ||  loader) {
        return (
            <BasePage>
            <div className="bg-default w-full grid place-items-center">
                <div className="grid place-items-center h-[85vh]">
                    <PuffLoader color={"blue"} loading={!raffles} cssOverride={override} size={150} />
                </div>
            </div>
            </BasePage>
            
        )
    } else {
        return (
            <BasePage title="Rifas">
                <div className="w-full grid place-items-center">
                    <div className="md:mb-[50px] mt-5 md:px-5 px-2.5">
                        <Raffle raffle={getIdRaffle(1)} getRaffles={getRaffles}></Raffle>
                    </div>
                    <div className="md:mb-[50px] mb-5 mt-5 md:px-5 px-2.5">
                        <Raffle raffle={getIdRaffle(2)} getRaffles={getRaffles}></Raffle>
                    </div>
                    <div className="md:mb-[50px] mb-5 md:px-5 px-2.5">
                        <Raffle raffle={getIdRaffle(3)} getRaffles={getRaffles}></Raffle>
                    </div>
                </div>
            </BasePage>
        )
    }

}

export default RafflesIndex