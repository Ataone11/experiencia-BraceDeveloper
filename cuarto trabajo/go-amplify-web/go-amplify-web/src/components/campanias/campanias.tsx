import { S3_BUCKET_URL } from "../../utils/constants";
import Logo from "../../assets/logotipo/Logotipo.png"
import { CSSProperties } from "react";
import Link from "next/link";

const Campaña = (props: any) => {
    const bg: CSSProperties = {
        backgroundImage: `url(${props.img ? S3_BUCKET_URL + props.img : Logo.src}), url(${Logo.src})`,
        backgroundSize: props.img ? "cover" : "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    }

    return (
        <Link href={`campaigns/${props.id}`}>
            <div className="md:h-72 mb-4 md:mb-0 w-full h-44 rounded-rifa overflow-hidden relative bg-cover drop-shadow-xl cursor-pointer" style={bg}>
                <div className="flex flex-col text-white justify-center w-full h-24 px-5 bg-campaing absolute bottom-0 left-0">
                    <h1 className="text-tittle mb-2.5 lg:text-[24px] font-light">{props.titulo}</h1>
                    <div className="flex justify-between">
                        <h3 className="text-tittleM lg:text-[15px] font-light">{props.marca}</h3>
                        <h3 className="text-tittleM font-light">{props.puntos}pts</h3>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Campaña;