import { S3_BUCKET_URL } from "./../../utils/constants";
import { USER_CAMPAIGN_STATES_NAMES } from "./../../utils/user-campaign-states";
import Logo from "../../assets/logotipo/Logotipo.png"
import Link from "next/link";

const CampañasActivas = (props: any) => {
    const bg = {
        backgroundImage: `url(${S3_BUCKET_URL + props.img}), url(${Logo.src})`,
        backgroundPosition: "center"
    }

    return (
        <div className="md:w-full md:my-4">
            <Link href={`/campaigns/${props.id}`}>
                
            <div className="cursor-pointer flex items-center mr-2 md:mr-0 w-36 h-12 md:h-16 md:w-full rounded-full bg-activeCampaing relative">
                <div className="rounded-full overflow-hidden bg-white w-[50px] h-[50px] min-w-[50px] min-h-[50px] md:w-16 md:h-16 md:-left-5 drop-shadow-circleCampaing bg-cover" style={bg}>
                </div>
                <div className="flex justify-center flex-col md:pr-1.5 md:py-2 py-1 h-full text-white overflow-hidden pl-1">
                    <h3 className="text-tittleM md:text-tittle mb-1 md:mb-2.5 whitespace-nowrap font-light text-ellipsis overflow-hidden">
                        {props.title}
                    </h3>
                    <p className="text-tittleMinM md:text-rifaDateSize mb-1 font-light">
                        {props.brand}
                    </p>
                </div>
            </div>
            </Link>
            
            <h2 className="whitespace-nowrap text-primary mt-1">{USER_CAMPAIGN_STATES_NAMES[props.state]}</h2>
        </div>
    );
}

export default CampañasActivas;